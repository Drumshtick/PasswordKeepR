
const express = require('express');
const indexRoute  = express.Router();
const editRoute = express.Router();
const db = require('../db/dbConn');
// GET route
indexRoute.get("/", (req, res) => {
  if (req.session.user_id === undefined) {
    res.redirect(401, '/login');
  }
  const { user_id } = req.session;
  getPasswords(user_id)
  .then((db_results) => {
    console.log(db_results);
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
  WHERE user_id = $1;
  `, [user_id])
  .then((result) => {
    return result.rows;
  })
  .catch((err) => {
    console.log(err.message);
  });
}

const editPasswordEntry = function(data){
  let query = `
              UPDATE passwords
              SET
              `;
  const queryParams = [];
  if (data.category !== undefined) {
    queryParams.push(data.category);
    query += `category = $${queryParams.length}`
  }

  if (data.url !== undefined) {
    queryParams.push(data.url);
    query += `url = $${queryParams.length}`
  }

  if (data.password_text !== undefined) {
    queryParams.push(data.password_text);
    query += `password_text = $${queryParams.length}`
  }

  if (data.username !== undefined) {
    queryParams.push(data.username);
    query += `username = $${queryParams.length}`
  }

  queryParams.push(data.user_id);
  query += `WHERE user_id = $${queryParams.length} RETURNING *;`
  console.log("query string: ", query);
  console.log("query params: ", queryParams);
  return db
  .query(query, queryParams)
  .then((db_results) => {
    console.log(db_results);
    return db_results.rows;
  })
  .catch((err) => {
    console.log("Inside editPasswordEntry(" + data +")");
    console.log(err.message);
  });
};



// export modules
module.exports = indexRoute;

