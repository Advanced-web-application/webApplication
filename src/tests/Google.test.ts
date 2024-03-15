import request from "supertest";
import initApp from "../app";
import mongoose from "mongoose";
import { Express } from "express";
import User from "../models/user_model";
import { OAuth2Client } from 'google-auth-library'; 


let app: Express;


beforeAll(async () => {
  app = await initApp();
  console.log("beforeAll");
});

afterAll(async () => {
  await mongoose.connection.close();
});


jest.mock('../models/user_model'); // Mock the User model
jest.mock('google-auth-library'); // Mock the google-auth-library module

describe("Google test", () => {
  it("Google Signin Test", async () => {
    const mockRes = {
      status: jest.fn(() => mockRes),
      send: jest.fn(),
    };

    const mockGoogleUser = {
      _id: '1234567890',
      name: "John Doe",
      email: "john.doe@gmail.com",
      picture: "https://example.com/picture.jpg",
      sub: "123456789"
    };

    // Mock verifyIdToken function of OAuth2Client
    (OAuth2Client.prototype.verifyIdToken as any).mockResolvedValue({
      getPayload: () => mockGoogleUser,
    });

    // Mock findOne to simulate user not found
    User.findOne = jest.fn().mockResolvedValue(null);

    // Mock create to simulate user creation
    User.create = jest.fn().mockResolvedValue({
      ...mockGoogleUser,
      save: jest.fn(), // Assuming save is a required function for the created user
    });

    // Send a request to the Google login endpoint
    const response = await request(app)
      .post("/auth/google")
      .send({ credential: "mockedGoogleCredential" });

    // Assert response status code and body
    expect(response.status).toBe(200);

    // Assert database interactions
    expect(User.findOne).toHaveBeenCalledWith({ email: mockGoogleUser.email });
    expect(User.create).toHaveBeenCalledWith({
      fullName: mockGoogleUser.name,
      _id: mockGoogleUser.sub,
      age: 0,
      gender: "male",
      email: mockGoogleUser.email,
      password: '0',
      image: mockGoogleUser.picture
    });
  });
});





