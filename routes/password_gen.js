
const express = require('express');
const passwordRouter  = express.Router();
const { db, Pool } = require('../db/dbConn');

//db.connect();

// get routes for password generator page
passwordRouter.get("/", (req, res) => {
  res.render("password_gen");
});

passwordRouter.post("/", (req, res) => {
  console.log('hello world!');
  res.status(200).send('Working test!');
});

// export whole router
module.exports = passwordRouter;
//module.exports = router ;
