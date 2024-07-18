import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import LogoutModal from "./LogoutModal";
import LoadPage from "./LoadPage";

const HeaderLoggedIn = () => {
  const { authTokens } = useAuth();
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [userFullName, setUserFullName] = useState("Guest");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      if (authTokens && authTokens.user) {
        const { first_name, last_name } = authTokens.user;
        const fullName = `${first_name} ${last_name}`.trim();
        setUserFullName(fullName || "Guest");
        setLoading(false);
      } else {
        setUserFullName("Guest");
        setLoading(false);
      }
    };

    fetchData();
  }, [authTokens]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const confirmLogout = () => {
    setShowLogoutModal(true);
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <>
      {loading && <LoadPage />}
      <nav className="bg-gray-800 p-2">
        <div className="container mx-auto flex justify-between items-center h-12">
          <Link to="/dashboard" className="text-white text-xl font-bold">
            INJETEC
          </Link>
          <div className="relative" ref={dropdownRef}>
            <button
              className="text-white focus:outline-none flex items-center text-xs"
              onClick={toggleDropdown}
            >
              <span className="text-0.7rem">{userFullName || "Guest"}</span>
              <svg
                className="ml-2 w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                ></path>
              </svg>
            </button>
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-20">
                <Link
                  to="/profile"
                  className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
                  onClick={() => setDropdownOpen(false)}
                >
                  Profile
                </Link>
                <Link
                  to="/setup"
                  className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
                  onClick={() => setDropdownOpen(false)}
                >
                  Setup
                </Link>
                <div className="border-t my-1"></div>
                <button
                  onClick={confirmLogout}
                  className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-200"
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>
      <LogoutModal
        show={showLogoutModal}
        onHide={() => setShowLogoutModal(false)}
      />
    </>
  );
};

export default HeaderLoggedIn;
