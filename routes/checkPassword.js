const express = require('express');
const checkPasswordRouter  = express.Router();
const passCheck = require('passw0rd');


checkPasswordRouter.post('/', (req, res) => {
  if (req.session.user_id === undefined) {
    return res.redirect(401, '/login');
  }
  const {password} = req.body;
  checkPassword(password)
  .then((results) => {
    res.send({results});
  })
})


const checkPassword = function(password) {
  console.log(password);
  return passCheck.check(password)
  .then((result) => {
    return result.count;
  })
};


module.exports = checkPasswordRouter;
