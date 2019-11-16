import React from "react";
import { Route, Redirect } from "react-router-dom";
import mockIsAuthenticated from "../services/authService";
import { LOGIN } from "../constants/routeConstants";

/**
 *
 * @param {any} props
 * returns the requested react router Route if the user is authenticated
 * else redirects to the public login page
 */
const PrivateRoute = props => (
  <Route
    path={props.path}
    component={mockIsAuthenticated ? props.component : <Redirect to={LOGIN} />}
  />
);

export default PrivateRoute;
