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
import { validate } from "react-email-validator";
import { useNavigate } from "react-router-dom";
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

const SignIn = (props) => {
  const classes = useStyles();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [signInToken, setSignInToken] = useState("");
  const [errorMet, setErrorMet] = useState(false);
  const [dispMsg, setDispMsg] = useState("");
  const [dispMsg1, setDispMsg1] = useState("");
  const navigate = useNavigate();
  const [emailValid, setEmailValid] = useState("");

  const handleChange = () => {
    setRemember(!remember);
  };

  const onClick = async () => {
    if (!email || !password) {
      setDispMsg1("ENTER CREDENTIALS!");
    }
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

        if (result.statusCode === "200") {
          setSignInToken(result.token);
        } else {
          setDispMsg("INVALID CREDENTIALS!");
        }
      })
      .catch((error) => console.log("error", error));
  };

  useEffect(() => {
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
        <Typography component="h3" variant="h7" style={{ fontWeight: "bold" }}>
          ADMIN SIGN IN
        </Typography>
        <br />
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            error={dispMsg.length > 0}
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            value={email}
            onBlur={() =>
              validate(email)
                ? setEmailValid("")
                : setEmailValid("Enter valid email")
            }
            onChange={(e) => {
              setEmail(e.target.value);
              setDispMsg("");
              setDispMsg1("");
            }}
            autoFocus
          />
          <div style={{ color: "red" }}>{emailValid}</div>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            error={dispMsg.length > 0}
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
          <br />
          <br />
          <Button
            fullWidth
            variant="contained"
            onClick={onClick}
            color="warning"
            className={classes.submit}
          >
            Sign In
          </Button>
          <br />
        </form>
        <br />
        <Typography component="p" variant="p">
          {dispMsg.length > 0 && (
            <div
              style={{ color: "red", border: "1px solid red", padding: "5px" }}
            >
              {dispMsg}
              {!email.includes(".") ||
                (!email.includes("@") && <p>Enter correct Email</p>)}
            </div>
          )}
          <br />
          {dispMsg1.length > 0 && (
            <div
              style={{ color: "red", border: "1px solid red", padding: "5px" }}
            >
              {dispMsg1}
            </div>
          )}
        </Typography>
      </div>
    </Container>
  );
};

export default SignIn;
