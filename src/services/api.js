import driver from "./driver";

const api = {
  loginUser: (credentials) => driver.post("/token/", credentials),
  refreshUserToken: () => driver.post("/token/refresh/"),
  blacklistUserToken: (refreshToken) =>
    driver.post("/token/blacklist/", { refresh: refreshToken }),
  get: driver.get,
  post: driver.post,
  put: driver.put,
  patch: driver.patch,
  delete: driver.delete,
};

export default api;
