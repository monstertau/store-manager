import React from "react";
// import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Login, LoginDemo } from "../login";
import { LogOut } from "../logout";
import { PrivateRoute } from "../../_components/PrivateRoute";
import HomePage from "../../_containers/homepage/HomePage";
import { PublicRoute } from "../../_components/PublicRoute";
import { userProfile } from "../user-profile";
import Customer from "../cashier/Customer";
import Employee from "../employee/Employee";
import Inventory from "../inventory/Inventory";
// import Orders from "../report/Order";
import Report from "../report/Report";
export function App(props) {
  // const [setAnchorEl] = React.useState(null);
  return (
    <BrowserRouter>
      <Switch>
        <PrivateRoute component={HomePage} path="/" exact />
        <PrivateRoute component={LogOut} path="/logout" exact />
        <PrivateRoute component={Employee} path="/employee" exact />
        <PrivateRoute component={Customer} path="/customers" exact />
        <PrivateRoute component={LogOut} path="/logout" exact />
        <PrivateRoute component={userProfile} path="/profile" />
        <PrivateRoute component={Inventory} path="/inventory" />
        <PublicRoute component={Login} path="/login" exact />
        <PrivateRoute component={Report} path="/report" exact />
      </Switch>
    </BrowserRouter>
  );
}
