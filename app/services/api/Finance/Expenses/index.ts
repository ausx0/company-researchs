import apiService from "@/app/services";

export const apiGetExpenses = () => {
  return apiService.getData(`/Expenses/All`);
};

export const apiGetExpense = (id: string) => {
  return apiService.getData(`/Expenses/${id}`);
};

export const apiPostExpense = (data: any) => {
  return apiService.postData(`/Expenses`, data);
};

export const apiPutExpense = (id: string, data: any) => {
  return apiService.putData(`/Expenses/${id}`, data);
};

export const apiDeleteExpense = (data: any) => {
  return apiService.DestroyData(`/Expenses`, data);
};
// Compare this snippet from app/services/api/index.ts:
