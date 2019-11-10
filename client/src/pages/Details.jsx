import React, { Component } from "react";
import { ArrowBack, Edit } from "@material-ui/icons";
import NavBar from "../components/NavBar";
import FabButton from "../components/FabButton";
export default class Details extends Component {
  render() {
    return (
      <React.Fragment>
        <NavBar leadingIcon={<ArrowBack />} screen="details" />
        <FabButton navigateTo="/add" labelText="Edit" icon={<Edit />} />
      </React.Fragment>
    );
  }
}
