import PersonIcon from "@mui/icons-material/Person";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import FormControlLabel from "@mui/material/FormControlLabel";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { makeStyles } from "@mui/styles";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";

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

const SignIn = (props) => {
  const classes = useStyles();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [signInToken, setSignInToken] = useState("");
  const [errorMet, setErrorMet] = useState(false);
  const navigate = useNavigate();

  const handleChange = () => {
    setRemember(!remember);
  };

  const onClick = async () => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      email: email,
      password: password,
      rememberMe: remember,
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
    };

    await fetch("https://sigviewauth.sigmoid.io/signIn", requestOptions)
      .then((response) => response.text())
      .then((result) => {
        result = JSON.parse(result);
        console.log(typeof result.statusCode);
        if (result.statusCode === "200") {
          setSignInToken(result.token);
        }
      })
      .catch((error) => console.log("error", error));
  };

  useEffect(() => {
    console.log(errorMet);
    if (signInToken !== "" && errorMet === false) {
      navigate("/date", { state: { token: signInToken } });
    }
  }, [signInToken]);

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <PersonIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
          />
          <FormControlLabel
            control={
              <Checkbox
                value={remember}
                color="primary"
                onChange={handleChange}
                checked={remember}
              />
            }
            label="Remember me"
          />
          <Button
            fullWidth
            variant="contained"
            onClick={onClick}
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>
          <br />
          <br />
        </form>
      </div>
    </Container>
  );
};

export default SignIn;
