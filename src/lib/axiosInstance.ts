import axios from "axios";
import { getCookie } from "typescript-cookie";

export const axiosInstance = axios.create({
  withCredentials: true,
  withXSRFToken: true,
  // baseURL: "http://localhost:8000",
  baseURL: "https://api.dosas.online",
});

axiosInstance.interceptors.request.use(
  (config) => {
    const xsrfToken = getCookie("XSRF-TOKEN");
    if (xsrfToken) {
      config.headers["X-XSRF-TOKEN"] = xsrfToken;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);