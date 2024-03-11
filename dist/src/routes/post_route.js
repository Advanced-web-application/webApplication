"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const post_controller_1 = __importDefault(require("../controllers/post_controller"));
const auth_middleware_1 = __importDefault(require("../common/auth_middleware"));
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
*     Post:
*       type: object
*       required:
*         - name
*         - description
*         - price
*         - owner
*       properties:
*         name:
*           type: string
*           description: The post's name.
*         description:
*           type: string
*           description: The post's description.
*         price:
*           type: number
*           description: The post's price.
*         owner:
*           type: string
*           description: The owner of the post.
*         image:
*           type: string
*           description: The image URL of the post.
*       example:
*         name: "Post Name"
*         description: "This is a description of the post."
*         price: 100
*         owner: "60d725b057d6d8c8c8febe8a"
*         image: "http://example.com/image.jpg"
*/
/**
* @swagger
* /post:
*   get:
*     summary: Get all posts
*     tags: [Post]
*     security:
*       - bearerAuth: []
*     responses:
*       200:
*         description: List of all posts
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/Post'
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
router.get("/", post_controller_1.default.get.bind(post_controller_1.default));
/**
* @swagger
* /post/{id}:
*   get:
*     summary: Get a post by ID
*     tags: [Post]
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
*         description: Post object
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/Post'
*       500:
*         description: Server error
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 message:
*                   type: string
*               example:
*                 message: "Server error"
*/
router.get("/:id", post_controller_1.default.getById.bind(post_controller_1.default));
/**
* @swagger
* /post:
*   post:
*     summary: Create a new post
*     tags: [Post]
*     security:
*       - bearerAuth: []
*     responses:
*       201:
*         description: Post created
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/Post'
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
*       500:
*         description: Server error
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 message:
*                   type: string
*               example:
*                 message: "Server error"
*/
router.post("/", auth_middleware_1.default, post_controller_1.default.post.bind(post_controller_1.default));
/**
* @swagger
* /post/{id}:
*   put:
*     summary: Update a post by ID
*     tags: [Post]
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
*         description: Post updated
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/Post'
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
router.put("/:id", auth_middleware_1.default, post_controller_1.default.putById.bind(post_controller_1.default)); // need to add authMiddleware
/**
* @swagger
* /post/{id}:
*   delete:
*     summary: Delete a post by ID
*     tags: [Post]
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
*         description: Post deleted
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 message:
*                   type: string
*               example:
*                 message: "Post deleted"
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
router.delete("/:id", auth_middleware_1.default, post_controller_1.default.deleteById.bind(post_controller_1.default));
router.put("/comment/:id", auth_middleware_1.default, post_controller_1.default.addComment.bind(post_controller_1.default)); // need to add authMiddleware
exports.default = router;
//# sourceMappingURL=post_route.js.map