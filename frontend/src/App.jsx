import axios from "axios";
import React, { useContext, useEffect } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Saved from "./pages/Saved";
import Profile from "./pages/Profile";
import { Context } from "./main";
import "./index.css";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";

const App = () => {
  const { isAuthenticated, setIsAuthenticated, setUser } = useContext(Context);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4000/api/v1/user/info",
          {
            withCredentials: true,
          }
        );
        console.log(response.data);
        setIsAuthenticated(true);
        setUser(response.data.user);
      } catch (error) {
        console.log(error);
        setIsAuthenticated(false);
        setUser({});
      }
    };
    fetchUser();
  }, [isAuthenticated]);
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/saved" element={<Saved />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
        <Footer />
      </Router>
    </>
  );
};

export default App;
