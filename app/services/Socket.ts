// Socket configuration file (socket.js)
"use client";
import { io } from "socket.io-client";
import { API_URL } from "@/lib/http-client";

const socket = io(API_URL, {
  // Example options, customize as needed
  timeout: 10000, // 10 seconds
  reconnectionAttempts: 3,
});

export default socket;
