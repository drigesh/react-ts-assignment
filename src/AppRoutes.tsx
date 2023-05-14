import React, { useContext, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Home from "./components/Home";
import Header from "./components/Header";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";
import GuardedRoute from "./GuardedRoute";
import AuthContext from "./context/auth/AuthContext";
import { AuthContextType } from "./common/Types";

function AppRoutes() {

  const {authState, setAuthState} = useContext(AuthContext) as AuthContextType;

  useEffect(() => {
    hydrateStateWithLocalStorage();
  }, []);

  const hydrateStateWithLocalStorage = () => {
    if (localStorage.hasOwnProperty("login")) {
      let value = localStorage.getItem("login");
      try {
        const localAuthState = JSON.parse(value || "{}");
        setAuthState({...localAuthState?.userLogin, loading: false});
      } catch (e) {
        setAuthState({loggedin: false, email: '', loading: false})
      }
    }
    else{
      setAuthState({loggedin: false, email: '', loading: false})
    }
  };


  return (

    <BrowserRouter>
      <div>
            <Header />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login/>} />
              <Route path="/register" element={<Register />} />
              {/* <Route path="/dashboard" element={<GuardedRoute  component={Dashboard} />} /> */}
              {/* <Route path="/dashboard" element={<Dashboard />} /> */}
              <Route path="/dashboard" element={<GuardedRoute />}>
                <Route path="" element={<Dashboard />} />
              </Route>
            </Routes>
      </div>
    </BrowserRouter>
  );
}

export default AppRoutes;
