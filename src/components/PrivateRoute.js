import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../context/UseAuth";

const PrivateRoute = () => {
  const { accessToken } = useAuth();

  return accessToken ? <Outlet /> : <Navigate to="/signin" />;
};

export default PrivateRoute;
