import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "../../App.css";
import Table from "./Table";

const TableChartComponent = (props) => {
  const [tableData, setTableData] = useState([]);
  const location = useLocation();

  useEffect(() => {
    fetchPie();
  }, []);

  const fetchPie = () => {
    var myHeaders = new Headers();
    myHeaders.append("x-auth-token", location.state.token);
    myHeaders.append("Content-Type", "application/json");

    Table.chartObject.requestParam.dateRange.startDate = Date.parse(
      location.state.minDate
    ).toString();
    Table.chartObject.requestParam.dateRange.endDate = Date.parse(
      location.state.maxDate
    ).toString();
    var raw = JSON.stringify(Table);

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
          // console.log(tempPieData);
          setTableData(tempPieData);
        }
      })
      .catch((error) => console.log("error", error));
  };

  return (
    <>
    <br/>
    <br/>
    <h2>Table - view</h2>
    <br/>
    <br/>
      <table style={{ width: "100%" }}>
        <thead>
          <tr>
            <th>Impressions Offered</th>
            <th>Publisher Id</th>
          </tr>
        </thead>
        {tableData.map((item) => (
          <tbody>
            <tr>
              <td>{item.impressions_offered}</td>
              <td>{item.publisherId}</td>
            </tr>
          </tbody>
        ))}
      </table>
      <br/>
      <br/>
    </>
  );
};

export default TableChartComponent;
