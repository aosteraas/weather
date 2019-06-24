'use strict';
const express = require('express');
const router = express.Router();
const request = require('request');

// get weather
router.post('/weather', (req, res) => {
  let apiUrl = `https://api.darksky.net/forecast/${process.env.DARK_SKY_KEY}/${req.body.lat},${req.body.lon}?units=auto`;
  request(apiUrl, (error, response, body) => {
    let weather = JSON.parse(body);
    res.json({ weather });
  });

});

// get user location from google
router.post('/location', (req, res) => {
  let apiUrl = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${req.body.lat},${req.body.lon}&key=${process.env.GMAPS_KEY}`;
  request(apiUrl, (error, response, body) => {
    let location = JSON.parse(body).results[2];
    let addr = location.address_components;
    let suburb = JSON.parse(body).results[0].address_components[2].long_name;
    let result = {
      suburb: suburb,
      city: addr[0].long_name,
      state: addr[1].short_name,
      country: addr[2].short_name
    };
    res.json({ result });
  });
});
module.exports = router;