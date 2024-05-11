import express from "express";
import { getTodaysNews } from "../controllers/newsController.js";

const router = express.Router();

router.get("/latest/:country/:category", getTodaysNews);

export default router;
