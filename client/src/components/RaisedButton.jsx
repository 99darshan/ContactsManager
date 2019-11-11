import React from "react";
import { Button } from "@material-ui/core";
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

// TODO: add prop types
