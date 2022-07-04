import { useEffect, useState } from "react";
import { PieChart } from "react-minimal-pie-chart";
import { useLocation } from "react-router-dom";
import "../../App.css";
import Pie from "./Pie";

const defaultLabelStyle = {
  fontSize: "4px",
  fill: "#FFFFFF",
  fontFamily: "sans-serif",
};

const PieChartComponent = (props) => {
  const [pieData, setPieData] = useState([]);
  const location = useLocation();
  const [colors, _] = useState([
    "#63C5DA",
    "#48AAAD",
    "#82EEFD",
    "#0492C2",
    /*
    "#757C88",
    "#022D36",
    "#1520A6",
    "#2832C2",
    "#051094",
    "#241571",
    "#3944BC",

    "#0A1172",
    "#28185D",
    "#1338BE",*/
  ]);

  useEffect(() => {
    fetchPie();
  }, []);

  const fetchPie = () => {
    var myHeaders = new Headers();
    myHeaders.append("x-auth-token", location.state.token);
    myHeaders.append("Content-Type", "application/json");

    Pie.chartObject.requestParam.dateRange.startDate = Date.parse(
      location.state.minDate
    ).toString();
    Pie.chartObject.requestParam.dateRange.endDate = Date.parse(
      location.state.maxDate
    ).toString();
    var raw = JSON.stringify(Pie);

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
          let tempPieData = result?.result?.data;
          tempPieData.forEach((item) => {
            item.title = item.advertiserId;
            item.value = parseFloat(item.CM001_percent);
            item.color = colors[Math.floor(Math.random() * colors.length)];
          });

          setPieData(tempPieData);
        }
      })
      .catch((error) => console.log("error", error));
  };

  return (
    <PieChart
      data={pieData}
      style={{
        height: window.innerHeight - 0.5 * window.innerHeight,
        margin: "50px",
      }}
      radius={PieChart.defaultProps.radius - 7}
      segmentsShift={(index) => (index === 0 ? 0.5 : 0.5)}
      label={({ dataEntry }) => dataEntry.value}
      labelStyle={(index) => ({
        fill: "#020202",
        fontSize: "5px",
        fontFamily: "sans-serif",
      })}
      labelPosition={112}
    />
  );
};

export default PieChartComponent;
