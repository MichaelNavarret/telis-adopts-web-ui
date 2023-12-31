import axios from "axios";
import { getCurrentToken, isDefined } from "./commons";

//const API_URL = "https://telis-adopts-web-api.fly.dev/";
const API_URL = "http://localhost:4000/";

const request = axios.create({
  baseURL: API_URL,
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
