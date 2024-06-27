import React from "react";
import { Spinner } from "react-bootstrap";
import "./css/LoadPage.css";

const LoadPage = () => {
  return (
    <div className="load-page d-flex align-items-center justify-content-center">
      <Spinner animation="border" variant="primary" />
    </div>
  );
};

export default LoadPage;
