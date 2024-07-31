import React from "react";
import { Routes, Route } from "react-router-dom";
import NoMatch from "./pages/NoMatch";
import Home from "./pages/Home";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import Signin from "./pages/Signin";
import SignupPage from "./pages/Signup";
import PrivateRoute from "./components/PrivateRoute";
import FacebookLoginComponent from "./components/FacebookLoginComponent";
import DashboardPage from "./pages/Dashboard";
import DevicesPage from "./pages/Devices";
import DeviceDetail from "./pages/DeviceDetail";

import Operator from "./pages/Operator";
import OperatorCreate from "./pages/OperatorCreate";
import OperatorEdit from "./pages/OperatorEdit";

import EquipamentPage from "./pages/Equipament";
import EquipamentDetailPage from "./pages/EquipamentDetail";
import EquipamentCreatorPage from "./pages/EquipamentCreator";
import EquipamentEditPage from "./pages/EquipamentEdit";
import MaintenancePage from "./pages/Maintenance";
import AuthProvider from "./context/AuthProvider";

const App = () => {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/delete-user" element={<FacebookLoginComponent />} />

        <Route element={<PrivateRoute />}>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/dashboard/devices" element={<DevicesPage />} />
          <Route
            path="/dashboard/device/detail/:id"
            element={<DeviceDetail />}
          />
          <Route path="/dashboard/equipament" element={<EquipamentPage />} />
          <Route
            path="/dashboard/equipament/detail/:id"
            element={<EquipamentDetailPage />}
          />
          <Route
            path="/dashboard/equipament/create"
            element={<EquipamentCreatorPage />}
          />
          <Route
            path="/dashboard/equipament/edit/:id"
            element={<EquipamentEditPage />}
          />
          <Route
            path="/dashboard/maintenance/:id"
            element={<MaintenancePage />}
          />
          <Route path="/dashboard/operator" element={<Operator />} />
          <Route
            path="/dashboard/operator/create"
            element={<OperatorCreate />}
          />
          <Route
            path="/dashboard/operator/edit/:id"
            element={<OperatorEdit />}
          />
        </Route>
        <Route path="*" element={<NoMatch />} />
      </Routes>
    </AuthProvider>
  );
};

export default App;
