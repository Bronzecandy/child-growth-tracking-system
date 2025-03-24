import axios from "axios";

const API_URL = 'http://localhost:4000/api';

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    
    // Xử lý lỗi 401 (Unauthorized)
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      try {
        await axios.post(`${API_URL}/auth/renew-access-token`, {}, { withCredentials: true });
        return api(originalRequest);
      } catch (refreshError) {
        console.error("Refresh token failed:", refreshError);
        // Tạo lỗi đặc biệt để AuthContext xử lý logout
        const logoutError = new Error('Session expired');
        logoutError.shouldLogout = true;
        return Promise.reject(logoutError);
      }
    }
    
    // Xử lý lỗi 403 (Forbidden)
    if (error.response?.status === 403) {
      const logoutError = new Error('Forbidden access');
      logoutError.shouldLogout = true;
      return Promise.reject(logoutError);
    }
    
    return Promise.reject(error);
  }
);

export default api;