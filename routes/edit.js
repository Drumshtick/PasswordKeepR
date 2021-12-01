/*
 *edit route for changing the values associated to the passwords T
 *
 *
 *
 */

const express = require('express');
const editRouter  = express.Router();


editRouter.post('/', (req, res) => {
  if (req.session.user_id === undefined) {
    return res.redirect(401, '/login');
  }
const { user_id } = req.session;
const {"password-text": password_text, username} = req.body;
console.log("user_id: ", user_id);
console.log("password: ", password-text, "username: ", username);
});
module.exports = editRouter;
