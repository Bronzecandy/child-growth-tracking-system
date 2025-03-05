import React from "react";
import Sidebar from "./SideBar";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-6" >
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
