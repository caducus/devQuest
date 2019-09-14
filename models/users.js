// =======================
// Dependencies
// =======================

const mongoose = require("mongoose");

// =======================
// Schema
// =======================

const userSchema = new mongoose.Schema ({
  username: {type: String, unique: true, require: true},
  password: {type: String, require: true},
  avatar: String,
  bio: String
});

const User = mongoose.model("User", userSchema);

// =======================
// Export
// =======================

module.exports = User;
