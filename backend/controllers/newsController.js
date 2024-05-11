import NewsAPI from "newsapi";
import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import { SavedNews } from "../models/savedNewsModel.js";

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
    return res.status(400).json({
      status: "Article info. Missing",
      message: "Please provide all the required article informnation",
    });
  }

  const savedNewsExist = await SavedNews.find({
    source: source,
    author: author,
    title: title,
    description: description,
    publishedAt: publishedAt,
    content: content,
    urlToImage: urlToImage,
    url: url,
  });

  let savedNews;
  if (!savedNewsExist.length > 0) {
    savedNews = await SavedNews.create({
      source: source,
      author: author,
      title: title,
      description: description,
      publishedAt: publishedAt,
      content: content,
      urlToImage: urlToImage,
      url: url,
    });
  } else {
    saveNews.savedBy.push(savedBy);
    await saveNews.save();
  }
  res.status(201).json({
    status: "success",
    message: "News Saved Successfully",
  });
});
