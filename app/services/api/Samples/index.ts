import apiService from "../..";

export const apiGetSamples = () => {
  return apiService.getData(`/LabSamples/All`);
};

export const apiGetSample = (id: string) => {
  return apiService.getData(`/LabSamples/${id}`);
};

export const apiPostSample = (data: any) => {
  return apiService.postData(`/LabSamples`, data);
};

// export const apiPutSample = (id: string, data: any) => {
//   return apiService.putData(`/LabSamples/${id}`, data);
// };

export const apiDeleteSample = (data: any) => {
  return apiService.DestroyData(`/LabSamples`, data);
};
