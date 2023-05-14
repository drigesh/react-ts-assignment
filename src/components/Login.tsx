import React, { useContext, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { useNavigate, Link } from "react-router-dom";
import axiox from "axios";
import AuthContext from "../context/auth/AuthContext";
import { AuthContextType } from "../common/Types";

// const useStyles = makeStyles((theme) => ({
//   root: {
//     "& > *": {
//       margin: theme.spacing(1),
//       width: "45ch",
//     },
//   },
// }));

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const {authState, setAuthState} = useContext(AuthContext) as AuthContextType;

  let history = useNavigate();

  const login = (e: React.SyntheticEvent): void => {
    e.preventDefault();
    axiox
      .post("http://localhost:5000/api/auth/login", {
        email,
        password,
      })
      .then((response) => {
        localStorage.setItem(
          "login",
          JSON.stringify({
            userLogin: {loggedin: true, email: email},
            token: response.data.access_token,
          })
        );
        setAuthState({loggedin: true, email: email, loading: false});
        setError("");
        setEmail("");
        setPassword("");
        history("/");
      })
      .catch((error) => {
        setError(error.response.data.message)
        setAuthState({loggedin: false, email: '', loading: false});
      });
  };
  
  return (
    <div style={{ marginTop: "100px" }}>
      <h2>Login Page</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form
        // className={classes.root}
        noValidate
        autoComplete="off"
        onSubmit={login}
      >
        <TextField
          id="username"
          label="Username"
          type="text"
          value={email}
          onChange={(e: React.SyntheticEvent): void => setEmail((e.target as HTMLInputElement).value)}
        />
        <br />
        <TextField
          id="password"
          label="Password"
          type="password"
          value={password}
          onChange={(e: React.SyntheticEvent): void => setPassword((e.target as HTMLInputElement).value)}
        />

        <br />
        <br />
        <Button
          style={{ width: "100px" }}
          variant="contained"
          color="primary"
          type="submit"
        >
          Login
        </Button>
      </form>
      <p>
        Don't have an account then please do{" "}
        <Link to="/register">Register</Link> yourself
      </p>
    </div>
  );
};

export default Login;
