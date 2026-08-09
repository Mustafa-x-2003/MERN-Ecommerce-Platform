import api from "@/services/api/axios";

export const addToWishlist = (id) => api.post(`/wishlist/${id}`);
export const getWishlist = () => api.get(`/wishlist`);
export const deleteFromWishlist = (id) => api.delete(`/wishlist/${id}`);
