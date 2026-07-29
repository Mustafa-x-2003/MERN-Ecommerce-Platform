import express from "express";
import { register, login } from "../controllers/userControllers.js";
const routerUser = express.Router();

routerUser.post("/register", register);
routerUser.post("/login", login);

export default routerUser;
