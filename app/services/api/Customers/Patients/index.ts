import apiService from "@/app/services";

export const apiGetPatients = () => {
  return apiService.getData(`/LabPatients/All`);
};

export const apiGetPatient = (id: string) => {
  return apiService.getData(`/LabPatients/${id}`);
};

export const apiPostPatient = (data: any) => {
  return apiService.postData(`/LabPatients`, data);
};

export const apiPutPatient = (id: string, data: any) => {
  return apiService.putData(`/LabPatients/${id}`, data);
};

export const apiDeletePatient = (data: any) => {
  return apiService.DestroyData(`/LabPatients`, data);
};
// Compare this snippet from app/services/api/index.ts:
