import React from "react";
// import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Login, LoginDemo } from "../login";
import { PrivateRoute } from "../../_components/PrivateRoute";
import HomePage from "../../_containers/homepage/HomePage";
import { PublicRoute } from "../../_components/PublicRoute";

export function App(props) {
  // const [setAnchorEl] = React.useState(null);

  return (
    <BrowserRouter>
      <Switch>
        <PrivateRoute component={HomePage} path="/" exact />
        <PublicRoute component={Login} path="/login" exact />
      </Switch>
    </BrowserRouter>
    
  );
}
