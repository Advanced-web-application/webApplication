import request from "supertest";
import initApp from "../app";
import mongoose from "mongoose";
import Customer from "../models/Customer_model";
import { Express } from "express";
import User from "../models/user_model";

let app: Express;
let accessToken: string;
const user = {
  email: "testCustomer@test.com",
  password: "1234567890",
}
beforeAll(async () => {
  app = await initApp();
  console.log("beforeAll");
  await Customer.deleteMany();

  User.deleteMany({ 'email': user.email });
  await request(app).post("/auth/register").send(user);
  const response = await request(app).post("/auth/login").send(user);
  accessToken = response.body.accessToken;
});

afterAll(async () => {
  await mongoose.connection.close();
});

interface ICustomer {
  fullName: string;
  age: number;
  gender: string;
  _id: string;
}

const customer: ICustomer = {
  fullName: "John Doe",
  age: 22,
  gender: "male",
  _id:"1234567890",
};

describe("Customer tests", () => {
  const addCustomer = async (customer: ICustomer) => {
    const response = await request(app).post("/customer")
      .set("Authorization", "JWT " + accessToken)
      .send(customer);
    expect(response.statusCode).toBe(201);
  };
  test("Test Get All Customers - empty response", async () => {
    const response = await request(app).get("/customer").set("Authorization", "JWT " + accessToken);
    expect(response.statusCode).toBe(200);
    expect(response.body).toStrictEqual([]);
  });

  test("Test Post Customer", async () => {
    addCustomer(customer);
  });

  test("Test Get All Customers with one customer in DB", async () => {
    const response = await request(app).get("/customer").set("Authorization", "JWT " + accessToken);
    expect(response.statusCode).toBe(200);
    expect(response.body.length).toBe(1);
    const cust = response.body[0];
    expect(cust.fullName).toBe(customer.fullName);
    expect(cust.age).toBe(customer.age);
    expect(cust.gender).toBe(customer.gender);
    expect(cust._id).toBe(customer._id);
  });

  test("Test Post duplicate Customer", async () => {
    const response = await request(app).post("/customer").set("Authorization", "JWT " + accessToken).send(customer);
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