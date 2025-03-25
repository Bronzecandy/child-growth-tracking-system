import { Routes, Route, Navigate } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";

// Import Pages
import Home from "../pages/Home";
import User from "../pages/User";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Dashboard from "../pages/Dashboard";
import NotFound from "../pages/NotFound";
import MembershipDashboard from "../pages/MembershipDashboard";
import PostDashboard from "../pages/PostDashboard";
import RequestDashboard from "../pages/RequestDashboard";
import ConsultationsDashboard from "../pages/ConsultationsDashboard";

const AppRoutes = () => {
  return (
    <Routes>
      {/* Redirect từ trang chủ "/" đến Dashboard */}
      <Route path="/" element={<Navigate to="/dashboard" replace />} />

      {/* Public Routes */}
      <Route path="/login" element={<Login />} />
     
      {/* Private Routes */}
      <Route path="/dashboard" element={<PrivateRoute element={<Dashboard />} />} />
      <Route path="/dashboard/users" element={<PrivateRoute element={<User />} />} />
      <Route path="/dashboard/membership-packages" element={<PrivateRoute element={<MembershipDashboard />} />} />
      <Route path="/dashboard/posts" element={<PrivateRoute element={<PostDashboard />} />} />
      <Route path="/dashboard/requests" element={<PrivateRoute element={<RequestDashboard />} />} />
      <Route path="/dashboard/consultations" element={<PrivateRoute element={<ConsultationsDashboard />} />} />

      {/* 404 Page */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
