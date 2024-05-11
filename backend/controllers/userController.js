import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import { User } from "../models/userModel.js";
import { generateToken } from "../utils/jwt.js";

export const register = catchAsyncErrors(async (req, res, next) => {
  const { fullname, email, password, username } = req.body;
  if (!fullname || !email || !password || !username) {
    return res
      .status(400)
      .json({ success: false, message: "Please enter all fields!" });
  }

  const isExist = await User.find({ $or: [{ username }, { email }] });
  if (isExist.length > 0) {
    return res.status(400).json({
      success: false,
      message: "Email or Username is already registered!",
    });
  }

  const user = await User.create({
    fullname,
    email,
    password,
    username,
  });
  generateToken(user, "User registered successfully!", 200, res);
});
