import React from "react";
import {
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  ListItemSecondaryAction,
  IconButton
} from "@material-ui/core";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Star, Edit } from "@material-ui/icons";
import { DETAILS } from "../constants/routeConstants";

export default function ContactListItem(props) {
  return (
    <React.Fragment>
      <ListItem
        component={Link}
        to={DETAILS.replace(":id", props.id)}
        alignItems="flex-start"
        button
        divider
        ContainerComponent="div"
        onClick={() => {
          console.log("list tem clicked");
        }}
      >
        <ListItemAvatar>
          <Avatar alt={props.name} src={props.avatar} />
        </ListItemAvatar>

        <ListItemText primary={props.name} secondary={props.phoneNumber} />
        <ListItemSecondaryAction>
          <IconButton
            edge="end"
            aria-label="favorite"
            onClick={() => {
              console.log("favorite clicked");
            }}
          >
            <Star />
          </IconButton>
          <IconButton
            edge="end"
            aria-label="edit"
            onClick={() => {
              console.log("edit clicked");
            }}
          >
            <Edit />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
    </React.Fragment>
  );
}

ContactListItem.propTypes = {
  avatar: PropTypes.string,
  name: PropTypes.string.isRequired,
  phoneNumber: PropTypes.string
};
