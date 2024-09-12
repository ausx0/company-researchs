import apiService from "@/app/services";

// Fetch item units by item ID
export const aptGetPurchases = async () => {
  return apiService.getData(`/Purchases/All`);
};

export const apiGetPurchase = (ID: number | string | undefined) => {
  return apiService.getData(`/purchases?Purchase_id=${ID}`);
};

export const apiDeletePurchase = (purchaseId: any) => {
  return apiService.DestroyData(`/purchases`, purchaseId);
};
