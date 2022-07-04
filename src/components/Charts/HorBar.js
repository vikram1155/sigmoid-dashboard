import React from "react";
import { Bar } from "react-chartjs-2";
import Chart from "chart.js/auto";
import { useLocation } from "react-router-dom";
import "../../App.css";
import { useEffect, useState } from "react";

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
  // const [barData, setBarData] = useState([]);
  // const location = useLocation();

  // useEffect(() => {
  //   fetchPie();
  // }, []);

  // const fetchPie = () => {
  //   var myHeaders = new Headers();
  //   myHeaders.append("x-auth-token", location.state.token);
  //   myHeaders.append("Content-Type", "application/json");

  //   Bar.chartObject.requestParam.dateRange.startDate = Date.parse(
  //     location.state.minDate
  //   ).toString();
  //   Bar.chartObject.requestParam.dateRange.endDate = Date.parse(
  //     location.state.maxDate
  //   ).toString();
  //   var raw = JSON.stringify(Bar);

  //   var requestOptions = {
  //     method: "POST",
  //     headers: myHeaders,
  //     body: raw,
  //     redirect: "follow",
  //   };

  //   fetch("https://sigviewauth.sigmoid.io/api/v1/getData", requestOptions)
  //     .then((response) => response.text())
  //     .then((result) => {
  //       result = JSON.parse(result);
  //       if (result?.status?.statusCode === "200") {
  //         let tempResult = result?.result?.data;
  //         console.log(tempResult);
  //         setBarData(tempResult);
  //         tempResult.forEach((item) => {
  //           item.text = item.appSiteId;
  //           item.value = parseInt(item.impressions_offered);
  //         });
  //       }
  //     })
  //     .catch((error) => console.log("error", error));
  // };

  return (
    <div>
      <Bar
        data={state}
        options={{
          title: {
            display: true,
            text: "Average Rainfall per month",
            fontSize: 20,
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
