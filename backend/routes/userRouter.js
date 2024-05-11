import express from "express";
import {
  getMySavedNews,
  login,
  logout,
  register,
} from "../controllers/userController.js";
import { isUserAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/logout", isUserAuthenticated, logout);
router.get("/savedNews", isUserAuthenticated, getMySavedNews);

export default router;
