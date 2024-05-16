import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCountries } from "use-react-countries";
import { IoBookmarksSharp } from "react-icons/io5";
import { Context } from "../main";
import { toast } from "react-toastify";

const News = () => {
  const { countries } = useCountries();
  const [country, setCountry] = useState("India");
  const [category, setCategory] = useState("general");
  const [flag, setFlag] = useState("https://flagcdn.com/in.svg");
  const [news, setNews] = useState([]);
  const [toSave, setToSave] = useState({
    source: "",
    author: "",
    title: "",
    description: "",
    publishedAt: "",
    content: "",
    savedBy: "",
    urlToImage: "",
    url: "",
  });
  const { isAuthenticated, user } = useContext(Context);

  const navigateTo = useNavigate();
  const categories = [
    "business",
    "entertainment",
    "general",
    "health",
    "science",
    "sports",
    "technology",
  ];

  const saveHandle = async (e, article) => {
    e.preventDefault();

    if (!isAuthenticated) {
      toast.error("User is not authenticated!");
      navigateTo("/login", () => {
        toast.error("User is not authenticated!");
      });

      return;
    }

    const saveArticle = async () => {
      const source = article.source?.name || "";
      const {
        author,
        title,
        description,
        publishedAt,
        content,
        urlToImage,
        url,
      } = article;

      const articleToSave = {
        source,
        author,
        title,
        description,
        publishedAt,
        content,
        savedBy: user ? user._id : "",
        urlToImage,
        url,
      };

      try {
        const response = await axios.post(
          "http://localhost:4000/api/v1/news/save",
          articleToSave,
          {
            withCredentials: true,
            headers: { "Content-Type": "application/json" },
          }
        );
        toast.success(response.data.message);
      } catch (error) {
        console.log(error);
        toast.error(error.response.data.message);
      }
    };

    saveArticle();
  };

  useEffect(() => {
    if (countries.length === 0) return;

    const conInfo = countries.find(
      (countryName) => countryName.name === country
    );

    if (conInfo) {
      const countryCode = conInfo.alpha2Code
        ? conInfo.alpha2Code.toLowerCase()
        : "in";

      const fetchNews = async () => {
        try {
          const response = await axios.get(
            `http://localhost:4000/api/v1/news/latest/${countryCode}/${category}`
          );
          setNews(response.data.articles);
        } catch (error) {
          console.log(error);
        }
      };
      fetchNews();
    }
  }, [country, category, countries]);

  return (
    <div className="mx-auto overflow-hidden max-w-screen-xl space-y-8 px-4 py-16 sm:px-6 lg:space-y-16 lg:px-8">
      <div className="w-full shadow-xl p-5 gap-8 rounded-md flex flex-wrap justify-center align-center bg-[#f9f9f9]">
        <h4 className="w-full font-bold text-center text-gray-900">
          Select Country and Category
        </h4>
        <div className="flex gap-2 w-72 p-3 shadow-xl">
          <img
            className="shadow-xl h-[50px] w-[50px] rounded-full"
            src={flag}
            alt="Country Flag"
          />
          <select
            className="w-full p-3 bg-transparent outline-none flex align-center"
            onChange={(e) => {
              const conInfo = countries.find(
                (country) => country.name === e.target.value
              );
              if (conInfo) {
                setCountry(conInfo.name);
                setFlag(conInfo.flags.svg);
              }
            }}
            value={country}
          >
            {countries.map((country) => (
              <option key={country.name} value={country.name}>
                {country.name}
              </option>
            ))}
          </select>
        </div>
        <div className="flex gap-2 w-72 p-3 shadow-xl">
          <select
            className="w-full p-3 bg-transparent outline-none flex align-center"
            onChange={(e) => {
              setCategory(e.target.value);
            }}
            value={category}
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="w-full py-11 shadow-xl p-5 gap-8 rounded-md flex flex-wrap justify-center align-center bg-[#f9f9f9]">
        {news.length > 0 ? (
          news.map((article, index) => (
            <div
              key={index}
              className="relative shadow-xl w-full max-w-md bg-white rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              <img
                src={
                  article.urlToImage ? article.urlToImage : "/defaultNews.png"
                }
                alt={article.title}
                className="w-full h-80 object-contain sm:object-cover"
              />
              <div className="p-4 pb-16">
                <h2 className="font-bold text-xl mb-2">{article.title}</h2>
                <p className="text-gray-700 mb-4">{article.description}</p>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-4 flex justify-between items-center bg-white bg-opacity-75">
                <Link
                  to={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors duration-300">
                    Read More
                  </button>
                </Link>
                <button
                  onClick={(e) => saveHandle(e, article)}
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors duration-300"
                >
                  <IoBookmarksSharp size={24} />
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No news available</p>
        )}
      </div>
    </div>
  );
};

export default News;
