'use strict';

const geoErrMsg = "Unfortunately your browser does not support Geolocation or Geolocation failed. Please proceed to enter your location manually.";

document.addEventListener('DOMContentLoaded', () => {
  let modal = document.querySelector('.location-check');
  let locMsg = document.querySelector('.modal .location-message');
  let latEl = document.querySelector('.latitude');
  let lonEl = document.querySelector('.longitude');
  let lat, lon;
  // check if location permission has previously been granted
  if (localStorage.geoPermission === "true") {
    // get position
    getPosition().then((pos) => {
      lat = pos.coords.latitude;
      lon = pos.coords.longitude;
      // remove modal on success
      modal.classList.remove('is-active');
      showLatLon(pos, latEl, lonEl);
      weatherLookup(lat, lon);
      reverseGeoLookup(lat, lon);
      console.log(pos);
    }).catch((err) => {
      locMsg.innerText = geoErrMsg;
    });
  }
  document.querySelector('.modal .button').addEventListener('click', () => {
    if (geoCheck()) {
      modal.classList.remove('is-active');
      getPosition().then((pos) => {
        lat = pos.coords.latitude;
        lon = pos.coords.longitude;
        showLatLon(pos, latEl, lonEl);
        weatherLookup(lat, lon);
        reverseGeoLookup(lat, lon);
        console.log(pos);
      });
    } else {
      locMsg.innerText = geoErrMsg;
    }
  });
  document.querySelector('.modal-close').addEventListener('click', () => {
    modal.classList.remove('is-active');
  })
});

function weatherLookup (lat, lon) {
  axios.post('/api/weather', {
    lat: lat,
    lon: lon
  }).then((response) => {
    console.log(response.data);
  }).catch((error) => {
    console.log(error);
  });
}

function reverseGeoLookup (lat, lon) {
  axios.post('/api/location', {
    lat: lat,
    lon: lon
  }).then((geo) => {
    showLocation(geo.data.result)
  }).catch((error) => {
    console.log(error);
  });
}

function showLocation (loc) {
  let locEl = document.querySelector('.location-details');
  locEl.innerText = `${loc.suburb}, ${loc.city}, ${loc.state}, ${loc.country}`;
}

function showLatLon (pos, latEl, lonEl) {
  latEl.innerText = `Latitude: ${pos.coords.latitude}`;
  lonEl.innerText = `Longitude: ${pos.coords.longitude}`;
}

function getPosition () {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
}

// func to check if browser supports geolocation
function geoCheck () {
  if ("geolocation" in navigator) {
    localStorage.setItem('geoPermission', "true");
    return true;
  } else {
    return false;
  }
}