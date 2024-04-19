import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  Title,
  BarElement,
} from "chart.js";

ChartJS.register(
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title
);

const BarChart = (props) => {
  const options = {
    maintainAspectRatio: false, // To make the chart responsive and adjust to its container
    plugins: {
      title: {
        display: true,
        text: "Items per list graph",
        font: {
          size: 30,
        },
        padding: 15,
        color: "var(primary-text-color)",
      },
      legend: {
        display: false,
        labels: {
          font: {
            size: 16, // Adjust the font size of the legend
          },
        },
      },
    },
    scales: {
      y: {
        ticks: {
          font: {
            size: 14, // Adjust the font size of the Y axis labels
          },
          color: "var(primary-text-color)",
        },
      },
      x: {
        ticks: {
          font: {
            size: 18, // Adjust the font size of the X axis labels
          },
          color: "var(primary-text-color)",
        },
      },
    },
  };

  const labels = [];
  const numberOfItems = [];
  props.lists.forEach((list) => {
    labels.push(list.title);
    let counter = 0;
    list.items.forEach((item) => {
      counter += 1;
    });
    numberOfItems.push(counter);
  });

  const lineChartData = {
    labels: labels,
    datasets: [
      {
        label: "Items per list graph",
        data: numberOfItems,
        backgroundColor: ["green"],
      },
    ],
  };

  return (
    <div style={{ height: "50vh", borderTop: "2px solid grey" }}>
      {" "}
      {/* Adjust the height as needed */}
      <Bar options={options} data={lineChartData} />
    </div>
  );
};

export default BarChart;
