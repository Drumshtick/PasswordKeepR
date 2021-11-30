
const express = require('express');
const indexRoute  = express.Router();
const db = require('../db/dbConn');
// GET route
indexRoute.get("/", (req, res) => {
  if (req.session.user_id === undefined) {
    res.redirect(401, '/login');
  }
  const { user_id } = req.session;
  getPasswords(user_id)
  .then((db_results) => {
    if (db_results.length > 0) {
      return res.render("index", {db_results});
    }
      // return res.render("index", {db_results});
  })
  .catch((err) => {
    console.log(err.message);
  });
});

const getPasswords = function(user_id) {
  return db
  .query(`
  SELECT users.email as user_id, organizations.name as organization_id, category, url, password_text
  FROM passwords
  JOIN organizations ON organization_id = organizations.id
  JOIN users ON passwords.user_id = users.id
  WHERE user_id = $1;
  `, [user_id])
  .then((result) => {
    return result.rows;
  })
  .catch((err) => {
    console.log(err.message);
  });
}

// export modules
module.exports = indexRoute;
