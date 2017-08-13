'use strict';

const geoErrMsg = "Unfortunately your browser does not support Geolocation or Geolocation failed. Please proceed to enter your location manually.";

document.addEventListener('DOMContentLoaded', () => {
  let modal = document.querySelector('.location-check');
  let locMsg = document.querySelector('.modal .location-message');
  let lat = document.querySelector('.latitude');
  let lon = document.querySelector('.longitude');
  // check if location permission has previously been granted
  if (localStorage.geoPermission === "true") {
    // get position
    getPosition().then((pos) => {
      // remove modal on success
      modal.classList.remove('is-active');
      showLatLon(pos,lat,lon);
      console.log(pos);
    }).catch((err) => {
      locMsg.innerText = geoErrMsg;
    });
  }
  document.querySelector('.modal .button').addEventListener('click', () => {
    if (geoCheck()) {
      modal.classList.remove('is-active');
      getPosition().then((pos) => {
        showLatLon(pos,lat,lon);
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

function showLatLon(pos, latEl, lonEl) {
  latEl.innerText = `Latitude: ${pos.coords.latitude}`;
  lonEl.innerText = `Longitude: ${pos.coords.longitude}`;
}
// 'https://maps.googleapis.com/maps/api/geocode/json?latlng=-37.7680066,144.9556877&key=AIzaSyBU6f9scZpIBUq0BJwEuyMI25g1Recm7FQ';
function getPosition () {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
}

function geoFail (err) {

}
// func to check if browser supports geolocation
function geoCheck() {
  if ("geolocation" in navigator) {
    localStorage.setItem('geoPermission', "true");
    return true;
  } else {
    return false;
  }
}

// func to check if location permission previously granted
function locationPermission() {
  if (localStorage.geoPermission === "true") {
  }
}



// getWeatherAndReverseGeo();