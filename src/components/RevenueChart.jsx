import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import api from "../utils/api";
import { Chart as ChartJS,Filler, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement,Filler, Title, Tooltip, Legend);

const RevenueChart = () => {
  const currentYear = new Date().getFullYear(); // Lấy năm hiện tại
  const [data, setData] = useState({ labels: [], datasets: [] });
  const [time, setTime] = useState("YEAR"); // YEAR, MONTH, WEEK
  const [unit, setUnit] = useState("VND"); // USD, VND
  const [value, setValue] = useState(currentYear); // Mặc định là năm hiện tại

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get("/statistics/revenue", {
          params: { time, unit, value: time === "YEAR" || time === "MONTH" ? value : undefined },
        });

        const revenueData = response.data.Revenue;

        // Xử lý labels
        let labels;
        if (time === "YEAR") {
          labels = [...new Set(revenueData.map((item) => `Tháng ${item.Date.split("-")[1]}`))];
        } else {
          labels = revenueData.map((item) => item.Date.split("-").slice(1).reverse().join("/"));
        }

        const values = revenueData.map((item) => item.Revenue);

        setData({
          labels,
          datasets: [
            {
              label:
                time === "WEEK"
                  ? `Revenue (Week)`
                  : `Revenue (${time}) - ${time === "YEAR" ? value : `Tháng ${value} Năm ${currentYear}`}`,
              data: values,
              borderColor: "blue",
              backgroundColor: "rgba(0, 0, 255, 0.3)",
              fill: true,
            },
          ],
        });
      } catch (error) {
        console.error("Error fetching revenue data:", error);
      }
    };

    fetchData();
  }, [time, unit, value]);

  const handleTimeChange = (e) => {
    const newTime = e.target.value;
    setTime(newTime);

    // Reset `value` khi chuyển từ `YEAR` sang `MONTH`
    if (newTime === "MONTH") {
      setValue(1); // Tháng mặc định là 1
    } else if (newTime === "YEAR") {
      setValue(currentYear); // Reset lại năm hiện tại
    }
  };

  return (
    <div className="p-4">
      <div className="flex justify-between mb-4">
        {/* Chọn Time */}
        <select className="border p-2 rounded" value={time} onChange={handleTimeChange}>
          <option value="YEAR">Year</option>
          <option value="MONTH">Month</option>
          <option value="WEEK">Week</option>
        </select>

        {/* Chọn Unit */}
        <select className="border p-2 rounded" value={unit} onChange={(e) => setUnit(e.target.value)}>
          <option value="USD">USD</option>
          <option value="VND">VND</option>
        </select>

        {/* Chọn Value (chỉ hiển thị khi chọn YEAR hoặc MONTH) */}
        {(time === "YEAR" || time === "MONTH") && (
          <select className="border p-2 rounded" value={value} onChange={(e) => setValue(e.target.value)}>
            {time === "YEAR"
              ? Array.from({ length: 5 }, (_, i) => currentYear - i).map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))
              : Array.from({ length: 12 }, (_, i) => i + 1).map((month) => (
                  <option key={month} value={month}>
                    Tháng {month}
                  </option>
                ))}
          </select>
        )}
      </div>

      {/* Hiển thị Label */}
      <h2 className="text-center font-semibold text-lg mb-2">
         {time === "WEEK" ? "Revenue (Week)" : `Revenue (${time}) - ${time === "YEAR" ? value : `Tháng ${value} Năm ${currentYear}`}`}
      </h2>

      <Line data={data} />
    </div>
  );
};

export default RevenueChart;
