import React, { useContext, useEffect, useRef, useState } from "react";
import { Context } from "../main";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { MdEmail } from "react-icons/md";
import axios from "axios";
import { IoIosArrowForward } from "react-icons/io";
import { button } from "@material-tailwind/react";
import Loader from "../components/Loader";

const Profile = () => {
  const { isAuthenticated, setIsAuthenticated, setActiveLink, user } =
    useContext(Context);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const toastDisplayedRef = useRef(false);
  const [savedArticles, setSavedArticles] = useState([]);

  useEffect(() => {
    setActiveLink("profile");
    if (!isAuthenticated) {
      if (!toastDisplayedRef.current) {
        toast.info("Please login to view your profile");
        toastDisplayedRef.current = true; // Set the ref to true after displaying toast
      }
      navigate("/login", { replace: true }); // Ensure navigation is replacing the current history entry
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
  }, [isAuthenticated, navigate, setActiveLink]);

  if (!isAuthenticated) {
    return null; // Avoid rendering the profile section if the user is not authenticated
  }

  return (
    <section className="bg-[#faf4e4] pt-[80px] md:pt-[30px] dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0 ">
        <div className="w-full shadow-2xl bg-white rounded-lg dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl  font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              <div className="w-full flex flex-col gap-1 justify-center items-center p-3">
                <div className="rounded-full shadow-2xl flex justify-center items-center h-[140px] w-[140px] bg-blue-700 text-[#f9f9f9] font-bold text-6xl">
                  {user.fullname
                    .split(" ")
                    .map((word) => word.charAt(0))
                    .join("")}
                </div>
                <h2 className="text-xl font-bold mt-4 leading-tight tracking-tight text-gray-900 md:text-4xl dark:text-white">
                  {user.fullname}
                </h2>
                <h3 className="text-sm font-semibold leading-tight tracking-tight text-gray-500 md:text-2xl dark:text-white">
                  {`@${user.username}`}
                </h3>
                <h3 className="text-sm font-bold mt-4 flex justify-center items-center gap-1 leading-tight tracking-tight text-gray-900 md:text-lg dark:text-white">
                  <MdEmail size={24} className="text-blue-700" /> {user.email}
                </h3>
                {loading && <Loader />}
                {savedArticles.length > 0 ? (
                  <Link
                    to={"/saved"}
                    className="w-full mt-5 flex justify-center items-center text-sm gap-2 font-normal text-md bg-blue-700 text-white px-4 py-2 rounded-lg hover:bg-blue-900 transition-colors duration-300"
                  >
                    View {savedArticles.length} Saved Articles
                    <IoIosArrowForward size={24} />{" "}
                  </Link>
                ) : (
                  <h3 className="text-sm font-bold mt-4 flex justify-center items-center gap-1 leading-tight tracking-tight text-gray-500 md:text-lg dark:text-white">
                    {" "}
                    You have no saved articles{" "}
                  </h3>
                )}

                <button></button>
              </div>
            </h1>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Profile;
