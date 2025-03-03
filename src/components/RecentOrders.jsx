import React from "react";

const RecentOrders = () => {
  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white px-4 pb-3 pt-4 dark:border-gray-800 dark:bg-white/[0.03] sm:px-6">
      <div className="flex flex-col gap-2 mb-4 sm:flex-row sm:items-center sm:justify-between">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
          Recent Orders
        </h3>
      </div>
      <div className="max-w-full overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-gray-200 dark:border-gray-800">
              <th className="text-left py-3 text-gray-500 dark:text-gray-400">Order ID</th>
              <th className="text-left py-3 text-gray-500 dark:text-gray-400">Customer</th>
              <th className="text-left py-3 text-gray-500 dark:text-gray-400">Date</th>
              <th className="text-left py-3 text-gray-500 dark:text-gray-400">Status</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-gray-200 dark:border-gray-800">
              <td className="py-3 text-gray-800 dark:text-gray-400">#001</td>
              <td className="py-3 text-gray-500 dark:text-gray-400">John Doe</td>
              <td className="py-3 text-gray-500 dark:text-gray-400">02/03/2025</td>
              <td className="py-3">
                <span className="px-2 py-1 rounded text-sm font-semibold bg-green-100 text-green-600">
                  Delivered
                </span>
              </td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-800">
              <td className="py-3 text-gray-800 dark:text-gray-400">#002</td>
              <td className="py-3 text-gray-500 dark:text-gray-400">Jane Smith</td>
              <td className="py-3 text-gray-500 dark:text-gray-400">01/03/2025</td>
              <td className="py-3">
                <span className="px-2 py-1 rounded text-sm font-semibold bg-yellow-100 text-yellow-600">
                  Pending
                </span>
              </td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-800">
              <td className="py-3 text-gray-800 dark:text-gray-400">#003</td>
              <td className="py-3 text-gray-500 dark:text-gray-400">Alice Johnson</td>
              <td className="py-3 text-gray-500 dark:text-gray-400">28/02/2025</td>
              <td className="py-3">
                <span className="px-2 py-1 rounded text-sm font-semibold bg-red-100 text-red-600">
                  Canceled
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecentOrders;
