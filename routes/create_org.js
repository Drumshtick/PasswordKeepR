//branch features/routes/create_organization
/*
Create a new organization
*/
const express = require('express');
const router = express.Router();
const { db, Pool } = require('../db/dbConn');

module.exports = (db) => {
  router.post('/new_org', (req, res) => {
    const { user_id } = req.session;
    // Check for session cookie created by login
    if (!user_id) {
      res.redirect('/login');
    } else if (user_id) {

    }

  });
};

const addOrg = (user, org_name) => {

};
