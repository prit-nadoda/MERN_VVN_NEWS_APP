import { Schema, model } from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: [true, "Given username is taken!"],
  },
  email: {
    type: String,
    required: true,
    unique: [true, "Email is already registered!"],
    validate: [validator.isEmail, "Provide a valid email!"],
  },
  fullname: {
    type: String,
    required: true,
    minlength: [4, "Fullname must consist atleast 4 characters!"],
    maxlength: [25, "Fullname must consist maximum 25 characters!"],
  },
  password: {
    type: String,
    required: true,
    minlength: [6, "Password must consist atleast 6 characters!"],
    maxlength: [20, "Password must consist maximum 25 characters!"],
  },
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.methods.generateJsonWebToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES,
  });
};

export const User = model("users", userSchema);
