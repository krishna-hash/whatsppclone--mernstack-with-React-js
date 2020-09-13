import React from "react";
import "./sidebarchat.css";
import { Avatar } from "@material-ui/core";

function Sidebarchat() {
  return (
    <div className="sidebarchat">
      <Avatar></Avatar>
      <div className="sidebarchat-info">
        <h2>Room</h2>
        <p>this is messages</p>
      </div>
    </div>
  );
}

export default Sidebarchat;
