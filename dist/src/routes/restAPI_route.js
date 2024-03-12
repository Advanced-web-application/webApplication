"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const restAPI_controller_1 = __importDefault(require("../controllers/restAPI_controller"));
const auth_middleware_1 = __importDefault(require("../common/auth_middleware"));
/**
* @swagger
* tags:
*   name: restAPI
*   description: The REST API
*/
/**
* @swagger
* components:
*   securitySchemes:
*     bearerAuth:
*       type: http
*       scheme: bearer
*       bearerFormat: JWT
*/
/**
* @swagger
* components:
*   schemas:
*     restAPI:
*       type: object
*       required:
*         - base_code
*         - rates
*       properties:
*         base_code:
*           type: string
*           description: The base currency code
*         rates:
*           type: object
*           additionalProperties:
*             type: number
*           description: The exchange rates
*         rate_for_amount:
*           type: number
*           description: The exchange rate for the amount
*       example:
*         base_code: "USD"
*         rates:
*          AED: 3.6725
*/
/**
* @swagger
* /restAPI:
*   get:
*     summary: Get currency rate
*     tags: [restAPI]
*     security:
*       - bearerAuth: []
*     responses:
*       200:
*         description: Currency rate data
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 base_code:
*                   type: string
*                 rates:
*                   type: object
*                 rate_for_amount:
*                   type: number
*       500:
*         description: Internal Server Error
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 message:
*                   type: string
*               example:
*                 message: "Internal Server Error"
* */
router.get("/", auth_middleware_1.default, restAPI_controller_1.default.getCurrencyRate.bind(restAPI_controller_1.default));
exports.default = router;
//# sourceMappingURL=restAPI_route.js.map