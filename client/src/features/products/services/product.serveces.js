import api from "@/services/api/axios";

export const getProducts = (search) =>
  api.get(`/products`, {
    params: search,
  });

export const getCategory = () => api.get("/category");
