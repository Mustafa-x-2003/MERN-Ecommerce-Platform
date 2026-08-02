import Address from "../models/addressModel.js";

export const addNewAddress = async (req, res) => {
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

export const getAddresses = async (req, res) => {
  try {
    const { _id } = req.user;
    const addresses = await Address.find({ user: _id });
    if (!addresses.length) {
      return res.status(404).json({
        message: "No addresses found",
      });
    }

    return res.status(200).json({
      message: "Addresses retrieved successfully",
      addresses,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to retrieve addresses",
      error: error.message,
    });
  }
};
