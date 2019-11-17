import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { HOME } from "../constants/routeConstants";
import { AuthContext } from "../appState/authContext";

/**
 *
 * @param {any} props
 * returns the requested react router Route if the user is authenticated
 * else redirects to the public Homepage
 */
const PrivateRoute = props => {
  const { authState, dispatch } = useContext(AuthContext);
  const Component = props.component;
  console.log("private route: " + authState.isLoggedIn);
  return (
    <Route
      path={props.path}
      render={props =>
        authState.isLoggedIn ? <Component {...props} /> : <Redirect to={HOME} />
      }
    />
  );
};

export default PrivateRoute;
