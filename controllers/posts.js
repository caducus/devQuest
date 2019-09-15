// =======================
// Dependencies
// =======================

const express = require("express");
const session = require("express-session");

const router = express.Router();
const Posts = require("../models/posts.js");

// =======================
// Index Route
// =======================

router.get("/", (req, res) => {
  Posts.find({}, (error, allPosts) => {
    res.json(allPosts)
  });
});

// =======================
// Create Route
// =======================

router.post("/", (req, res) => {
  Posts.create(req.body, (error, newPost) => {
    res.json(newPost)
  });
});

// =======================
// Update Route
// =======================

router.put("/:id", (req, res) => {
  Posts.findByIdAndUpdate(req.params.id, req.body, {new: true}, (error, editedPost) => {
    res.json(editedPost)
  });
});

// =======================
// Delete Route
// =======================

router.delete("/:id", (req, res) => {
  Posts.findByIdAndRemove(req.params.id, (error, deletedPost) => {
    res.json(deletedPost)
  });
});

// =======================
// Export
// =======================

module.exports = router;
