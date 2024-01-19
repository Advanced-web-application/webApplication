"use strict";
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
const user_model_1 = __importDefault(require("../models/user_model"));
let app;
let accessToken;
const user = {
    fullName: "John Doe",
    age: 22,
    gender: "male",
    _id: "1234567890",
    email: "testUser1@test.com",
    password: "1234567890",
};
const newUser = {
    email: "testUsermew@test.com",
    password: "123456789",
    fullName: "John Doe 2",
    age: 22,
    gender: "male",
    _id: "123456789",
};
beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
    app = yield (0, app_1.default)();
    console.log("beforeAll");
    yield user_model_1.default.deleteMany();
    yield (0, supertest_1.default)(app).post("/auth/register").send(user);
    const response = yield (0, supertest_1.default)(app).post("/auth/login").send(user);
    accessToken = response.body.accessToken;
}));
afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
    yield mongoose_1.default.connection.close();
}));
describe("User tests", () => {
    const addUser = (user) => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app).post("/user")
            .set("Authorization", "JWT " + accessToken)
            .send(user);
        expect(response.statusCode).toBe(201);
    });
    test("Test Get All Users with one user in DB", () => __awaiter(void 0, void 0, void 0, function* () {
        const response1 = yield (0, supertest_1.default)(app).get("/user").set("Authorization", "JWT " + accessToken);
        expect(response1.statusCode).toBe(200);
        expect(response1.body.length).toBe(1);
        const user1 = response1.body[0];
        expect(user1.fullName).toBe(user.fullName);
        expect(user1.age).toBe(user.age);
        expect(user1.gender).toBe(user.gender);
        expect(user1._id).toBe(user._id);
        expect(user1.email).toBe(user.email);
    }));
    test("Test Post User", () => __awaiter(void 0, void 0, void 0, function* () {
        addUser(newUser);
    }));
    test("Test Post duplicate User", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app).post("/user").set("Authorization", "JWT " + accessToken).send(user);
        expect(response.statusCode).toBe(406);
    }));
    test(" Test get user by id", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app).get("/user/" + newUser._id).set("Authorization", "JWT " + accessToken);
        expect(response.statusCode).toBe(200);
        expect(response.body.fullName).toBe(newUser.fullName);
        expect(response.body.age).toBe(newUser.age);
        expect(response.body.gender).toBe(newUser.gender);
        expect(response.body._id).toBe(newUser._id);
        expect(response.body.email).toBe(newUser.email);
    }));
    test("Test PUT /user/:id", () => __awaiter(void 0, void 0, void 0, function* () {
        const updatedUser = Object.assign(Object.assign({}, user), { fullName: "Jane Doe 33" });
        const response = yield (0, supertest_1.default)(app)
            .put("/user/" + user._id)
            .set("Authorization", "JWT " + accessToken)
            .send(updatedUser);
        expect(response.statusCode).toBe(200);
        expect(response.body.fullName).toBe(updatedUser.fullName);
    }));
    test("Test DELETE /user/:id", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app)
            .delete(`/user/${user._id}`)
            .set("Authorization", "JWT " + accessToken);
        expect(response.statusCode).toBe(200);
    }));
    test("Test DELETE /user/:id", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app)
            .delete(`/user/${newUser._id}`)
            .set("Authorization", "JWT " + accessToken);
        expect(response.statusCode).toBe(200);
    }));
});
//# sourceMappingURL=user.test.js.map