import React, { useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "./AuthContext";
import {
  getUserLocalStorage,
  saveUserLocalStorage,
  deleteUserLocalStorage,
  updateAuthorizationHeader,
} from "../services/api";
import {
  signInRequest,
  refreshTokenRequest,
  verifyTokenRequest,
  blacklistTokenRequest,
} from "../services/connect";

const AuthProvider = ({ children }) => {
  const localStorageUser = getUserLocalStorage();
  const [user, setUser] = useState(localStorageUser?.user || null);
  const [accessToken, setAccessToken] = useState(
    localStorageUser?.access || null
  );
  const [refreshToken, setRefreshToken] = useState(
    localStorageUser?.refresh || null
  );
  const navigate = useNavigate();

  const logoutUser = useCallback(async () => {
    try {
      if (refreshToken) {
        await blacklistTokenRequest(refreshToken);
        console.log("Token successfully blacklisted.");
      }
    } catch (error) {
      console.error("Failed to blacklist token", error);
    } finally {
      setAccessToken(null);
      setRefreshToken(null);
      setUser(null);
      deleteUserLocalStorage();
      navigate("/signin");
    }
  }, [refreshToken, navigate]);

  const refreshUserToken = useCallback(async () => {
    try {
      const response = await refreshTokenRequest(refreshToken);
      if (response) {
        setAccessToken(response.access);
        updateAuthorizationHeader(response.access);
        saveUserLocalStorage(response.access, refreshToken, user);
      } else {
        console.error("refreshUserToken failed, response:", response);
        logoutUser();
      }
    } catch (error) {
      console.error("Failed to refresh token", error);
      logoutUser();
    }
  }, [refreshToken, user, logoutUser]);

  const verifyToken = useCallback(async () => {
    if (accessToken) {
      try {
        const isValid = await verifyTokenRequest(accessToken);
        if (!isValid) {
          await refreshUserToken();
        }
      } catch (error) {
        console.error("Failed to verify token", error);
        await refreshUserToken();
      }
    }
  }, [accessToken, refreshUserToken]);

  const signIn = async (username, password) => {
    try {
      const response = await signInRequest(username, password);
      if (response) {
        setAccessToken(response.access);
        setRefreshToken(response.refresh);
        setUser(response.user);
        saveUserLocalStorage(response.access, response.refresh, response.user);
        updateAuthorizationHeader(response.access);
        navigate("/dashboard");
      } else {
        console.error("signIn failed, response:", response);
      }
    } catch (error) {
      console.error("Failed to sign in", error);
    }
  };

  useEffect(() => {
    if (accessToken) {
      updateAuthorizationHeader(accessToken);
    }
  }, [accessToken]);

  useEffect(() => {
    verifyToken();
  }, [verifyToken]);

  return (
    <AuthContext.Provider
      value={{
        user,
        accessToken,
        refreshToken,
        signIn,
        refreshUserToken,
        verifyToken,
        logoutUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
