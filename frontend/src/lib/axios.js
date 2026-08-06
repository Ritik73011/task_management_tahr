import axios from "axios";

import API from "../config/api.js";
import { getToken, removeToken } from "./token.js";
import { errorToast } from "./toast.js";

const api = axios.create({
  baseURL: API.BASE_URL,
  timeout: API.TIMEOUT,
});

api.interceptors.request.use(
  (config) => {
    const token = getToken();

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error),
);

api.interceptors.response.use(
  (response) => response,

  (error) => {
    const message = error.response?.data?.message || "Something went wrong.";

    const isAuthRequest =
      error.config?.url?.includes("/auth/login") ||
      error.config?.url?.includes("/auth/register");

    if (error.response?.status === 401 && !isAuthRequest) {
      removeToken();

      if (typeof window !== "undefined") {
        window.location.href = "/login";
      }
    }

    errorToast(message);

    return Promise.reject(error);
  },
);

export default api;
