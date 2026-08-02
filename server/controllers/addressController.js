import Address from "../models/addressModel.js";

const addNewAddress = async (req, res) => {
  try {
    const address = new Address({ ...req.body, user: req.user._id });
    await address.save();
    res.status(200).json(address);
  } catch (error) {
    res.status(500).json({
      message: "",
      error: error.message,
    });
  }
};
export default addNewAddress;
