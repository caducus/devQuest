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
  User.findOne({username: req.body.username}, (error, foundUser) => {
    if(bcrypt.compareSync(req.body.password, foundUser.password)) {
      req.session.currentUser = foundUser;
      res.status(201).json ({
        status: 201,
        message: "session created"
      });
    } else {
      res.status(401).json ({
        status: 401,
        message: "log in failed"
      });
    };
  });
});

// =======================
// Delete Route
// =======================

router.delete("/", (req, res) => {
  req.session.destroy(() => {
    res.status(200).json({
      status: 200,
      message: "logout complete"
    });
  });
});

// =======================
// Export
// =======================

module.exports = router;
