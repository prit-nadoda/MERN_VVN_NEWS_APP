import { Schema, model } from "mongoose";

const newsSchema = Schema({
  source: {
    type: String,
    default: null,
  },
  author: {
    type: String,
    default: null,
  },
  title: {
    type: String,
    required: true,
    uniqe: true,
  },
  description: {
    type: String,
    default: null,
  },
  publishedAt: {
    type: String,
    default: null,
  },
  content: {
    type: String,
    default: null,
  },
  url: {
    type: String,
    required: true,
    default: null,
  },
  urlToImage: {
    type: String,
    default: null,
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
