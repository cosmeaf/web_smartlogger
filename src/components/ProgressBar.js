import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import "../components/css/ProgressBar.css";

const ProgressBar = ({ color = "#3498db", size = "4px", second = 10, onComplete }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => (prev >= 100 ? 0 : prev + (100 / second)));
    }, 1000);

    const timeout = setTimeout(() => {
      if (onComplete) {
        onComplete();
      }
      setProgress(0);
    }, second * 1000);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [second, onComplete]);

  return (
    <div className="progress-bar-container" style={{ height: size }}>
      <div
        className="progress-bar"
        style={{
          backgroundColor: color,
          width: `${progress}%`,
        }}
      ></div>
    </div>
  );
};

ProgressBar.propTypes = {
  color: PropTypes.string,
  size: PropTypes.string,
  second: PropTypes.number,
  onComplete: PropTypes.func,
};

export default ProgressBar;
