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
const Customer_model_1 = __importDefault(require("../models/Customer_model"));
const user_model_1 = __importDefault(require("../models/user_model"));
let app;
let accessToken;
const user = {
    email: "testCustomer@test.com",
    password: "1234567890",
};
beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
    app = yield (0, app_1.default)();
    console.log("beforeAll");
    yield Customer_model_1.default.deleteMany();
    user_model_1.default.deleteMany({ 'email': user.email });
    yield (0, supertest_1.default)(app).post("/auth/register").send(user);
    const response = yield (0, supertest_1.default)(app).post("/auth/login").send(user);
    accessToken = response.body.accessToken;
}));
afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
    yield mongoose_1.default.connection.close();
}));
const customer = {
    fullName: "John Doe",
    age: 22,
    gender: "male",
    _id: "1234567890",
};
describe("Customer tests", () => {
    const addCustomer = (customer) => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app).post("/customer")
            .set("Authorization", "JWT " + accessToken)
            .send(customer);
        expect(response.statusCode).toBe(201);
    });
    test("Test Get All Customers - empty response", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app).get("/customer").set("Authorization", "JWT " + accessToken);
        expect(response.statusCode).toBe(200);
        expect(response.body).toStrictEqual([]);
    }));
    test("Test Post Customer", () => __awaiter(void 0, void 0, void 0, function* () {
        addCustomer(customer);
    }));
    test("Test Get All Customers with one customer in DB", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app).get("/customer").set("Authorization", "JWT " + accessToken);
        expect(response.statusCode).toBe(200);
        expect(response.body.length).toBe(1);
        const cust = response.body[0];
        expect(cust.fullName).toBe(customer.fullName);
        expect(cust.age).toBe(customer.age);
        expect(cust.gender).toBe(customer.gender);
        expect(cust._id).toBe(customer._id);
    }));
    test("Test Post duplicate Customer", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app).post("/customer").set("Authorization", "JWT " + accessToken).send(customer);
        expect(response.statusCode).toBe(406);
    }));
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
//# sourceMappingURL=Customer.test.js.map