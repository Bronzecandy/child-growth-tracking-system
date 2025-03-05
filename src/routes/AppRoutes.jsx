import { Routes, Route } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";
import Layout from "../layout/Layout";

// Import Pages
import Home from "../pages/Home";
import Dashboard from "../pages/Dashboard";
import Login from "../pages/Login";
import Register from "../pages/Register";
import NotFound from "../pages/NotFound";

const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<Layout />}>

      {/* Public Routes */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<PublicRoute element={<Login />} />} />
      <Route path="/register" element={<PublicRoute element={<Register />} />} />
      <Route path="/dashboard" element={<Dashboard />} />

      {/* Private Routes */}
      {/* <Route path="/dashboard" element={<PrivateRoute element={<Dashboard />} />} /> */}

      {/* Free Routes (Ai cũng xem được) */}
      <Route path="/" element={<Home />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
