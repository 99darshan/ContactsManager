import React, { useContext, useEffect } from "react";
import FacebookLogin from "react-facebook-login";
import { Redirect } from "react-router-dom";
import { CONTACTS, LOGIN } from "../constants/routeConstants";
import { Button } from "@material-ui/core";
import { API_BASE_URL } from "../constants/routeConstants";
import { FETCHING, LOGIN_SUCCESS } from "../appState/auhtActionTypes";
import { AuthContext } from "../appState/authContext";
import { Link } from "react-router-dom";
import authService from "../services/authService";
import { CircularProgress } from "@material-ui/core";
export default function Home() {
  const { authState, authDispatch } = useContext(AuthContext);

  let onResponseFromFacebook = async response => {
    authService.login(response, authDispatch);
  };

  return (
    <React.Fragment>
      {authState.isFetching && <CircularProgress />}

      <h1>Welcome to contacts manager, Public Home page</h1>
      {!authState.isLoggedIn && !authState.isFetching && (
        <FacebookLogin
          appId={process.env.REACT_APP_FACEBOOK_APP_ID}
          fields="name,email,picture"
          //onClick={onFbLoginButtonClick}
          callback={onResponseFromFacebook}
          icon="fa-facebook"
        />
      )}
      {authState.isLoggedIn && (
        <Button
          component={Link}
          to={CONTACTS}
          variant="contained"
          color="secondary"
        >
          View Contacts
        </Button>
      )}
      {/* {authState.isLoggedIn && <Redirect to={CONTACTS} />} */}
    </React.Fragment>
  );
}
