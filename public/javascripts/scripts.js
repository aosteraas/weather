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

function weatherLookup(lat, lon) {
  axios.post('/api/weather', {
    lat: lat,
    lon: lon
  }).then((response) => {
    let weather = response.data.weather;
    displayWeather(weather);
    console.log(weather);
  }).catch((error) => {
    console.log(error);
  });
}

function reverseGeoLookup(lat, lon) {
  axios.post('/api/location', {
    lat: lat,
    lon: lon
  }).then((geo) => {
    showLocation(geo.data.result)
  }).catch((error) => {
    console.log(error);
  });
}

function displayWeather(weather) {
  let c = weather.currently;

  document.querySelector('.current').innerHTML =
      `<div class="column">
        <canvas width="80" height="80" class="is-skycon" data-skycon="${c.icon}"></canvas>
        <p>${c.summary}, ${c.temperature}º</p> 
        <p>Cloud Coverage: ${asPercentageText(c.cloudCover)}</p> 
        <p>Humidity: ${asPercentageText(c.humidity)}</p> 
      </div> 
      <div class="column">
        <p>Chance of Rain: ${asPercentageText(c.precipProbability)}</p> 
        <p>Wind Speed: ${c.windSpeed}</p> 
        <p>Wind Gusts: ${c.windGust}</p> 
      </div> 
      <div class="column">
        <p>UV Index: ${c.uvIndex}</p> 
        <p>Forecast at: ${dateGenerator(c.time)}</p>
      </div>`;

  // c.pressure
  // c.windBearing -- needs to be calculated, come back to this.
  let forecast = weather.daily.data;
  forecast.shift(); // chop first element from array as it is the current day's forecast and not required.
  let forecastHtml = [];
  forecast.forEach((f) => {
    console.log(f);
    forecastHtml
        .push(`<div class="column">
                <canvas width="80" height="80" class="is-skycon" data-skycon="${f.icon}"></canvas>
                <p>Low: ${f.temperatureMin} | High: ${f.temperatureMax}</p>
                <p>Chance of Rain ${asPercentageText(f.precipProbability)}</p>
    
              </div>`);
  });
  document.querySelector('.forecast').innerHTML = forecastHtml.join('');
  skyconUp();
}

function skyconUp() {
  // init skycons, resizeClean should fix an android compatability error
  const skycons = new Skycons({"color": "black"});
  let icons = document.querySelectorAll('.is-skycon');
  icons.forEach((icon) => {
    skycons.set(icon, icon.dataset.skycon);
  });
}

function dateGenerator(time) {
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  let d = new Date(time * 1000);
  return `${hourMinFormatter(d.getHours())}:${hourMinFormatter(d.getMinutes())} - ${days[d.getDay()]}, ${months[d.getMonth()]} ${d.getDate()}`;
}

function hourMinFormatter(time) {
  return time < 10 ? `0${time}` : time;
}

function asPercentageText(num) {
  return `${Math.round(num * 100)}%`;
}

function showLocation(loc) {
  let locEl = document.querySelector('.location-details');
  locEl.innerText = `${loc.suburb}, ${loc.city}, ${loc.state}, ${loc.country}`;
}

function showLatLon(pos, latEl, lonEl) {
  latEl.innerText = `Latitude: ${pos.coords.latitude}`;
  lonEl.innerText = `Longitude: ${pos.coords.longitude}`;
}

function getPosition() {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
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