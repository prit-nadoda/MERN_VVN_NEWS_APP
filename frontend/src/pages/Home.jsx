import React, { useContext, useEffect } from "react";
import Hero from "../components/Hero";
import News from "../components/News";
import { Context } from "../main";

const Home = () => {
  const { setActiveLink } = useContext(Context);
  useEffect(() => {
    setActiveLink("home");
  });
  return (
    <div className="bg-[#faf4e4]">
      <Hero />
      <News />
    </div>
  );
};

export default Home;
