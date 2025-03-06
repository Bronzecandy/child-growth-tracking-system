import React from "react";
import RecentOrders from "../components/RecentOrders";

const Dashboard = () => {
  return (
    <div className="p-6 bg-gray-100 min-h-screen rounded-lg ml-64">

      <h1 className="text-3xl font-bold text-gray-800 mb-6">📊 Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <div className="bg-white p-5 rounded-lg shadow-md">
          <p className="text-gray-500">Total Orders</p>
          <h3 className="text-2xl font-semibold">245</h3>
        </div>
        <div className="bg-white p-5 rounded-lg shadow-md">
          <p className="text-gray-500">Revenue</p>
          <h3 className="text-2xl font-semibold">$52,300</h3>
        </div>
        <div className="bg-white p-5 rounded-lg shadow-md">
          <p className="text-gray-500">Pending Orders</p>
          <h3 className="text-2xl font-semibold">14</h3>
        </div>
        <div className="bg-white p-5 rounded-lg shadow-md">
          <p className="text-gray-500">Delivered Orders</p>
          <h3 className="text-2xl font-semibold">231</h3>
        </div>
      </div>

      {/* Recent Orders */}
      <RecentOrders />
    </div>
  );
};

export default Dashboard;
