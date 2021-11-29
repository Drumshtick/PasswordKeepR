//branch features/routes/create_organization
/*
Create a new organization
*/
const express = require('express');
const createOrg = express.Router();
const { db, Pool } = require('../db/dbConn');

createOrg.get('/', (req, res) => {
  res.render('create_org_TEST');
});

createOrg.post('/', (req, res) => {
  const data = {
    // Assumes user_id session cookie = user id from TABLE users
    user_id: req.session.user_id,
    // get  org name from post body
    org_name: req.body.org_name
  };
  // Check for session cookie created by login
  if (!user_id) {
    res.redirect('/login');
  } else if (user_id) {
    addOrg(data)
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


const addOrg = (data) => {
  // assumes user_id is the id from the users TABLE
  return Pool
  .query(`
  INSERT INTO
  organizations (name)
  VALUES ($1)
  RETURNING *;
  `, [data.org_name])
  .then((result) => {
    return result.rows[0];
  })
  .catch((error) => {
    console.log("---------ERROR IN addORG query--------");
    console.log(error.message);
  });
};

module.exports = createOrg;
