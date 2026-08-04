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
export const deleteAddres = async (req, res) => {
  try {
    const userId = req.user._id;
    const address = await Address.findOne({ _id: req.params.id, user: userId });
    if (!address) {
      return res.status(404).json({
        message: "Address not found",
      });
    }
    await address.deleteOne();
    res.status(200).json({
      message: "Address deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete address",
      error: error.message,
    });
  }
};
export const editAddress = async (req, res) => {
  try {
    const updates = Object.keys(req.body);
    if (updates.length === 0) {
      return res.status(400).json({
        message: "No updates provided",
      });
    }

    const allowedUpdates = [
      "name",
      "phone",
      "country",
      "city",
      "street",
      "building",
      "apartment",
      "postalCode",
      "isDefault",
    ];
    const areUpdatesAllowed = updates.every((item) =>
      allowedUpdates.includes(item),
    );
    if (!areUpdatesAllowed) {
      return res.status(400).json({
        message: "Invalid update field",
      });
    }

    const address = await Address.findOne({
      _id: req.params.id,
      user: req.user._id,
    });
    if (!address) {
      return res.status(404).json({
        message: "Address not found",
      });
    }

    updates.forEach((item) => {
      address[item] = req.body[item];
    });

    await address.save();

    res.status(200).json({
      message: "Address updated successfully",
      address,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};
export const setDefaultAddress = async (req, res) => {
  try {
    const addressID = req.params.id;
    const userID = req.user._id;

    const address = await Address.findOne({
      _id: addressID,
      user: userID,
    });

    if (!address) {
      return res.status(404).json({
        message: "Address Not Found",
      });
    }
    const addresses = await Address.find({ user: userID });

    addresses.forEach((item) => {
      if (item._id.toString() === addressID) {
        item.isDefault = true;
      } else {
        item.isDefault = false;
      }
    });
    await Promise.all(addresses.map((address) => address.save()));

    const updatedAddress = addresses.find(
      (item) => item._id.toString() === addressID,
    );

    res.status(200).json({
      message: "",
      updatedAddress,
    });
  } catch (error) {
    res.status(500).json({
      message: "ttttttt",
      error,
    });
  }
};
