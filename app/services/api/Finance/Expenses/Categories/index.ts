import apiService from "@/app/services";

export const apiGetExpenseCategories = () => {
  return apiService.getData("ExpenseCategories/All");
};
