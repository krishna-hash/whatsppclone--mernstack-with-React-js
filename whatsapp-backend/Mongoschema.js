const mongoose = require("mongoose");

const whatsapp = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  timestamp: {
    type: String,
    required: true,
  },
  received: {
    type: Boolean,
  },
});

module.exports = mongoose.model("wdatas", whatsapp);
