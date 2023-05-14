import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContextType } from "../common/Types";
import Dashboard from "./Dashboard";
import AuthContext from "../context/auth/AuthContext";
import { Button } from "@material-ui/core";

const Home = () => {

  
  const {authState, setAuthState} = useContext(AuthContext) as AuthContextType;

  const userNotLogin = () => (
    <>
      <h2>It seem's like you are not login</h2>
      <h3>
        If you have an account, then please <Link to="/login">Login</Link>
      </h3>
      <h3>
        Don't have an account, then please do{" "}
        <Link to="/register">Register</Link>
      </h3>
    </>
  );


  return (
    <div style={{ marginTop: "100px" }}>
      {authState.loggedin ? (
        <div>
        You are successfully Logged In.
        <div>
          <br />
        <Link to={'/dashboard'}>
          <Button color="primary" variant="outlined">
            Go to Dashboard!
          </Button>
        </Link>
        </div>
        </div>
      ) : (
        <>{userNotLogin()}</>
      )}
    </div>
  );
};

export default Home;
