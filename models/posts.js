// =======================
// Dependencies
// =======================

const mongoose = require("mongoose");

// =======================
// Schema
// =======================

const postSchema = new mongoose.Schema ({
  user_id: String,
  username: String,
  avatar: String,
  title: String,
  post: String
});

const Post = mongoose.model("Post", postSchema);

// =======================
// Export
// =======================

module.exports = Post;
