import { createContext, useState, useEffect } from "react";
import api from "../utils/api";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await api.get("/auth/me");
        setUser(data.user);
      } catch (error) {
        if (error.response?.status === 401) {
          console.log("Access token hết hạn, thử refresh token...");
          await refreshAccessToken();
        } 
        // else if (error.response?.status === 403) {
        //   await logout();
        // }
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  // Gửi yêu cầu làm mới token
  const refreshAccessToken = async () => {
    try {
      await api.post("/auth/renew-access-token");
      const { data } = await api.get("/auth/me"); // Gọi lại /auth/me với token mới
      setUser(data.user);
    } catch (error) {
      console.error("Lỗi refresh token:", error);
      //logout();
    }
  };

  const login = async (email, password) => {
    try {
      const res = await api.post("/auth/login", { email, password });
      const { data } = await api.get("/auth/me");
      //setUser(data.user);
      if (data.user.role === 1 || data.user.role === 2) {
        navigate("/dashboard");
      } else {
        navigate("/");
      }
      return res.data;
    } catch (error) {
      console.error("Lỗi đăng nhập:", error);
      throw error;
    }
  };
  const register = async (name, email, password) => {
    try {
      const res = await api.post("/auth/signup", { name, email, password });
      return res.data;
    } catch (error) {
      console.error("Lỗi đăng ký:", error);
      throw error;
    }
  };

  const logout = async () => {
    await api.post("/auth/logout");
    setUser(null);
    navigate('/login')
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
