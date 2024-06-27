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
    return accessToken && refreshToken
      ? { access: JSON.parse(accessToken), refresh: JSON.parse(refreshToken) }
      : null;
  });

  const navigate = useNavigate();

  const setToken = (access) => {
    localStorage.setItem("accessToken", JSON.stringify(access));
  };

  const setRefresh = (refresh) => {
    localStorage.setItem("refreshToken", JSON.stringify(refresh));
  };

  const loginUser = async (credentials) => {
    try {
      const { access, refresh } = await api.loginUser(credentials);
      setAuthTokens({ access, refresh });
      setToken(access);
      setRefresh(refresh);
      navigate("/dashboard");
    } catch (error) {
      console.error("Failed to login", error);
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
    navigate("/signin");
  }, [navigate]);

  const updateToken = useCallback(async () => {
    if (authTokens?.refresh) {
      try {
        const { access, refresh } = await api.refreshUserToken();
        setAuthTokens({ access, refresh });
        setToken(access);
        setRefresh(refresh);
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
