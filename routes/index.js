
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
    //if results are returned display them
    if (db_results.length > 0) {
      return res.render("index", {db_results, noEntries: false});
    }
    // Otherwise display box to show that no entries are available
    // and a button is displayed to make some
      return res.render("index", {db_results, noEntries: true});
  })
  .catch((err) => {
    console.log(err.message);
  });
});

const getPasswords = function(user_id) {
  return db
  .query(`
  SELECT passwords.username as username, organizations.name as organization_id,
  category, url, password_text, users.email as user_id
  FROM passwords
  JOIN organizations ON organization_id = organizations.id
  JOIN users ON passwords.user_id = users.id
  WHERE user_id = $1
  ORDER BY organization_id;
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

