import { OrderPaymentSchema } from "@/app/(root)/(Admin)/orders/[orderId]/validation/orderSchema";
import apiService from "@/app/services";
import { z } from "zod";

export const apiGetTestsBySample = (sampleId: string) => {
  return apiService.getData(`/LabTests/Filter?Sample_id=${sampleId}`);
};

export const apiGetSubTestsByTest = (testId: string) => {
  return apiService.getData(`/LabSubTests/Filter?Test_id=${testId}`);
};

export const apiAddOrderSample = (data: any) => {
  return apiService.postJsonData(`/LabOrderSamples`, data);
};

export const apiFinishOrder = async (
  data: z.infer<typeof OrderPaymentSchema>
) => {
  return apiService.postData(`/LabOrders/Finish`, data);
};
