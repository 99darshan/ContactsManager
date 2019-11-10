import React, { Component } from "react";
import NavBar from "../components/NavBar";
import FabButton from "../components/FabButton";

export default class Home extends Component {
  render() {
    return (
      <React.Fragment>
        <NavBar />
        <FabButton />
      </React.Fragment>
    );
  }
}
