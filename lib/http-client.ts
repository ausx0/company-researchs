import axios from "axios";
import Cookies from "js-cookie";

export const API_URL = "http://10.23.148.35:8000/";

const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "multipart/form-data",
    // Authorization: Cookies.get("token"),
  },
});

// Add a request interceptor
axiosInstance.interceptors.request.use((config) => {
  const token = Cookies.get("token");
  config.headers.Authorization = token ? token : "";
  return config;
});

// Add a response interceptor
axiosInstance.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    if (error.response && error.response.status === 401) {
      // Remove the token
      Cookies.remove("token");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

const httpClient = { axiosInstance };

export default httpClient;
