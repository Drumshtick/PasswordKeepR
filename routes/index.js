const express = require('express');
const indexRoute  = express.Router();

// GET route
indexRoute.get("/", (req, res) => {
  res.render("index");
});



// export modules
module.exports = indexRoute;
