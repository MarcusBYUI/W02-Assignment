const mongoose = require("mongoose");

const sequenceSchema = mongoose.Schema({
  maxDocumentId: Number,
  maxMessageId: Number,
  maxContactId: Number,
});

module.exports = mongoose.model("sequence", sequenceSchema);
