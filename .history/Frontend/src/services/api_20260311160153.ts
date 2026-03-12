import axios from "axios";
import toast from "react-hot-toast";

const API = axios.create({
  baseURL: "http://localhost:5000/api"
});

// Request interceptor - auto-inject token
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor - handle auth failures
API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/login";
      toast.error("Session expired. Please login again.");
    } else if (error.response?.status === 403) {
      toast.error("Unauthorized action");
    } else if (error.response?.data?.message) {
      toast.error(error.response.data.message);
    } else if (error.message === "Network Error") {
      toast.error("Network error. Check your connection.");
    } else {
      toast.error("Something went wrong");
    }
    return Promise.reject(error);
  }
);

export default API;