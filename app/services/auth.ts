import React from "react";
import api from "./Endpoints";
import axios from "axios";
import Cookies from "js-cookie";

const url = api + "Login";

export async function login(data: any) {
  const formData = new FormData();

  for (const key in data) {
    formData.append(key, data[key]);
  }

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "multipart/form-data",
    },
  };

  try {
    const response = await api.post("/Login", formData, options);
    if (response.data.Session_key) {
      Cookies.set("token", response.data.Session_key);
      console.log(response.data);
    }
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export function logout() {
  Cookies.remove("token");
}
