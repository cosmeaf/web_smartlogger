import axios from "axios";
import { BASE_URL } from "./data";

// Headers de conexão
const headers = {
  "Content-Type": "application/json",
  Authorization: "",
};

// Criação da instância global do axios com headers
const api = axios.create({
  baseURL: BASE_URL,
  headers,
});

// Funções de manipulação do localStorage
const getUserLocalStorage = () => {
  try {
    const userStr = localStorage.getItem("user");
    if (userStr) {
      return JSON.parse(userStr);
    }
  } catch (error) {
    console.error("Failed to parse user from localStorage", error);
  }
  return null;
};

const saveUserLocalStorage = (access, refresh, user) => {
  try {
    localStorage.setItem("access", access);
    localStorage.setItem("refresh", refresh);
    localStorage.setItem("user", JSON.stringify(user));
  } catch (error) {
    console.error("Failed to save user to localStorage", error);
  }
};

const deleteUserLocalStorage = () => {
  try {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    localStorage.removeItem("user");
  } catch (error) {
    console.error("Failed to delete user from localStorage", error);
  }
};

// Atualiza o header de autorização
const updateAuthorizationHeader = (token) => {
  api.defaults.headers["Authorization"] = `Bearer ${token}`;
};

// Função de login
const signInRequest = async (username, password) => {
  try {
    const response = await api.post("/token/", { username, password });
    if (
      response &&
      response.data &&
      response.data.access &&
      response.data.refresh
    ) {
      updateAuthorizationHeader(response.data.access);
      return response.data;
    } else {
      throw new Error("Invalid response structure");
    }
  } catch (error) {
    console.error("Sign in failed:", error);
    if (error.response) {
      console.error("Error Response Data:", error.response.data);
      console.error("Error Response Status:", error.response.status);
      console.error("Error Response Headers:", error.response.headers);
    } else if (error.request) {
      console.error("Error Request:", error.request);
    } else {
      console.error("Error Message:", error.message);
    }
    return null;
  }
};

// Função de refresh token
const refreshTokenRequest = async (refreshToken) => {
  if (!refreshToken) {
    console.error("No refresh token available");
    return null;
  }
  try {
    const response = await api.post("/token/refresh/", {
      refresh: refreshToken,
    });

    if (response && response.data && response.data.access) {
      updateAuthorizationHeader(response.data.access);
      return response.data;
    } else {
      throw new Error("Invalid response structure");
    }
  } catch (error) {
    console.error("Token refresh failed:", error);
    return null;
  }
};

// Função de verificação de token
const verifyTokenRequest = async (token) => {
  if (!token) {
    console.error("No token available");
    return false;
  }
  try {
    const response = await api.post("/token/verify/", { token });
    if (response && response.data) {
      return response.data;
    } else {
      throw new Error("Invalid response structure");
    }
  } catch (error) {
    console.error("Token verification failed:", error);
    return false;
  }
};

// Função de blacklist de token
const blacklistTokenRequest = async (token) => {
  if (!token) {
    console.error("No token available");
    return false;
  }
  try {
    const response = await api.post("/token/blacklist/", { token });
    if (response && response.data) {
      return response.data;
    } else {
      throw new Error("Invalid response structure");
    }
  } catch (error) {
    console.error("Token blacklist failed:", error);
    return false;
  }
};

export {
  signInRequest,
  refreshTokenRequest,
  verifyTokenRequest,
  blacklistTokenRequest,
};
export default api;
export {
  getUserLocalStorage,
  saveUserLocalStorage,
  deleteUserLocalStorage,
  updateAuthorizationHeader,
};
