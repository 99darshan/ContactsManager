import React, { useContext } from "react";
import NavBar from "../components/NavBar";
import FabButton from "../components/FabButton";
import ContactListItem from "../components/ContactListItem";
import { Menu, Add as AddIcon } from "@material-ui/icons";
import { Button } from "@material-ui/core";
import * as routes from "../constants/routeConstants";
import { Link } from "react-router-dom";
import { ContactsContext } from "../appState/contactsContext";
import { CONTACTS } from "../constants/routeConstants";

export default function Contacts(props) {
  const { state, dispatch } = useContext(ContactsContext);
  const { contacts } = state;
  console.log(state);
  console.log(contacts);
  return (
    <React.Fragment>
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

      <FabButton navigateTo={routes.ADD} labelText="add" icon={<AddIcon />} />
    </React.Fragment>
  );
}
