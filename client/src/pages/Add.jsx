import React, { Component } from "react";
import NavBar from "../components/NavBar";
import ContactTextFields from "../components/ContactTextFields";
import { Close } from "@material-ui/icons";

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
