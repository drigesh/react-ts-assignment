import React from "react";
import "./App.css";
import AuthState from "./context/auth/AuthState";
import TodoState from "./context/todo/TodoState";
import AppRoutes from "./AppRoutes";

function App() {


  return (

      <div className="App">
        <AuthState>
          <TodoState>
            <AppRoutes />
          </TodoState>
        </AuthState>
      </div>
  );
}

export default App;
