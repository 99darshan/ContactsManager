import React from "react";
import NavBar from "../components/NavBar";
import ContactTextFields from "../components/ContactTextFields";
import { Close } from "@material-ui/icons";
import { CONTACTS } from "../constants/routeConstants";

export default function Add(props) {
  return (
    <React.Fragment>
      <NavBar
        title="Add Contact"
        leadingIcon={<Close />}
        screen="add"
        navigateTo={CONTACTS}
      />

      <ContactTextFields
        isReadOnly={false}
        // used to go back to previous screen on save or cancel button click
        routeHistory={props.history}
        saveActionType="ADD"
      />
    </React.Fragment>
  );
}
