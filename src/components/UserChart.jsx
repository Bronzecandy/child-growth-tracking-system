import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import api from "../utils/api";
import { Chart as ChartJS,Filler, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement,Filler, Title, Tooltip, Legend);

const UserChart = () => {
    const currentYear = new Date().getFullYear();
    const [data, setData] = useState({ labels: [], datasets: [] });
    const [time, setTime] = useState("YEAR"); // YEAR, MONTH, WEEK
    const [value, setValue] = useState(currentYear);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await api.get("/statistics/users", {
                    params: { time, value: time === "YEAR" || time === "MONTH" ? value : undefined },
                });

                const userData = response.data.NewUsers;

                // Xử lý labels
                let labels;
                if (time === "YEAR") {
                    labels = [...new Set(userData.map((item) => `Tháng ${item.Date.split("-")[1]}`))];
                } else {
                    labels = userData.map((item) => item.Date.split("-").slice(1).reverse().join("/"));
                }

                const values = userData.map((item) => item.newUsers);

                setData({
                    labels,
                    datasets: [
                        {
                            label:
                                time === "WEEK"
                                    ? `User Growth (Week)`
                                    : `User Growth (${time}) - ${time === "YEAR" ? value : `Tháng ${value} Năm ${currentYear}`}`,
                            data: values,
                            borderColor: "green",
                            backgroundColor: "rgba(0, 255, 0, 0.3)",
                            fill: true,
                        },
                    ],
                });
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };

        fetchData();
    }, [time, value]);

    const handleTimeChange = (e) => {
        const newTime = e.target.value;
        setTime(newTime);

        // Reset `value` khi chuyển từ `YEAR` sang `MONTH`
        if (newTime === "MONTH") {
            setValue(1);
        } else if (newTime === "YEAR") {
            setValue(currentYear);
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
                {time === "WEEK" ? "User Growth (Week)" : `User Growth (${time}) - ${time === "YEAR" ? value : `Tháng ${value} Năm ${currentYear}`}`}
            </h2>

            <Line data={data} />
        </div>
    );
};

export default UserChart;
