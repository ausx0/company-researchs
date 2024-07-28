import apiService from "@/app/services";

export const apiGetAllPendingOrders = () => {
  return apiService.getData(`/LabOrders/All/Pending`);
};
