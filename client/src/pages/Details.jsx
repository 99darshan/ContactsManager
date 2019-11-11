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
export default class Details extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <React.Fragment>
        <NavBar leadingIcon={<ArrowBack />} screen="details" navigateTo="/" />

        <FabButton navigateTo="/edit" labelText="Edit" icon={<Edit />} />

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
              disabled={true}
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
              disabled={true}
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
              disabled={true}
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
