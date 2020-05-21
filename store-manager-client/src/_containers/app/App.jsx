import React from "react";
// import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Route } from "react-router-dom";
import { Login } from "../login";
import { LogOut } from "../logout";
import { history } from "../../_utils";
import PrivateRoute  from "../../_components/PrivateRoute";
import {Home} from "../home"
class connectedApp extends React.Component {
  render() {
    return (
      <BrowserRouter history={history}>
        <PrivateRoute exact path="/" component={Home}/>
        <Route exact={true} path="/login" component={Login} />
        <Route exact={true} path="/logout" component={LogOut} />
      </BrowserRouter>
    );
  }
}

export { connectedApp as App };
