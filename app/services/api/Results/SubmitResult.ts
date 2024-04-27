import apiService from "../..";

export const apiCheckResult = (data: any) => {
  return apiService.postData(`/CheckResult`, data);
};
