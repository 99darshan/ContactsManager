import React, { Component } from "react";
import {
  ArrowBack,
  Edit,
  Person,
  Phone,
  FileCopy,
  AddPhotoAlternate,
  Close
} from "@material-ui/icons";
import { Fab, TextField, InputAdornment, IconButton } from "@material-ui/core";
import NavBar from "../components/NavBar";
import FabButton from "../components/FabButton";
import ContactTextFields from "../components/ContactTextFields";
export default class Details extends Component {
  constructor(props) {
    super(props);
  }
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
