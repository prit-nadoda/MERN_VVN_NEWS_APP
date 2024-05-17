import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../main";
import { toast } from "react-toastify";
import axios from "axios";

const Register = () => {
  const { isAuthenticated, setIsAuthenticated, setActiveLink } =
    useContext(Context);
  const [user, setUser] = useState({
    email: "",
    password: "",
    fullname: "",
    username: "",
  });
  const navigateTo = useNavigate();
  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  const handleRegister = async (e) => {
    e.preventDefault();
    const { email, password, fullname, username } = user;
    try {
      const response = await axios
        .post(
          "http://localhost:4000/api/v1/user/register",
          { email, password, fullname, username },
          {
            withCredentials: true,
            headers: { "Content-Type": "application/json" },
          }
        )
        .then((response) => {
          toast.success(response.data.message);
          setIsAuthenticated(true);
          navigateTo("/");
        });
    } catch (error) {
      toast.error(error.response.data.message);
      setIsAuthenticated(false);
    }
  };

  useEffect(() => {
    setActiveLink("");
  }, [setActiveLink]);
  return (
    <section className="bg-[#faf4e4] pt-[40px] dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0 ">
        <div className=" mt-[120px] w-full shadow-xl bg-white rounded-lg dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className=" p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Sign in to your account
            </h1>
            <form className="space-y-4 md:space-y-6" action="#">
              <div>
                <label
                  htmlFor="fullname"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Your fullname
                </label>
                <input
                  onChange={(e) => handleChange(e)}
                  value={user.fullname}
                  type="text"
                  name="fullname"
                  id="fullname"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Firstname (Middlename) Lastname"
                  required=""
                />
              </div>
              <div>
                <label
                  htmlFor="username"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  create username
                </label>
                <input
                  onChange={(e) => handleChange(e)}
                  value={user.username}
                  type="text"
                  name="username"
                  id="username"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="username"
                  required=""
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Your email
                </label>
                <input
                  onChange={(e) => handleChange(e)}
                  value={user.email}
                  type="email"
                  name="email"
                  id="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="name@company.com"
                  required=""
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  create password
                </label>
                <input
                  onChange={(e) => handleChange(e)}
                  value={user.password}
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required=""
                />
              </div>

              <button
                onClick={(e) => handleRegister(e)}
                type="submit"
                className="w-full bg-blue-500 text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                Register
              </button>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Already have an account?{" "}
                <Link to={"/login"}>
                  <a
                    href="#"
                    className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                  >
                    Login
                  </a>
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Register;
