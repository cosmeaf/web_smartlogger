import axios from "axios";
import { BASE_URL } from "./data";

// Headers de conexão
const headers = {
  "Content-Type": "application/json",
};

const api = axios.create({
  baseURL: BASE_URL,
  headers,
});

// Funções de manipulação do localStorage
const getUserLocalStorage = () => {
  try {
    const userStr = localStorage.getItem("user");
    const access = localStorage.getItem("access");
    const refresh = localStorage.getItem("refresh");
    if (userStr && access && refresh) {
      return {
        user: JSON.parse(userStr),
        access,
        refresh,
      };
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

const updateAuthorizationHeader = (token) => {
  api.defaults.headers["Authorization"] = `Bearer ${token}`;
};

// Adiciona um interceptador para adicionar o token de autorização a cada requisição
api.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("access");
    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Exportando os métodos HTTP diretamente
export const driver = {
  get: api.get,
  post: api.post,
  put: api.put,
  patch: api.patch,
  delete: api.delete,
};

export default api;
export {
  getUserLocalStorage,
  saveUserLocalStorage,
  deleteUserLocalStorage,
  updateAuthorizationHeader,
};
