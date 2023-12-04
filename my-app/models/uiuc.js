var mongoose = require("mongoose");

var UiucSchema = new mongoose.Schema({
  netID: { type: String, required: true },
  password: { type: String, required: true, unique: true },
});

// Export the Mongoose model
module.exports = mongoose.model("Uiuc", UiucSchema);
