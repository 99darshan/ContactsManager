import React, { useContext, useEffect } from "react";
import FacebookLogin from "react-facebook-login";
import { Redirect } from "react-router-dom";
import { CONTACTS, LOGIN } from "../constants/routeConstants";
import { Button } from "@material-ui/core";
import { API_BASE_URL } from "../constants/routeConstants";
import { FETCHING, LOGIN_SUCCESS } from "../appState/auhtActionTypes";
import { AuthContext } from "../appState/authContext";
import { Link } from "react-router-dom";

export default function Home() {
  const { authState, authDispatch } = useContext(AuthContext);
  console.log(authState);

  let onResponseFromFacebook = async response => {
    console.log(response);
    authDispatch({
      type: FETCHING
    });
    // TODO: try catch? move to auth service,??
    let loginResponse = await fetch(`${API_BASE_URL}/auth/facebook/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        fbUserId: response.userID,
        accessToken: response.accessToken
      })
    });
    let loginRes = await loginResponse.json();
    window.localStorage.setItem("contactsManagerJwt", loginRes.jwt);
    window.localStorage.setItem(
      "contactsManagerUserProfile",
      loginRes.user.profilePicture
    );
    window.localStorage.setItem("contactsManagerUserName", loginRes.user.name);
    // response will have a jwt token, save it to local storage, use it to make any other subsequent requests
    // TODO: save jwt to local storage
    authDispatch({
      type: LOGIN_SUCCESS,
      payload: { user: loginRes.user }
    });
    //console.table(loginRes);
  };

  let onFbLoginButtonClick = async () => {
    console.log("login clicked");
  };
  return (
    // TODO: check auth  error state and show a error if error exists
    // if login fails it will dispatch an ERROR event
    <React.Fragment>
      <h1>Welcome to contacts manager, Public Home page</h1>
      {!authState.isLoggedIn && (
        <FacebookLogin
          appId={process.env.REACT_APP_FACEBOOK_APP_ID}
          fields="name,email,picture"
          onClick={onFbLoginButtonClick}
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
