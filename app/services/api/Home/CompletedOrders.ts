import apiService from "@/app/services";

export const apiGetAllCompletedOrders = () => {
  return apiService.getData(`/LabOrders/All/Completed`);
};
