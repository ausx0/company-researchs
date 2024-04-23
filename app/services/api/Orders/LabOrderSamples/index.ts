import apiService from "@/app/services";

export const apiGetLabOrderSamples = (orderId: string | undefined) => {
  return apiService.getData(`/LabOrderSamples/All?Order_id=${orderId}`);
};
