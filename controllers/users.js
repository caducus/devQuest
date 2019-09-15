// =======================
// Dependencies
// =======================

const express = require("express");
const bcrypt = require("bcrypt");

const router = express.Router();
const User = require("../models/users.js");

// =======================
// Index Route
// =======================

router.get("/", (req, res) => {
  User.find({}, (error, allUsers) => {
    res.json(allUsers)
  });
});

// =======================
// Post Route
// =======================

router.post("/", (req, res) => {
  req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));
  User.create(req.body, (error, createdUser) => {
    res.status(201).json ({
      status: 201,
      message: "user created"
    });
  });
});

// =======================
// Update Route
// =======================

router.put("/:id", (req, res) => {
  User.findByIdAndUpdate(req.params.id, req.body, {new: true}, (error, updatedUser) => {
    res.json(updatedUser)
  });
});

// =======================
// Export
// =======================

module.exports = router;
