import { Button } from "@mui/material";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import { makeStyles } from "@mui/styles";
import React, { useEffect, useState } from "react";
import DatePicker from "react-date-picker";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "../App.css";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: "10%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: 1,
    backgroundColor: "#FFF",
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: 1,
  },
  submit: {
    margin: 8,
  },
}));

const DatePickerApp = (props) => {
  // console.log("props", props);
  const classes = useStyles();
  const [value, onChange] = useState(new Date());
  const [valueEnd, onChangeEnd] = useState(new Date());
  const [minDate, setMinDate] = useState();
  const [maxDate, setMaxDate] = useState();

  const [firstClick, setFirstClick] = useState(false);
  const [firstClickEnd, setFirstClickEnd] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    fetchRange();
  }, []);

  const fetchRange = () => {
    var myHeaders = new Headers();
    myHeaders.append("x-auth-token", location.state.token);
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      organization: "DemoTest",
      view: "Auction",
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch("https://sigviewauth.sigmoid.io/api/v1/getDateRange", requestOptions)
      .then((response) => response.text())
      .then((result) => {
        result = JSON.parse(result);
        if (result.status.statusCode === "200") {
          let tempMin = new Date(parseInt(result?.result?.startDate));
          let tempMax = new Date(parseInt(result?.result?.endDate));
          if (
            parseInt(result?.result?.startDate) >
            parseInt(result?.result?.endDate)
          ) {
            let temp = tempMin;
            tempMin = tempMax;
            tempMax = temp;
          }
          setMinDate(tempMin);
          setMaxDate(tempMax);
        }
      })
      .catch((error) => console.log("error", error));
  };
  return (
    <Container component="main">
      <CssBaseline />
      <div className={classes.paper}>
        <h3>CHOOSE DATES</h3>
        <div>
          <div style={{ display: "flex" }}>
            <p>FROM </p>&nbsp;&nbsp;&nbsp;
            <DatePicker
              minDate={minDate}
              maxDate={maxDate}
              onChange={(value) => {
                onChange(value);
                setFirstClick(true);
              }}
              value={value}
            />
          </div>
          <br />
          <br />
          <div style={{ display: "flex" }}>
            &nbsp;&nbsp;&nbsp;<p>TILL </p>&nbsp;&nbsp;&nbsp;
            <DatePicker
              minDate={minDate}
              maxDate={maxDate}
              onChange={(value) => {
                onChangeEnd(value);
                setFirstClickEnd(true);
              }}
              value={valueEnd}
            />
          </div>
        </div>
        <br />
        <br />
        <Button
          onClick={() => {
            navigate("/dashboard", {
              state: {
                minDate: minDate,
                maxDate,
                maxDate,
                token: location.state.token,
              },
            });
          }}
          fullWidth
          disabled={value > valueEnd}
          variant="contained"
          color="warning"
        >
          VIEW DASHBOARD
        </Button>
      </div>
    </Container>
  );
};

export default DatePickerApp;
