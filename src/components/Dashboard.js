import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import { makeStyles } from "@mui/styles";
import { useLocation } from "react-router-dom";
import "../App.css";
import PieChartComponent from "./Charts/PieChart";
import BarChartComponent from "./Charts/BarChart";
import TableChartComponent from "./Charts/TableChart";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: "40%",
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

const Dashboard = (props) => {
  const location = useLocation();
  const classes = useStyles();

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Dashboard
        </Typography>
        <PieChartComponent />
        <BarChartComponent />
        <TableChartComponent />
      </div>
    </Container>
  );
};

export default Dashboard;
