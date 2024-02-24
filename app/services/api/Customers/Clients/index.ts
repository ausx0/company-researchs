import apiService from "@/app/services";

export const apiGetClients = () => {
  return apiService.getData(`/LabClients/All`);
};

export const apiPostClient = (data: any) => {
  return apiService.postData(`/LabClients`, data);
};

export const apiDeleteClient = (data: any) => {
  return apiService.DestroyData(`/LabClients`, data);
};
