import mongoose from "mongoose";
import validator from "validator";

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
    },
    email: {
      type: String,
      trim: true,
      unique: true,
      lowercase: true,
      required: true,
      validate(email) {
        if (!validator.isEmail(email)) {
          throw new Error("Email is not valid");
        }
      },
    },
    password: {
      type: String,
      minlength: 8,
      required: true,
      trim: true,
      validate(password) {
        if (!validator.isStrongPassword(password)) {
          throw new Error(
            "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
          );
        }
      },
    },

    phone: {
      type: String,
      trim: true,
    },
    tokens: [
      {
        token: {
          type: String,
          required: true,
        },
      },
    ],
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
  },
  { minimize: false },
);

const User = mongoose.model("User", userSchema);
export default User;
