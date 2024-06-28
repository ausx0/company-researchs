import apiService from "@/app/services";

export const apiGetLabOrderSamples = (orderId: string | undefined) => {
  return apiService.getData(`/LabOrderSamples/All?Order_id=${orderId}`);
};

export const apiDeleteOrderSample = (orderSampleId: any) => {
  return apiService.DestroyData(`/LabOrderSamples`, orderSampleId);
};

export const apiDeleteOrderSampleTest = (orderTestId: any) => {
  return apiService.DestroyData(`/LabOrderTests`, orderTestId);
};

export const apiDeleteOrderSampleSubTest = (orderSubTestId: any) => {
  return apiService.DestroyData(`/LabOrderSubTests`, orderSubTestId);
};
