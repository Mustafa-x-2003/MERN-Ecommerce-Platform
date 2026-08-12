import api from "@/services/api/axios";

export const getProducts = (search) =>
  api.get(`/products`, {
    params: search,
  });
export const getProduct = (id) => api.get(`/products/${id}`);

export const getCategory = () => api.get("/category");
