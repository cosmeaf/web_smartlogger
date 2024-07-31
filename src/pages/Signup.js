import React, { useState } from "react";
import { Link } from "react-router-dom";
import LoadPage from "../components/LoadPage";
import api from "../services/api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import "../components/css/Signin.css";

const Signup = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    if (password !== repeatPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    try {
      const data = {
        first_name: firstName,
        last_name: lastName,
        email: email,
        password: password,
        repeat_password: repeatPassword,
      };

      const response = await api.post("/register/", data);

      if (response.code && response.code !== 200) {
        const errorMessage = Object.values(response.message).flat().join(", ");
        setError(errorMessage);
      } else {
        setSuccess("Registration successful!");
        setFirstName("");
        setLastName("");
        setEmail("");
        setPassword("");
        setRepeatPassword("");
      }
    } catch (err) {
      setError("Failed to register. Please try again.");
      console.error("Signup error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      {loading && <LoadPage />}
      <div className="w-full max-w-md p-8 space-y-3 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center">Sign Up</h2>
        {error && (
          <div className="p-3 text-red-700 bg-red-200 rounded">{error}</div>
        )}
        {success && (
          <div className="p-3 text-green-700 bg-green-200 rounded">
            {success}
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              First Name
            </label>
            <input
              type="text"
              className="w-full p-2 mt-1 border rounded-md focus:ring focus:ring-blue-500"
              required
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Last Name
            </label>
            <input
              type="text"
              className="w-full p-2 mt-1 border rounded-md focus:ring focus:ring-blue-500"
              required
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              className="w-full p-2 mt-1 border rounded-md focus:ring focus:ring-blue-500"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                className="w-full p-2 mt-1 border rounded-md focus:ring focus:ring-blue-500"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 px-3 flex items-center focus:outline-none"
                onClick={() => setShowPassword(!showPassword)}
              >
                <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} />
              </button>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Repeat Password
            </label>
            <div className="relative">
              <input
                type={showRepeatPassword ? "text" : "password"}
                className="w-full p-2 mt-1 border rounded-md focus:ring focus:ring-blue-500"
                required
                value={repeatPassword}
                onChange={(e) => setRepeatPassword(e.target.value)}
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 px-3 flex items-center focus:outline-none"
                onClick={() => setShowRepeatPassword(!showRepeatPassword)}
              >
                <FontAwesomeIcon
                  icon={showRepeatPassword ? faEye : faEyeSlash}
                />
              </button>
            </div>
          </div>
          <button
            type="submit"
            className="w-full p-2 text-white bg-blue-500 rounded-md hover:bg-blue-700 focus:ring focus:ring-blue-500"
          >
            Sign Up
          </button>
        </form>
        <div className="mt-4 text-center">
          <Link to="/signin" className="text-blue-500 hover:underline">
            Already have an account? Sign In
          </Link>
        </div>
        <div className="mt-4 text-center">
          <Link to="/recovery" className="text-blue-500 hover:underline">
            Forgot Password?
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;
