import axios from "axios";

// Axios instance for API calls
const axiosInstance = axios.create({
  // baseURL: "http://localhost:5003/api", // Backend API URL
  baseURL: "https://api.eduorbix.com/api", // Production URL
  headers: {
    "Content-Type": "application/json",
  },
});

// Optional: interceptors for error handling
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export default axiosInstance;
