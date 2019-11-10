import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton
} from "@material-ui/core";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  leadingButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  }
}));

export default function NavBar(props) {
  const classes = useStyles();

  return (
    <AppBar position="static">
      <Toolbar>
        {/* TODO: take to property as prop?? might not always need to navigate, take IconButton as a prop instead? */}
        <IconButton
          component={Link}
          to="/"
          edge="start"
          className={classes.leadingButton}
          color="inherit"
          aria-label="menu"
        >
          {props.leadingIcon}
        </IconButton>
        <Typography variant="h6" className={classes.title}>
          {props.title}
        </Typography>

        <Button color="inherit">{props.actionButtonText}</Button>
      </Toolbar>
    </AppBar>
  );
}

NavBar.propType = {
  leadingIcon: PropTypes.element,
  title: PropTypes.string.isRequired,
  actionButtonText: PropTypes.string
};
