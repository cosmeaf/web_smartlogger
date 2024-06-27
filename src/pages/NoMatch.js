import React from "react";
import { useNavigate } from "react-router-dom";

const NoMatch = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate("/");
  };

  return (
    <div className="d-flex flex-column align-items-center justify-content-center vh-100 text-center">
      <h1 className="display-1">404</h1>
      <h2 className="mb-4">Page Not Found</h2>
      <button className="btn btn-primary" onClick={handleGoHome}>
        Go to Home
      </button>
    </div>
  );
};

export default NoMatch;
