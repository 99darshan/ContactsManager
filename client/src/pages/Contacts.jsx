import React, { useContext, useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import FabButton from "../components/FabButton";
import ContactListItem from "../components/ContactListItem";
import { Menu as MenuIcon, Add as AddIcon } from "@material-ui/icons";
import { Button, Avatar, Menu, MenuItem, TextField } from "@material-ui/core";
import * as routes from "../constants/routeConstants";
import { Link } from "react-router-dom";
import { ContactsContext } from "../appState/contactsContext";
import { AuthContext } from "../appState/authContext";
import { CONTACTS, API_BASE_URL } from "../constants/routeConstants";
import {
  FETCHING,
  FETCH_ALL_CONTACTS_SUCCESS,
  UPDATE_CONTACT_SUCCESS
} from "../appState/contactsActionTypes";
import { LOGOUT_SUCCESS } from "../appState/auhtActionTypes";
import httpService from "../services/httpService";

export default function Contacts(props) {
  const { state, dispatch } = useContext(ContactsContext);
  const { authState, authDispatch } = useContext(AuthContext);
  const { contacts, hasError, error } = state;
  console.log(state);
  console.log(contacts);
  const [anchorEl, setAnchorEl] = useState(null);

  // TODO: fetch all contacts for only the logged in user when Contacts component mounts
  useEffect(() => {
    dispatch({ type: FETCHING });
    httpService.GET(
      `${routes.API_BASE_URL}/contacts`,
      dispatch,
      FETCH_ALL_CONTACTS_SUCCESS
    );
    console.log(contacts);
  }, []);

  return (
    <React.Fragment>
      {/* TODO: design error card */}
      {hasError && <h2>Error fetching all contacts!! {error.messsage} </h2>}

      {!hasError && (
        <>
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={() => setAnchorEl(null)}
            style={{ marginTop: "3rem" }}
          >
            <MenuItem>
              {window.localStorage.getItem("contactsManagerUserName")}
            </MenuItem>
            <MenuItem
              onClick={() => {
                // TODO: this logout is a really inefficient solution,
                // this deletes the jwt token from the local storage but the anyone with the token could still make requests as it is still valid till it expires in the server side
                setAnchorEl(null);
                window.localStorage.removeItem("contactsManagerJwt");
                window.localStorage.removeItem("contactsManagerUserProfile");
                window.localStorage.removeItem("contactsManagerUserName");
                authDispatch({
                  type: LOGOUT_SUCCESS
                });
              }}
            >
              Logout
            </MenuItem>
          </Menu>
          <NavBar
            title="Contacts Manager"
            leadingIcon={<MenuIcon />}
            navigateTo={CONTACTS}
            actionButtons={[
              <Avatar
                key="avatar"
                src={window.localStorage.getItem("contactsManagerUserProfile")}
                onClick={event => setAnchorEl(event.currentTarget)}
              />

              // <Button
              //   // TODO: this logout is a really inefficient solution,
              //   // this deletes the jwt token from the local storage but the anyone with the token could still make requests as it is still valid till it expires in the server side
              //   key="logoutButton"
              //   color="inherit"
              //   onClick={() => {
              //     window.localStorage.removeItem("contactsManagerJwt");
              //     window.localStorage.removeItem("contactsManagerUserProfile");
              //     window.localStorage.removeItem("contactsManagerUserName");
              //     authDispatch({
              //       type: LOGOUT_SUCCESS
              //     });
              //   }}
              // >
              //   Log out
              // </Button>
            ]}
          />
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center"
            }}
          >
            <div
              style={{
                width: "100%",
                maxWidth: "800px"
              }}
            >
              {contacts.map(item => (
                //console.log(item)
                <ContactListItem
                  key={item.id}
                  id={item.id}
                  avatar={`https://picsum.photos/seed/${item.id}/300`}
                  contact={item}
                  onFavoriteClick={() => {
                    console.log("favorite clicked");
                    let newFavState = !item.isFavorite;
                    httpService.PUT(
                      `${API_BASE_URL}/contacts/${item.id}`,
                      {
                        ...item,
                        isFavorite: newFavState
                      },
                      dispatch,
                      UPDATE_CONTACT_SUCCESS
                    );
                  }}
                />
              ))}
            </div>
          </div>

          <FabButton
            navigateTo={routes.ADD}
            labelText="add"
            icon={<AddIcon />}
          />
        </>
      )}
    </React.Fragment>
  );
}
