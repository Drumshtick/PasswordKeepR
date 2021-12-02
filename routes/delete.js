const express = require('express');
const deleteRouter  = express.Router();
const db = require('../db/dbConn');


deleteRouter.post('/', (req, res) => {
  if (req.session.user_id === undefined) {
    return res.redirect(401, '/login');
  }
    const data = {
      user_id: req.session.user_id,
      url: req.body.url,
      username: req.body.username
    };
    console.log("data: ", data);
    deletePassword(data)
    .then((db_results) => {
      if (db_results.length === 0) {
        return res.sendStatus(404);
      }
      return res.sendStatus(200);
    })
    .catch((err) => {
      console.log("ERROR in deleteRouter.post('/')");
      console.log(err.message);
    });
})

module.exports = deleteRouter;

const deletePassword = function(data) {
  return db.query(`
    DELETE FROM passwords
    WHERE user_id = $1
    AND url = $2
    AND username = $3
    RETURNING *;
  `, [data.user_id, data.url, data.username])
  .then((db_results) => {
    return db_results.rows;
  })
  .catch((err) => {
    console.log("ERROR in deletePassword()");
    console.log(err.message);
  });
};
