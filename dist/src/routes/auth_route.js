"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const auth_controller_1 = __importDefault(require("../controllers/auth_controller"));
/**
* @swagger
* tags:
*   name: Auth
*   description: The Authentication API
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
* /auth/register:
*   post:
*     summary: Register a new user
*     tags: [Auth]
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             $ref: '#/components/schemas/User'
*     responses:
*       200:
*         description: The new user
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/User'
*       400:
*         description: Bad Request
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 message:
*                   type: string
*               example:
*                 message: "Invalid input data"
*       401:
*         description: Unauthorized
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 message:
*                   type: string
*               example:
*                 message: "Unauthorized access"
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
*                 message: "Request not acceptable"
*/
router.post("/register", auth_controller_1.default.register);
/**
* @swagger
* components:
*   schemas:
*     Credential:
*       type: object
*       required:
*         - credential
*       properties:
*         credential:
*           type: string
*           description: The Google token
*       example:
*        'eyJhbGciOiJSUzI1NiIsImtpZCI6IjA4YmY1YzM3NzJkZDRlN2E3MjdhMTAxYmY1MjBmNjU3NWNhYzMyNmYiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJhenAiOiI4OTU2MzQyNjcwMTEtY3YybzkxMHJuY2E5OTQyM3VkM2VuMGpzMHJhaWRmbGguYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJhdWQiOiI4OTU2MzQyNjcwMTEtY3YybzkxMHJuY2E5OTQyM3VkM2VuMGpzMHJhaWRmbGguYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJzdWIiOiIxMTgwNjA3Njg0ODYyMDg5MjMzMjgiLCJlbWFpbCI6Im1pY2hhbHN0dWRpZXMwQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJuYmYiOjE3MTA0MTA3MzksIm5hbWUiOiJtaWNoYWwgc3R1ZGllcyIsInBpY3R1cmUiOiJodHRwczovL2xoMy5nb29nbGV1c2VyY29udGVudC5jb20vYS9BQ2c4b2NKbUVpWVRLbDhVbTdxNXl1ZHQ1QUVwSmpjTEx3U3pub29OSVVSeWRQZlM9czk2LWMiLCJnaXZlbl9uYW1lIjoibWljaGFsIiwiZmFtaWx5X25hbWUiOiJzdHVkaWVzIiwibG9jYWxlIjoiZW4iLCJpYXQiOjE3MTA0MTEwMzksImV4cCI6MTcxMDQxNDYzOSwianRpIjoiOTY3MTFhNmYwYjJkZjE3M2E3N2NhM2M2ZjA5Y2I4MzcyM2JlMWY1NSJ9.WwgP0UOuTbWv_Xz6CbElD5oyM1J_8WKJXyJXh4VTtBksV_itiqK8JbVsJKgoqDPlU3DSDR5WSr4Xpjb_iPKIpeTqh1OXXpL1xFNc-Ht3TOyLRc3MO5oAe_qimObrB-naE1zNzZfoydcDV1XHZiJ39TmGQmbOwtTvRbn35k9gMLfPzm6XPFy6LL3yY1LXKXVOpKsiPbpWWJmZOizwUDkSHqPcwDXrEEMUrvG7T3dKL6mK5z0Xz7sEvdjsFv_VngCUDzsl4Wos09amIdfc9UC8D8ulPH5WjHstBl_TFh8B-9e7XNJImmaE3oDaL5sWmw64f1YOJnS50vQYDfvMPkJjPw'
*/
/**
* @swagger
 * /auth/google:
 *   post:
 *     summary: Sign in with Google
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               credential:
 *                 $ref: '#/components/schemas/Credential'
 *     responses:
 *       200:
 *         description: Successful sign in
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                 user:
 *                   type: object
 *       400:
 *         description: Bad Request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *               example:
 *                 message: "Bad Request"
 */
router.post("/google", auth_controller_1.default.googleSignin);
/**
* @swagger
* components:
*   schemas:
*     Tokens:
*       type: object
*       required:
*         - accessToken
*         - refreshToken
*       properties:
*         accessToken:
*           type: string
*           description: The access token for the user session.
*         refreshToken:
*           type: string
*           description: The refresh token for the user session.
*       example:
*         accessToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
*         refreshToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM9MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
*/
/**
* @swagger
* /auth/login:
*   post:
*     summary: Login a user
*     tags: [Auth]
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             $ref: '#/components/schemas/User'
*     responses:
*       200:
*         description: Successfully logged in
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/User'
*       400:
*         description: Bad Request
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 message:
*                   type: string
*               example:
*                 message: "Invalid input data"
*       401:
*         description: Unauthorized
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 message:
*                   type: string
*               example:
*                 message: "Unauthorized access"
*/
router.post("/login", auth_controller_1.default.login);
/**
* @swagger
* /auth/logout:
*   get:
*     summary: Logout a user
*     tags: [Auth]
*     parameters:
*       - in: header
*         name: security
*         schema:
*           type: string
*         required: true
*         description: Bearer token for authorization which is the refresh token
*     responses:
*       200:
*         description: Successfully logged out
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 message:
*                   type: string
*               example:
*                 message: "Successfully logged out"
*       401:
*         description: Unauthorized
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 message:
*                   type: string
*               example:
*                 message: "Unauthorized access"
*/
router.get("/logout", auth_controller_1.default.logout);
/**
* @swagger
* /auth/refreshToken:
*   get:
*     summary: Get a new access token using the refresh token
*     tags: [Auth]
*     description: Need to provide the refresh token in the auth header
*     parameters:
*       - in: header
*         name: Authorization
*         schema:
*           type: string
*         required: true
*         description: Bearer token for authorization which is the refresh token
*     responses:
*       200:
*         description: The access & refresh tokens
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/Tokens'
*       401:
*         description: Unauthorized
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 message:
*                   type: string
*               example:
*                 message: "Unauthorized access"
*/
router.get("/refreshToken", auth_controller_1.default.refresh);
exports.default = router;
//# sourceMappingURL=auth_route.js.map