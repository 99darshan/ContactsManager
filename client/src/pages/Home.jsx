import React, { useContext } from "react";
import FacebookLogin from "react-facebook-login";
import { Redirect } from "react-router-dom";
import { CONTACTS } from "../constants/routeConstants";
import { Button } from "@material-ui/core";
import { API_BASE_URL } from "../constants/routeConstants";
import { FETCHING, LOGIN_SUCCESS } from "../appState/auhtActionTypes";
import { AuthContext } from "../appState/authContext";

export default function Home() {
  const { state, dispatch } = useContext(AuthContext);

  let onResponseFromFacebook = async response => {
    console.log(response);
    dispatch({
      type: FETCHING
    });
    // TODO: try catch? move to auth service,??
    let loginResponse = await fetch(`${API_BASE_URL}/auth/facebook/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        userId: response.userID,
        accessToken: response.accessToken
      })
    });
    let loginRes = await loginResponse.json();
    // response will have a jwt token, save it to local storage, use it to make any other subsequent requests
    // TODO: save jwt to local storage
    dispatch({
      type: LOGIN_SUCCESS,
      payload: { user: loginRes.user }
    });
    //console.table(loginRes);
  };

  let onFbLoginButtonClick = async () => {
    console.log("login clicked");
  };
  //console.log(process.env.REACT_APP_FACEBOOK_APP_ID);
  return (
    <React.Fragment>
      <h1>Welcome to contacts manager, Public Home page</h1>
      <Button onClick={onFbLoginButtonClick}>FB Login</Button>
      <FacebookLogin
        appId={process.env.REACT_APP_FACEBOOK_APP_ID}
        fields="name,email,picture"
        onClick={onFbLoginButtonClick}
        callback={onResponseFromFacebook}
        icon="fa-facebook"
      />
      {state.isLoggedIn && <Redirect to={CONTACTS} />}
    </React.Fragment>
  );
}
