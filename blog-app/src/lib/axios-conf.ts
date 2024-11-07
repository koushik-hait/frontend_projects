import axios from "axios";
import { LocalStore } from "./utils";

const headers = {
  "Content-Type": "application/json",
};
export const multipartHeaders = {
  "Content-Type": "multipart/form-data",
};

export const expressApi = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_EXPRESS_URI,
  withCredentials: true,
  timeout: 120000,
  headers,
});

// Add an interceptor to set authorization header with user token before requests
expressApi.interceptors.request.use(
  function (config) {
    // Retrieve user token from local storage
    const token = LocalStore.get("token");
    // Set authorization header with bearer token
    config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export const honoAapi = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_HONO_URI,
  withCredentials: true,
  timeout: 120000,
  headers,
});

export const pythonFastApi = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_PYTHON_FAST_URI,
  withCredentials: true,
  timeout: 120000,
  headers,
});
