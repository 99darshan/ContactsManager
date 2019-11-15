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
import {
  Favorite,
  FavoriteBorder,
  DeleteForeverRounded
} from "@material-ui/icons";
const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  marginRight: {
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
          to={props.navigateTo}
          edge="start"
          className={classes.marginRight}
          color="inherit"
          aria-label="menu"
          onClick={props.leadingButtonClick}
        >
          {props.leadingIcon}
        </IconButton>
        <Typography variant="h6" className={classes.title}>
          {props.title}
        </Typography>
        {props.actionButtons && props.actionButtons.map(button => button)}
      </Toolbar>
    </AppBar>
  );
}

NavBar.propType = {
  leadingIcon: PropTypes.element,
  navigateTo: PropTypes.string,
  title: PropTypes.string,
  leadinButtonClick: PropTypes.func,
  actionButtons: PropTypes.array
};
