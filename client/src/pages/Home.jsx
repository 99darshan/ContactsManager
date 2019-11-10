import React, { Component } from "react";
import NavBar from "../components/NavBar";
import FabButton from "../components/FabButton";
import ContactListItem from "../components/ContactListItem";
import { Link } from "react-router-dom";
import MenuIcon from "@material-ui/icons/Menu";
import AddIcon from "@material-ui/icons/Add";

export default class Home extends Component {
  render() {
    return (
      <React.Fragment>
        <NavBar
          title="Contacts Manager"
          actionButtonText="Log in"
          leadingIcon={<MenuIcon />}
        />
        <ContactListItem
          avatar="https://i.pravatar.cc/300"
          name="Jon Doe"
          phoneNumber="123456890"
        />

        <FabButton navigateTo="/add" labelText="add" icon={<AddIcon />} />
      </React.Fragment>
    );
  }
}
