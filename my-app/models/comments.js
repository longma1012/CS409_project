var mongoose = require("mongoose");

var CommentsSchema = new mongoose.Schema({
  Content: { type: String, required: true },
  createTime: { type: Date, default: Date.now },
  LinkedPostID: { type: String, required: true },
  commentUserID: { type: String, required: true },
});

module.exports = mongoose.model("Comments", CommentsSchema);
