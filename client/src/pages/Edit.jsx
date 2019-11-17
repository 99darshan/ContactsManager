import React, { useContext } from "react";
import NavBar from "../components/NavBar";
import ContactTextFields from "../components/ContactTextFields";
import { Close } from "@material-ui/icons";
import { ContactsContext } from "../appState/contactsContext";
import { CONTACTS } from "../constants/routeConstants";

export default function Edit(props) {
  let { state, dispatch } = useContext(ContactsContext);
  const { match } = props;
  const paramId = parseInt(match.params.id);

  const currentContact = state.contacts.find(contact => contact.id === paramId);
  return (
    <React.Fragment>
      <NavBar leadingIcon={<Close />} title="Edit" navigateTo={CONTACTS} />

      <ContactTextFields
        contact={currentContact}
        isReadOnly={false}
        // used to go back to previous screen on save or cancel button click
        routeHistory={props.history}
        // onCancel={() => {
        //   props.history.goBack();
        // }}
        saveActionType="EDIT"
      />
    </React.Fragment>
  );
}
