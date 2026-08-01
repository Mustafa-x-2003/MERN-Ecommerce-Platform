import api from "../../services/api/axios";
export const register = (Payload) => api.post("/auth/register", Payload);
export const login = (Payload) => api.post("/auth/login", Payload);
export const logout = () => api.post("/auth/logout");
export const getProfile = () => api.get("/auth/me");
export const changePasswordApi = (Payload) => api.post("/auth/password", Payload);
