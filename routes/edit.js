/*
 *edit route for changing the values associated to the passwords TABLE
 *
 *
 *
 */

const express = require('express');
const editRouter  = express.Router();
const db = require('../db/dbConn');
const { editPasswordEntry } = require('./helpers');

editRouter.post('/', (req, res) => {
  if (req.session.user_id === undefined) {
    return res.redirect(401, '/login');
  }

  const { user_id } = req.session;
  const { username, password, url} = req.body;

  const data = {
    username,
    user_id,
    password,
    url
  };

  editPasswordEntry(data)
  .then((db_results) => {
    if (db_results.length === 0) {
      return res.sendStatus(304);
    }
    console.log("UPDATED Table");
    return res.send({'username': db_results[0].username, 'password': db_results[0].password_text})
  })
  .catch((err) => {
    console.log("ERROR in editRouter.post('/') (edit.js)");
  });
});

module.exports = editRouter;
