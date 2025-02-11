import { Navigate } from "react-router-dom";

const PrivateRoute = ({ element }) => {
  const isAuthenticated = !!localStorage.getItem("token"); // Giả sử dùng token lưu trong localStorage

  return isAuthenticated ? element : <Navigate to="/login" replace />;
};

export default PrivateRoute;
