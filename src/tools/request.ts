import axios from "axios";
import { getCurrentToken, isDefined } from "./commons";

const API_KEY = import.meta.env.VITE_API_KEY;

const request = axios.create({
  baseURL: API_KEY,
  timeout: 30000,
});

request.interceptors.request.use(
  (config) => {
    const token = getCurrentToken();
    if (isDefined(token)) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

request.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default request;
