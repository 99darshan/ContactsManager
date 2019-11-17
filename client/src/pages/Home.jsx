import React, { useContext } from "react";
import FacebookLogin from "react-facebook-login";
import { CONTACTS } from "../constants/routeConstants";
import { AuthContext } from "../appState/authContext";
import { Link } from "react-router-dom";
import authService from "../services/authService";
import { CircularProgress, Avatar, Button, Fab } from "@material-ui/core";
import { GitHub } from "@material-ui/icons";
export default function Home() {
  const { authState, authDispatch } = useContext(AuthContext);

  let onResponseFromFacebook = async response => {
    authService.login(response, authDispatch);
  };

  return (
    <React.Fragment>
      <div
        style={{
          width: "100%",
          height: "100vh",
          backgroundImage: "linear-gradient( 135deg, #97ABFF 10%, #123597 100%)"
        }}
      >
        <div style={{ position: "fixed", top: "10px", left: "10px" }}>
          <Fab
            onClick={() => {
              window.open(
                "https://github.com/99darshan/ContactsManager",
                "_blank"
              );
            }}
            color="secondary"
            aria-label="home"
          >
            <GitHub />
          </Fab>
        </div>
        {authState.isFetching && (
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              paddingTop: "3rem"
            }}
          >
            <CircularProgress color="secondary" />
          </div>
        )}
        {!authState.isFetching && (
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              padding: "3rem"
            }}
          >
            <div>
              {authState.isLoggedIn && (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center"
                  }}
                >
                  <Avatar
                    style={{ height: 100, width: 100 }}
                    key="avatar"
                    //src={window.localStorage.getItem("contactsManagerUserProfile")}
                    src={authState.user.profilePicture}
                  />
                </div>
              )}
              <h1
                style={{
                  fontWeight: "bold",
                  color: "#f1efd4",
                  fontSize: "3rem"
                }}
              >
                Contacts Manager
              </h1>
              {authState.isLoggedIn && authState.user.name && (
                <h3
                  style={{
                    color: "#faf6cb",
                    fontWeight: "bold",
                    fontSize: "2rem"
                  }}
                >
                  WELCOME!
                  <span
                    style={{
                      color: "#e3e3e3",
                      fontSize: "2rem"
                    }}
                  >
                    {" "}
                    {authState.user.name}
                  </span>
                </h3>
              )}
              {!authState.isLoggedIn && (
                <FacebookLogin
                  appId={process.env.REACT_APP_FACEBOOK_APP_ID}
                  fields="name,email,picture"
                  //onClick={onFbLoginButtonClick}
                  callback={onResponseFromFacebook}
                  icon="fa-facebook"
                />
              )}
              {authState.isLoggedIn && (
                <Fab
                  component={Link}
                  to={CONTACTS}
                  variant="contained"
                  color="secondary"
                  size="large"
                  variant="extended"
                >
                  View Contacts
                </Fab>
              )}
            </div>
          </div>
        )}
      </div>

      {/* {authState.isLoggedIn && <Redirect to={CONTACTS} />} */}
    </React.Fragment>
  );
}
