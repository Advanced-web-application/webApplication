"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Customer_model_1 = __importDefault(require("../models/Customer_model"));
const base_controller_1 = __importDefault(require("./base_controller"));
const CustomerController = (0, base_controller_1.default)(Customer_model_1.default);
exports.default = CustomerController;
//# sourceMappingURL=Customer_controller.js.map