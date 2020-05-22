import React from "react";
import { Route, Redirect } from "react-router-dom";
import { Login } from "../_containers/login";

export const PublicRoute = ({ component: Component, ...rest }) => (
  <div>
    <Route
      {...rest}
      render={(props) =>
        localStorage.getItem("user") ? (
          <Redirect to={{ pathname: "/" }} />
        ) : (
          <Component {...props} />
        )
      }
    />
  </div>
);
