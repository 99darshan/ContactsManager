import React, { useContext, useState } from "react";
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
import { ContactsContext } from "../appState/contactsContext";
import httpService from "../services/httpService";
import {
  CREATE_CONTACT_SUCCESS,
  UPDATE_CONTACT_SUCCESS,
  DELETE_CONTACT_SUCCESS
} from "../appState/contactsActionTypes";
import { API_BASE_URL } from "../constants/routeConstants";

export default function ContactTextFields(props) {
  const { state, dispatch } = useContext(ContactsContext);
  const { hasError, errors, contacts } = state;
  //console.table(props.contact);
  let [firstNameValue, setFirstNameValue] = useState(
    props.contact ? props.contact.firstName : ""
  );
  let [lastNameValue, setLastNameValue] = useState(
    props.contact ? props.contact.lastName : ""
  );
  let [phoneNumberValue, setPhoneNumberValue] = useState(
    props.contact ? props.contact.phoneNumber : ""
  );

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
            value={firstNameValue}
            fullWidth
            disabled={props.isReadOnly}
            id="firstName"
            label="First Name"
            type="search"
            required
            variant="outlined"
            onChange={e => {
              setFirstNameValue(e.target.value);
            }}
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
            value={lastNameValue}
            disabled={props.isReadOnly}
            fullWidth
            id="lastName"
            label="Last Name"
            type="search"
            variant="outlined"
            onChange={e => {
              setLastNameValue(e.target.value);
            }}
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
            value={phoneNumberValue}
            disabled={props.isReadOnly}
            id="phoneNumber"
            label="Phone Number"
            required
            variant="outlined"
            type="tel"
            onChange={e => {
              setPhoneNumberValue(e.target.value);
            }}
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
              onClick={async () => {
                console.log("Saved on Edit or Add .");
                // TODO: validate for required fields and phoneNumber to be a number field
                let newContact = {
                  firstName: firstNameValue,
                  lastName: lastNameValue,
                  phoneNumber: parseInt(phoneNumberValue) // TODO: validate to make sure parsing doesn't fail
                };
                if (props.saveActionType === "ADD") {
                  await httpService.POST(
                    `${API_BASE_URL}/contacts`,
                    newContact,
                    dispatch,
                    CREATE_CONTACT_SUCCESS
                  );

                  console.log("hasError in save..." + hasError);
                  if (!hasError) {
                    console.log("redirect hasError in save..." + hasError);
                    //props.routeHistory.goBack();
                  }
                } else {
                  await httpService.PUT(
                    `${API_BASE_URL}/contacts/${props.contact.id}`,
                    newContact,
                    dispatch,
                    UPDATE_CONTACT_SUCCESS
                  );
                }
                // setTimeout(()=>{
                //   console.log("hasError in save..." + hasError);
                //   if (!hasError) {
                //     console.log("hasError in save..." + hasError);
                //     props.routeHistory.goBack();
                //   }
                // },5000);
              }}
            />
            <div style={{ marginRight: "1rem" }} />
            <FlatButton
              label="Cancel"
              onClick={() => {
                console.log("Caneled on Edit or Add.");
                props.routeHistory.goBack();
              }}
              //onClick={props.onCancel}
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
  contact: PropTypes.object,
  routeHistory: PropTypes.object,
  saveActionType: PropTypes.oneOf(["EDIT", "ADD"])
};
