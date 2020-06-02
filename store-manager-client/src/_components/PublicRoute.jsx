import React from "react";
import { Route, Redirect } from "react-router-dom";

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
