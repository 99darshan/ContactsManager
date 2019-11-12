import React, { Component } from "react";
import { ArrowBack, Edit } from "@material-ui/icons";
import NavBar from "../components/NavBar";
import FabButton from "../components/FabButton";
import ContactTextFields from "../components/ContactTextFields";
import contacts from "../MockData/contactsData";
export default class Details extends Component {
  constructor(props) {
    super(props);
    const { match } = this.props;
    const paramId = parseInt(match.params.id);
    //console.log(paramId);
    //console.table(contacts.find(contact => contact.id === paramId));
    this.state = {
      contact: { ...contacts.find(contact => contact.id === paramId) }
    };
  }
  render() {
    return (
      <React.Fragment>
        <NavBar leadingIcon={<ArrowBack />} screen="details" navigateTo="/" />
        <FabButton navigateTo="/edit" labelText="Edit" icon={<Edit />} />
        <ContactTextFields contact={this.state.contact} isReadOnly={true} />
      </React.Fragment>
    );
  }
}
