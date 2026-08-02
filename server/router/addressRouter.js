import express from "express";
import {
  addNewAddress,
  getAddresses,
} from "../controllers/addressController.js";
import auth from "../middleware/auth.js";
const routerAddress = express.Router();

routerAddress.post("/", auth, addNewAddress);
routerAddress.get("/", auth, getAddresses);
export default routerAddress;
