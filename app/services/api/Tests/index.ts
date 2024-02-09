import apiService from "../..";

export const apiGetTests = () => {
  return apiService.getData(`/LabTests/All`);
};

export const apiGetTest = (id: string) => {
  return apiService.getData(`/LabTests/${id}`);
};

export const apiPostTest = (data: any) => {
  return apiService.postData(`/LabTests`, data);
};
