// Breadcrumb.js
import React from "react";
import { Link } from "react-router-dom";

const Breadcrumb = ({ items }) => {
  return (
    <nav className="flex mb-3" aria-label="Breadcrumb">
      <ol className="inline-flex items-center space-x-1 md:space-x-2">
        {items.map((item, index) => (
          <li key={index} className="inline-flex items-center">
            {index > 0 && (
              <svg
                className="w-4 h-4 text-gray-400"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M6.707 9.293a1 1 0 011.414 0L10 11.172l1.879-1.879a1 1 0 111.414 1.414l-2.586 2.586a1 1 0 01-1.414 0L6.707 10.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
            )}
            {item.link ? (
              <Link
                to={item.link}
                className={`ml-1 text-sm text-blue-500 hover:text-blue-700 md:ml-2 ${
                  index === 0 ? "" : "ml-1"
                }`}
              >
                {item.name}
              </Link>
            ) : (
              <span className="ml-1 text-sm text-gray-500 md:ml-2">
                {item.name}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
