'use strict';

document.addEventListener('DOMContentLoaded', () => {
  let modal = document.querySelector('.location-check');
  // check if location permission has previously been granted
  if (localStorage.geoPermission === "true") {
    modal.classList.remove('is-active');
    // then check weather
  }
  document.querySelector('.modal .button').addEventListener('click', () => {
    if (geoCheck()) {
      modal.classList.remove('is-active');

    } else {
      document.querySelector('.location-message').innerText = "Unfortunately your browser does not support geolocation." +
          " Please proceed to enter your location manually."
    }
  });
  document.querySelector('.modal-close').addEventListener('click', () => {
    modal.classList.remove('is-active');
  })
});

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

if (localStorage.geoPermission === "true") {
  if ("geolocation" in navigator) {
    $('#popupLoading').show();
    $('#popup').hide();

    getWeatherAndReverseGeo().then(function () {

      $('#popupLoading').fadeOut();
    });
  } else {
    alert("Your browser does not support geolocation, please enter your location manually");
  }
}


// getWeatherAndReverseGeo();