import React, { useContext, useEffect, useState, useRef } from "react";
import { Context } from "../main";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { RiUnpinFill } from "react-icons/ri";
import Loader from "../components/Loader";

const Saved = () => {
  const { isAuthenticated, setActiveLink } = useContext(Context);
  const [savedArticles, setSavedArticles] = useState([]);
  const navigate = useNavigate();
  const [apiResponseData, setApiResponseData] = useState(null);
  const [loading, setLoading] = useState(false);
  const toastDisplayedRef = useRef(false); // Ref to track whether login toast has been displayed

  useEffect(() => {
    setActiveLink("saved");
  });
  useEffect(() => {
    if (!isAuthenticated) {
      if (!toastDisplayedRef.current) {
        toast.info("Please login to view saved articles");
        toastDisplayedRef.current = true; // Set the ref to true after displaying toast
      }
      navigate("/login");
      return;
    }

    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          "http://localhost:4000/api/v1/user/savedNews",
          { withCredentials: true }
        );
        setSavedArticles(response.data.articles);
      } catch (error) {
        console.log(error.response.data.message);
      }
      setLoading(false);
    };

    fetchData();
  }, [isAuthenticated, navigate]);

  const handleUnsave = async (e, id) => {
    e.preventDefault();
    try {
      const response = await axios.get(
        `http://localhost:4000/api/v1/user/savedNews/remove/${id}`,
        {
          withCredentials: true,
        }
      );
      setSavedArticles(savedArticles.filter((article) => article._id !== id));
      toast.success(response.data.message);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <section className="w-vw pt-[140px] bg-[#faf4e4] py-8 pb-[100px]">
      <div className="mx-auto  max-w-screen-xl px-4 space-y-8 sm:px-6 lg:px-8">
        <div className="w-full py-11 shadow-xl p-5 gap-8 rounded-md flex flex-wrap justify-center align-center bg-[#f9f9f9]">
          {loading ? <Loader /> : ""}
          {savedArticles.length > 0 ? (
            savedArticles.map((article, index) => (
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
                    <button className="bg-blue-700 text-white px-4 py-2 rounded-lg hover:bg-blue-900 transition-colors duration-300">
                      Read More
                    </button>
                  </Link>
                  <button
                    onClick={(e) => handleUnsave(e, article._id)}
                    className="bg-blue-700 flex gap-1 text-white px-4 py-2 rounded-lg hover:bg-blue-900 transition-colors duration-300"
                  >
                    <RiUnpinFill size={24} />
                    Unsave
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No saved news available</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default Saved;
