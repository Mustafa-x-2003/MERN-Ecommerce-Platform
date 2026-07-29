import express from "express";
import { register } from "../controllers/userControllers.js";
const routerUser = express.Router();

routerUser.post("/register", register);

export default routerUser;
