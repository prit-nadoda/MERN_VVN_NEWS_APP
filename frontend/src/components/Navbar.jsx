import React, { useContext, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Context } from "../main";

const Navbar = () => {
  const [activeLink, setActiveLink] = useState("home");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isAuthenticated, setIsAuthenticated, setUser } = useContext(Context);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLinkClick = (link) => {
    setActiveLink(link);
    setIsMenuOpen(false); // Close the menu when a link is clicked
  };

  return (
    <nav className="bg-[#FAF9F6] shadow-xl dark:bg-gray-900 fixed w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link
          to="/"
          className={
            "flex items-center space-x-3 rtl:space-x-reverse text-black"
          }
        >
          <img
            src="/VvNewsLogoRounded.png"
            className="h-8"
            alt="Flowbite Logo"
          />
          <span className="self-center text-2xl font-bold whitespace-nowrap dark:text-white">
            VvNews
          </span>
        </Link>
        <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
          {!isAuthenticated && (
            <NavLink
              to="/login"
              className="flex items-center space-x-3 rtl:space-x-reverse"
            >
              <button
                type="button"
                onClick={toggleMenu}
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Login
              </button>
            </NavLink>
          )}
          <button
            type="button"
            onClick={toggleMenu}
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-sticky"
            aria-expanded={isMenuOpen}
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
        </div>
        <div
          className={`items-center  justify-between w-full md:flex md:w-auto md:order-1 ${
            isMenuOpen ? "" : "hidden"
          }`}
          id="navbar-sticky"
        >
          <ul className="flex flex-col  p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md: dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            <li>
              <Link
                to="/"
                onClick={() => handleLinkClick("home")}
                className={`block py-2 px-3 rounded md:bg-transparent md:p-0 ${
                  activeLink === "home"
                    ? "text-blue-700"
                    : "text-gray-900 hover:bg-gray-100 md:hover:bg-transparent"
                } md:dark:text-blue-500 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700`}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/saved"
                onClick={() => handleLinkClick("saved")}
                className={`block py-2 px-3 rounded md:bg-transparent md:p-0 ${
                  activeLink === "saved"
                    ? "text-blue-700"
                    : "text-gray-900 hover:bg-gray-100 md:hover:bg-transparent"
                } md:dark:text-blue-500 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700`}
              >
                Saved
              </Link>
            </li>
            <li>
              <Link
                to="/profile"
                onClick={() => handleLinkClick("profile")}
                className={`block py-2 px-3 rounded md:bg-transparent md:p-0 ${
                  activeLink === "profile"
                    ? "text-blue-700"
                    : "text-gray-900 hover:bg-gray-100 md:hover:bg-transparent"
                } md:dark:text-blue-500 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700`}
              >
                Profile
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
