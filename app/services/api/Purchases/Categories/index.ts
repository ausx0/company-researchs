import apiService from "../../..";

export const apiGetPurchaseCategories = () => {
  return apiService.getData(`/PurchaseCategories/All`);
};

export const apiDeletePurchaseCategory = (id: any) => {
  return apiService.DestroyData(`/PurchaseCategories`, id);
};

export const apiGetPurchaseCategory = (id: string) => {
  return apiService.getData(`/PurchaseCategories?Category_id=${id}`);
};

export const apiSavePurchaseCategory = async (PurchaseCategory: any) => {
  if (PurchaseCategory.ID) {
    const response = await apiService.putData(
      `/PurchaseCategories?Category_id=${PurchaseCategory.ID}`,
      {
        ...PurchaseCategory,
      }
    );
    return response.data;
  } else {
    const response = await apiService.postData(
      "/PurchaseCategories",
      PurchaseCategory
    );
    return response.data;
  }
};
