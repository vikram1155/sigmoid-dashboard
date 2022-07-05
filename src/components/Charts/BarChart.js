import { useLocation } from "react-router-dom";
import "../../App.css";
import Bar from "./Bar";
import { useEffect, useState } from "react";
import BarChart from "react-bar-chart";

const data = [
  { text: "Man", value: 500 },
  { text: "Woman", value: 300 },
];

const margin = { top: 40, right: 40, bottom: 200, left: 100 };

const TableChartComponent = (props) => {
  const [barData, setBarData] = useState([]);
  const location = useLocation();

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
          console.log(tempResult);
          setBarData(tempResult);
          tempResult.forEach((item) => {
            item.text = item.appSiteId;
            item.value = parseInt(item.impressions_offered);
          });
        }
      })
      .catch((error) => console.log("error", error));
  };

  return (
    <div className="barchart">
      <h2 style={{ textAlign: "center" }}>Bar chart</h2>
      <BarChart
        // ylabel="Quantity"
        colorByLabel={true}
        height={1000}
        width={window.innerWidth - 0.1 * window.innerWidth}
        margin={margin}
        data={barData}
      />
    </div>
  );
};

export default TableChartComponent;
