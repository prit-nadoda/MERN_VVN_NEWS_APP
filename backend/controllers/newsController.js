import NewsAPI from "newsapi";
import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import { SavedNews } from "../models/savedNewsModel.js";
import { User } from "../models/userModel.js";
import ErrorHandler from "../middlewares/errorMiddleware.js";

export const getTodaysNews = catchAsyncErrors(async (req, res, next) => {
  const { category, country } = req.params;

  try {
    const newsapi = new NewsAPI(process.env.NEWS_API);
    const fetchedNews = await newsapi.v2.topHeadlines({
      category: category,
      sortBy: "popularity",
      country: country,
    });

    res.status(200).json({
      status: "success",
      articles: fetchedNews.articles,
    });
  } catch (error) {
    res.status(400).json({
      status: "failed to send News",
      message: error.message,
    });
  }
});

export const saveNews = catchAsyncErrors(async (req, res, next) => {
  const {
    source,
    author,
    title,
    description,
    publishedAt,
    content,
    savedBy,
    urlToImage,
    url,
  } = req.body;

  if (!title || !savedBy) {
    return next(new ErrorHandler("Title or user ID is missing!!", 400));
  }

  const userExist = await User.findOne({
    _id: savedBy,
  });

  if (!userExist) {
    return next(new ErrorHandler("User does not exist!!", 400));
  }

  let savedNewsExist = await SavedNews.findOne({
    title: title,
    description: description,
    publishedAt: publishedAt,
    content: content,
  });

  if (!savedNewsExist) {
    savedNewsExist = await SavedNews.create({
      source: source ? source : null,
      author: author ? author : null,
      title: title,
      description: description ? description : null,
      publishedAt: publishedAt ? publishedAt : null,
      content: content ? content : null,
      urlToImage: urlToImage ? urlToImage : null,
      url: url,
      savedBy: [],
    });
  }

  if (savedNewsExist.savedBy.includes(savedBy)) {
    return next(new ErrorHandler("The News is already saved!!", 400));
  }
  savedNewsExist.savedBy.push(savedBy);
  await savedNewsExist.save();

  res.status(201).json({
    status: "success",
    message: "News Saved Successfully",
  });
});
