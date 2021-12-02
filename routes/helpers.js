/*
helper functions
*/

const db = require('../db/dbConn');

/*
Check if email exists in the users TABLE
return TRUE if it does exist
return FALSE if it doesn't
*/
const ifUserEmailExists = (email) => {
  db.query(`
    SELECT *
    FROM users
    WHERE email = $1;
  `, [email]).then((result) => {
    if (result.rows[0]) {
      return true;
    } else if (!result.rows[0]) {
      return false;
    }
  })
  .catch((error) => {
    console.log(error.message);
  });
};

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

const editPasswordEntry = function(data){
  let query = `
              UPDATE passwords
              SET password_text = $1,
              username = $2
              WHERE user_id = $3
              AND url = $4 RETURNING *;
              `;
  const queryParams = [data.password, data.username, data.user_id, data.url];

  return db
  .query(query, queryParams)
  .then((db_results) => {
    return db_results.rows;
  })
  .catch((err) => {
    console.log("Inside editPasswordEntry()");
    console.log(err.message);
  });
};

//  'Alice@gmail.com' Test email
module.exports = { ifUserEmailExists, deletePassword, editPasswordEntry };
