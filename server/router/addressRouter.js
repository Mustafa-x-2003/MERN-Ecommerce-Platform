import express from "express";
import addNewAddress from "../controllers/addressController.js";
import auth from "../middleware/auth.js";
const routerAddress = express.Router();
routerAddress.post("/", auth, addNewAddress);
export default routerAddress;
