import apiService from "../..";

export const apiGetSubTests = () => {
  return apiService.getData(`/LabSubTests/All`);
};

export const apiGetSubTest = (id: string) => {
  return apiService.getData(`/LabSubTests/${id}`);
};

export const apiCreateSubTest = (data: any) => {
  return apiService.postData(`/LabSubTests`, data);
};

export const apiUpdateSubTest = (id: string, data: any) => {
  return apiService.putData(`/LabSubTests/${id}`, data);
};
