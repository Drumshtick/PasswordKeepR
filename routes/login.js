const express = require('express');
const router = express.Router();

module.exports = () => {
  router.get('/', (req, res) => {
    console.log('logged in successfully');
    res.send('success!');
  })
  return router;
};
