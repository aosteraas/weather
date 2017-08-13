'use strict';
const express = require('express');
const router = express.Router();

// get weather
router.get('/weather', (req, res, next) => {
  res.json({ msg: 'test'});
});

// get user location from google
router.post('/location', (req, res) => {
  let lat = req.body.lat;
  let lon = req.body.lon;
  let key = process.env.GMAPS_KEY;
  let apiUrl = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lon}&key=${key}`;

});
module.exports = router;