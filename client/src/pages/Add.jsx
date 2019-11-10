import React, { Component } from "react";
import NavBar from "../components/NavBar";
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
  AddPhotoAlternate
} from "@material-ui/icons";
import {
  TextField,
  Grid,
  InputAdornment,
  IconButton,
  Fab
} from "@material-ui/core";

export default class Add extends Component {
  render() {
    return (
      <React.Fragment>
        <NavBar
          title="Add Contact"
          actionButtonText="Save"
          leadingIcon={<Close />}
          screen="add"
        />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            padding: "1rem", // TODO: use material theme spacing
            border: "1px solid red"
          }}
        >
          <div>
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
        </div>
      </React.Fragment>
    );
  }
}
