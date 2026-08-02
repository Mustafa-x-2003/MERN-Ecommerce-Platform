import mongoose from "mongoose";

const addressSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    name: {
      type: String,
      trim: true,
    },

    phone: {
      type: String,
      trim: true,
    },

    country: {
      type: String,
      trim: true,
    },

    city: {
      type: String,
      trim: true,
    },

    street: {
      type: String,
      trim: true,
    },

    building: {
      type: String,
      trim: true,
    },

    apartment: {
      type: String,
      trim: true,
    },

    postalCode: {
      type: String,
      trim: true,
    },

    isDefault: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Address = mongoose.model("Address", addressSchema);

export default Address;