import express from "express";
const router = express.Router();
import authController from "../controllers/auth_controller";

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
*
*   schemas:
*     User:
*       type: object
*       required:
*         - fullName
*         - age
*         - _id
*         - email
*         - password
*       properties:
*         fullName:
*           type: string
*           description: The user's full name
*         age:
*           type: number
*           description: The user's age
*         _id:
*           type: string
*           description: The user's id
*         email:
*           type: string
*           description: The user's email
*         password:
*           type: string
*           description: The user's password
*/

/**
* @swagger
* /auth/register:
*   post:
*     summary: registers a new user
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
*       406:
*         description: Not Acceptable
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 message: 
*                   type: string
*       201:
*         description: Created
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 message: 
*                   type: string
*/
router.post("/register", authController.register);

/**
* @swagger
* /auth/login:
*   post:
*     summary: logs in a user
*     tags: [Auth]
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             $ref: '#/components/schemas/User'
*     responses:
*       200:
*         description: The access & refresh tokens
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/Tokens'
*       400:
*         description: Bad Request
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 message: "Invalid email or password"
*                   type: string
*       401:
*         description: Unauthorized
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 message: "Invalid email or password"
*                   type: string
*/
router.post("/login", authController.login);

/**
* @swagger
* /auth/logout:
*   get:
*     summary: logout a user
*     tags: [Auth]
*     description: need to provide the refresh token in the auth header
*     security:
*       - bearerAuth: []
*     responses:
*       200:
*         description: logout completed successfully
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 message: "Logout completed successfully"
*                   type: string
*       401:
*         description: Unauthorized
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 message: "Invalid refresh token"
*                   type: string
*/
router.get("/logout", authController.logout);

/**
* @swagger
* /auth/refreshToken:
*   get:
*     summary: get a new access token using the refresh token
*     tags: [Auth]
*     description: need to provide the refresh token in the auth header
*     security:
*       - bearerAuth: []
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
*                 message: "Invalid refresh token"
*                   type: string
*/
router.get("/refreshToken", authController.refresh);

export default router;
