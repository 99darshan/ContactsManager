import React, { Component } from "react";
import NavBar from "../components/NavBar";
import ContactTextFields from "../components/ContactTextFields";
import { ArrowBack } from "@material-ui/icons";
import contacts from "../MockData/contactsData";

export default class Edit extends Component {
  constructor(props) {
    super(props);
    const { match } = this.props;
    this.paramId = parseInt(match.params.id);
    //console.log(paramId);
    //console.table(contacts.find(contact => contact.id === paramId));
    this.state = {
      contact: { ...contacts.find(contact => contact.id === this.paramId) }
    };
  }
  render() {
    return (
      <React.Fragment>
        <NavBar leadingIcon={<ArrowBack />} title="Edit" navigateTo="/" />

        <ContactTextFields contact={this.state.contact} isReadOnly={false} />
      </React.Fragment>
    );
  }
}
