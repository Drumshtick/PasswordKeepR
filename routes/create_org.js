//branch features/routes/create_organization
/*
Create a new organization
*/
const express = require('express');
const router = express.Router();
const { Pool } = require('../db/dbConn');

module.exports = (db) => {
  router.post('/new_org', (req, res) => {
    // Assumes user_id session cookie = user id from TABLE users
    const { user_id } = req.session;
    const { org_name } = req.body;
    // Check for session cookie created by login
    if (!user_id) {
      res.redirect('/login');
    } else if (user_id) {
      addOrg(user_id)
      .then(organization => {
        if (!organization) {
          console.log("---------ERROR IN Creating entry in organization (improper return)--------");
          return;
        } else if (organization) {
          res.redirect('index');
        }
      })
      .catch((error) => {
        console.log("---------ERROR IN promise from addOrg--------");
        console.log(error.message);
      });
    }
  });
};

const addOrg = (user_id, org_name) => {
  // assumes user_id is the id from the users TABLE
  return Pool
  .query(`
  INSERT INTO
  organizations (name)
  VALUES ($1)
  RETURNING *;
  `, [org_name])
  .then((result) => {
    return result.rows[0];
  })
  .catch((error) => {
    console.log("---------ERROR IN addORG query--------");
    console.log(error.message);
  });
};
