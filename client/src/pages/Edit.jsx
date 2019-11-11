import React, { Component } from "react";
import NavBar from "../components/NavBar";
import ContactTextFields from "../components/ContactTextFields";
import { ArrowBack } from "@material-ui/icons";

export default class Edit extends Component {
  render() {
    return (
      <React.Fragment>
        <NavBar leadingIcon={<ArrowBack />} title="Edit" navigateTo="/" />

        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            border: "1px solid  red",
            alignItems: "stretch",
            marginTop: "2rem"
          }}
        >
          <ContactTextFields />
        </div>
      </React.Fragment>
    );
  }
}
