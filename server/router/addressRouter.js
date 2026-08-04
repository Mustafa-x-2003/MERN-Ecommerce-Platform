import express from "express";
import {
  addNewAddress,
  deleteAddres,
  editAddress,
  getAddresses,
  setDefaultAddress,
} from "../controllers/addressController.js";
import auth from "../middleware/auth.js";
const routerAddress = express.Router();

routerAddress.post("/", auth, addNewAddress);
routerAddress.get("/", auth, getAddresses);
routerAddress.delete("/:id", auth, deleteAddres);
routerAddress.patch("/:id", auth, editAddress);
routerAddress.post("/:id", auth, setDefaultAddress);
export default routerAddress;
