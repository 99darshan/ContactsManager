import React, { useContext } from "react";
import { ArrowBack, Edit } from "@material-ui/icons";
import NavBar from "../components/NavBar";
import FabButton from "../components/FabButton";
import ContactTextFields from "../components/ContactTextFields";
import { EDIT } from "../constants/routeConstants";
import { ContactsContext } from "../appState/contactsContext";
export default function Details(props) {
  let { state, dispatch } = useContext(ContactsContext);
  const { match } = props;
  const paramId = parseInt(match.params.id);
  const currentContact = state.contacts.find(contact => contact.id === paramId);

  return (
    <React.Fragment>
      <NavBar leadingIcon={<ArrowBack />} screen="details" navigateTo="/" />
      <FabButton
        navigateTo={EDIT.replace(":id", paramId)}
        labelText="Edit"
        icon={<Edit />}
      />
      <ContactTextFields contact={currentContact} isReadOnly={true} />
    </React.Fragment>
  );
}
