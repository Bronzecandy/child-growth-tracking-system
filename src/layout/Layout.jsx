import React from "react";
import Sidebar from "./SideBar";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 min-h-screen bg-gray-100 p-8">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
