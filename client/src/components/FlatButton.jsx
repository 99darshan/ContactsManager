import React from "react";
import { Button } from "@material-ui/core";
import PropTypes from "prop-types";
export default function FlatButton(props) {
  return <Button onClick={props.onClick}>{props.label}</Button>;
}

FlatButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired
};
