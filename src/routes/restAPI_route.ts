import express from "express";
const router = express.Router();
import restAPIController from "../controllers/restAPI_controller";
import authMiddleware from "../common/auth_middleware";
 //implement SWAGGER/TODO
router.get("/",authMiddleware, restAPIController.getCurrencyRate.bind(restAPIController));
export default router;
