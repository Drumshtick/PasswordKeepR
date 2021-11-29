/*
helper functions
*/

const { db, Pool } = require('../db/dbConn');

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
//  'Alice@gmail.com' Test email
module.exports = { ifUserEmailExists };
