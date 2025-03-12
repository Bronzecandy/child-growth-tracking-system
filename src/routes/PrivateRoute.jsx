import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import Loading from "../components/Loading";
import DashboardLayout from "../layouts/DashboardLayout";
const PrivateRoute = ({ element }) => {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return <Loading></Loading>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (user.role === 1 || user.role === 2) {
    return <DashboardLayout>{element}</DashboardLayout>;
  }

  return <Navigate to="/" replace />;
};

export default PrivateRoute;
