import React from "react";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import { makeStyles } from "@material-ui/core/styles";

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

export default function FabButton() {
  const classes = useStyles();
  return (
    <Fab
      variant="extended"
      aria-label="add"
      className={classes.fab}
      color="secondary"
    >
      <AddIcon className={classes.extendedIcon} />
      Add
    </Fab>
  );
}
