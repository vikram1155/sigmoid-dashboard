import { Button } from "@mui/material";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import { makeStyles } from "@mui/styles";
import React, { useEffect, useState } from "react";
import DatePicker from "react-date-picker";
import { useLocation } from "react-router-dom";
import "../App.css";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: "30%",
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
  const classes = useStyles();
  const [value, onChange] = useState(new Date());
  const [minDate, setMinDate] = useState();
  const [maxDate, setMaxDate] = useState();
  const location = useLocation();

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
        if (result.statusCode === "200") {
          let tempMin = new Date(0);
          let tempMax = new Date(0);
          tempMin.setUTCSeconds(result?.result?.startDate);
          tempMax.setUTCSeconds(result?.result?.endDate);
          setMinDate(tempMin);
          setMaxDate(tempMax);
          console.log(minDate, maxDate, tempMin, tempMax);
        }
      })
      .catch((error) => console.log("error", error));
  };
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <h1>Hello</h1>
        <DatePicker onChange={onChange} value={value} />
        <br />
        <br />
        <Button fullWidth variant="contained" color="primary">
          Go to dashboard
        </Button>
      </div>
    </Container>
  );
};

export default DatePickerApp;
