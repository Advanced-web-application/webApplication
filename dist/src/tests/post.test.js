"use strict";
// import { Express } from "express";
// import request from "supertest";
// import initApp from "../app";
// import mongoose from "mongoose";
// import Post, { IPost } from "../models/post_model";
// import User, { IUser } from "../models/user_model";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const app_1 = __importDefault(require("../app"));
const mongoose_1 = __importDefault(require("mongoose"));
const post_model_1 = __importDefault(require("../models/post_model"));
const user_model_1 = __importDefault(require("../models/user_model"));
let app;
const user = {
    fullName: "John Doe",
    age: 22,
    gender: "male",
    _id: "1234567890",
    email: "test@post.test",
    password: "1234567890",
};
let accessToken = "";
beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
    app = yield (0, app_1.default)();
    console.log("beforeAll");
    yield post_model_1.default.deleteMany();
    yield user_model_1.default.deleteMany({ email: user.email });
    const response = yield (0, supertest_1.default)(app).post("/auth/register").send(user);
    user._id = response.body._id;
    const response2 = yield (0, supertest_1.default)(app).post("/auth/login").send(user);
    accessToken = response2.body.accessToken;
    console.log("accessToken: " + accessToken);
}));
afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
    yield mongoose_1.default.connection.close();
}));
const post1 = {
    name: "test post",
    description: "test description",
    price: 100,
    owner: "1234567890",
};
describe("Post tests", () => {
    const addPost = (post) => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app)
            .post("/post")
            .set("Authorization", "JWT " + accessToken)
            .send(post);
        expect(response.statusCode).toBe(201);
        expect(response.body.owner).toBe(user._id);
        expect(response.body.name).toBe(post.name);
        expect(response.body.price.toString()).toBe(post.price.toString());
        expect(response.body.description).toBe(post.description);
    });
    test("Test Get All posts - empty response", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app).get("/post");
        expect(response.statusCode).toBe(200);
        expect(response.body).toStrictEqual([]);
    }));
    test("Test Post post", () => __awaiter(void 0, void 0, void 0, function* () {
        yield addPost(post1);
    }));
    let postId;
    test("Test Get All posts with one post in DB", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app).get("/post");
        expect(response.statusCode).toBe(200);
        const rc = response.body[0];
        postId = rc._id;
        console.log("postId: " + postId);
        expect(rc.name).toBe(post1.name);
        expect(rc.description).toBe(post1.description);
        expect(rc.price.toString()).toBe(post1.price.toString());
        expect(rc.owner).toBe(user._id);
    }));
    test("Test PUT /post/:id", () => __awaiter(void 0, void 0, void 0, function* () {
        const updatedPost = Object.assign(Object.assign({}, post1), { name: "changed name" });
        const response = yield (0, supertest_1.default)(app)
            .put("/post/" + postId)
            .set("Authorization", "JWT " + accessToken)
            .send(updatedPost);
        expect(response.statusCode).toBe(200);
        expect(response.body.name).toBe(updatedPost.name);
    }));
    test("Test PUT with wrong id /post/:id", () => __awaiter(void 0, void 0, void 0, function* () {
        const updatedPost = Object.assign(Object.assign({}, post1), { name: "changed name" });
        const response = yield (0, supertest_1.default)(app)
            .put("/post/" + "123")
            .set("Authorization", "JWT " + accessToken)
            .send(updatedPost);
        expect(response.statusCode).toBe(406);
    }));
    test("Test DELETE with wrong id /post/:id", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app).delete(`/post/"123"`).set("Authorization", "JWT " + accessToken);
        expect(response.statusCode).toBe(406);
    }));
    test("Test DELETE /post/:id", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app).delete(`/post/${postId}`).set("Authorization", "JWT " + accessToken);
        expect(response.statusCode).toBe(200);
    }));
    const post2 = {
        name: "test post2",
        description: "test description2",
        price: 100,
        owner: "123",
    };
    test("Add Comment /post/comment/:id", () => __awaiter(void 0, void 0, void 0, function* () {
        yield addPost(post2);
        const res = yield (0, supertest_1.default)(app).get("/post");
        expect(res.statusCode).toBe(200);
        const rc = res.body[0];
        postId = rc._id;
        console.log("postId2: " + postId);
        const response = yield (0, supertest_1.default)(app)
            .put("/post/comment/" + postId)
            .set("Authorization", "JWT " + accessToken)
            .send({ comment: "test comment" });
        expect(response.statusCode).toBe(200);
        expect(response.body.comments[0]).toBe("test comment");
    }));
    test("Test addComment with invalid post ID", () => __awaiter(void 0, void 0, void 0, function* () {
        const invalidPostId = "invalid_id";
        const response = yield (0, supertest_1.default)(app)
            .put("/post/comment/" + invalidPostId)
            .set("Authorization", "JWT " + accessToken)
            .send({ comment: "test comment" });
        expect(response.statusCode).toBe(500);
    }));
});
//# sourceMappingURL=post.test.js.map