import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import Chat from "./Chat";
import "./App.css";
import Pusher from "pusher-js";
import axios from "./Axios";

const App = () => {
  const [mes, setmessage] = useState([]);
  useEffect(() => {
    axios.get("/api/val").then((res) => setmessage(res.data));
  }, []);

  useEffect(() => {
    const pusher = new Pusher("838fbbaaf2548d91890e", {
      cluster: "ap2",
    });

    const channel = pusher.subscribe("wdatas");
    channel.bind("inserted", function (data) {
      setmessage([...mes, data]);
    });

    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };
  }, [mes]);
  console.log(mes);
  return (
    <div className="app">
      <div className="app_body">
        <Sidebar></Sidebar>
        <Chat messages={mes}></Chat>
      </div>
    </div>
  );
};

export default App;
