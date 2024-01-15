import request from "supertest";
import initApp from "../app";
import mongoose from "mongoose";
import User from "../models/users_model";
import { Express } from "express";


let app: Express;
let accessToken: string;
// const user = {
//   email: "testStudent@test.com",
//   password: "1234567890",
// }
interface IUser {
  fullName: string;
  age: number;
  gender: string;
  _id: string;
  email: string;
  password: string;
  image?: string;
  refreshTokens?: string[];
}
const user: IUser = {
  fullName: "John Doe",
  age: 22,
  gender: "male",
  _id: "1234567890",
  email: "testUser@test.com",
  password: "1234567890",
};

beforeAll(async () => {
  app = await initApp();
  console.log("beforeAll");
  await User.deleteMany();

  //User.deleteMany({ 'email': user.email });
  await request(app).post("/auth/register").send(user);
  const response = await request(app).post("/auth/login").send(user);
  accessToken = response.body.accessToken;
  console.log("accessToken:"+accessToken);
 
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
  test("Test Get All Users - empty response", async () => {
    const response = await request(app).get("/user").set("Authorization", "JWT " + accessToken);
    expect(response.statusCode).toBe(200);
    expect(response.body).toStrictEqual([]);
  });

  test("Test Post User", async () => {
    addUser(user);
  });

  test("Test Get All Users with one user in DB", async () => {
    const response = await request(app).get("/user").set("Authorization", "JWT " + accessToken);
    expect(response.statusCode).toBe(200);
    expect(response.body.length).toBe(1);
    const st = response.body[0];
    expect(st.fullName).toBe(user.fullName);
    expect(st.age).toBe(user.age);
    expect(st.gender).toBe(user.gender);
    expect(st._id).toBe(user._id);
    expect(st.email).toBe(user.email);
    expect(st.password).toBe(user.password);
  });

  test("Test Post duplicate User", async () => {
    const response = await request(app).post("/user").set("Authorization", "JWT " + accessToken).send(user);
    expect(response.statusCode).toBe(406);
  });

  // test("Test PUT /student/:id", async () => {
  //   const updatedStudent = { ...student, name: "Jane Doe 33" };
  //   const response = await request(app)
  //     .put(`/student/${student._id}`)
  //     .send(updatedStudent);
  //   expect(response.statusCode).toBe(200);
  //   expect(response.body.name).toBe(updatedStudent.name);
  // });

  // test("Test DELETE /student/:id", async () => {
  //   const response = await request(app).delete(`/student/${student._id}`);
  //   expect(response.statusCode).toBe(200);
  // });
});
