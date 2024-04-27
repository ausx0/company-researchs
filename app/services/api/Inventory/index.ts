import { Inventory } from "@/app/(root)/(Admin)/stock/inventory/components/InventoryModalForm";
import apiService from "@/app/services";

export const apiGetAllInventory = () => {
  return apiService.getData(`/Inventory/All`);
};

export const apiGetInventory = (id: any) => {
  return apiService.getData(`/Inventory?Inventory_id=${id}`);
};

export const apiPostInventory = (data: any) => {
  return apiService.postData(`/Inventory`, data);
};

export const apiSaveInventory = async (Inventory: Inventory) => {
  if (Inventory.ID) {
    const response = await apiService.putData(`/Inventory`, {
      Inventory_id: Inventory.ID,
      ...Inventory,
    });
    return response.data;
  } else {
    const response = await apiService.postData("/Inventory", Inventory);
    return response.data;
  }
};

export const apiPutInventory = (id: string, data: any) => {
  return apiService.putData(`/Inventory/${id}`, data);
};

export const apiDeleteInventory = (data: any) => {
  return apiService.DestroyData(`/Inventory`, data);
};
