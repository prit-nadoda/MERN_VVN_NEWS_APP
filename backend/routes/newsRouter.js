import express from "express";
import { getTodaysNews, saveNews } from "../controllers/newsController.js";
import { isUserAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.get("/latest/:country/:category", getTodaysNews);
router.post("/save", isUserAuthenticated, saveNews);

export default router;
