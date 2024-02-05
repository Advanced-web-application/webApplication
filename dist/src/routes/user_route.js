"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const user_controller_1 = __importDefault(require("../controllers/user_controller"));
const auth_middleware_1 = __importDefault(require("../common/auth_middleware"));
/**
* @swagger
* tags:
*   name: User
*   description: The User API
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
*     User:
*       type: object
*       required:
*         - fullName
*         - age
*         - gender
*         - email
*         - password
*       properties:
*         fullName:
*           type: string
*           description: The user's full name.
*         age:
*           type: integer
*           description: The user's age.
*         gender:
*           type: string
*           description: The user's gender.
*         _id:
*           type: string
*           description: The user's unique ID.
*         image:
*           type: string
*           description: The user's image URL.
*         email:
*           type: string
*           description: The user's email address.
*         password:
*           type: string
*           description: The user's password.
*         refreshTokens:
*           type: array
*           items:
*             type: string
*           description: The user's refresh tokens.
*       example:
*         fullName: "John Doe"
*         age: 30
*         gender: "Male"
*         _id: "60d725b057d6d8c8c8febe8a"
*         image: "http://example.com/image.jpg"
*         email: "johndoe@example.com"
*         password: "mySecurePassword"
*         refreshTokens: ["token1", "token2"]
*/
/**
* @swagger
* /user/{id}:
*   get:
*     summary: Get a user by ID
*     tags: [User]
*     parameters:
*       - in: path
*         name: id
*         required: true
*         schema:
*           type: string
*     security:
*       - bearerAuth: []
*     responses:
*       200:
*         description: User object
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/User'
*       401:
*         description: Unauthorized
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
*/
router.get("/:id", auth_middleware_1.default, user_controller_1.default.getById.bind(user_controller_1.default));
/**
* @swagger
* /user:
*   post:
*     summary: Create a new user
*     tags: [User]
*     security:
*       - bearerAuth: []
*     responses:
*       200:
*         description: Successful operation
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/User'
*       401:
*         description: Unauthorized
*       406:
*         description: Not Acceptable
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 message:
*                   type: string
*               example:
*                 message: "Not Acceptable"
*/
router.post("/", auth_middleware_1.default, user_controller_1.default.post.bind(user_controller_1.default));
/**
* @swagger
* /user/{id}:
*   put:
*     summary: Update a user by ID
*     tags: [User]
*     parameters:
*       - in: path
*         name: id
*         required: true
*         schema:
*           type: string
*     security:
*       - bearerAuth: []
*     responses:
*       200:
*         description: User updated
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/User'
*       401:
*         description: Unauthorized
*       406:
*         description: Not Acceptable
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 message:
*                   type: string
*               example:
*                 message: "Not Acceptable"
*/
router.put("/:id", auth_middleware_1.default, user_controller_1.default.putById.bind(user_controller_1.default));
/**
* @swagger
* /user/{id}:
*   delete:
*     summary: Delete a user by ID
*     tags: [User]
*     parameters:
*       - in: path
*         name: id
*         required: true
*         schema:
*           type: string
*     security:
*       - bearerAuth: []
*     responses:
*       200:
*         description: User deleted
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 message:
*                   type: string
*               example:
*                 message: "User deleted"
*       401:
*         description: Unauthorized
*       406:
*         description: Not Acceptable
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 message:
*                   type: string
*               example:
*                 message: "Not Acceptable"
*/
router.delete("/:id", auth_middleware_1.default, user_controller_1.default.deleteById.bind(user_controller_1.default));
router.get("/", auth_middleware_1.default, user_controller_1.default.get.bind(user_controller_1.default)); // need to add authMiddleware and swaggwer
exports.default = router;
//# sourceMappingURL=user_route.js.map