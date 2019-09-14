// =======================
// Dependencies
// =======================

const express = require("express");
const bcrypt = require("bcrypt");

const router = express.Router();
const User = require("../models/users.js");

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
// Export
// =======================

module.exports = router;
