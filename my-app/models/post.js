var mongoose = require("mongoose");

var PostSchema = new mongoose.Schema({
  title: { type: String, required: true },
  category: { type: String, required: true },
  postUserId: { type: String, required: true },
  body: { type: String, required: true },
  likes: { type: Number, default: 0 },
  commentID: { type: [String], default: [] },
  postTime: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Post", PostSchema);
