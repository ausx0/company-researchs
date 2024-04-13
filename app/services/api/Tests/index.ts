import { Test } from "@/app/(root)/(Admin)/test-devices/tests/components/TestModalForm";
import apiService from "../..";

export const apiGetTests = () => {
  return apiService.getData(`/LabTests/All`);
};

export const apiGetTest = (id: string) => {
  return apiService.getData(`/LabTests?Test_id=${id}`);
};

export const apiPostTest = (data: any) => {
  return apiService.postData(`/LabTests`, data);
};

export const apiSaveTest = async (test: Test) => {
  if (test.ID) {
    const response = await apiService.putData(`/LabTests`, {
      Test_id: test.ID,
      ...test,
    });
    return response.data;
  } else {
    const response = await apiService.postData("/LabTests", test);
    return response.data;
  }
};

export const apiPutTest = (id: string, data: any) => {
  return apiService.putData(`/LabTests/${id}`, data);
};

export const apiDeleteTest = (data: any) => {
  return apiService.DestroyData(`/LabTests`, data);
};
