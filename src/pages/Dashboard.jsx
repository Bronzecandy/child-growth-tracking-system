import React from 'react'
import RevenueChart from '../components/RevenueChart'
import UserChart from '../components/UserChart'
import ReceiptTable from '../components/ReceiptTable'
function Dashboard() {
  return (
    <div className="w-full p-2 space-y-4 ">
      {/* Hàng 1 */}
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-9  border-2 border-gray-200 rounded-lg">
          <RevenueChart></RevenueChart>
        </div>
        <div className="col-span-3 flex flex-col gap-4 h-full">
          <div className="p-4 border-2 border-gray-200 rounded-lg flex-1 flex items-center justify-center">
            1/3
          </div>
          <div className="p-4 border-2 border-gray-200 rounded-lg flex-1 flex items-center justify-center">
            2/3
          </div>
          <div className="p-4 border-2 border-gray-200 rounded-lg flex-1 flex items-center justify-center">
            3/3
          </div>
        </div>
      </div>
      {/* Hàng 2 */}
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-6 border-2 border-gray-200 rounded-lg">
          <ReceiptTable></ReceiptTable>
        </div>
        <div className="col-span-6 border-2 border-gray-200 rounded-lg">
          <UserChart></UserChart>
        </div>
      </div>
    </div>
  )
}

export default Dashboard