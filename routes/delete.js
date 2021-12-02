const express = require('express');
const deleteRouter  = express.Router();
const db = require('../db/dbConn');
const {deletePassword} = require('./helpers');

deleteRouter.post('/', (req, res) => {
  if (req.session.user_id === undefined) {
    return res.redirect(401, '/login');
  }
    const data = {
      user_id: req.session.user_id,
      url: req.body.url,
      username: req.body.username
    };
    console.log("data: ", data);
    deletePassword(data)
    .then((db_results) => {
      if (db_results.length === 0) {
        return res.sendStatus(304);
      }
        return res.sendStatus(200);
    })
    .catch((err) => {
      console.log("ERROR in deleteRouter.post('/')");
      console.log(err.message);
    });
})

module.exports = deleteRouter;
