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

const usersController = require("./controllers/users.js");
const sessionsController = require("./controllers/sessions.js");
const postsController = require("./controllers/posts.js");

// =======================
// Configuration
// =======================

const app = express();
const PORT = process.env.PORT || 3000;

const MONGODB_URI = process.env.MONGODB_URI;

mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.once("open", () => {
  console.log("Connected to Mongoose.");
});

// ==========================
// DB Error / Success
// ==========================

mongoose.connection.on("error", (error) => console.log(error.message + " is Mongod not running?"));
mongoose.connection.on("connected", () => console.log("Mongo connected: ", MONGODB_URI));
mongoose.connection.on("disconnected", () => console.log("Mongo disconnected."));

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
app.use("/posts", postsController);

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

app.listen(PORT, () => {
  console.log("I'm totes listenin' on port: " + PORT);
});
