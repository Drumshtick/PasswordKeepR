/*
 *edit route for changing the values associated to the passwords T
 *
 *
 *
 */

const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {
    if (req.session.user_id) {
      res.redirect(401, '/login');
    }
    const { user_id } = req.session;
    res.render('edit');
  });
  return router;
};


