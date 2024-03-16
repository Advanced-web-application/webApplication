import express from "express";
const router = express.Router();
import PostController from "../controllers/post_controller";
import authMiddleware from "../common/auth_middleware";
import Post from "../models/post_model";

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
router.get("/", PostController.get.bind(PostController));


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
router.get("/:id", PostController.getById.bind(PostController));

/**
* @swagger
* /post:
*   post:
*     summary: Create a new post
*     tags: [Post]
*     security:
*       - bearerAuth: []
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             $ref: '#/components/schemas/Post'
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
router.post("/", authMiddleware, PostController.post.bind(PostController));

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
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             $ref: '#/components/schemas/Post'
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
router.put("/:id", authMiddleware, PostController.putById.bind(PostController)); // need to add authMiddleware

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
router.delete("/:id", authMiddleware, PostController.deleteById.bind(PostController));

/**
* @swagger
* components:
*   schemas:
*     Comment:
*       type: object
*       required:
*         - comments
*       properties:
*         comment:
*           type: string
*           description: The comment.
*       example:
*         comment: "This is a comment"
*/ 


/**
 * @swagger
 * /post/comment/{id}:
 *   put:
 *     summary: Add a comment to a post
 *     tags: [Post]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Comment'
 *     responses:
 *       200:
 *         description: The updated post
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message: 
 *                   type: string
 *               example:
 *                 message: "comment added successfully"
 *       404:
 *         description: Post not found
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

router.put("/comment/:id", authMiddleware, PostController.addComment.bind(PostController));



router.get('/post/:id' , async (req, res) => {
    try{
        const post = await Post.findById(req.params.id);
       if(!post){
           res.status(404).send("Post not found");
           return;
       }
       res.send(post);
    } catch (err) {
        res.status(500).send(err);
    }
});


export default router;


