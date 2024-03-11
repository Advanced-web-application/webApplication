"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const restAPI_controller_1 = __importDefault(require("../controllers/restAPI_controller"));
const auth_middleware_1 = __importDefault(require("../common/auth_middleware"));
router.get("/", auth_middleware_1.default, restAPI_controller_1.default.getCurrencyRate.bind(restAPI_controller_1.default));
exports.default = router;
//# sourceMappingURL=restAPI_route.js.map