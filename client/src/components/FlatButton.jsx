import React from "react";
import { Button } from "@material-ui/core";
export default function FlatButton(props) {
  return <Button onClick={props.onClick}>{props.label}</Button>;
}

// TODO: add prop types
