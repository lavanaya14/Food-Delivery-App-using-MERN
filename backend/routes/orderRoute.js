import express from "express";
import { placeOrder, getAllOrders, getOrderById, updateOrderStatus } from "../controllers/orderController.js";

const router = express.Router();

router.post("/place", placeOrder);
router.get("/", getAllOrders);
router.get("/:id", getOrderById);
router.put("/:id/status", updateOrderStatus);

export default router;
