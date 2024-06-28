import { axiosInstance } from "@/lib";

const PostOptions = {
  method: "POST",
  headers: {
    "Content-Type": "multipart/form-data",
  },
};

const PutOptions = {
  method: "PUT",
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

const PatchOptions = {
  method: "PATCH",
  headers: { "Content-Type": "application/json" },
};

const getData = async (path: string, params?: any) => {
  try {
    const response = await axiosInstance.get(path, { params });
    return response.data;
  } catch (error: any) {
    // .error({ error });
    throw new Error(error.message);
  }
};
const getResponse = async (path: string) => {
  try {
    const response = await axiosInstance.get(path);
    return response;
  } catch (error: any) {
    // .error({ error });
    throw new Error(error.message);
  }
};

const postData = async (path: string, data: any) => {
  try {
    const response = await axiosInstance.post(path, data, PostOptions);
    return response.data;
  } catch (error: any) {
    // .error({ error });
    throw new Error(error.message);
  }
};

const postJsonData = async (path: string, data: any) => {
  try {
    const response = await axiosInstance.post(path, data, {
      headers: { "Content-Type": "application/json" },
    });
    return response.data;
  } catch (error: any) {
    // .error({ error });
    throw new Error(error.message);
  }
};

const putJsonData = async (path: string, data: any) => {
  try {
    const response = await axiosInstance.put(path, data, {
      headers: { "Content-Type": "application/json" },
    });
    return response.data;
  } catch (error: any) {
    // .error({ error });
    throw new Error(error.message);
  }
};

const putData = async (path: string, data: any) => {
  try {
    const response = await axiosInstance.put(path, data, PutOptions);
    return response.data;
  } catch (error: any) {
    // .error({ error });
    throw new Error(error.message);
  }
};

const patchData = async (path: string, data: any) => {
  try {
    const response = await axiosInstance.patch(path, data, PatchOptions);
    return response.data;
  } catch (error: any) {
    // .error({ error });
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
    // .error({ error });
    throw new Error(error.message);
  }
};

const apiService = {
  getData,
  getResponse,
  postData,
  putData,
  DestroyData,
  postJsonData,
  putJsonData,
  patchData,
};

export default apiService;
