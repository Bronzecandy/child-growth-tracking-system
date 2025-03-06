import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FiHome, FiGrid } from "react-icons/fi";

const Sidebar = () => {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState(location.pathname);

  return (
    <div className="fixed h-screen w-64 bg-gray-600 text-white flex flex-col">
      {/* Logo / Title */}
      <div className="flex items-center p-4 text-lg font-semibold">
        Menu
      </div>

      {/* Menu Items */}
      <ul className="mt-4 space-y-2">
        <li>
          <Link
            to="/"
            className={`flex items-center p-3 rounded-md gap-4 transition-all duration-300 
              ${
                activeTab === "/" ? "bg-gray-700" : "hover:bg-gray-700"
              }`}
            onClick={() => setActiveTab("/")}
          >
            <FiHome className="w-6 h-6" />
            <span>Home</span>
          </Link>
        </li>
        <li>
          <Link
            to="/dashboard"
            className={`flex items-center p-3 rounded-md gap-4 transition-all duration-300 
              ${
                activeTab === "/dashboard" ? "bg-gray-700" : "hover:bg-gray-700"
              }`}
            onClick={() => setActiveTab("/dashboard")}
          >
            <FiGrid className="w-6 h-6" />
            <span>Dashboard</span>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
