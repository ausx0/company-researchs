import apiService from "@/app/services";

export const apiSampleResultInfo = (Id: any) => {
  return apiService.getData(`/LabSampleResults?Sample_id=${Id}`);
};
