
const express = require('express');
const router = express.Router();
const { ifUserEmailExists } = require('./helpers');

module.exports = (db) => {
  router.get('/', (req, res) => {
    res.render('register');
  });

  router.post('', (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
      res.redirect(400, '/register');
    } else if (ifUserEmailExists(email))
  });

  return router;
};
