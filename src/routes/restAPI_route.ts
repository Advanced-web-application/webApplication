import express from "express";
const router = express.Router();
import restAPIController from "../controllers/restAPI_controller";

router.get("/", restAPIController.get.bind(restAPIController));
export default router;
