import apiService from "../..";

export const apiGetNotifications = () => {
  return apiService.getData(`/Notifications`);
};
