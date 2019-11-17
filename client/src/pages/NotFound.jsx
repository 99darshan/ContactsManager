import React from "react";
import { Fab } from "@material-ui/core";
import { Home } from "@material-ui/icons";
import { Link } from "react-router-dom";
export default function NotFound() {
  return (
    <div
      style={{
        backgroundImage: "linear-gradient( 135deg, #72EDF2 10%, #5151E5 100%)",
        display: "flex",
        alignItems: "row",
        justifyContent: "center",
        height: "100vh"
      }}
    >
      <div>
        <h1 style={{ fontSize: "8rem", fontWeight: "bold", color: "white" }}>
          404
        </h1>
        <div
          style={{
            display: "flex",
            alignItems: "row",
            justifyContent: "center"
          }}
        >
          <Fab component={Link} to="/" color="secondary" aria-label="home">
            <Home />
          </Fab>
        </div>
      </div>
    </div>
  );
}
