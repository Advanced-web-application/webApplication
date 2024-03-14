import request from "supertest";
import initApp from "../app";
import mongoose from "mongoose";
import { Express } from "express";
import User from "../models/user_model";


let app: Express;
const user = {
  fullName: "John",
  age: 24,
  gender: "male",
  _id:"12345678",
  email: "testUser@test.com",
  password: "12345678",
}

beforeAll(async () => {
  process.env.JWT_EXPIRATION = '3s'
  app = await initApp();
  console.log("beforeAll");
  await User.deleteMany({ 'email': user.email });
});

afterAll(async () => {
  await mongoose.connection.close();
});

let accessToken: string;
let refreshToken: string;
let newRefreshToken: string



describe("Auth tests", () => {

  test("Test Google Signin", async () => {
    const GoogleToken = 'eyJhbGciOiJSUzI1NiIsImtpZCI6IjA4YmY1YzM3NzJkZDRlN2E3MjdhMTAxYmY1MjBmNjU3NWNhYzMyNmYiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJhenAiOiI4OTU2MzQyNjcwMTEtY3YybzkxMHJuY2E5OTQyM3VkM2VuMGpzMHJhaWRmbGguYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJhdWQiOiI4OTU2MzQyNjcwMTEtY3YybzkxMHJuY2E5OTQyM3VkM2VuMGpzMHJhaWRmbGguYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJzdWIiOiIxMTI1MDM2ODMxNDE2OTY2NjE2NzciLCJlbWFpbCI6Im1pY2hhbC5tYXNzYWNoaUBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwibmJmIjoxNzEwNDExMjE0LCJuYW1lIjoiTWljaGFsIE1hc3NhY2hpIiwicGljdHVyZSI6Imh0dHBzOi8vbGgzLmdvb2dsZXVzZXJjb250ZW50LmNvbS9hL0FDZzhvY0w5eTVTcGdMMXBnT09Md0dabW5UcXRneUpmWm9UMTlqVGtEYkc0aGRnPXM5Ni1jIiwiZ2l2ZW5fbmFtZSI6Ik1pY2hhbCIsImZhbWlseV9uYW1lIjoiTWFzc2FjaGkiLCJsb2NhbGUiOiJoZSIsImlhdCI6MTcxMDQxMTUxNCwiZXhwIjoxNzEwNDE1MTE0LCJqdGkiOiI4NjFhY2IzZjliN2ExNmQ2NDc3YjEyZTk3YWEzYjViYmMzMTQzNWJlIn0.J7SPQqs3jdPkDsmg8cxhGVEwdGD4AXWHtNVEdDpq31l21_zkiTMvgIAv8lb4EvQ3Flbp7UcXgIUSgZzgN8npsDgBhMOLhuO1Tf9ov6gCCrRbhlJtf-2i60A7-80PFikoz11HAev2yVDn9nTh3FOvibAo-KbIlD05mXNDHRzhZiI_PD29Fu9glSsjjBi7lgmoKiJPYS3z9HJOlXbzMDDMfsSERtg59IY-_0rK18IxhdkABbGu_PS7Cg0x_T1iPivYZ5wD0UtC4psFMyxXf1IyNwXNcYJlHqm20NRJIAb5uh2Vi_o5KDq-OWTdnCAYcnRAulg-DUfeOsEccSghUAg1hw'; 
    const response = await request(app)
      .post("/auth/google")
      .send({ credential: GoogleToken });
      console.log("Response Body:", response.body); 

    expect(response.statusCode).toBe(200);
    expect(response.body.email).toBeDefined();
    expect(response.body._id).toBeDefined();
    expect(response.body.image).toBeDefined();
    expect(response.body.accessToken).toBeDefined();
    expect(response.body.refreshToken).toBeDefined();    
  });

  

  test("Test Register", async () => {
    const response = await request(app)
      .post("/auth/register")
      .send(user);
    expect(response.statusCode).toBe(201);
  });

  test("Test Register exist email", async () => {
    const response = await request(app)
      .post("/auth/register")
      .send(user);
    expect(response.statusCode).toBe(406);
  });

  test("Test Register missing password", async () => {
    const response = await request(app)
      .post("/auth/register").send({
        email: "test@test.com",
      });
    expect(response.statusCode).toBe(400);
  });

  test("Test Login", async () => {
    const response = await request(app)
      .post("/auth/login").send(user);
    expect(response.statusCode).toBe(200);
    accessToken = response.body.accessToken;
    refreshToken = response.body.refreshToken;
    expect(accessToken).toBeDefined();
    expect(response.body._id).toBe(user._id);
    console.log("user from login: " + response.body._id);
  });

  test("Test Login without password", async () => {
    const response = await request(app)
      .post("/auth/login").send({
        email: "test@test.com",});
    expect(response.statusCode).toBe(400);

  });

  test("Test Login with wrong password", async () => {
    const response = await request(app)
      .post("/auth/login").send({
        email: "test@test.com",
      password: "123456789"});
    expect(response.statusCode).toBe(401);

  });

  test("Test Login without username and password", async () => {
    const response = await request(app)
      .post("/auth/login").send({});
    expect(response.statusCode).toBe(400);

  });

  test("Test forbidden access without token", async () => {
    const response = await request(app).get("/user");
    expect(response.statusCode).toBe(401);
  });

  test("Test access with valid token", async () => {
    const response = await request(app)
      .get("/user")
      .set("Authorization", "JWT " + accessToken);
    expect(response.statusCode).toBe(200);
  });

  test("Test access with invalid token", async () => {
    const response = await request(app)
      .get("/user")
      .set("Authorization", "JWT 1" + accessToken);
    expect(response.statusCode).toBe(401);
  });

  jest.setTimeout(10000);

  test("Test access after timeout of token", async () => {
    await new Promise(resolve => setTimeout(() => resolve("done"), 5000));

    const response = await request(app)
      .get("/user")
      .set("Authorization", "JWT " + accessToken);
    expect(response.statusCode).not.toBe(200);
    console.log("response.statusCode of timeout: " +response.statusCode);
  });

 
  test("Test refresh token", async () => {
    console.log("Test refresh token: " + refreshToken);
    const response = await request(app)
      .get("/auth/refreshToken")
      .set("Authorization", "JWT " + refreshToken)
      .send();
      console.log("response.statusCode: " +response.statusCode);
    expect(response.statusCode).toBe(200);
    expect(response.body.accessToken).toBeDefined();
    console.log("new access token from test: " + response.body.accessToken);
    expect(response.body.refreshToken).toBeDefined();
    console.log("new refresh token from test: " + response.body.refreshToken);

    const newAccessToken = response.body.accessToken;
    newRefreshToken = response.body.refreshToken;

    const response2 = await request(app)
      .get("/user")
      .set("Authorization", "JWT " + newAccessToken);
    expect(response2.statusCode).toBe(200);
  });

  test("Test double use of refresh token", async () => {
    const response = await request(app)
      .get("/auth/refresh")
      .set("Authorization", "JWT " + refreshToken)
      .send();
    expect(response.statusCode).not.toBe(200);
    console.log("new refresh token from double: " + response.statusCode);

    //verify that the new token is not valid as well
    const response1 = await request(app)
      .get("/auth/refresh")
      .set("Authorization", "JWT " + newRefreshToken)
      .send();
    expect(response1.statusCode).not.toBe(200);
    console.log("new refresh token from double 2: " + response.statusCode);
  });

  let LogOutaccessToken: string;
  let LogOutrefreshToken: string;

  test("Test Login", async () => {
    const response = await request(app)
      .post("/auth/login").send(user);
    expect(response.statusCode).toBe(200);
    LogOutaccessToken = response.body.accessToken;
    LogOutrefreshToken = response.body.refreshToken;
    expect(LogOutaccessToken).toBeDefined();
    expect(LogOutrefreshToken).toBeDefined();
  });


  test("Test logout", async () => {
    const response = await request(app)
      .get("/auth/logout")
      .set("Authorization", "JWT " + LogOutrefreshToken)
      .send();
    expect(response.statusCode).toBe(200);

  });

  test("Test logout for the second time", async () => {
    const response = await request(app)
      .get("/auth/logout")
      .set("Authorization", "JWT " + LogOutrefreshToken)
      .send();
    expect(response.statusCode).not.toBe(200);
  });















});
