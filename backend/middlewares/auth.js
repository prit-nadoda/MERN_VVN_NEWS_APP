import { User } from "../models/userModel.js";
import { catchAsyncErrors } from "./catchAsyncErrors.js";
import jwt from "jsonwebtoken";
import ErrorHandler from "./errorMiddleware.js";

export const isUserAuthenticated = catchAsyncErrors(async (req, res, next) => {
  const token = req.cookies.userToken;

  if (!token) {
    return next(new ErrorHandler("User is not Authenticated", 400));
  }
  const decode = jwt.verify(token, process.env.JWT_SECRET);
  req.user = await User.findById(decode.id);

  if (!req.user) {
    return next(new ErrorHandler("User did not sent", 400));
  }
  next();
});
