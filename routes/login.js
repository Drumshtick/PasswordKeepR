const express = require('express');
const router = express.Router();
module.exports = function() {
  router.get('/:id', (req, res) => {
    const { id } = req.params;
    req.session.user_id = id;
    res.redirect('/');
  });
  router.get('/', (req, res) => {
    res.render('login');
  });
  router.post('login', (req, res) => {
    res.redirect('login');
  });
  return router;
};
