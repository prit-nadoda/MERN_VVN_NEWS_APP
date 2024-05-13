import express from "express";
import {
  getMySavedNews,
  getUserInfo,
  login,
  logout,
  register,
  removeFromeSaved,
} from "../controllers/userController.js";
import { isUserAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/logout", isUserAuthenticated, logout);
router.get("/info", isUserAuthenticated, getUserInfo);
router.get("/savedNews", isUserAuthenticated, getMySavedNews);
router.get("/savedNews/remove/:id", isUserAuthenticated, removeFromeSaved);

export default router;
