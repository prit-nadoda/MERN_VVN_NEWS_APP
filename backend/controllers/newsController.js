import NewsAPI from "newsapi";
import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import { SavedNews } from "../models/savedNewsModel.js";
import { User } from "../models/userModel.js";
import ErrorHandler from "../middlewares/errorMiddleware.js";

export const getTodaysNews = catchAsyncErrors(async (req, res, next) => {
  const { category, country } = req.params;
  console.log(category);
  console.log(country);
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

  if (
    !source ||
    !author ||
    !url ||
    !urlToImage ||
    !title ||
    !description ||
    !publishedAt ||
    !content ||
    !savedBy
  ) {
    return next(new ErrorHandler("The News is already saved!!", 400));
  }

  const userExist = await User.findOne({
    _id: savedBy,
  });

  if (!userExist) {
    return next(new ErrorHandler("The News is already saved!!", 400));
  }

  let savedNewsExist = await SavedNews.findOne({
    source: source,
    author: author,
    title: title,
    description: description,
    publishedAt: publishedAt,
    content: content,
    urlToImage: urlToImage,
    url: url,
  });

  if (!savedNewsExist) {
    savedNewsExist = await SavedNews.create({
      source: source,
      author: author,
      title: title,
      description: description,
      publishedAt: publishedAt,
      content: content,
      urlToImage: urlToImage,
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
