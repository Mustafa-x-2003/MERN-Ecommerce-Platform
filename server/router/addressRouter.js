import express from "express";
import {
  addNewAddress,
  deleteAddress,
  editAddress,
  getAddresses,
  getDefaultAddress,
  setDefaultAddress,
} from "../controllers/addressController.js";
import validator from "../middleware/valitatorMiddleware.js";
import { addAddressSchema ,addressIdSchema } from "../validations/address.validation.js";
import auth from "../middleware/auth.js";
const routerAddress = express.Router();

routerAddress.post(
  "/",
  auth,
  validator(addAddressSchema, "body"),
  addNewAddress,
);
routerAddress.get("/", auth, getAddresses);
routerAddress.get("/default", auth, getDefaultAddress);
routerAddress.delete("/:id", auth,validator(addressIdSchema,'params'), deleteAddress);
routerAddress.patch("/:id", auth, validator(addressIdSchema,'params'),editAddress);
routerAddress.post("/:id", auth,validator(addressIdSchema,'params'), setDefaultAddress);
export default routerAddress;
