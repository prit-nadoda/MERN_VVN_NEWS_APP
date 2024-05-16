import React, { useContext, useEffect } from "react";
import { Context } from "../main";

const Profile = () => {
  const { isAuthenticated, setIsAuthenticated, setActiveLink } =
    useContext(Context);

  useEffect(() => {
    setActiveLink("profile");
  });
  return <div>Profile</div>;
};

export default Profile;
