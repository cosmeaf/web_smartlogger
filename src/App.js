import React from "react";
import { Routes, Route } from "react-router-dom";
import NoMatch from "./pages/NoMatch";
import Home from "./pages/Home";
import Signin from "./pages/Signin";
import PrivateRoute from "./components/PrivateRoute";
import Dashboard from "./pages/Dashboard";
import DevicesPage from "./pages/Devices";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/signin" element={<Signin />} />
      <Route element={<PrivateRoute />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dashboard/devices" element={<DevicesPage />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

const NotFound = () => {
  return <NoMatch />;
};

export default App;
