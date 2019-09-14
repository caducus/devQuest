// =======================
// Dependencies
// =======================

const express = require("express");

// =======================
// Configuration
// =======================

const app = express();
const port = 3000;

// =======================
// Middleware
// =======================

app.use(express.static("public"));

// =======================
// Routes
// =======================


// =======================
// Listener
// =======================

app.listen(port, () => {
  console.log("I'm totes listenin' on port: " + port);
});
