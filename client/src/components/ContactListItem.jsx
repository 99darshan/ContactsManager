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
import { EDIT } from "../constants/routeConstants";

export default function ContactListItem(props) {
  return (
    <React.Fragment>
      <ListItem
        component={Link}
        to={DETAILS.replace(":id", props.contact.id)}
        alignItems="center"
        button
        divider
        ContainerComponent="div"
        onClick={() => {
          console.log("list tem clicked");
        }}
      >
        <ListItemAvatar>
          <Avatar
            alt={`${props.contact.firstName} ${props.contact.lastName}`}
            src={props.avatar}
          />
        </ListItemAvatar>

        <ListItemText
          primary={`${props.contact.firstName} ${props.contact.lastName}`}
          secondary={props.contact.phoneNumber}
        />
        <ListItemSecondaryAction>
          <IconButton
            edge="end"
            aria-label="favorite"
            onClick={() => {
              console.log("favorite clicked");
              // make put request to update the favorite contacts
            }}
          >
            <Star />
          </IconButton>
          <IconButton
            component={Link}
            to={EDIT.replace(":id", props.contact.id)}
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
  contact: PropTypes.object.isRequired
};
