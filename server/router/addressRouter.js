import express from "express";
import {
  addNewAddress,
  deleteAddress,
  editAddress,
  getAddresses,
  getDefaultAddress,
  setDefaultAddress,
} from "../controllers/addressController.js";
import auth from "../middleware/auth.js";
const routerAddress = express.Router();

routerAddress.post("/", auth, addNewAddress);
routerAddress.get("/", auth, getAddresses);
routerAddress.get("/default", auth, getDefaultAddress);
routerAddress.delete("/:id", auth, deleteAddress);
routerAddress.patch("/:id", auth, editAddress);
routerAddress.post("/:id", auth, setDefaultAddress);
export default routerAddress;
