import express from "express";
import { config } from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import fileUpload from "express-fileupload";
import { connectDb } from "./database/db.js";
import { static as expressStatic } from "express";
import { errorMiddleware } from "./middlewares/errorMiddleware.js";
import newsRouter from "./routes/newsRouter.js";
import userRouter from "./routes/userRouter.js";

const app = express();

config({ path: "./config/config.env" });

app.use(
  cors({
    origin: [process.env.FRONTEND_URL, process.env.ADMIN_URL],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(expressStatic("public"));

app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

app.use("/api/v1/news", newsRouter);
app.use("/api/v1/user", userRouter);

connectDb();
app.use(errorMiddleware);
export default app;
