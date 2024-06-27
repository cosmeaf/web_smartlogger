import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const PrivateRoute = () => {
  const { authTokens } = useAuth();

  return authTokens?.access ? <Outlet /> : <Navigate to="/signin" />;
};

export default PrivateRoute;
