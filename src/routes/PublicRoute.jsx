import { Navigate } from "react-router-dom";

const PublicRoute = ({ element }) => {
  const isAuthenticated = !!localStorage.getItem("token");

  return isAuthenticated ? <Navigate to="/" replace /> : element;
};

export default PublicRoute;
