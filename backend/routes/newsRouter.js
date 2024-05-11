import express from "express";
import { getTodaysNews, saveNews } from "../controllers/newsController.js";

const router = express.Router();

router.get("/latest/:country/:category", getTodaysNews);
router.post("/save", saveNews);

export default router;
