import apiService from "@/app/services";

export const apiGetAllPendingPayments = () => {
  return apiService.getData(`/LabOrders/All/PendingPayment`);
};
