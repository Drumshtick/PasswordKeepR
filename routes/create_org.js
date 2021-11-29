//branch features/routes/create_organization
/*
Create a new organization
*/
const express = require('express');
const router = express.Router();
const { Pool } = require('../db/dbConn');

module.exports = (db) => {
  router.post('/new_org', (req, res) => {
    const { user_id } = req.session;
    const { org_name } = req.body;
    // Check for session cookie created by login
    if (!user_id) {
      res.redirect('/login');
    } else if (user_id) {
      addOrg(user_id)
    }

  });
};

const addOrg = (user_id, org_name) => {
  return Pool
  .query(``).then()
  .catch((error) => {
    console.log("---------ERROR IN addORG query--------");
    console.log(error.message);
  });
};
