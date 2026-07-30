import express from "express";
import {
  register,
  login,
  updateUser,
  getProfile,
} from "../controllers/userControllers.js";
import auth from "../middleware/auth.js";
const routerUser = express.Router();

routerUser.post("/register", register);
routerUser.post("/login", login);
routerUser.patch("/update",auth, updateUser);
routerUser.get("/profile", auth, getProfile);

export default routerUser;
