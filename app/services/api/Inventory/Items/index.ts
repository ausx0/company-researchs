import { Item } from "@/app/(root)/(Admin)/stock/items/components/ItemModalForm";
import apiService from "@/app/services";

export const apiGetItems = () => {
  return apiService.getData(`/Items/All`);
};

export const apiGetItem = (id: string) => {
  return apiService.getData(`/Items?Item_id=${id}`);
};

export const apiPostItem = (data: any) => {
  return apiService.postData(`/Items`, data);
};

export const apiSaveItem = async (Item: Item) => {
  if (Item.ID) {
    const response = await apiService.putData(`/Items`, {
      Item_id: Item.ID,
      ...Item,
    });
    return response.data;
  } else {
    const response = await apiService.postData("/Items", Item);
    return response.data;
  }
};

export const apiPutItem = (id: string, data: any) => {
  return apiService.putData(`/Items/${id}`, data);
};

export const apiDeleteItem = (data: any) => {
  return apiService.DestroyData(`/Items`, data);
};
