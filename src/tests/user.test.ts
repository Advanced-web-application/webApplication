import request from "supertest";
import initApp from "../app";
import mongoose from "mongoose";
import User from "../models/user_model";
import { Express } from "express";


let app: Express;
let accessToken: string;

interface IUser {
  fullName: string;
  age: number;
  gender: string;
  _id: string;
  email: string;
  password: string;
}

const user:IUser= {
  email: "testUser@test.com",
  password: "1234567890",
  fullName: "John Doe",
  age: 22,
  gender: "male",
  _id:"1234567890",
 
}
const newUser:IUser= {
  email: "testUsermew@test.com",
  password: "123456789",
  fullName: "John Doe 2",
  age: 22,
  gender: "male",
  _id:"123456789",
 
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


describe("User tests", () => {
  const addUser = async (user: IUser) => {
    const response = await request(app).post("/user")
      .set("Authorization", "JWT " + accessToken)
      .send(user);
    expect(response.statusCode).toBe(201);
  };

  test("Test Get All Users with one user in DB", async () => {
    const response1 = await request(app).get("/user").set("Authorization", "JWT " + accessToken);
    expect(response1.statusCode).toBe(200);
    expect(response1.body.length).toBe(1);
    const user1 = response1.body[0];
    expect(user1.fullName).toBe(user.fullName);
    expect(user1.age).toBe(user.age);
    expect(user1.gender).toBe(user.gender);
    expect(user1._id).toBe(user._id);
    expect(user1.email).toBe(user.email);
  });

  test("Test Post User", async () => {
    addUser(newUser);
  });

  
  test("Test Post duplicate User", async () => {
    const response = await request(app).post("/user").set("Authorization", "JWT " + accessToken).send(user);
    expect(response.statusCode).toBe(406);
  });

  test(" Test get user by id", async () => {
      const response = await request(app).get("/user/" + newUser._id).set("Authorization", "JWT " + accessToken);
      expect(response.statusCode).toBe(200);
      expect(response.body.fullName).toBe(newUser.fullName);
      expect(response.body.age).toBe(newUser.age);
      expect(response.body.gender).toBe(newUser.gender);
      expect(response.body._id).toBe(newUser._id);
      expect(response.body.email).toBe(newUser.email);
    });
       

  test("Test PUT /user/:id", async () => {
    const updatedUser = { ...user, fullName: "Jane Doe 33" };
    const response = await request(app)
      .put("/user/" + user._id)
      .set("Authorization", "JWT " + accessToken)
      .send(updatedUser);
    expect(response.statusCode).toBe(200);
    expect(response.body.fullName).toBe(updatedUser.fullName);
  });

  test("Test DELETE /user/:id", async () => {
    const response = await request(app)
    .delete(`/user/${user._id}`)
    .set("Authorization", "JWT " + accessToken);
    expect(response.statusCode).toBe(200);
  });
  test("Test DELETE /user/:id", async () => {
    const response = await request(app)
    .delete(`/user/${newUser._id}`)
    .set("Authorization", "JWT " + accessToken);
    expect(response.statusCode).toBe(200);
  });
});