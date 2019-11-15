import React, { useContext } from "react";
import {
  ArrowBack,
  Edit,
  FavoriteBorder,
  DeleteForeverRounded
} from "@material-ui/icons";
import { IconButton } from "@material-ui/core";
import NavBar from "../components/NavBar";
import FabButton from "../components/FabButton";
import ContactTextFields from "../components/ContactTextFields";
import { EDIT, API_BASE_URL } from "../constants/routeConstants";
import { ContactsContext } from "../appState/contactsContext";
import { DELETE_CONTACT_SUCCESS } from "../appState/contactsActionTypes";
import httpService from "../services/httpService";
import { Link } from "react-router-dom";

export default function Details(props) {
  let { state, dispatch } = useContext(ContactsContext);
  const { match } = props;
  const paramId = parseInt(match.params.id);
  const currentContact = state.contacts.find(contact => contact.id === paramId);

  const favoriteActionButton = (
    <IconButton
      key="favorite-button"
      onClick={() => {
        console.log("favorite clicked");
      }}
      edge="start"
      color="inherit"
      aria-label="favorite"
    >
      <FavoriteBorder />
    </IconButton>
  );

  const deleteActionButton = (
    <IconButton
      component={Link}
      to="/"
      key="delete-button"
      onClick={async () => {
        httpService.DELETE(
          `${API_BASE_URL}/contacts/${currentContact.id}`,
          dispatch,
          DELETE_CONTACT_SUCCESS,
          currentContact.id
        );
      }}
      edge="start"
      color="inherit"
      aria-label="menu"
    >
      <DeleteForeverRounded />
    </IconButton>
  );

  return (
    <React.Fragment>
      <NavBar
        leadingIcon={<ArrowBack />}
        navigateTo="/"
        actionButtons={[favoriteActionButton, deleteActionButton]}
      />
      <FabButton
        navigateTo={EDIT.replace(":id", paramId)}
        labelText="Edit"
        icon={<Edit />}
      />
      <ContactTextFields contact={currentContact} isReadOnly={true} />
    </React.Fragment>
  );
}
