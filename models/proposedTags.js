const mongoose = require("mongoose");

const proposedTagSchema = mongoose.Schema({
  title: String,
  color: String,
  border: String,
});

const ProposedTag = mongoose.model("proposedtags", proposedTagSchema);

module.exports = ProposedTag;