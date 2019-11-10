import React from "react";
import {
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText
} from "@material-ui/core";
import PropTypes from "prop-types";
import { Divider } from "@material-ui/core";

export default function ContactListItem(props) {
  return (
    <React.Fragment>
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
      <Divider />
    </React.Fragment>
  );
}

ContactListItem.propTypes = {
  avatar: PropTypes.string,
  name: PropTypes.string.isRequired,
  phoneNumber: PropTypes.string
};
