const express = require('express');
const router = express.Router();
module.exports = function() {
  router.get('/:id', (req, res) => {
    const { id } = req.params;
    req.session.user_id = id;
    res.redirect('/');
  })
  return router;
};
