// =======================
// Dependencies
// =======================

const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");

require("dotenv").config();

// =======================
// Controllers
// =======================

const usersController = require("./controllers/user.js");
const sessionsController = require("./controllers/sessions.js");

// =======================
// Configuration
// =======================

const app = express();
const port = process.env.PORT || 3000;

const MONGODB_URI = process.env.MONGODB_URI

mongoose.connect(MONGODB_URI, { useNewUrlParser: true });
mongoose.connection.once("open", () => {
  console.log("Connected to Mongoose.");
});

// ==========================
// Fix Deprecation Warnings
// ==========================

mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);

// =======================
// Middleware
// =======================

app.use(express.static("public"));
app.use(express.json());
app.use(session({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: false
}));
app.use("/users", usersController);
app.use("/sessions", sessionsController);

// =======================
// Routes
// =======================

app.get("/loggedin", (req, res) => {
  if (req.session.currentUser) {
    res.json(req.session.currentUser);
  } else {
    res.status(401).json ({
      status: 401,
      message: "not logged in"
    });
  };
});

// =======================
// Listener
// =======================

app.listen(port, () => {
  console.log("I'm totes listenin' on port: " + port);
});
