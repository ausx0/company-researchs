import { axiosInstance } from "@/lib";

const PostOptions = {
  method: "POST",
  headers: {
    "Content-Type": "multipart/form-data",
  },
};

const DeleteOptions = {
  method: "DELETE",
  headers: {
    "Content-Type": "multipart/form-data",
  },
};

const getData = async (path: string, params?: any) => {
  try {
    const response = await axiosInstance.get(path, { params });
    return response.data;
  } catch (error: any) {
    console.error({ error });
    throw new Error(error.message);
  }
};
const getResponse = async (path: string) => {
  try {
    const response = await axiosInstance.get(path);
    return response;
  } catch (error: any) {
    console.error({ error });
    throw new Error(error.message);
  }
};

const postData = async (path: string, data: any) => {
  try {
    const response = await axiosInstance.post(path, data, PostOptions);
    return response.data;
  } catch (error: any) {
    console.error({ error });
    throw new Error(error.message);
  }
};

const putData = async (path: string, data: any) => {
  try {
    const response = await axiosInstance.put(path, data);
    return response.data;
  } catch (error: any) {
    console.error({ error });
    throw new Error(error.message);
  }
};

const DestroyData = async (path: string, data: any) => {
  try {
    const formData = new FormData();
    Object.keys(data).forEach((key) => formData.append(key, data[key]));

    const response = await axiosInstance.delete(path, {
      data: formData,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  } catch (error: any) {
    console.error({ error });
    throw new Error(error.message);
  }
};

const apiService = {
  getData,
  getResponse,
  postData,
  putData,
  DestroyData,
};

export default apiService;
