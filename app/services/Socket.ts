import { io } from "socket.io-client";
import { API_URL } from "@/lib/http-client";
import Cookies from "js-cookie";

const token = Cookies.get("token");
let headers: { [header: string]: string } = {}; // Define headers with an index signature

if (token) {
  headers.Authorization = token;
}

const socket = io(API_URL, {
  timeout: 10000, // 10 seconds
  reconnectionAttempts: 3,
  extraHeaders: headers as { [header: string]: string }, // Type assertion
});

export default socket;
