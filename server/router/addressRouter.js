import express from "express";
import {
  addNewAddress,
  deleteAddres,
  getAddresses,
} from "../controllers/addressController.js";
import auth from "../middleware/auth.js";
const routerAddress = express.Router();

routerAddress.post("/", auth, addNewAddress);
routerAddress.get("/", auth, getAddresses);
routerAddress.delete("/:id", auth, deleteAddres);
export default routerAddress;
