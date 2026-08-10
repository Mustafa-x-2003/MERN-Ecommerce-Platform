import express from "express";
import {createOrder, getOrders} from "../controllers/orederController.js";
import auth from "../middleware/auth.js";
const orderRouter = express.Router();

orderRouter.post("/", auth, createOrder);
orderRouter.get("/", auth, getOrders);

export default orderRouter;
