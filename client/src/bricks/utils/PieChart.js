import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as MyChart, Tooltip, Legend, ArcElement } from "chart.js";

MyChart.register(Tooltip, Legend, ArcElement);

const PieChart = ({ list }) => {
  const options = {
    plugins: {
      legend: {
        display: true,
        labels: {
          font: {
            size: 18, // Adjust the font size of the legend
          },
        },
        paddingTop: 15,
      },
    },
  };
  let items = [];
  let solvedItems = 0;
  let unsolvedItems = 0;
  list.items.map((item) => {
    item.isSolved ? (solvedItems += 1) : (unsolvedItems += 1);
  });
  items.push(solvedItems);
  items.push(unsolvedItems);

  const pieChartData = {
    labels: ["solved items", "unsolved items"],
    datasets: [
      {
        label: "Items per list graph",
        data: items,
        backgroundColor: ["red", "yellow"],
      },
    ],
  };
  // to samé....

  return (
    <div
      style={{
        height: "50vh",
        borderTop: "2px solid grey",
        marginTop: "15px",
        paddingTop: "10px",
      }}
    >
      <Pie options={options} data={pieChartData} />;
    </div>
  );
};

export default PieChart;
