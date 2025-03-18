import { Routes, Route } from "react-router-dom";
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
const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/login" element={<PublicRoute element={<Login />} />} />
      <Route path="/register" element={<PublicRoute element={<Register />} />} />

      {/* Private Routes */}
      <Route path="/dashboard" element={<PrivateRoute element={<Dashboard />} />} />

      <Route path="/dashboard/users" element={<PrivateRoute element={<User />} />} />
      <Route path="/dashboard/membership-packages" element={<PrivateRoute element={<MembershipDashboard />} />} />
      <Route path="/dashboard/posts" element={<PrivateRoute element={<PostDashboard />} />} />
      {/* Free Routes (Ai cũng xem được) */}
      <Route path="/" element={<Home />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
