/*
 *edit route for changing the values associated to the passwords TABLE
 *
 *
 *
 */

const express = require('express');
const editRouter  = express.Router();
const db = require('../db/dbConn');

editRouter.post('/', (req, res) => {
  if (req.session.user_id === undefined) {
    return res.redirect(401, '/login');
  }

  const { user_id } = req.session;
  const { username, password, url} = req.body;
  // To reply to ajax stating success
  res.sendStatus(200);

  const data = {
    username,
    user_id,
    password,
    url
  };

  editPasswordEntry(data)
  .then((db_results) => {
    console.log("UPDATED Table");
  })
  .catch((err) => {
    console.log("ERROR in editRouter.post('/') (edit.js)");
  });
});



module.exports = editRouter;

const editPasswordEntry = function(data){
  let query = `
              UPDATE passwords
              SET password_text = $1,
              username = $2
              WHERE user_id = $3
              AND url = $4 RETURNING *;
              `;
  const queryParams = [data.password, data.username, data.user_id, data.url];

  return db
  .query(query, queryParams)
  .then((db_results) => {
    return db_results.rows;
  })
  .catch((err) => {
    console.log("Inside editPasswordEntry()");
    console.log(err.message);
  });
};
