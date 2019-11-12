import React, { useContext } from "react";
import NavBar from "../components/NavBar";
import ContactTextFields from "../components/ContactTextFields";
import { ArrowBack } from "@material-ui/icons";
import { ContactsContext } from "../appState/contactsContext";

export default function Edit(props) {
  let [{ contacts }, dispatch] = useContext(ContactsContext);
  const { match } = props;
  const paramId = parseInt(match.params.id);
  const currentContact = contacts.find(contact => contact.id === paramId);

  return (
    <React.Fragment>
      <NavBar leadingIcon={<ArrowBack />} title="Edit" navigateTo="/" />

      <ContactTextFields contact={currentContact} isReadOnly={false} />
    </React.Fragment>
  );
}
