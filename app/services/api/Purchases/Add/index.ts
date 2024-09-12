import apiService from "@/app/services";

// Fetch item units by item ID
export const apiItemUnitsGetByItemID = async (itemId: any) => {
  return apiService.getData(`/ItemUnits?Item_id=${itemId}`);
};

// Create a new purchase (POST request)
export const apiCreatePurchase = async (data: any) => {
  return apiService.postData(`/Purchases/Create`, data);
};

// Update an existing purchase (PUT request)
export const apiUpdatePurchaseById = async (id: any, data: any) => {
  return apiService.putData(`/Purchases?Purchase_id=${id}`, data);
};

// Get purchase by ID
export const apiGetPurchaseByID = async (id: any) => {
  return apiService.getData(`/Purchases?Purchase_id=${id}`);
};
