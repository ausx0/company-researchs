import apiService from "@/app/services";

export const apiGetAllCurrentOrders = () => {
  return apiService.getData(`/LabOrders/All/Current`);
};

// export const apiGetOrder = (ID: string) => {
//   return apiService.getData(`/LabOrders?Order_id=${ID}`);
// };

// export const apiCreateOrder = (data: any) => {
//   return apiService.postData(`/LabOrders/Create`, data);
// };

// export const apiCreateSampleOrder = (data: any) => {
//   return apiService.postJsonData(`/LabOrders/Create`, data);
// };

// export const apiUpdateOrder = (data: any, orderId: string) => {
//   return apiService.putJsonData(`/LabOrders/${orderId}`, data);
// };

// export const apiDeleteOrder = (orderId: string) => {
//   return apiService.DestroyData(`/LabOrders`, orderId);
// };
