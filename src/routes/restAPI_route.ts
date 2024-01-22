import express from "express";
const router = express.Router();
import restAPIController from "../controllers/restAPI_controller";

router.get("/", restAPIController.getCurrencyRate.bind(restAPIController));
export default router;
