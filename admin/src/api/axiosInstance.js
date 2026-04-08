import axios from "axios";

// Axios instance for API calls
const axiosInstance = axios.create({
  // baseURL: "http://localhost:5003/api", // Backend API URL
  baseURL: "https://api.eduorbix.com/api", // Production URL
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor for debugging
axiosInstance.interceptors.request.use(
  (config) => {
    console.log(`📤 ${config.method.toUpperCase()} request to: ${config.baseURL}${config.url}`);
    console.log("Request data:", config.data);
    return config;
  },
  (error) => {
    console.error("Request error:", error);
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
axiosInstance.interceptors.response.use(
  (response) => {
    console.log(`📥 Response from ${response.config.url}:`, response.status);
    return response;
  },
  (error) => {
    console.error("API Error:", error.response?.data || error.message);
    console.error("Full error:", error);
    return Promise.reject(error);
  }
);

export default axiosInstance;