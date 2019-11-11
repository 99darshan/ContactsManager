import React, { Component } from "react";
import RaisedButton from "../components/RaisedButton";
import FlatButton from "../components/FlatButton";

import {
  ArrowBack,
  Person,
  PersonOutline,
  Phone,
  Business,
  Email,
  Room,
  FileCopy,
  Close,
  AddPhotoAlternate,
  Save
} from "@material-ui/icons";
import {
  TextField,
  Grid,
  InputAdornment,
  IconButton,
  Fab
} from "@material-ui/core";
// TODO: change to functional component
export default class ContactTextFields extends Component {
  render() {
    return (
      <div
        style={{ width: "100%", maxWidth: "800px", border: "1px solid yellow" }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center"
          }}
        >
          <Fab color="secondary" aria-label="addProfilePhoto">
            <AddPhotoAlternate />
          </Fab>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            border: "1px solid blue",
            padding: "1rem" // TODO: use material theme spacing
          }}
        >
          <TextField
            style={{ marginTop: "16px" }}
            fullWidth
            id="firstName"
            label="First Name"
            type="search"
            required
            variant="outlined"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Person />
                </InputAdornment>
              )
            }}
          />

          <TextField
            style={{ marginTop: "16px" }}
            fullWidth
            id="lastName"
            label="Last Name"
            type="search"
            variant="outlined"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Person />
                </InputAdornment>
              )
            }}
          />
          <TextField
            style={{ marginTop: "16px" }}
            id="phoneNumber"
            label="Phone Number"
            required
            variant="outlined"
            type="tel"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Phone />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton>
                    <FileCopy />
                  </IconButton>
                </InputAdornment>
              )
            }}
          />
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-end",
            border: "1px solid black",
            padding: "1rem"
          }}
        >
          <RaisedButton
            label="Save"
            startIcon={<Save />}
            onClick={() => {
              console.log("Saved on Edit.");
            }}
          />
          <div style={{ marginRight: "1rem" }} />
          <FlatButton
            label="Cancel"
            onClick={() => {
              console.log("Caneled on Edit.");
            }}
          />
        </div>
      </div>
      // {/* TODO: work on flex styling unnecessary flexes */ }
    );
  }
}
