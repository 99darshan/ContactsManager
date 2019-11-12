import React, { useContext } from "react";
import NavBar from "../components/NavBar";
import FabButton from "../components/FabButton";
import ContactListItem from "../components/ContactListItem";
import { Menu, Add as AddIcon } from "@material-ui/icons";
//import contacts from "../MockData/contactsData";
import * as routes from "../constants/routeConstants";
import { Link } from "react-router-dom";
import { ContactsContext } from "../appState/contactsContext";

export default function Home(props) {
  const [{ contacts }, dispatch] = useContext(ContactsContext);
  return (
    <React.Fragment>
      <NavBar
        title="Contacts Manager"
        actionButtonText="Log in"
        leadingIcon={<Menu />}
        screen="home"
        navigateTo="/"
      />

      {contacts.map(item => (
        <ContactListItem
          key={item.id}
          id={item.id}
          avatar="https://i.pravatar.cc/300"
          name={`${item.firstName} ${item.lastName}`}
          phoneNumber={item.phoneNumber}
        />
      ))}
      <FabButton navigateTo={routes.ADD} labelText="add" icon={<AddIcon />} />
    </React.Fragment>
  );
}
