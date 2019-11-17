import React, { useContext } from "react";
import NavBar from "../components/NavBar";
import ContactTextFields from "../components/ContactTextFields";
import { Close } from "@material-ui/icons";
import { CONTACTS } from "../constants/routeConstants";
import { ContactsContext } from "../appState/contactsContext";

export default function Add(props) {
  const { state, dispatch } = useContext(ContactsContext);
  console.log("state.hasError on add" + state.hasError);
  return (
    <React.Fragment>
      {!state.hasError && (
        <>
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
        </>
      )}
      {state.hasError && (
        <h2>Error Creating new Entity {state.error.message} </h2>
      )}
    </React.Fragment>
  );
}
