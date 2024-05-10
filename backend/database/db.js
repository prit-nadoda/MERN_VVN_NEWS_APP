import mongoose from "mongoose";

export const connectDb = () => {
  mongoose
    .connect(process.env.MONGO_URI, {
      dbName: "VVN_NEWS_APP",
    })
    .then(() => console.log("DB connected"))
    .catch((err) => {
      console.log(`Database Connection error : ${err}`);
    });
};
