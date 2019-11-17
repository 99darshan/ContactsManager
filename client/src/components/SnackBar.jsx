import React from "react";
import { Snackbar, IconButton } from "@material-ui/core";
import { Close } from "@material-ui/icons";
import PropTypes from "prop-types";

export default function SnackBar(props) {
  return (
    <Snackbar
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left"
      }}
      open={props.openSnackbar}
      autoHideDuration={5000}
      onClose={props.onClose}
      ContentProps={{
        "aria-describedby": "message-id"
      }}
      message={<span id="message-id">{props.snackbarMessage}</span>}
      action={[
        <IconButton
          key="close"
          aria-label="close"
          color="inherit"
          onClick={props.onClose}
        >
          <Close />
        </IconButton>
      ]}
    />
  );
}

SnackBar.propTypes = {
  onClose: PropTypes.func.isRequired,
  openSnackbar: PropTypes.bool.isRequired,
  snackbarMessage: PropTypes.string
};
