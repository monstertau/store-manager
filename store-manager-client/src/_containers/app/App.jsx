import React from "react";
// import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Login, LoginDemo } from "../login";
import { PrivateRoute } from "../../_components/PrivateRoute";
import HomePage from "../../_containers/homepage/HomePage";
import { PublicRoute } from "../../_components/PublicRoute";
import { LogOut } from "../logout";
import { userProfile } from "../user-profile";
export function App(props) {
  // const [setAnchorEl] = React.useState(null);

  return (
    <BrowserRouter>
      <Switch>
        <PrivateRoute component={HomePage} path="/" exact />
        <PublicRoute component={Login} path="/login" exact />
        <PrivateRoute component={LogOut} path="/logout" exact />
        <PrivateRoute component={userProfile} path="/profile" />
      </Switch>
    </BrowserRouter>
  );
}
