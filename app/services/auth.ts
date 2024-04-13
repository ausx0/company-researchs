import { axiosInstance } from "@/lib";
import Cookies from "js-cookie";

const url = axiosInstance + "Login";

export async function Login(data: any) {
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
    const response = await axiosInstance.post("/Login", formData, options);
    if (response.data.Session_key) {
      Cookies.set("token", response.data.Session_key);
      const role = getRoleFromSessionKey(response.data.Session_key);

      const userData = { ...response.data, Session_key: undefined, role };

      localStorage.setItem("userData", JSON.stringify(userData)); // Save userData to local storage
      localStorage.setItem("userRole", role); // Save userData to local storage

      // console.log(response.data);
      // router.push("/home");
      return response.data; // Return original response data
    } else {
      throw new Error("Login failed");
    }
  } catch (error) {
    console.error(error);
    throw error; // Throw the error so it can be handled by react-query
  }
}

export function logout() {
  Cookies.remove("token");
  localStorage.removeItem("userData");
  localStorage.removeItem("userRole");
}

function getRoleFromSessionKey(sessionKey: string) {
  const firstNumber = parseInt(sessionKey[0]);
  switch (firstNumber) {
    case 1:
      return "Admin";
    case 2:
      return "lab-tech";
    case 3:
      return "reception";
    default:
      return "user";
  }
}
