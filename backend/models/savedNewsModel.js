import { Schema, model } from "mongoose";

const newsSchema = Schema({
  source: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
    uniqe: true,
  },
  description: {
    type: String,
    required: true,
    uniqe: true,
  },
  publishedAt: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  urlToImage: {
    type: String,
    required: true,
  },
  savedBy: [
    {
      type: Schema.Types.ObjectId,
      ref: "users",
      uniqe: true,
    },
  ],
});

export const SavedNews = model("news", newsSchema);
