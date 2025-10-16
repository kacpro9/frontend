import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3005",
});

api.interceptors.request.use((config) => {
  const stored = localStorage.getItem("user");
  const token = stored ? JSON.parse(stored)?.token : null;

  if (token) {
    config.headers = config.headers || {};
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default api;
