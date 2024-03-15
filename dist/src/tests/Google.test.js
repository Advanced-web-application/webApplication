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
const google_auth_library_1 = require("google-auth-library");
let app;
beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
    app = yield (0, app_1.default)();
    console.log("beforeAll");
}));
afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
    yield mongoose_1.default.connection.close();
}));
jest.mock('../models/user_model'); // Mock the User model
jest.mock('google-auth-library'); // Mock the google-auth-library module
describe("Google test", () => {
    it("Google Signin Test", () => __awaiter(void 0, void 0, void 0, function* () {
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
        google_auth_library_1.OAuth2Client.prototype.verifyIdToken.mockResolvedValue({
            getPayload: () => mockGoogleUser,
        });
        // Mock findOne to simulate user not found
        user_model_1.default.findOne = jest.fn().mockResolvedValue(null);
        // Mock create to simulate user creation
        user_model_1.default.create = jest.fn().mockResolvedValue(Object.assign(Object.assign({}, mockGoogleUser), { save: jest.fn() }));
        // Send a request to the Google login endpoint
        const response = yield (0, supertest_1.default)(app)
            .post("/auth/google")
            .send({ credential: "mockedGoogleCredential" });
        // Assert response status code and body
        expect(response.status).toBe(200);
        // Assert database interactions
        expect(user_model_1.default.findOne).toHaveBeenCalledWith({ email: mockGoogleUser.email });
        expect(user_model_1.default.create).toHaveBeenCalledWith({
            fullName: mockGoogleUser.name,
            _id: mockGoogleUser.sub,
            age: 0,
            gender: "male",
            email: mockGoogleUser.email,
            password: '0',
            image: mockGoogleUser.picture
        });
    }));
});
//# sourceMappingURL=Google.test.js.map