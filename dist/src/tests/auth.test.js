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
const user = {
    fullName: "John",
    age: 24,
    gender: "male",
    _id: "12345678",
    email: "testUser@test.com",
    password: "12345678",
};
beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
    app = yield (0, app_1.default)();
    console.log("beforeAll");
    yield user_model_1.default.deleteMany({ 'email': user.email });
}));
afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
    yield mongoose_1.default.connection.close();
}));
let accessToken;
let refreshToken;
let newRefreshToken;
describe("Auth tests", () => {
    test("Test Google Signin", () => __awaiter(void 0, void 0, void 0, function* () {
        const mockGoogleToken = 'eyJhbGciOiJSUzI1NiIsImtpZCI6IjA4YmY1YzM3NzJkZDRlN2E3MjdhMTAxYmY1MjBmNjU3NWNhYzMyNmYiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJhenAiOiI4OTU2MzQyNjcwMTEtY3YybzkxMHJuY2E5OTQyM3VkM2VuMGpzMHJhaWRmbGguYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJhdWQiOiI4OTU2MzQyNjcwMTEtY3YybzkxMHJuY2E5OTQyM3VkM2VuMGpzMHJhaWRmbGguYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJzdWIiOiIxMDA3Nzg1MDI0MzAxODYyNjcwNTUiLCJlbWFpbCI6Im1pY2hhbDI3OTIwMDBAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsIm5iZiI6MTcxMDI3NjMzOSwibmFtZSI6Itee15nXm9ecINee16HXptez15kiLCJwaWN0dXJlIjoiaHR0cHM6Ly9saDMuZ29vZ2xldXNlcmNvbnRlbnQuY29tL2EvQUNnOG9jTE0zTTI2UnFDRkZmbWxWVmdfWUEyQ0ZRTzZfRFRjWUJBSzVNOUZrb1k9czk2LWMiLCJnaXZlbl9uYW1lIjoi157Xmdeb15wiLCJmYW1pbHlfbmFtZSI6Itee16HXptez15kiLCJsb2NhbGUiOiJoZSIsImlhdCI6MTcxMDI3NjYzOSwiZXhwIjoxNzEwMjgwMjM5LCJqdGkiOiI4YjMwMGJkNzRkN2E0YTExNDI3MzFmOWI1NTk0OWJhZDkyODUzNzg4In0.Akja-nmiqlSUJYS7Prx7K8flqGntGr8wkFsaiB65zyhRw2dyPLhJJqdraIQ2jLsn5nC-d81yUc9_uayE8CAWKYrA50vqXEXrvwSbQXkCUW2pt-DmHvWGDPoN5I6OHOdkWtATS5skR_T68FbAj1ozGEWlB1ou7xe4DG5E0hVVqe8aS4mUR0mfXSmrSl3PZ4m6JGFT8MHzLh8jU4D5_EEHpAQcesxWDmVcjQaUedTQ7aMEmCtdMmTmAvstEuLzCFG3UNGB5y2mxLlk8u44smob-q9SlZTQXL3oOgLRN9qurLx6eTCQ990-oTuWIvVs3PnQc_YTuddcDo2a8yhCCn050g';
        const response = yield (0, supertest_1.default)(app)
            .post("/auth/google")
            .send({ credential: mockGoogleToken });
        console.log("Response Body:", response.body);
        expect(response.statusCode).toBe(200);
        expect(response.body.email).toBeDefined();
        expect(response.body._id).toBeDefined();
        expect(response.body.image).toBeDefined();
        expect(response.body.accessToken).toBeDefined();
        expect(response.body.refreshToken).toBeDefined();
    }));
    test("Test Register", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app)
            .post("/auth/register")
            .send(user);
        expect(response.statusCode).toBe(201);
    }));
    test("Test Register exist email", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app)
            .post("/auth/register")
            .send(user);
        expect(response.statusCode).toBe(406);
    }));
    test("Test Register missing password", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app)
            .post("/auth/register").send({
            email: "test@test.com",
        });
        expect(response.statusCode).toBe(400);
    }));
    test("Test Login", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app)
            .post("/auth/login").send(user);
        expect(response.statusCode).toBe(200);
        accessToken = response.body.accessToken;
        refreshToken = response.body.refreshToken;
        expect(accessToken).toBeDefined();
        expect(response.body._id).toBe(user._id);
        console.log("user from login: " + response.body._id);
    }));
    test("Test Login without password", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app)
            .post("/auth/login").send({
            email: "test@test.com",
        });
        expect(response.statusCode).toBe(400);
    }));
    test("Test Login with wrong password", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app)
            .post("/auth/login").send({
            email: "test@test.com",
            password: "123456789"
        });
        expect(response.statusCode).toBe(401);
    }));
    test("Test Login without username and password", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app)
            .post("/auth/login").send({});
        expect(response.statusCode).toBe(400);
    }));
    test("Test forbidden access without token", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app).get("/user");
        expect(response.statusCode).toBe(401);
    }));
    test("Test access with valid token", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app)
            .get("/user")
            .set("Authorization", "JWT " + accessToken);
        expect(response.statusCode).toBe(200);
    }));
    test("Test access with invalid token", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app)
            .get("/user")
            .set("Authorization", "JWT 1" + accessToken);
        expect(response.statusCode).toBe(401);
    }));
    jest.setTimeout(10000);
    test("Test access after timeout of token", () => __awaiter(void 0, void 0, void 0, function* () {
        yield new Promise(resolve => setTimeout(() => resolve("done"), 5000));
        const response = yield (0, supertest_1.default)(app)
            .get("/user")
            .set("Authorization", "JWT " + accessToken);
        expect(response.statusCode).not.toBe(200);
        console.log("response.statusCode of timeout: " + response.statusCode);
    }));
    test("Test refresh token", () => __awaiter(void 0, void 0, void 0, function* () {
        console.log("Test refresh token: " + refreshToken);
        const response = yield (0, supertest_1.default)(app)
            .get("/auth/refreshToken")
            .set("Authorization", "JWT " + refreshToken)
            .send();
        console.log("response.statusCode: " + response.statusCode);
        expect(response.statusCode).toBe(200);
        expect(response.body.accessToken).toBeDefined();
        console.log("new access token from test: " + response.body.accessToken);
        expect(response.body.refreshToken).toBeDefined();
        console.log("new refresh token from test: " + response.body.refreshToken);
        const newAccessToken = response.body.accessToken;
        newRefreshToken = response.body.refreshToken;
        const response2 = yield (0, supertest_1.default)(app)
            .get("/user")
            .set("Authorization", "JWT " + newAccessToken);
        expect(response2.statusCode).toBe(200);
    }));
    test("Test double use of refresh token", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app)
            .get("/auth/refresh")
            .set("Authorization", "JWT " + refreshToken)
            .send();
        expect(response.statusCode).not.toBe(200);
        console.log("new refresh token from double: " + response.statusCode);
        //verify that the new token is not valid as well
        const response1 = yield (0, supertest_1.default)(app)
            .get("/auth/refresh")
            .set("Authorization", "JWT " + newRefreshToken)
            .send();
        expect(response1.statusCode).not.toBe(200);
        console.log("new refresh token from double 2: " + response.statusCode);
    }));
    let LogOutaccessToken;
    let LogOutrefreshToken;
    test("Test Login", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app)
            .post("/auth/login").send(user);
        expect(response.statusCode).toBe(200);
        LogOutaccessToken = response.body.accessToken;
        LogOutrefreshToken = response.body.refreshToken;
        expect(LogOutaccessToken).toBeDefined();
        expect(LogOutrefreshToken).toBeDefined();
    }));
    test("Test logout", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app)
            .get("/auth/logout")
            .set("Authorization", "JWT " + LogOutrefreshToken)
            .send();
        expect(response.statusCode).toBe(200);
    }));
    test("Test logout for the second time", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app)
            .get("/auth/logout")
            .set("Authorization", "JWT " + LogOutrefreshToken)
            .send();
        expect(response.statusCode).not.toBe(200);
    }));
});
//# sourceMappingURL=auth.test.js.map