import React, { useEffect, useState } from "react";
import RevenueChart from "../components/RevenueChart";
import UserChart from "../components/UserChart";
import ReceiptTable from "../components/ReceiptTable";
import api from "../utils/api";

function Dashboard() {
  const [dailyRevenue, setDailyRevenue] = useState(null);
  const [newUsers, setNewUsers] = useState(null);
  const [yearlyRevenue, setYearlyRevenue] = useState(null);

  useEffect(() => {
    // Lấy doanh thu trong ngày
    const fetchDailyRevenue = async () => {
      try {
        const response = await api.get("/statistics/revenue", {
          params: { time: "DAY", unit: "VND" },
        });
        const totalRevenue = response.data.Revenue.reduce((acc, cur) => acc + cur.Revenue, 0);
        setDailyRevenue(totalRevenue);
      } catch (error) {
        console.error("Error fetching daily revenue:", error);
      }
    };

    // Lấy doanh thu trong năm
    const fetchYearRevenue = async () => {
      try {
        const response = await api.get("/statistics/revenue", {
          params: { time: "YEAR", unit: "VND" },
        });
        const totalRevenue = response.data.Revenue.reduce((acc, cur) => acc + cur.Revenue, 0);
        setYearlyRevenue(totalRevenue);
      } catch (error) {
        console.error("Error fetching yearly revenue:", error);
      }
    };

    // Lấy số lượng user mới trong ngày
    const fetchNewUsers = async () => {
      try {
        const response = await api.get("/statistics/users", {
          params: { time: "DAY" },
        });
        const totalUsers = response.data.NewUsers.reduce((acc, cur) => acc + cur.newUsers, 0);
        setNewUsers(totalUsers);
      } catch (error) {
        console.error("Error fetching new users:", error);
      }
    };

    fetchDailyRevenue();
    fetchYearRevenue();
    fetchNewUsers();
  }, []);

  return (
    <div className="w-full p-2 space-y-4">
      {/* Hàng 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        <div className="lg:col-span-9 border-2 border-gray-200 rounded-lg">
          <RevenueChart />
        </div>
        <div className="lg:col-span-3 flex flex-col gap-4">
          {/* Revenue trong ngày */}
          <div className="p-4 border-2 border-gray-200 rounded-lg flex-1 flex flex-col items-center justify-center">
            <h2 className="text-lg font-semibold text-gray-700">Today Revenue (VND)</h2>
            <p className="text-2xl font-bold text-green-600">
              {dailyRevenue !== null ? dailyRevenue.toLocaleString("vi-VN") : "..."}
            </p>
          </div>
          {/* Revenue trong năm */}
          <div className="p-4 border-2 border-gray-200 rounded-lg flex-1 flex flex-col items-center justify-center">
            <h2 className="text-lg font-semibold text-gray-700">This Year Revenue (VND)</h2>
            <p className="text-2xl font-bold text-purple-600">
              {yearlyRevenue !== null ? yearlyRevenue.toLocaleString("vi-VN") : "..."}
            </p>
          </div>
          {/* New User trong ngày */}
          <div className="p-4 border-2 border-gray-200 rounded-lg flex-1 flex flex-col items-center justify-center">
            <h2 className="text-lg font-semibold text-gray-700">New Users</h2>
            <p className="text-2xl font-bold text-blue-600">
              {newUsers !== null ? newUsers : "..."}
            </p>
          </div>
        </div>
      </div>
      {/* Hàng 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        <div className="lg:col-span-6 border-2 p-4 border-gray-200 rounded-lg">
          <ReceiptTable />
        </div>
        <div className="lg:col-span-6 border-2 border-gray-200 rounded-lg">
          <UserChart />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
