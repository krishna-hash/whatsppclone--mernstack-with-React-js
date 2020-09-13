import React, { useState } from "react";
import "./Chat.css";
import { IconButton, Avatar } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import AttachFileIcon from "@material-ui/icons/AttachFile";
import InsertEmoticonIcon from "@material-ui/icons/InsertEmoticon";
import MicIcon from "@material-ui/icons/Mic";
import axios from "./Axios";

function Chat({ messages }) {
  const [msg, setmsg] = useState("");
  const submit = async (e) => {
    e.preventDefault();

    await axios.post("api", {
      name: "kavin",
      message: msg,
      timestamp: "now",
      received: false,
    });
    setmsg("");
  };
  return (
    <div className="chat">
      <div className="chat_header">
        <Avatar></Avatar>
        <div className="chat_header-info">
          <h3>Team name</h3>
          <p>Last seen...</p>
        </div>
        <div className="chat_header-right">
          <IconButton>
            <SearchIcon />
          </IconButton>
          <IconButton>
            <AttachFileIcon />
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </div>
      </div>
      <div className="chat_body">
        {messages.map((message) => (
          <p className={`chat_message ${message.received && "chat_receiver"}`}>
            <span className="chat_name">{message.name}</span>
            {message.message}
            <span className="chat_timeline">{message.timestamp}</span>
          </p>
        ))}
      </div>
      <div className="chat_footer">
        <InsertEmoticonIcon></InsertEmoticonIcon>
        <form>
          <input
            value={msg}
            type="text"
            onChange={(e) => setmsg(e.target.value)}
            placeholder="type here...."
          ></input>
          <button onClick={submit} type="submit">
            send
          </button>
        </form>
        <MicIcon></MicIcon>
      </div>
    </div>
  );
}

export default Chat;
