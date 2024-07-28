import apiService from "@/app/services";

export const apiGetAllAppointments = () => {
  return apiService.getData(`/Appointments/All`);
};
