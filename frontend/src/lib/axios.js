import axios from "axios";
import { useAuthStore } from "@/stores/useAuthStore";
import { useAdminAuthStore } from "@/stores/useAdminAuthStore";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

api.interceptors.request.use(
  (config) => {
    const userToken = useAuthStore.getState().accessToken;
    const adminToken = useAdminAuthStore.getState().accessToken;

    const token = adminToken || userToken;

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error),
);

export default api;