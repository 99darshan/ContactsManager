import React from "react";
import Fab from "@material-ui/core/Fab";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
const useStyles = makeStyles(theme => ({
  fab: {
    position: "fixed",
    bottom: theme.spacing(2),
    right: theme.spacing(2)
  },
  extendedIcon: {
    marginRight: theme.spacing(1)
  }
}));

// TODO: make modular by accepting props
export default function FabButton(props) {
  const classes = useStyles();
  return (
    <Fab
      component={Link}
      to={props.navigateTo}
      variant="extended"
      aria-label={props.labelText}
      className={classes.fab}
      color="secondary"
    >
      {props.icon}
      <div className={classes.extendedIcon} />
      {props.labelText}
    </Fab>
  );
}

FabButton.propTypes = {
  navigateTo: PropTypes.string,
  labelText: PropTypes.string.isRequired,
  icon: PropTypes.element
};
