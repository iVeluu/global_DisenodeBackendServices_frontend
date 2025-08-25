import axios from "axios";

const baseURL = import.meta.env.VITE_API_URL;
if (!baseURL) console.error("VITE_API_URL no está definido");
export const api = axios.create({ baseURL });

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("AUTH_TOKEN");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
