import express from "express";
import {
  register,
  login,
  getProfile,
  updateUser,
  changePassword,
  logout,
  logoutAll,
  deleteUser,
} from "../controllers/userControllers.js";
import auth from "../middleware/auth.js";
const routerUser = express.Router();

routerUser.post("/register", register);
routerUser.post("/login", login);
routerUser.get("/profile", auth, getProfile);
routerUser.patch("/update", auth, updateUser);
routerUser.patch("/password", auth, changePassword);
routerUser.post("/logout", auth, logout);
routerUser.post("/logoutAll", auth, logoutAll);
routerUser.delete("/delete", auth, deleteUser);

export default routerUser;
