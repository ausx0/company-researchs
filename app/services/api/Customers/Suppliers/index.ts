import apiService from "@/app/services";

export const apiGetSuppliers = () => {
  return apiService.getData(`/Suppliers/All`);
};

export const apiPostSupplier = (data: any) => {
  return apiService.postData(`/Suppliers`, data);
};

export const apiDeleteSupplier = (data: any) => {
  return apiService.DestroyData(`/Suppliers`, data);
};
