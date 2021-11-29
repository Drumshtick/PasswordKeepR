
const express = require('express');
const router = express.Router();
const { ifUserEmailExists } = require('./helpers');
const {db, Pool} = require('../db/dbConn');

module.exports = (db) => {
  router.get('/', (req, res) => {
    res.render('register');
  });

  router.post('', (req, res) => {
    const { email, user_password } = req.body;
    const isNewEmail = ifUserEmailExists(email);
    if (req.session !== undefined) {
      res.redirect('/');
    } else if (!email || !user_password) {
      res.redirect(400, '/register');
    // if email exists in DB redirect to /login
    } else if (isNewEmail) {
      res.redirect(400, '/login');
    //if is not a new email
    // register new user
    } else if (!isNewEmail) {
      db.Pool.query(`
        INSERT INTO users (email, user_password)
        VALUES ($1, $2)
        RETURNING *;
      `, [email, user_password])
      .then((result) => {
        if (result.rows[0]) {
          res.redirect('/');
        } else {
          res.send("Error creating entry");
        }
      })
      .catch((error) => {
        console.log(error.message);
      });
    }
  });

  return router;
};
