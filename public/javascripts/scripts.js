'use strict';

const dqs = (query) => document.querySelector(query);
const dqsa = (query) => document.querySelectorAll(query);

const geoErrMsg = "Unfortunately your browser does not support Geolocation or Geolocation failed. Please proceed to enter your location manually.";
const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

document.addEventListener('DOMContentLoaded', () => {
  let modal = dqs('.location-check');
  let locMsg = dqs('.modal .location-message');
  let lat, lon;
  // check if location permission has previously been granted
  if (localStorage.geoPermission === "true") {
    // get position
    getPosition().then((pos) => {
      lat = pos.coords.latitude;
      lon = pos.coords.longitude;
      getWeatherAndLocation(lat, lon);
      // remove modal on success
      modal.classList.remove('is-active');
    }).catch((err) => {
      locMsg.innerText = geoErrMsg;
    });
  }
  dqs('.modal .button').addEventListener('click', () => {
    if (geoCheck()) {
      modal.classList.remove('is-active');
      getPosition().then((pos) => {
        lat = pos.coords.latitude;
        lon = pos.coords.longitude;
        getWeatherAndLocation(lat, lon);
      });
    } else {
      locMsg.innerText = geoErrMsg;
    }
  });
  dqs('.modal-close').addEventListener('click', () => {
    modal.classList.remove('is-active');
  })
});

function getWeatherAndLocation(lat, lon) {
  axios
      .all([weatherLookup(lat,lon), reverseGeoLookup(lat,lon)])
      .then(axios.spread( (weather,geo) => {
        displayWeather(weather.weather, geo.result)
  }));
}

function weatherLookup(lat, lon) {
  return axios.post('/api/weather', {
    lat: lat,
    lon: lon
  }).then((response) => {
    return response.data;
  }).catch((error) => {
    return error;
  });
}

function reverseGeoLookup(lat, lon) {
  return axios.post('/api/location', {
    lat: lat,
    lon: lon
  }).then((geo) => {
    return geo.data;
  }).catch((error) => {
    return error;
  });
}

function displayWeather(weather, location) {
  console.log(weather);
  let c = weather.currently;
  let units = weather.flags.units;
  let forecast = weather.daily.data;
  let todaysForecast = forecast.shift();
  displayCurrent(c, todaysForecast, location);
  displayForecast(forecast);
  skyconUp();
}

function displayCurrent(currently, todaysForecast, location) {
  // TODO - add the following
  // c.pressure
  // c.windBearing -- needs to be calculated, come back to this.
  dqs('.current').innerHTML =
      `<div class="columns">
        <div class="column">
        <div class="box">
          <div class="columns">
            <div class="column has-text-centered">
              <h4 class="title is-4">${location.suburb}, ${location.state}, ${location.country}</h4>
              <p class="subtitle">${dateGenerator(currently.time)}</p>
            </div>
          </div>
          <div class="columns">
              <div class="column is-3 has-text-centered">
              <canvas width="80" height="80" class="is-skycon" data-skycon="${currently.icon}"></canvas>
              <p>${currently.temperature}º, ${currently.summary}</p>        
            </div>
            <div class="column">
              <div class="columns">
                <div class="column">
                  Cloud Coverage: ${asPercentageText(currently.cloudCover)}<br>
                  Humidity: ${asPercentageText(currently.humidity)}<br>
                  Chance of Rain: ${asPercentageText(currently.precipProbability)}<br>
                </div>
                <div class="column">
                  UV Index: ${currently.uvIndex}<br>
                  Wind Speed: ${currently.windSpeed}<br>
                  Wind Gusts: ${currently.windGust} <br>          
                </div>
                <div class="column">
                  Sunrise: ${timeGenerator(todaysForecast.sunriseTime)}<br>
                  Sunset: ${timeGenerator(todaysForecast.sunsetTime)}
                </div>
              </div> <!--top-->
              <div class="columns">
                <div class="column">
                  <p><strong>Summary: </strong>${todaysForecast.summary}</p>
                </div>
              </div> <!--bottom-->
            </div>
          </div>
        </div>
      </div>
      </div>`;
}

function timeGenerator(date) {
  let d = new Date(date*1000);
  let h = hourMinFormatter(d.getHours());
  let m = hourMinFormatter(d.getMinutes());
  return `${h}:${m}`;
}

function dayGenerator(date) {
  return days[new Date(date*1000).getDay()];
}

function displayForecast(forecast) {
  console.log(forecast);
  let forecastHtml = [`<h5 class="title is-5 has-text-centered">${forecast.length} Day Forecast</h5><hr>`];
  // interesting things
  // cloudCover
  // humidity
  // moonPhase
  // pressure
  // summary
  // uvIndex && uvIndexTime
  // windGust
  forecast.forEach((f) => {
    forecastHtml
        .push(`<div class="columns">
                 <div class="column">
                 <h5 class="is-5 title has-text-centered">${dayGenerator(f.time)}</h5>
                   <div class="box">
                   <div class="columns">
                     <div class="column is-2">
                       <canvas width="80" height="80" class="is-skycon has-text-centered" data-skycon="${f.icon}"></canvas>
                     </div>
                     <div class="column is-2">
                        <p><strong>Summary: </strong>${f.summary}</p>
                     </div>
                   <div class="column">
                     <div class="info-item has-text-centered">
                       <div class="info-icon"><object data="images/icons/thermometer-25-small.svg" type="image/svg+xml"></object></div>
                       <div class="info-time">${f.temperatureMin}</div>
                     </div>
                     <div class="info-item has-text-centered">
                       <div class="info-icon"><object data="images/icons/thermometer-100-small.svg" type="image/svg+xml"></object></div>
                       <div class="info-time">${f.temperatureMax}</div>
                     </div>
                     <div class="info-item has-text-centered">
                        <div class="info-icon"><object data="images/icons/sunrise-small.svg" type="image/svg+xml"></object></div>
                        <div class="info-time">${timeGenerator(f.sunriseTime)}</div>
                     </div>
                     <div class="info-item has-text-centered">
                        <div class="info-icon"><object data="images/icons/sunset-small.svg" type="image/svg+xml"></object></div>
                        <div class="info-time">${timeGenerator(f.sunsetTime)}</div>
                     </div>
                     <div class="info-item has-text-centered">
                        <div class="info-icon"><object data="images/icons/cloud-rain-small.svg" type="image/svg+xml"></object></div>
                        <div class="info-time">${asPercentageText(f.precipProbability)}</div>
                     </div>
                     <div class="info-item has-text-centered">
                        <div class="info-icon"><object data="images/icons/wind-small.svg" type="image/svg+xml"></object></div>
                        <div class="info-time">${f.windSpeed}Km/h</div>
                     </div>
                   </div>
                </div>
              </div>`);
  });
  dqs('.forecast').innerHTML = forecastHtml.join('');
}

function skyconUp() {
  const skycons = new Skycons({"color": "dodgerblue"});
  dqsa('.is-skycon').forEach((icon) => {
    skycons.set(icon, icon.dataset.skycon);
    skycons.play();
  });
}

function dateGenerator(time) {
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