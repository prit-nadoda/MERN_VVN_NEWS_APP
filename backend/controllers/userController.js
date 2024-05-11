import ErrorHandler from "../middlewares/errorMiddleware.js";
import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import { User } from "../models/userModel.js";
import { generateToken } from "../utils/jwt.js";

export const register = catchAsyncErrors(async (req, res, next) => {
  const { fullname, email, password, username } = req.body;
  if (!fullname || !email || !password || !username) {
    return next(new ErrorHandler("Please enter all fields!!", 400));
  }

  const isExist = await User.find({ $or: [{ username }, { email }] });
  if (isExist.length > 0) {
    return next(
      new ErrorHandler("Email or Username is already registered!", 400)
    );
  }

  const user = await User.create({
    fullname,
    email,
    password,
    username,
  });
  generateToken(user, "User registered successfully!", 200, res);
});
