import { Purchase } from "@/app/(root)/(Admin)/finance/purchases/components/PurchaseModalForm";
import apiService from "@/app/services";

export const apiGetPurchases = () => {
  return apiService.getData(`/LabPurchases/All`);
};

export const apiGetPurchase = (id: string) => {
  return apiService.getData(`/LabPurchases?Purchase_id=${id}`);
};

export const apiPostPurchase = (data: any) => {
  return apiService.postData(`/LabPurchases`, data);
};

export const apiSavePurchase = async (Purchase: Purchase) => {
  if (Purchase.ID) {
    const response = await apiService.putData(`/LabPurchases`, {
      Purchase_id: Purchase.ID,
      ...Purchase,
    });
    return response.data;
  } else {
    const response = await apiService.postData("/LabPurchases", Purchase);
    return response.data;
  }
};
export const apiPutPurchase = (id: string, data: any) => {
  return apiService.putData(`/LabPurchases/${id}`, data);
};

export const apiDeletePurchase = (data: any) => {
  return apiService.DestroyData(`/LabPurchases`, data);
};
