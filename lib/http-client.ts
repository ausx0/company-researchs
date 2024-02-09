import axios from "axios";
import Cookies from "js-cookie";

const API_URL = "https://campion.medwithus.com/";

const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "multipart/form-data",
    Authorization: Cookies.get("token"),
  },
});

const httpClient = { axiosInstance };

export default httpClient;
