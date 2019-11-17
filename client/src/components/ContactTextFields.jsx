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
import {
  TextField,
  InputAdornment,
  IconButton,
  Fab,
  Avatar
} from "@material-ui/core";
import { ContactsContext } from "../appState/contactsContext";
import httpService from "../services/httpService";
import {
  CREATE_CONTACT_SUCCESS,
  UPDATE_CONTACT_SUCCESS
} from "../appState/contactsActionTypes";
import SnackBar from "./SnackBar";
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
  let [emailValue, setEmailValue] = useState(
    props.contact ? props.contact.email : ""
  );
  let [companyValue, setCompanyValue] = useState(
    props.contact ? props.contact.company : ""
  );
  let [addressValue, setAddressValue] = useState(
    props.contact ? props.contact.address : ""
  );
  let [birthdayValue, setBirthdayValue] = useState(
    props.contact ? props.contact.birthday : ""
  );

  let [openSnackbar, setOpenSnackbar] = useState(false);
  let [snackbarMessage, setSnackbarMessage] = useState("");

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        marginTop: "2rem",
        marginBottom: "1rem"
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "800px",
          paddingLeft: "8px",
          paddingRight: "8px"
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center"
          }}
        >
          {!props.isReadOnly && (
            <Fab color="secondary" aria-label="addProfilePhoto">
              <AddPhotoAlternate />
            </Fab>
          )}
          {props.isReadOnly && (
            <Avatar
              alt={`${props.contact.firstName} ${props.contact.lastName}`}
              src={`https://picsum.photos/seed/${props.contact.id}/600`}
              style={{ width: 100, height: 100 }}
            />
          )}
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column"
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
            error={!firstNameValue}
            helperText={!firstNameValue ? "First Name Is Required !!" : ""}
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
            error={!new RegExp("^[0-9]+$").test(phoneNumberValue)}
            helperText={
              !new RegExp("^[0-9]+$").test(phoneNumberValue)
                ? "Phone number is required and should be numeric."
                : ""
            }
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
          <TextField
            style={{ marginTop: "1rem" }}
            value={emailValue}
            disabled={props.isReadOnly}
            fullWidth
            id="email"
            label="Email"
            type="email"
            variant="outlined"
            onChange={e => {
              setEmailValue(e.target.value);
              console.log(emailValue);
            }}
            error={emailValue ? !/\S+@\S+\.\S+/.test(emailValue) : false}
            helperText={
              emailValue
                ? !/\S+@\S+\.\S+/.test(emailValue)
                  ? "Invalid Email"
                  : ""
                : ""
            }
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Email />
                </InputAdornment>
              )
            }}
          />

          <TextField
            style={{ marginTop: "1rem" }}
            value={companyValue}
            disabled={props.isReadOnly}
            fullWidth
            id="company"
            label="Company"
            type="search"
            variant="outlined"
            onChange={e => {
              setCompanyValue(e.target.value);
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Business />
                </InputAdornment>
              )
            }}
          />
          <TextField
            style={{ marginTop: "1rem" }}
            value={addressValue}
            disabled={props.isReadOnly}
            fullWidth
            id="address"
            label="Address"
            type="search"
            variant="outlined"
            onChange={e => {
              setAddressValue(e.target.value);
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Room />
                </InputAdornment>
              )
            }}
          />
          <SnackBar
            openSnackbar={openSnackbar}
            onClose={() => {
              setOpenSnackbar(false);
            }}
            snackbarMessage={snackbarMessage}
          />
          {/* TOOD: Add Birthday date picker */}
        </div>
        {!props.isReadOnly && (
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "flex-end",
              padding: "1rem"
            }}
          >
            <RaisedButton
              label="Save"
              startIcon={<Save />}
              onClick={async () => {
                console.log("Saved on Edit or Add .");
                // TODO: validate for required fields and phoneNumber to be a number field
                // firstname is required and phone number should be numeric
                if (
                  !firstNameValue ||
                  !new RegExp("^[0-9]+$").test(phoneNumberValue) ||
                  (emailValue && !/\S+@\S+\.\S+/.test(emailValue))
                ) {
                  console.log("invalid save items");
                  setSnackbarMessage("Invalid Entries !!");
                  setOpenSnackbar(true);
                  return;
                }
                let newContact = {
                  firstName: firstNameValue,
                  lastName: lastNameValue,
                  phoneNumber: parseInt(phoneNumberValue),
                  email: emailValue,
                  company: companyValue,
                  address: addressValue
                };
                if (props.saveActionType === "ADD") {
                  await httpService.POST(
                    `${API_BASE_URL}/contacts`,
                    newContact,
                    dispatch,
                    CREATE_CONTACT_SUCCESS
                  );
                  setSnackbarMessage("New Contact Created !!");
                  setOpenSnackbar(true);
                  props.routeHistory.goBack();
                } else {
                  await httpService.PUT(
                    `${API_BASE_URL}/contacts/${props.contact.id}`,
                    newContact,
                    dispatch,
                    UPDATE_CONTACT_SUCCESS
                  );
                  setSnackbarMessage("Contact Info Updated !!");
                  setOpenSnackbar(true);
                  props.routeHistory.goBack();
                }
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
