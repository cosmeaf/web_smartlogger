import React, {
  createContext,
  useState,
  useEffect,
  useCallback,
  useContext,
} from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
  const [authTokens, setAuthTokens] = useState(() => {
    const accessToken = localStorage.getItem("accessToken");
    const refreshToken = localStorage.getItem("refreshToken");
    const userData = localStorage.getItem("userData");
    return accessToken && refreshToken && userData
      ? {
          access: JSON.parse(accessToken),
          refresh: JSON.parse(refreshToken),
          user: JSON.parse(userData),
        }
      : null;
  });

  const navigate = useNavigate();

  const setToken = (access) => {
    localStorage.setItem("accessToken", JSON.stringify(access));
  };

  const setRefresh = (refresh) => {
    localStorage.setItem("refreshToken", JSON.stringify(refresh));
  };

  const setUserData = (user) => {
    localStorage.setItem("userData", JSON.stringify(user));
  };

  const loginUser = async (credentials) => {
    try {
      const response = await api.loginUser(credentials);
      if (response.code && response.code !== 200) {
        const errorMessage = Object.values(response.message).flat().join(", ");
        throw new Error(errorMessage);
      }
      const { access, refresh, user } = response;
      setAuthTokens({ access, refresh, user });
      setToken(access);
      setRefresh(refresh);
      setUserData(user);
      navigate("/dashboard");
    } catch (err) {
      throw err;
    }
  };

  const logoutUser = useCallback(async () => {
    try {
      const refreshToken = JSON.parse(localStorage.getItem("refreshToken"));
      await api.blacklistUserToken(refreshToken);
    } catch (error) {
      console.error("Failed to blacklist token", error);
    }
    setAuthTokens(null);
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("userData");
    navigate("/signin");
  }, [navigate]);

  const updateToken = useCallback(async () => {
    if (authTokens?.refresh) {
      try {
        const response = await api.refreshUserToken();
        const { access, refresh, user } = response.data;
        setAuthTokens((prevTokens) => ({
          ...prevTokens,
          access,
          refresh,
          user,
        }));
        setToken(access);
        setRefresh(refresh);
        setUserData(user);
      } catch (error) {
        console.error("Failed to refresh token", error);
        logoutUser();
      }
    }
  }, [authTokens, logoutUser]);

  useEffect(() => {
    if (authTokens?.access) {
      const interval = setInterval(updateToken, 1000 * 60 * 14);
      return () => clearInterval(interval);
    }
  }, [authTokens, updateToken]);

  return (
    <AuthContext.Provider value={{ authTokens, loginUser, logoutUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
