import React from "react";

// import AnimationChangePage from "../../layout/AnimationChangePage";
import DoughnutDashboard from "../../components/Doughnut";
import { useStyle } from "../../styles/useStyle";
import { Animation } from "../../components/Animation";

const dataChart = [
  {
    name: "User",
    data: {
      labels: ["darkorange", "ccc"],
      datasets: [
        {
          data: [4, 100],
          backgroundColor: ["darkorange", "#ccc"],
        },
      ],
      borderWidth: 1,
    },
  },
  {
    name: "User",
    data: {
      labels: ["darkorange", "ccc"],
      datasets: [
        {
          data: [4, 100],
          backgroundColor: ["darkorange", "#ccc"],
        },
      ],
      borderWidth: 1,
    },
  },
  {
    name: "User",
    data: {
      labels: ["darkorange", "ccc"],
      datasets: [
        {
          data: [4, 100],
          backgroundColor: ["darkorange", "#ccc"],
        },
      ],
      borderWidth: 1,
    },
  },
  {
    name: "User",
    data: {
      labels: ["darkorange", "ccc"],
      datasets: [
        {
          data: [4, 100],
          backgroundColor: ["darkorange", "#ccc"],
        },
      ],
      borderWidth: 1,
    },
  },
];

const options = {
  cutout: "80%",
  animation: {
    animateScale: true,
  },
  height: 205,
  width: 205,
  legend: {
    labels: { fontSize: 2 },
  },
};

const Chart = () => {
  const classes = useStyle();
  return (
    <>
      <DoughnutDashboard
        data={dataChart}
        options={options}
        classes={classes}
        animation={Animation}
      />
    </>
  );
};

export default Chart;
