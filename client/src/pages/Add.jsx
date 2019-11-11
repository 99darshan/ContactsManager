import React, { Component } from "react";
import NavBar from "../components/NavBar";
import ContactTextFields from "../components/ContactTextFields";
import {
  ArrowBack,
  Person,
  PersonOutline,
  Phone,
  Business,
  Email,
  Room,
  FileCopy,
  Close,
  AddPhotoAlternate
} from "@material-ui/icons";
import {
  TextField,
  Grid,
  InputAdornment,
  IconButton,
  Fab
} from "@material-ui/core";

export default class Add extends Component {
  render() {
    return (
      <React.Fragment>
        <NavBar
          title="Add Contact"
          leadingIcon={<Close />}
          screen="add"
          navigateTo="/"
        />

        <ContactTextFields isReadOnly={false} />
      </React.Fragment>
    );
  }
}
