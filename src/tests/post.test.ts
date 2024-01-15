import { Express } from "express";
import request from "supertest";
import initApp from "../app";
import mongoose from "mongoose";
import Post, { IPost } from "../models/post_model";
import User, { IUser } from "../models/user_model";

let app: Express;
const user: IUser = {
  email: "test@post.test",
  password: "1234567890",
}
let accessToken = "";

beforeAll(async () => {
  app = await initApp();
  console.log("beforeAll");
  await Post.deleteMany();

  await User.deleteMany({ 'email': user.email });
  const response = await request(app).post("/auth/register").send(user);
  user._id = response.body._id;
  const response2 = await request(app).post("/auth/login").send(user);
  accessToken = response2.body.accessToken;
});

afterAll(async () => {
  await mongoose.connection.close();
});

const post1: IPost = {
  name: "test post",
  description: "test description",
  price: 100,
  owner:"1234567890",
};

describe("Post tests", () => {
  const addPost = async (post: IPost) => {
    const response = await request(app)
      .post("/post")
      .set("Authorization", "JWT " + accessToken)
      .send(post);
    expect(response.statusCode).toBe(201);
    expect(response.body.owner).toBe(user._id);
    expect(response.body.name).toBe(post.name);
    expect(response.body.price).toBe(post.price.toString());
    expect(response.body.description).toBe(post.description);
  };

  test("Test Get All posts - empty response", async () => {
    const response = await request(app).get("/post");
    expect(response.statusCode).toBe(200);
    expect(response.body).toStrictEqual([]);
  });

  test("Test Post post", async () => {
    addPost(post1);
  });

  test("Test Get All posts with one post in DB", async () => {
    const response = await request(app).get("/post");
    expect(response.statusCode).toBe(200);
    const rc = response.body[0];
    console.log("name: " + rc.name);
    expect(rc.name).toBe(post1.name);
    expect(rc.description).toBe(post1.description);
    expect(response.body.price).toBe(post1.price.toString());
    expect(rc.owner).toBe(user._id);
  });

});
