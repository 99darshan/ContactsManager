import React, { Component } from "react";
import NavBar from "../components/NavBar";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";

export default class Add extends Component {
  render() {
    return (
      <React.Fragment>
        <NavBar
          title="Add Contact"
          actionButtonText="Save"
          leadingIcon={<ArrowBackIcon />}
        />
      </React.Fragment>
    );
  }
}
