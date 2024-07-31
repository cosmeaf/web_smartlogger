import React from "react";
import HeaderLoggedIn from "../components/HeaderLoggedIn";

const FacebookLoginComponent = () => {
  return (
    <div className="privacy-page">
      <HeaderLoggedIn />
      <div className="container mx-auto my-5">
        <h1 className="text-xl font-bold">Privacy Policy</h1>
        <p>Here you can describe your privacy policy...</p>
      </div>
    </div>
  );
};

export default FacebookLoginComponent;
