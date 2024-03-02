import apiService from "@/app/services";

export const apiGetExpenses = () => {
  return apiService.getData(`/LabExpenses/All`);
};

export const apiGetExpense = (id: string) => {
  return apiService.getData(`/LabExpenses/${id}`);
};

export const apiPostExpense = (data: any) => {
  return apiService.postData(`/LabExpenses`, data);
};

export const apiPutExpense = (id: string, data: any) => {
  return apiService.putData(`/LabExpenses/${id}`, data);
};

export const apiDeleteExpense = (data: any) => {
  return apiService.DestroyData(`/LabExpenses`, data);
};
// Compare this snippet from app/services/api/index.ts:
