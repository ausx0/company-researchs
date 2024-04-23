import apiService from "@/app/services";

export const apiGetLabOrderInvoices = (orderId: string | undefined) => {
  return apiService.getData(`/LabOrderInvoices/All?Order_id=${orderId}`);
};
