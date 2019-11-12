import React, { Component } from "react";
import { ArrowBack, Edit } from "@material-ui/icons";
import NavBar from "../components/NavBar";
import FabButton from "../components/FabButton";
import ContactTextFields from "../components/ContactTextFields";
import contacts from "../MockData/contactsData";
import { EDIT } from "../constants/routeConstants";
export default class Details extends Component {
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
        <NavBar leadingIcon={<ArrowBack />} screen="details" navigateTo="/" />
        <FabButton
          navigateTo={EDIT.replace(":id", this.paramId)}
          labelText="Edit"
          icon={<Edit />}
        />
        <ContactTextFields contact={this.state.contact} isReadOnly={true} />
      </React.Fragment>
    );
  }
}
