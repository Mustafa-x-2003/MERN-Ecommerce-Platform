import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

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
// Hash user password before saving to database
userSchema.pre("save", async function () {
  const user = this;
  if (!user.isModified("password")) {
    return;
  }
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(user.password, salt);
  user.password = hashedPassword;
});
// Authenticate user credentials during login
userSchema.statics.findByCredentials = async function (email, password) {
  const user = await this.findOne({ email });
  if (!user) {
    throw new Error("Unable to login. Please check your email and password");
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error("Unable to login. Please check your email and password");
  }
  return user;
};
// Generate and store JWT authentication token

userSchema.methods.generateToken = async function () {
  const user = this;

  const token = await jwt.sign({ _id: user._id }, process.env.JWT_SECRET);

  user.tokens = user.tokens.concat({ token });

  await user.save();

  return token;
};
// Remove sensitive user data before sending response
userSchema.methods.toJSON = function () {
  const user = this.toObject();
  delete user.password;
  delete user.tokens;
  return user;
};
const User = mongoose.model("User", userSchema);
export default User;
