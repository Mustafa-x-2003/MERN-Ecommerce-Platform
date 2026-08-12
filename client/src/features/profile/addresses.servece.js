import api from "@/services/api/axios";
export const getAddress = () => api.get("/address");
export const getDefaultAddress = () => api.get("/address/default");
export const deleteAddress = (id) => api.delete(`/address/${id}`);
export const updateAddress = (id, payload) =>
  api.patch(`/address/${id}`, payload);
export const addAddress = (payload) => api.post("/address", payload);
export const setDefaultAddress = (id) => api.post(`/address/${id}`);
