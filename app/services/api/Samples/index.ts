import { Sample } from "@/app/(root)/(Admin)/test-devices/samples/components/SampleModalForm";
import apiService from "../..";

export const apiGetSamples = () => {
  return apiService.getData(`/LabSamples/All`);
};

export const apiGetSample = (id: string) => {
  return apiService.getData(`/LabSamples?Sample_id=${id}`);
};

export const apiPostSample = (data: any) => {
  return apiService.postData(`/LabSamples`, data);
};

export const apiSaveSample = async (sample: Sample) => {
  if (sample.ID) {
    const response = await apiService.putData(`/LabSamples`, {
      Sample_id: sample.ID,
      ...sample,
    });
    return response.data;
  } else {
    const response = await apiService.postData("/LabSamples", sample);
    return response.data;
  }
};
export const apiPutSample = (id: string, data: any) => {
  return apiService.putData(`/LabSamples/${id}`, data);
};

export const apiDeleteSample = (data: any) => {
  return apiService.DestroyData(`/LabSamples`, data);
};
