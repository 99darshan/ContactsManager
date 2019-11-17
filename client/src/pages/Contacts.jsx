import React, { useContext, useEffect } from "react";
import NavBar from "../components/NavBar";
import FabButton from "../components/FabButton";
import ContactListItem from "../components/ContactListItem";
import { Menu, Add as AddIcon } from "@material-ui/icons";
import { Button } from "@material-ui/core";
import * as routes from "../constants/routeConstants";
import { Link } from "react-router-dom";
import { ContactsContext } from "../appState/contactsContext";
import { CONTACTS } from "../constants/routeConstants";
import {
  FETCHING,
  FETCH_ALL_CONTACTS_SUCCESS
} from "../appState/contactsActionTypes";
import httpService from "../services/httpService";

export default function Contacts(props) {
  const { state, dispatch } = useContext(ContactsContext);
  const { contacts, hasError, error } = state;
  console.log(state);
  console.log(contacts);
  // TODO: fetch all contacts for only the logged in user when Contacts component mounts
  useEffect(() => {
    console.log("hass effect " + hasError);
    // TODO: should check for error? this is the only place to reset errors and get all contacts???
    if (!hasError) {
      dispatch({ type: FETCHING });
      httpService.GET(
        `${routes.API_BASE_URL}/contacts`,
        dispatch,
        FETCH_ALL_CONTACTS_SUCCESS
      );
    }
  }, []);
  return (
    <React.Fragment>
      {/* TODO: design error card */}
      {hasError && <h2>Error fetching all contacts!! {error.messsage} </h2>}

      {!hasError && (
        <>
          <NavBar
            title="Contacts Manager"
            leadingIcon={<Menu />}
            navigateTo={CONTACTS}
            actionButtons={[
              <Button key="loginButton" color="inherit">
                Log In
              </Button>
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
                  avatar="https://i.pravatar.cc/300"
                  contact={item}
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