import express from "express";
const router = express.Router();
import restAPIController from "../controllers/restAPI_controller";
<<<<<<< HEAD
import authMiddleware from "../common/auth_middleware";
 //implement SWAGGER/TODO
router.get("/",authMiddleware, restAPIController.getCurrencyRate.bind(restAPIController));
=======

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

router.get("/", restAPIController.getCurrencyRate.bind(restAPIController));
>>>>>>> ef4de4b439bd48d9cca0bf9a328caa721636c71a
export default router;
