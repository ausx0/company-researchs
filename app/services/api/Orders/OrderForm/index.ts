import apiService from "@/app/services";

export const apiGetTestsBySample = (sampleId: string) => {
  return apiService.getData(`/LabTests/Filter?Sample_id=${sampleId}`);
};

export const apiGetSubTestsByTest = (testId: string) => {
  return apiService.getData(`/LabSubTests/Filter?Test_id=${testId}`);
};

export const apiAddOrderTest = (data: any) => {
  return apiService.postJsonData(`/submit`, data);
};
