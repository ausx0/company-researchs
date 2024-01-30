import api from "../../Endpoints";

const Tests = {
  get: async (data?: any) => {
    try {
      const response = await api.get("/LabTests/All", data);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  },
  post: async (data: any) => {
    try {
      const response = await api.post("/AllTests", data);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  },

  put: async (data: any) => {
    try {
      const response = await api.put("/AllTests", data);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  },
  // Add more methods as needed
};

export default Tests;
