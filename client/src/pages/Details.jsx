import React, { Component } from "react";
import { ArrowBack, Edit } from "@material-ui/icons";
import NavBar from "../components/NavBar";
import FabButton from "../components/FabButton";
import ContactTextFields from "../components/ContactTextFields";
export default class Details extends Component {
  render() {
    return (
      <React.Fragment>
        <NavBar leadingIcon={<ArrowBack />} screen="details" navigateTo="/" />
        <FabButton navigateTo="/edit" labelText="Edit" icon={<Edit />} />
        <ContactTextFields isReadOnly={true} />
      </React.Fragment>
    );
  }
}
