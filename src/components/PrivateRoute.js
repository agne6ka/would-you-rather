import React from "react";
import { Route, Redirect } from "react-router-dom";

const PrivateRoute = ({
  location,
  authedUser,
  component: Component,
  ...rest
}) => {
  return (
    <Route
      {...rest}
      render={props =>
        authedUser ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: props.location }
            }}
          />
        )
      }
    />
  );
};

export default PrivateRoute;
