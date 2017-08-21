'use strict';

const dqs = (query) => document.querySelector(query);
const dqsa = (query) => document.querySelectorAll(query);

const geoErrMsg = "Unfortunately your browser does not support Geolocation or Geolocation failed. Please proceed to enter your location manually.";
const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const thermometerQuarter = '<svg width="16" height="37" viewBox="0 0 16 37" xmlns="http://www.w3.org/2000/svg"><title>Shape</title><path d="M8 36.865c-4.418 0-7.998-3.58-7.998-7.998 0-2.025.758-3.87 2-5.28V6.87c0-3.313 2.686-6 5.998-6 3.314 0 6 2.687 6 6v16.718c1.24 1.41 2 3.254 2 5.28 0 4.417-3.582 7.997-8 7.997zm2-11.443V6.87c0-1.104-.895-2-2-2-1.104 0-2 .896-2 2v18.552c-1.19.693-1.998 1.97-1.998 3.445 0 2.21 1.79 3.998 3.998 3.998 2.21 0 4-1.79 4-3.998 0-1.476-.81-2.752-2-3.445zm-2 6.445c-1.656 0-2.998-1.344-2.998-3 0-1.305.836-2.402 1.998-2.816v-5.183h2v5.184c1.162.415 2 1.513 2 2.817 0 1.656-1.344 3-3 3z" fill-rule="nonzero" fill="#000"/></svg>';
const thermometerFull = '<svg width="16" height="37" viewBox="0 0 16 37" xmlns="http://www.w3.org/2000/svg"><title>Shape</title><path d="M8 36.867c-4.418 0-8-3.582-8-8 0-2.025.76-3.87 2-5.28V6.872c0-3.312 2.686-6 6-6 3.312 0 6 2.688 6 6V23.59c1.24 1.41 1.998 3.254 1.998 5.28 0 4.417-3.58 8-7.998 8zm2-11.445V6.87c0-1.103-.896-2-2-2-1.105 0-2 .897-2 2v18.552c-1.19.693-2 1.97-2 3.445 0 2.21 1.79 4 4 4s4-1.79 4-4c0-1.476-.81-2.752-2-3.445zm-2 6.445c-1.656 0-3-1.344-3-3 0-1.305.838-2.402 2-2.816V6.87c0-.553.447-1 1-1 .553 0 1 .447 1 1V26.05c1.162.415 2 1.513 2 2.817 0 1.656-1.344 3-3 3z" fill-rule="nonzero" fill="#000"/></svg>';
const sunrise = '<svg width="48" height="36" viewBox="0 0 48 36" xmlns="http://www.w3.org/2000/svg"><title>Shape</title><path d="M12.688 9.86L9.86 7.03c-.78-.78-2.047-.78-2.828 0-.78.782-.78 2.048 0 2.83l2.828 2.827c.78.78 2.047.78 2.828 0 .78-.78.78-2.046 0-2.828zM45.998 22h-4c-1.104 0-2 .896-2 2s.896 2 2 2h4c1.104 0 2-.896 2-2s-.895-2-2-2zM6.002 22h-4c-1.104 0-2 .896-2 2s.896 2 2 2h4c1.104 0 2-.896 2-2s-.897-2-2-2zM34 32H14c-1.103 0-1.998.895-1.998 2 0 1.103.896 1.998 2 1.998h19.997c1.103 0 2-.895 2-2 0-1.103-.896-2-2-2zm6.97-24.97c-.78-.78-2.05-.78-2.83 0l-2.827 2.83c-.78.78-.78 2.046 0 2.827.78.78 2.048.78 2.828 0l2.83-2.828c.78-.782.78-2.048 0-2.83zM24 8.003c1.105 0 2-.896 2-2v-4c0-1.103-.896-2-2-2s-2 .897-2 2v4c0 1.104.896 2 2 2zm0 4c-6.626 0-11.998 5.37-11.998 11.998 0 1.404.254 2.747.697 4h4.38C16.397 26.82 16 25.46 16 24c0-4.418 3.583-8 8-8 4.418 0 8 3.582 8 8 0 1.46-.397 2.822-1.08 4h4.382c.443-1.253.697-2.596.697-4 0-6.627-5.373-11.998-12-11.998zm0 16.247c.553 0 1-.448 1-1V23.42l2.536 2.535c.39.39 1.023.39 1.414 0 .39-.39.39-1.023 0-1.414L24.708 20.3c-.39-.39-1.024-.39-1.414 0l-4.242 4.243c-.39.39-.39 1.023 0 1.414.39.39 1.023.39 1.414 0L23 23.422v3.827c0 .552.448 1 1 1z" fill-rule="nonzero" fill="#000"/></svg>';
const sunset = '<svg width="48" height="36" viewBox="0 0 48 36" xmlns="http://www.w3.org/2000/svg"><title>Shape</title><path d="M45.998 26h-4c-1.104 0-2-.896-2-2s.896-2 2-2h4c1.104 0 2 .896 2 2s-.895 2-2 2zm-7.856-13.312c-.78.78-2.048.78-2.828 0-.78-.78-.78-2.047 0-2.828l2.828-2.828c.78-.78 2.047-.78 2.827 0 .78.78.78 2.047 0 2.828l-2.828 2.828zm-2.84 15.31h-4.38c.68-1.176 1.077-2.54 1.077-3.998 0-4.418-3.582-8-8-8-4.417 0-8 3.582-8 8 0 1.46.398 2.822 1.08 4H12.7c-.444-1.253-.698-2.596-.698-4 0-6.627 5.372-11.998 12-11.998 6.625 0 11.997 5.37 11.997 11.998 0 1.404-.255 2.747-.698 4zm-11.3-19.996c-1.106 0-2-.896-2-2v-4c0-1.103.894-2 2-2 1.103 0 2 .897 2 2v4c0 1.104-.898 2-2 2zM9.86 12.688L7.032 9.86c-.78-.78-.78-2.047 0-2.828.78-.78 2.047-.78 2.828 0l2.828 2.828c.78.78.78 2.047 0 2.828-.78.78-2.046.78-2.828 0zM8.003 24c0 1.104-.896 2-2 2h-4c-1.104 0-2-.896-2-2s.896-2 2-2h4c1.104 0 2 .896 2 2zM24 20c.553 0 1 .448 1 1v3.828l2.536-2.535c.39-.39 1.023-.39 1.414 0 .39.39.39 1.023 0 1.414l-4.242 4.242c-.39.39-1.023.39-1.414 0l-4.242-4.243c-.39-.39-.39-1.023 0-1.414.39-.39 1.023-.39 1.414 0L23 24.828V21c0-.552.448-1 1-1zm-9.998 12H34c1.103 0 2 .895 2 2 0 1.103-.897 1.998-2 1.998H14c-1.104 0-2-.895-2-2 0-1.103.895-2 2-2z" fill-rule="nonzero" fill="#000"/></svg>';
const cloudCover = '<svg width="45" height="33" viewBox="0 0 45 33" xmlns="http://www.w3.org/2000/svg"><title>Shape</title><path d="M16.945 32.64c-8.835 0-15.998-7.163-15.998-16C.947 7.806 8.11.644 16.945.644c6.004 0 11.23 3.312 13.965 8.203.664-.113 1.338-.205 2.033-.205 6.627 0 12 5.374 12 12s-5.373 12-12 12H16.945zm15.998-4c4.418 0 8-3.583 8-8s-3.582-8-8-8c-1.6 0-3.082.482-4.333 1.292-1.23-5.316-5.974-9.29-11.665-9.29-6.626 0-11.998 5.372-11.998 12 0 6.625 5.372 11.997 11.998 11.997h15.998z" fill-rule="nonzero" fill="#000"/></svg>';
const rainChance = '<svg width="45" height="45" viewBox="0 0 45 45" xmlns="http://www.w3.org/2000/svg"><title>Shape</title><path d="M36.943 31.94v-4.38c2.39-1.383 4-3.96 4-6.92 0-4.417-3.582-8-8-8-1.6 0-3.082.48-4.333 1.292-1.23-5.317-5.974-9.29-11.665-9.29-6.626 0-11.998 5.372-11.998 11.998 0 3.55 1.55 6.728 4 8.925v4.916c-4.777-2.767-8-7.92-8-13.84C.947 7.805 8.11.643 16.945.643c6.004 0 11.23 3.31 13.965 8.203.664-.113 1.338-.205 2.033-.205 6.627 0 12 5.373 12 12 0 5.223-3.342 9.653-8 11.3zm-21.997-11.3c1.104 0 2 .897 2 2v16c0 1.104-.896 2-2 2s-2-.896-2-2v-16c0-1.103.896-2 2-2zm8 4c1.103 0 2 .896 2 2v16c0 1.103-.897 2-2 2-1.105 0-2-.897-2-2v-16c0-1.105.895-2 2-2zm7.998-4c1.104 0 2 .897 2 2v16c0 1.104-.896 2-2 2s-2-.896-2-2v-16c0-1.103.896-2 2-2z" fill-rule="nonzero" fill="#000"/></svg>';
const wind = '<svg width="44" height="28" viewBox="0 0 44 28" xmlns="http://www.w3.org/2000/svg"><title>Shape</title><path d="M38 16h-3c-1.106 0-2-.895-2-2 0-1.103.894-2 2-2h3c1.103 0 2-.895 2-1.998 0-1.105-.897-2-2-2-1.106 0-2-.896-2-2s.894-2 2-2c.136 0 .27.014.4.04 3.122.212 5.597 2.784 5.597 5.96C43.997 13.314 41.312 16 38 16zm-10-4H6c-1.104 0-2 .897-2 2 0 1.105.896 2 2 2H28c3.313 0 6 2.687 6 6 0 3.176-2.476 5.748-5.597 5.96-.13.026-.265.04-.404.04-1.105 0-2-.896-2-2 0-1.105.895-2 2-2 1.104 0 2-.896 2-2s-.896-2-2-2H6c-3.313 0-6-2.686-6-6 0-3.174 2.476-5.746 5.597-5.958.13-.026.265-.04.402-.04H28c1.104 0 2-.896 2-2s-.896-2-2-2c-1.105 0-2-.895-2-2 0-1.104.895-2 2-2 .138 0 .272.015.403.04C31.523.255 34 2.827 34 6.003c0 3.312-2.687 6-6 6z" fill-rule="nonzero" fill="#000"/></svg>';
const sun = `<svg width="48" height="48" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg"><title>Shape</title><path d="M45.997 26H42c-1.106 0-2-.896-2-2s.894-2 2-2h3.997c1.105 0 2 .896 2 2s-.894 2-2 2zm-7.855-13.312c-.78.78-2.05.78-2.828 0-.78-.78-.78-2.047 0-2.828l2.828-2.828c.78-.78 2.047-.78 2.828 0 .78.78.78 2.047 0 2.828l-2.828 2.828zm-14.14 23.31c-6.628 0-12-5.372-12-11.998 0-6.627 5.37-12 12-12 6.626 0 11.997 5.373 11.997 12 0 6.626-5.372 11.998-12 11.998zM24 16c-4.42 0-8 3.582-8 8 0 4.417 3.582 8 8 8 4.416 0 7.997-3.583 7.997-8 0-4.418-3.58-8-8-8zm0-7.998c-1.106 0-2-.896-2-2v-4c0-1.103.894-2 2-2 1.103 0 2 .897 2 2v4c0 1.104-.898 2-2 2zM9.86 12.688L7.032 9.86c-.78-.78-.78-2.047 0-2.828.78-.78 2.047-.78 2.828 0l2.828 2.828c.78.78.78 2.047 0 2.828-.78.78-2.047.78-2.828 0zM8.002 24c0 1.104-.896 2-2 2h-4c-1.104 0-2-.896-2-2s.897-2 2-2h4c1.105 0 2 .896 2 2zM9.86 35.312c.78-.78 2.047-.78 2.828 0 .78.78.78 2.048 0 2.828L9.86 40.968c-.78.78-2.047.78-2.828 0-.78-.78-.78-2.047 0-2.828l2.828-2.828zM24 39.998c1.105 0 2 .895 2 2v4c0 1.103-.895 2-2 2-1.104 0-2-.897-2-2v-4c0-1.105.896-2 2-2zm14.142-4.686l2.828 2.828c.78.78.78 2.048 0 2.828-.78.78-2.05.78-2.828 0l-2.828-2.828c-.78-.78-.78-2.047 0-2.828.78-.78 2.046-.78 2.828 0z" fill-rule="nonzero" fill="#000"/></svg>`;
const compass = `<svg width="28" height="28" viewBox="0 0 28 28" xmlns="http://www.w3.org/2000/svg"><title>Shape</title><path d="M14 .002C6.27.002 0 6.27 0 14c0 7.73 6.27 14 14 14s13.998-6.27 13.998-14S21.73.002 14 .002zM14 24C8.478 24 4 19.52 4 14 4 8.48 8.48 4.002 14 4.002c5.52 0 10 4.477 10 9.998 0 5.522-4.48 10-10 10zm-4-10c0 2.21 1.79 4 4 4s4-1.79 4-4-4-8-4-8-4 5.79-4 8zm5 0c0 .553-.448 1-1 1-.553 0-1-.447-1-1 0-.552.447-1 1-1 .552 0 1 .448 1 1z" fill-rule="nonzero" fill="#000"/></svg>`;

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
      .all([weatherLookup(lat, lon), reverseGeoLookup(lat, lon)])
      .then(axios.spread((weather, geo) => {
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
  let units = unitMapper(weather.flags.units);
  let forecast = weather.daily.data;
  let todaysForecast = forecast.shift();
  displayCurrent(c, todaysForecast, location, units);
  displayForecast(forecast, units);
}

function displayCurrent(currently, todaysForecast, location, units) {
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
              <p class="subtitle">${currently.temperature}${units.temp} - ${dateGenerator(currently.time)}</p>
              <p><strong>${currently.summary}</strong> - ${todaysForecast.summary}</p>        
            </div>
          </div>
          <div class="columns">
            <div class="column">
              <div class="info-item has-text-centered">
                <div class="info-icon">${thermometerQuarter}</div>
                <div class="info-time">${todaysForecast.temperatureMin}${units.temp}</div>
              </div>
              <div class="info-item has-text-centered">
                <div class="info-icon">${thermometerFull}</div>
                <div class="info-time">${todaysForecast.temperatureMax}${units.temp}</div>
              </div>
              <div class="info-item has-text-centered">
                <div class="info-icon">${sunrise}</div>
                <div class="info-time">${timeGenerator(todaysForecast.sunriseTime)}</div>
               </div>
              <div class="info-item has-text-centered">
                <div class="info-icon">${sunset}</div>
                <div class="info-time">${timeGenerator(todaysForecast.sunsetTime)}</div>
              </div>
              <div class="info-item has-text-centered">
                <div class="info-icon">${sun}</div>
                <div class="info-time">${currently.uvIndex}</div>
              </div>
              <div class="info-item has-text-centered">
                <div class="info-icon">${cloudCover}</div>
                <div class="info-time">${asPercentageText(todaysForecast.cloudCover)}</div>
              </div>
              <div class="info-item has-text-centered">
                <div class="info-icon">${rainChance}</div>
                <div class="info-time">${asPercentageText(todaysForecast.precipProbability)}</div>
              </div>
              <div class="info-item has-text-centered">
                <div class="info-icon">${wind}</div>
                <div class="info-time">${todaysForecast.windSpeed}${units.windSpeed}</div>
              </div>
              <div class="info-item has-text-centered">
                <div class="info-icon" style="transform:rotate(${currently.windBearing}deg)">${compass}</div>
                <div class="info-time">${degToCompass(todaysForecast.windBearing)}</div>
              </div>
            </div>
          </div>
          <div class="columns">
            <div class="column">
              <div class="columns">
                <div class="column">
                  Humidity: ${asPercentageText(currently.humidity)}<br>
                  UV Index: ${currently.uvIndex}<br>
                  Wind Gusts: ${currently.windGust}${units.windSpeed}<br>          
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
  let d = new Date(date * 1000);
  let h = hourMinFormatter(d.getHours());
  let m = hourMinFormatter(d.getMinutes());
  return `${h}:${m}`;
}

function dayGenerator(date) {
  return days[new Date(date * 1000).getDay()];
}

function displayForecast(forecast, units) {
  console.log(forecast);

  let forecastHtml = [
      `<div class="columns">
        <div class="column">
          <hr>
          <h5 class="title is-5 has-text-centered">${forecast.length} Day Forecast</h5>
          <hr>
        </div>
      </div>`];
  // interesting things
  // humidity
  // moonPhase
  // pressure
  // uvIndex && uvIndexTime
  // windGust
  forecast.forEach((f) => {
    forecastHtml
        .push(`<div class="columns">
               <div class="column">
                 <div class="box">
                   <div class="columns">
                     <div class="column">
                       <div class="columns">
                         <div class="column">
                           <p><strong>${dayGenerator(f.time)}: </strong>${f.summary}</p>
                         </div>
                       </div>
                       <div class="columns">
                         <div class="column">
                           <div class="info-item has-text-centered">
                             <div class="info-icon">${thermometerQuarter}</div>
                             <div class="info-time">${f.temperatureMin}${units.temp}</div>
                           </div>
                           <div class="info-item has-text-centered">
                             <div class="info-icon">${thermometerFull}</div>
                             <div class="info-time">${f.temperatureMax}${units.temp}</div>
                           </div>
                           <div class="info-item has-text-centered">
                              <div class="info-icon">${sunrise}</div>
                              <div class="info-time">${timeGenerator(f.sunriseTime)}</div>
                           </div>
                           <div class="info-item has-text-centered">
                              <div class="info-icon">${sunset}</div>
                              <div class="info-time">${timeGenerator(f.sunsetTime)}</div>
                           </div>
                           <div class="info-item has-text-centered">
                              <div class="info-icon">${cloudCover}</div>
                              <div class="info-time">${asPercentageText(f.cloudCover)}</div>
                           </div>
                           <div class="info-item has-text-centered">
                              <div class="info-icon">${rainChance}</div>
                              <div class="info-time">${asPercentageText(f.precipProbability)}</div>
                           </div>
                           <div class="info-item has-text-centered">
                              <div class="info-icon">${wind}</div>
                              <div class="info-time">${f.windSpeed}${units.windSpeed}</div>
                           </div>
                           <div class="info-item has-text-centered">
                              <div class="info-icon" style="transform:rotate(${f.windBearing}deg)">${compass}</div>
                              <div class="info-time">${degToCompass(f.windBearing)}</div>
                           </div>
                         </div>
                         </div>
                       </div>
                     </div>
                   </div>
                 </div>
               </div>`);

  });
  dqs('.forecast').innerHTML = forecastHtml.join('');
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

function unitMapper(units) {
  let fmtUnits = {
    temp: 'ºC',
    dist: 'Km',
    windSpeed: 'm/s'
  };
  if (units === "ca") {
    fmtUnits.windSpeed = 'Km/h';
  } else if (units === "uk2") {
    fmtUnits.dist = 'Mi';
  } else if (units === "us") {
    fmtUnits.temp = 'ºF';
    fmtUnits.dist = 'Mi';
    fmtUnits.windSpeed = 'Mi/h';
  }
  return fmtUnits;
}

function degToCompass(num) {
  let val = Math.floor((num / 22.5) + 0.5);
  let arr = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW"];
  return arr[(val % 16)];
}