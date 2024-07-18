const BASE_URL = "https://api.smartlogger.duckdns.org/api";

const getHeaders = () => {
  const accessToken = JSON.parse(localStorage.getItem("accessToken"));
  return {
    "Content-Type": "application/json",
    Authorization: accessToken ? `Bearer ${accessToken}` : "",
  };
};

const refreshToken = async () => {
  const refresh = JSON.parse(localStorage.getItem("refreshToken"));
  const response = await fetch(`${BASE_URL}/token/refresh/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ refresh }),
  });
  const data = await response.json();
  localStorage.setItem("accessToken", JSON.stringify(data.access));
  return data.access;
};

const request = async (method, url, data = null) => {
  try {
    const headers = getHeaders();
    const response = await fetch(`${BASE_URL}${url}`, {
      method,
      headers,
      body: data ? JSON.stringify(data) : null,
    });

    const json = await response.json();

    if (!response.ok) {
      return { code: response.status, message: json };
    }

    return json;
  } catch (error) {
    if (error.message.includes("401")) {
      try {
        const access = await refreshToken();
        const headers = {
          "Content-Type": "application/json",
          Authorization: `Bearer ${access}`,
        };
        const response = await fetch(`${BASE_URL}${url}`, {
          method,
          headers,
          body: data ? JSON.stringify(data) : null,
        });

        const json = await response.json();

        if (!response.ok) {
          return { code: response.status, message: json };
        }

        return json;
      } catch (refreshError) {
        return { code: 500, message: "Failed to refresh token" };
      }
    } else {
      return { code: 500, message: error.message };
    }
  }
};

const driver = {
  get: (url) => request("GET", url),
  post: (url, data) => request("POST", url, data),
  put: (url, data) => request("PUT", url, data),
  delete: (url) => request("DELETE", url),
  patch: (url, data) => request("PATCH", url, data),
};

export default driver;
