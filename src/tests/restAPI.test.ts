import request from "supertest";
import initApp from "../app";
import mongoose from "mongoose";
import User from "../models/user_model";
import { Express } from "express";

let app: Express;
let accessToken: string;
let server;

interface IUser {
  fullName: string;
  age: number;
  gender: string;
  _id: string;
  email: string;
  password: string;
}

const user:IUser= {
  fullName: "John Doe",
  age: 22,
  gender: "male",
  _id:"1234567890",
  email: "testUser1@test.com",
  password: "1234567890",
 
}

beforeAll(async () => {
  app = await initApp();
  console.log("beforeAll");
  await User.deleteMany();

  await request(app).post("/auth/register").send(user);
  const response = await request(app).post("/auth/login").send(user);
  accessToken = response.body.accessToken;
});

afterAll(async () => {
  await mongoose.connection.close();
 
});


describe("Rest API tests", () => {
  test("Test Get Rest API", async () => {
    const response = await request(app).get("/restAPI")
    expect(response.statusCode).toBe(200);
  });

});
