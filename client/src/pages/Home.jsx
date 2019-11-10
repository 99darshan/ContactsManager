import React, { Component } from "react";
import NavBar from "../components/NavBar";
import FabButton from "../components/FabButton";
import ContactListItem from "../components/ContactListItem";

export default class Home extends Component {
  render() {
    return (
      <React.Fragment>
        <NavBar />
        <ContactListItem
          avatar="https://i.pravatar.cc/300"
          name="Jon Doe"
          phoneNumber="123456890"
        />
        <FabButton />
      </React.Fragment>
    );
  }
}
