'use strict';
const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/weather', (req, res, next) => {
  res.json({ msg: 'test'});
});

module.exports = router;