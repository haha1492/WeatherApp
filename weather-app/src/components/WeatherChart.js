import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// ✅ Register the required components for Chart.js to work
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const WeatherChart = ({ forecast }) => {
  if (!forecast || forecast.length === 0) return <p>No forecast data available</p>;

  console.log("Chart Forecast Data:", forecast); // ✅ Debugging Log

  // Extract labels (time) and temperature data
  const labels = forecast.slice(0, 8).map((item) =>
    new Date(item.dt * 1000).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  );
  const temperatures = forecast.slice(0, 8).map((item) => item.main.temp);

  const data = {
    labels,
    datasets: [
      {
        label: "Temperature (°C)",
        data: temperatures,
        borderColor: "rgb(75, 192, 192)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        fill: true,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
      },
    },
  };

  return (
    <div className="chart-container">
      <h3>Temperature Trend (Next Hours)</h3>
      <Line data={data} options={options} />
    </div>
  );
};

export default WeatherChart;