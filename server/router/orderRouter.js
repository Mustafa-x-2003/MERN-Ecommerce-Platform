import express from "express";
import {
  createOrder,
  getOrder,
  getOrders,
} from "../controllers/orederController.js";
import auth from "../middleware/auth.js";
const orderRouter = express.Router();

orderRouter.post("/", auth, createOrder);
orderRouter.get("/", auth, getOrders);
orderRouter.get("/:id", auth, getOrder);

export default orderRouter;
