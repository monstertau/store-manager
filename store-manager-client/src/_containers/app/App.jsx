import React from "react";
// import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Route } from "react-router-dom";
import { Login, LoginDemo } from "../login";
class connectedApp extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Route exact={true} path="/login" component={Login} />
        <Route exact={true} path="/login-demo" component={LoginDemo} />
      </BrowserRouter>
    );
  }
}

export { connectedApp as App };
