import express from "express";
const router = express.Router();
import CustomerController from "../controllers/Customer_controller";
import authMiddleware from "../common/auth_middleware";

router.get("/", authMiddleware, CustomerController.get.bind(CustomerController));

router.get("/:id", authMiddleware, CustomerController.getById.bind(CustomerController));

router.post("/", authMiddleware, CustomerController.post.bind(CustomerController));

router.put("/:id", authMiddleware, CustomerController.putById.bind(CustomerController));

router.delete("/:id", authMiddleware, CustomerController.deleteById.bind(CustomerController));

export default router;
