const express = require("express");
const app = express();
const mongoose = require("mongoose");
const whatsappdata = require("../whatsapp-backend/Mongoschema");
const parser = require("body-parser");
const Pusher = require("pusher");
const cors = require("cors");
const pusher = new Pusher({
  appId: "1067713",
  key: "838fbbaaf2548d91890e",
  secret: "7d79df018a7e39df7eea",
  cluster: "ap2",
  encrypted: true,
});
const db = mongoose.connection;
db.once("open", () => {
  console.log("db opened");
  const collectione = db.collection("wdatas");
  const streamwatch = collectione.watch();
  streamwatch.on("change", (change) => {
    console.log(change);
    if (change.operationType === "insert") {
      const messagecontent = change.fullDocument;
      pusher.trigger("wdatas", "inserted", {
        name: messagecontent.name,
        message: messagecontent.message,
        timestamp: messagecontent.timestamp,
        received: messagecontent.received,
      });
    } else {
      console.log("Error occured");
    }
  });
});

app.use(express.json());
app.use(cors());

app.use(parser.json());
mongoose.connect(
  "mongodb+srv://whatsapp:rhino94@cluster0.nttdx.mongodb.net/wdata?retryWrites=true&w=majority",
  { useUnifiedTopology: true, useNewUrlParser: true },
  () => {
    console.log("database connected");
  }
);
app.get("/api/val", (req, res) => {
  whatsappdata.find((err, data) => {
    if (err) {
      res.send(err);
    } else {
      res.json(data);
    }
  });
});
app.get("/", (req, res) => {
  res.send("served connected").status(200);
});
app.post("/api", async (req, res) => {
  const data = new whatsappdata({
    name: req.body.name,
    message: req.body.message,
    timestamp: req.body.timestamp,
    received: req.body.received,
  });
  try {
    const saved = await data.save();
    res.send(saved).status(201);
  } catch (err) {
    res.json(err);
  }
});
const Port = process.env.Port || 5000;

app.listen(Port, () => {
  console.log("server connected");
});
