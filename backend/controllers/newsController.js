import NewsAPI from "newsapi";
import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";

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
    console.error(error);
  }
});
