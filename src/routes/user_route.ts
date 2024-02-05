import express from "express";
const router = express.Router();
import UserController from "../controllers/user_controller";
import authMiddleware from "../common/auth_middleware";



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
router.get("/:id", authMiddleware, UserController.getById.bind(UserController));

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
router.post("/", authMiddleware, UserController.post.bind(UserController));


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
router.put("/:id", authMiddleware, UserController.putById.bind(UserController));

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
router.delete("/:id", authMiddleware, UserController.deleteById.bind(UserController));

router.get("/",authMiddleware, UserController.get.bind(UserController));  // need to add authMiddleware and swaggwer

export default router;
