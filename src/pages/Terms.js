import React from "react";
import HeaderLoggedIn from "../components/HeaderLoggedIn";

const Terms = () => {
  return (
    <div className="terms-page">
      <HeaderLoggedIn />
      <div className="container mx-auto my-5">
        <h1 className="text-xl font-bold">Terms of Service</h1>
        <p>Here you can describe your terms of service...</p>
      </div>
    </div>
  );
};

export default Terms;
