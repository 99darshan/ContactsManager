import React from "react";
import { Button } from "@material-ui/core";
import PropTypes from "prop-types";
export default function RaisedButton(props) {
  return (
    <Button
      variant="contained"
      color="primary"
      startIcon={props.startIcon}
      onClick={props.onClick}
    >
      {props.label}
    </Button>
  );
}

RaisedButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
  startIcon: PropTypes.element
};
