import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const PrivateRoute = ({ element }) => {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return <div className="text-center text-xl font-semibold">⏳ Đang tải...</div>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (user.role === 0 || user.role === 2) {
    return element;
  }

  return <Navigate to="/" replace />;
};

export default PrivateRoute;
