import axios from "axios";

const BASE_URL = "https://cliente.smartlogger.duckdns.org/api";

const getHeaders = () => {
  const accessToken = JSON.parse(localStorage.getItem("accessToken"));
  return accessToken ? { Authorization: `Bearer ${accessToken}` } : {};
};

const refreshToken = async () => {
  const refresh = JSON.parse(localStorage.getItem("refreshToken"));
  const response = await axios.post(`${BASE_URL}/token/refresh/`, { refresh });
  const { access } = response.data;
  localStorage.setItem("accessToken", JSON.stringify(access));
  return access;
};

const request = async (method, url, data = null) => {
  try {
    const headers = getHeaders();
    const response = await axios({
      method,
      url: `${BASE_URL}${url}`,
      data,
      headers,
    });
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 401) {
      try {
        const access = await refreshToken();
        const headers = { Authorization: `Bearer ${access}` };
        const response = await axios({
          method,
          url: `${BASE_URL}${url}`,
          data,
          headers,
        });
        return response.data;
      } catch (refreshError) {
        throw refreshError;
      }
    } else {
      throw error;
    }
  }
};

const driver = {
  get: (url) => request("get", url),
  post: (url, data) => request("post", url, data),
  put: (url, data) => request("put", url, data),
  del: (url) => request("delete", url),
};

export default driver;
