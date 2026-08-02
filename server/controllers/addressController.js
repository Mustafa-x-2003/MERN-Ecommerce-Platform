import Address from "../models/addressModel.js";

const addNewAddress = async (req, res) => {
  try {
    const address = new Address({ ...req.body, user: req.user._id });
    await address.save();
    res.status(201).json({
      message: "Address created successfully",
      address,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to create address",
      error: error.message,
    });
  }
};
export default addNewAddress;
