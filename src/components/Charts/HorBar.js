import React from "react";
import { Bar as Bar1 } from "react-chartjs-2";
import Chart from "chart.js/auto";
import { useLocation } from "react-router-dom";
import "../../App.css";
import { useEffect, useState } from "react";
import "../../App.css";
import Bar from "./Bar";
// import BarChart from "react-bar-chart";

const margin = { top: 40, right: 40, bottom: 200, left: 100 };

const state = {
  labels: ["January", "February", "March", "April", "May"],
  datasets: [
    {
      label: "Rainfall",
      backgroundColor: "rgba(75,192,192,1)",
      borderColor: "rgba(0,0,0,1)",
      borderWidth: 2,
      data: [65, 59, 80, 81, 56],
    },
  ],
};

const HorBar = (props) => {
  const [barData, setBarData] = useState([]);
  const location = useLocation();
  const [x, setX] = useState([]);
  const [y, setY] = useState([]);

  useEffect(() => {
    fetchBar();
  }, []);

  const fetchBar = () => {
    var myHeaders = new Headers();
    myHeaders.append("x-auth-token", location.state.token);
    myHeaders.append("Content-Type", "application/json");

    Bar.chartObject.requestParam.dateRange.startDate = Date.parse(
      location.state.minDate
    ).toString();
    Bar.chartObject.requestParam.dateRange.endDate = Date.parse(
      location.state.maxDate
    ).toString();
    var raw = JSON.stringify(Bar);

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch("https://sigviewauth.sigmoid.io/api/v1/getData", requestOptions)
      .then((response) => response.text())
      .then((result) => {
        result = JSON.parse(result);
        if (result?.status?.statusCode === "200") {
          let tempResult = result?.result?.data;
          setBarData(tempResult);
          console.log(tempResult);
          tempResult.forEach((item) => {
            item.text = item.appSiteId;
            // setX([...x, item.text]);
            item.value = parseInt(item.impressions_offered);
            // setY([...y, item.value]);
          });
        }
      })
      .catch((error) => console.log("error", error));
    // console.log(x);
  };
  // const handleTest = () => {
  //   // tempResult.map((a) => {
  //   //   // setX(x.push(a.appSiteId));
  //   //   // setY(y.push(a.impressions_offered));
  //   //   setX([...x, a.appSiteId]);
  //   //   setY([...y, a.impressions_offered]);
  //   // });
  //   // x.map((a) => console.log(a));
  //   // y.map((a) => console.log(a));
  //   console.log(x);
  // };

  const dataBar = {
    labels: barData && barData.map((b) => b.appSiteId),
    datasets: [
      {
        label: "Value",
        backgroundColor: "#EC932F",
        borderColor: "rgba(255,99,132,1)",
        borderWidth: 1,
        hoverBackgroundColor: "rgba(255,99,132,0.4)",
        hoverBorderColor: "rgba(255,99,132,1)",
        data: barData && barData.map((b) => b.impressions_offered),
      },
    ],
  };

  return (
    <div class="barchart">
    <br />
      <br />
      <h2 style={{ textAlign: "center" }}>Bar chart</h2>
      <Bar1
        data={dataBar}
        options={{
          title: {
            display: true,
            text: "Average Rainfall per month",
            fontSize: 15,
          },
          legend: {
            display: true,
            position: "right",
          },
        }}
      />
    </div>
  );
};

export default HorBar;
