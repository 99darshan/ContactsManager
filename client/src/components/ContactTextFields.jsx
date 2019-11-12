import React, { Component } from "react";
import RaisedButton from "../components/RaisedButton";
import FlatButton from "../components/FlatButton";
import PropTypes from "prop-types";
import {
  Person,
  Phone,
  Business,
  Email,
  Room,
  FileCopy,
  AddPhotoAlternate,
  Save
} from "@material-ui/icons";
import { TextField, InputAdornment, IconButton, Fab } from "@material-ui/core";
export default function ContactTextFields(props) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        border: "1px solid  red",
        marginTop: "2rem"
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "800px",
          border: "1px solid yellow"
        }}
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
            style={{ marginTop: "1rem" }}
            value={props.contact ? props.contact.firstName : ""}
            fullWidth
            disabled={props.isReadOnly}
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
            style={{ marginTop: "1rem" }}
            value={props.contact ? props.contact.lastName : ""}
            disabled={props.isReadOnly}
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
            style={{ marginTop: "1rem" }}
            value={props.contact ? props.contact.phoneNumber : ""}
            disabled={props.isReadOnly}
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

              endAdornment: props.isReadOnly && (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => {
                      console.log("copied to clipboard clicked");
                    }}
                  >
                    <FileCopy />
                  </IconButton>
                </InputAdornment>
              )
            }}
          />
        </div>
        {!props.isReadOnly && (
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
        )}
      </div>
    </div>
    // {/* TODO: work on flex styling unnecessary flexes */ }
  );
}

ContactTextFields.propTypes = {
  isReadOnly: PropTypes.bool.isRequired,
  contact: PropTypes.object
};
