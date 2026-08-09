import api from "@/services/api/axios";
export const addToCart = (id) => api.post(`/cart/${id}`);
export const getCart = () => api.get("/cart");
export const deleteFromCart = (id) => api.delete(`/cart/${id}`);
export const updateCartQuantity = (payload) =>
  api.patch(`cart/quantity`, payload);
