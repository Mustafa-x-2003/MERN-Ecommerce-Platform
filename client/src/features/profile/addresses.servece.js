import api from "@/services/api/axios";
export const getAddress = () => api.get("/address");
export const deleteAddress = (id) => api.delete(`/address/${id}`);
