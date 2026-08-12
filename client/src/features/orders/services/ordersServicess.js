import api from "@/services/api/axios";

export const createOrder = (payload) => api.post("/orders", payload);
export const getOrders = () => api.get("/orders");
export const getOrder = (id) => api.get(`/orders/${id}`);
