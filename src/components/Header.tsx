import React, { useState, useEffect, useContext } from "react";
import { Button } from "@material-ui/core";
import {AuthContext} from "../context/auth/AuthContext";
import { IAuthState } from "../common/Interfaces";
import { Link } from "react-router-dom";
import { AuthContextType } from "../common/Types";

const Header = () => {
  
  const {authState, setAuthState} = useContext(AuthContext) as AuthContextType;

  const logout = () => {
    localStorage.removeItem("login");
    setAuthState({loggedin: false, email: '', loading:false})
  };

  return (
    <div>
      <header style={{ marginTop: "20px" }}>
        {authState.loggedin ? (
          <Button
            style={{ width: "100px" }}
            variant="contained"
            color="secondary"
            onClick={logout}
          >
            Logout
          </Button>
        ) : (
          <div>
          <Link to="/login">
            <Button
              style={{ width: "100px", margin: '0 8px' }}
              variant="contained"
              color="secondary"
            >
              Login
            </Button>
          </Link>
          <Link to="/register">
          <Button
            style={{ width: "100px", margin: '0 8px' }}
            variant="contained"
            color="secondary"
          >
            Register
          </Button>
        </Link>
        </div>
        )}
      </header>
    </div>
  );
};

export default Header;
