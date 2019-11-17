import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { LOGIN } from "../constants/routeConstants";
import { AuthContext } from "../appState/authContext";

/**
 *
 * @param {any} props
 * returns the requested react router Route if the user is authenticated
 * else redirects to the public login page
 */
const PrivateRoute = props => {
  const { authState, dispatch } = useContext(AuthContext);
  const Component = props.component;
  return (
    <Route
      path={props.path}
      render={props =>
        authState.isLoggedIn ? (
          <Component {...props} />
        ) : (
          <Redirect to={LOGIN} />
        )
      }
    />
  );
};

export default PrivateRoute;
