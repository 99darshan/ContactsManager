import React from "react";
import {
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText
} from "@material-ui/core";
import PropTypes from "prop-types";

export default function ContactListItem(props) {
  return (
    <ListItem
      alignItems="flex-start"
      button
      onClick={() => {
        console.log("list tem clicked");
      }}
    >
      <ListItemAvatar>
        <Avatar alt={props.name} src={props.avatar} />
      </ListItemAvatar>
      <ListItemText primary={props.name} secondary={props.phoneNumber} />
    </ListItem>
  );
}

ContactListItem.propTypes = {
  avatar: PropTypes.string,
  name: PropTypes.string.isRequired,
  phoneNumber: PropTypes.string
};
