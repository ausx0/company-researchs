import apiService from "@/app/services";

export const apiSampleResultsEdit = (data: any) => {
  return apiService.patchData(`/LabSampleResults`, data);
};
