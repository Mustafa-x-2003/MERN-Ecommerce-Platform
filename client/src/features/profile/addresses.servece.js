import api from "@/services/api/axios";
export const getAddress = () => api.get("/address");

