import apiService from "@/app/services";

export const apiGetExpenseCategories = () => {
  return apiService.getData("ExpenseCategories/All");
};

export const apiDeleteExpenseCategory = (id: any) => {
  return apiService.DestroyData(`/ExpenseCategories`, id);
};

export const apiGetExpenseCategory = (id: string) => {
  return apiService.getData(`/ExpenseCategories?Category_id=${id}`);
};

export const apiSaveExpenseCategory = async (ExpenseCategory: any) => {
  if (ExpenseCategory.ID) {
    const response = await apiService.putData(
      `/ExpenseCategories?Category_id=${ExpenseCategory.ID}`,
      {
        ...ExpenseCategory,
      }
    );
    return response.data;
  } else {
    const response = await apiService.postData(
      "/ExpenseCategories",
      ExpenseCategory
    );
    return response.data;
  }
};
