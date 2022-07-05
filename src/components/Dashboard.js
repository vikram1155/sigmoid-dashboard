import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import { makeStyles } from "@mui/styles";
import { useLocation, useNavigate } from "react-router-dom";
import "../App.css";
import PieChartComponent from "./Charts/PieChart";
import BarChartComponent from "./Charts/BarChart";
import TableChartComponent from "./Charts/TableChart";
import HorBar from "./Charts/HorBar";
import { Button } from "@mui/material";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: "10%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    maxWidth: "500px",
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
  const navigate = useNavigate();

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h3" variant="h7" style={{ fontWeight: "bold" }}>
          DASHBOARD
        </Typography>
        <br />
        <Button
          onClick={() => {
            navigate("/date", {
              state: {
                token: location.state.token,
              },
            });
          }}
          fullWidth
          variant="contained"
          color="warning"
        >
          CHANGE DATES
        </Button>
        <HorBar />
        <PieChartComponent />
        {/* <BarChartComponent /> */}
        <TableChartComponent />
      </div>
    </Container>
  );
};

export default Dashboard;
