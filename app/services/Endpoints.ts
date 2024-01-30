import axios from "axios";
import Cookies from "js-cookie";
import Router from "next/navigation";

const API_URL = "https://campion.medwithus.com/";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
    Authorization: Cookies.get("token"),
  },
});

export default api;
