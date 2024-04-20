import apiService from "@/app/services";

export const apiGetLabOrderSamples = (orderId: string | undefined) => {
  return apiService.getData(`/LabTests/Filter?Order_id=${orderId}`);
};
