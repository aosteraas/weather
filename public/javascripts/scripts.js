'use strict';

const dqs = (query) => document.querySelector(query);
const dqsa = (query) => document.querySelectorAll(query);

const geoErrMsg = "Unfortunately your browser does not support Geolocation or Geolocation failed. Please proceed to enter your location manually.";
const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const icons = {
  thermometerQuarter: `<svg width="16" height="37" viewBox="0 0 16 37" xmlns="http://www.w3.org/2000/svg"><title>Shape</title><path d="M8 36.865c-4.418 0-7.998-3.58-7.998-7.998 0-2.025.758-3.87 2-5.28V6.87c0-3.313 2.686-6 5.998-6 3.314 0 6 2.687 6 6v16.718c1.24 1.41 2 3.254 2 5.28 0 4.417-3.582 7.997-8 7.997zm2-11.443V6.87c0-1.104-.895-2-2-2-1.104 0-2 .896-2 2v18.552c-1.19.693-1.998 1.97-1.998 3.445 0 2.21 1.79 3.998 3.998 3.998 2.21 0 4-1.79 4-3.998 0-1.476-.81-2.752-2-3.445zm-2 6.445c-1.656 0-2.998-1.344-2.998-3 0-1.305.836-2.402 1.998-2.816v-5.183h2v5.184c1.162.415 2 1.513 2 2.817 0 1.656-1.344 3-3 3z" fill-rule="nonzero" fill="#000"/></svg>`,
  thermometerFull: `<svg width="16" height="37" viewBox="0 0 16 37" xmlns="http://www.w3.org/2000/svg"><title>Shape</title><path d="M8 36.867c-4.418 0-8-3.582-8-8 0-2.025.76-3.87 2-5.28V6.872c0-3.312 2.686-6 6-6 3.312 0 6 2.688 6 6V23.59c1.24 1.41 1.998 3.254 1.998 5.28 0 4.417-3.58 8-7.998 8zm2-11.445V6.87c0-1.103-.896-2-2-2-1.105 0-2 .897-2 2v18.552c-1.19.693-2 1.97-2 3.445 0 2.21 1.79 4 4 4s4-1.79 4-4c0-1.476-.81-2.752-2-3.445zm-2 6.445c-1.656 0-3-1.344-3-3 0-1.305.838-2.402 2-2.816V6.87c0-.553.447-1 1-1 .553 0 1 .447 1 1V26.05c1.162.415 2 1.513 2 2.817 0 1.656-1.344 3-3 3z" fill-rule="nonzero" fill="#000"/></svg>`,
  sunrise: `<svg width="48" height="36" viewBox="0 0 48 36" xmlns="http://www.w3.org/2000/svg"><title>Shape</title><path d="M12.688 9.86L9.86 7.03c-.78-.78-2.047-.78-2.828 0-.78.782-.78 2.048 0 2.83l2.828 2.827c.78.78 2.047.78 2.828 0 .78-.78.78-2.046 0-2.828zM45.998 22h-4c-1.104 0-2 .896-2 2s.896 2 2 2h4c1.104 0 2-.896 2-2s-.895-2-2-2zM6.002 22h-4c-1.104 0-2 .896-2 2s.896 2 2 2h4c1.104 0 2-.896 2-2s-.897-2-2-2zM34 32H14c-1.103 0-1.998.895-1.998 2 0 1.103.896 1.998 2 1.998h19.997c1.103 0 2-.895 2-2 0-1.103-.896-2-2-2zm6.97-24.97c-.78-.78-2.05-.78-2.83 0l-2.827 2.83c-.78.78-.78 2.046 0 2.827.78.78 2.048.78 2.828 0l2.83-2.828c.78-.782.78-2.048 0-2.83zM24 8.003c1.105 0 2-.896 2-2v-4c0-1.103-.896-2-2-2s-2 .897-2 2v4c0 1.104.896 2 2 2zm0 4c-6.626 0-11.998 5.37-11.998 11.998 0 1.404.254 2.747.697 4h4.38C16.397 26.82 16 25.46 16 24c0-4.418 3.583-8 8-8 4.418 0 8 3.582 8 8 0 1.46-.397 2.822-1.08 4h4.382c.443-1.253.697-2.596.697-4 0-6.627-5.373-11.998-12-11.998zm0 16.247c.553 0 1-.448 1-1V23.42l2.536 2.535c.39.39 1.023.39 1.414 0 .39-.39.39-1.023 0-1.414L24.708 20.3c-.39-.39-1.024-.39-1.414 0l-4.242 4.243c-.39.39-.39 1.023 0 1.414.39.39 1.023.39 1.414 0L23 23.422v3.827c0 .552.448 1 1 1z" fill-rule="nonzero" fill="#000"/></svg>`,
  sunset: `<svg width="48" height="36" viewBox="0 0 48 36" xmlns="http://www.w3.org/2000/svg"><title>Shape</title><path d="M45.998 26h-4c-1.104 0-2-.896-2-2s.896-2 2-2h4c1.104 0 2 .896 2 2s-.895 2-2 2zm-7.856-13.312c-.78.78-2.048.78-2.828 0-.78-.78-.78-2.047 0-2.828l2.828-2.828c.78-.78 2.047-.78 2.827 0 .78.78.78 2.047 0 2.828l-2.828 2.828zm-2.84 15.31h-4.38c.68-1.176 1.077-2.54 1.077-3.998 0-4.418-3.582-8-8-8-4.417 0-8 3.582-8 8 0 1.46.398 2.822 1.08 4H12.7c-.444-1.253-.698-2.596-.698-4 0-6.627 5.372-11.998 12-11.998 6.625 0 11.997 5.37 11.997 11.998 0 1.404-.255 2.747-.698 4zm-11.3-19.996c-1.106 0-2-.896-2-2v-4c0-1.103.894-2 2-2 1.103 0 2 .897 2 2v4c0 1.104-.898 2-2 2zM9.86 12.688L7.032 9.86c-.78-.78-.78-2.047 0-2.828.78-.78 2.047-.78 2.828 0l2.828 2.828c.78.78.78 2.047 0 2.828-.78.78-2.046.78-2.828 0zM8.003 24c0 1.104-.896 2-2 2h-4c-1.104 0-2-.896-2-2s.896-2 2-2h4c1.104 0 2 .896 2 2zM24 20c.553 0 1 .448 1 1v3.828l2.536-2.535c.39-.39 1.023-.39 1.414 0 .39.39.39 1.023 0 1.414l-4.242 4.242c-.39.39-1.023.39-1.414 0l-4.242-4.243c-.39-.39-.39-1.023 0-1.414.39-.39 1.023-.39 1.414 0L23 24.828V21c0-.552.448-1 1-1zm-9.998 12H34c1.103 0 2 .895 2 2 0 1.103-.897 1.998-2 1.998H14c-1.104 0-2-.895-2-2 0-1.103.895-2 2-2z" fill-rule="nonzero" fill="#000"/></svg>`,
  cloudCover: `<svg width="45" height="33" viewBox="0 0 45 33" xmlns="http://www.w3.org/2000/svg"><title>Shape</title><path d="M16.945 32.64c-8.835 0-15.998-7.163-15.998-16C.947 7.806 8.11.644 16.945.644c6.004 0 11.23 3.312 13.965 8.203.664-.113 1.338-.205 2.033-.205 6.627 0 12 5.374 12 12s-5.373 12-12 12H16.945zm15.998-4c4.418 0 8-3.583 8-8s-3.582-8-8-8c-1.6 0-3.082.482-4.333 1.292-1.23-5.316-5.974-9.29-11.665-9.29-6.626 0-11.998 5.372-11.998 12 0 6.625 5.372 11.997 11.998 11.997h15.998z" fill-rule="nonzero" fill="#000"/></svg>`,
  rainChance: `<svg width="45" height="45" viewBox="0 0 45 45" xmlns="http://www.w3.org/2000/svg"><title>Shape</title><path d="M36.943 31.94v-4.38c2.39-1.383 4-3.96 4-6.92 0-4.417-3.582-8-8-8-1.6 0-3.082.48-4.333 1.292-1.23-5.317-5.974-9.29-11.665-9.29-6.626 0-11.998 5.372-11.998 11.998 0 3.55 1.55 6.728 4 8.925v4.916c-4.777-2.767-8-7.92-8-13.84C.947 7.805 8.11.643 16.945.643c6.004 0 11.23 3.31 13.965 8.203.664-.113 1.338-.205 2.033-.205 6.627 0 12 5.373 12 12 0 5.223-3.342 9.653-8 11.3zm-21.997-11.3c1.104 0 2 .897 2 2v16c0 1.104-.896 2-2 2s-2-.896-2-2v-16c0-1.103.896-2 2-2zm8 4c1.103 0 2 .896 2 2v16c0 1.103-.897 2-2 2-1.105 0-2-.897-2-2v-16c0-1.105.895-2 2-2zm7.998-4c1.104 0 2 .897 2 2v16c0 1.104-.896 2-2 2s-2-.896-2-2v-16c0-1.103.896-2 2-2z" fill-rule="nonzero" fill="#000"/></svg>`,
  wind: `<svg width="44" height="28" viewBox="0 0 44 28" xmlns="http://www.w3.org/2000/svg"><title>Shape</title><path d="M38 16h-3c-1.106 0-2-.895-2-2 0-1.103.894-2 2-2h3c1.103 0 2-.895 2-1.998 0-1.105-.897-2-2-2-1.106 0-2-.896-2-2s.894-2 2-2c.136 0 .27.014.4.04 3.122.212 5.597 2.784 5.597 5.96C43.997 13.314 41.312 16 38 16zm-10-4H6c-1.104 0-2 .897-2 2 0 1.105.896 2 2 2H28c3.313 0 6 2.687 6 6 0 3.176-2.476 5.748-5.597 5.96-.13.026-.265.04-.404.04-1.105 0-2-.896-2-2 0-1.105.895-2 2-2 1.104 0 2-.896 2-2s-.896-2-2-2H6c-3.313 0-6-2.686-6-6 0-3.174 2.476-5.746 5.597-5.958.13-.026.265-.04.402-.04H28c1.104 0 2-.896 2-2s-.896-2-2-2c-1.105 0-2-.895-2-2 0-1.104.895-2 2-2 .138 0 .272.015.403.04C31.523.255 34 2.827 34 6.003c0 3.312-2.687 6-6 6z" fill-rule="nonzero" fill="#000"/></svg>`,
  windGust: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 298.666 298.666"><path d="M162.466 137.052c7.732-7.12 39.268-38.192 36.846-69.387-2.057-26.462-32.63-34.426-49.585-34.426-16.956 0-47.464 7.963-49.52 34.425-2.373 30.564 27.9 61.014 36.41 68.928 3.257-3.25 7.75-5.26 12.716-5.26 5.187 0 9.85 2.207 13.133 5.72zM131.332 149.333c0-3.023.754-5.867 2.07-8.37-11.17-3.414-52.577-14.313-77.824 3-21.89 15.013-13.5 45.47-5.02 60.155 8.478 14.684 30.627 37.122 54.572 25.672 25.487-12.19 37.025-48.342 40.714-62.802-8.27-1.626-14.512-8.908-14.512-17.655zM243.072 144.464c-25.053-17.18-66.036-6.54-77.584-3.028 1.17 2.387 1.844 5.06 1.844 7.897 0 8.808-6.33 16.125-14.686 17.682 3.546 14.076 15.072 50.938 40.874 63.275 23.944 11.452 46.128-11.043 54.606-25.73 8.478-14.682 16.835-45.083-5.054-60.096z"/><path d="M149.333 0C66.99 0 0 66.99 0 149.333s66.99 149.333 149.333 149.333 149.333-66.99 149.333-149.333S231.676 0 149.333 0zm0 282.666C75.813 282.666 16 222.854 16 149.333S75.812 16 149.333 16s133.333 59.813 133.333 133.333-59.813 133.333-133.333 133.333z"/></svg>`,
  sun: `<svg width="48" height="48" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg"><title>Shape</title><path d="M45.997 26H42c-1.106 0-2-.896-2-2s.894-2 2-2h3.997c1.105 0 2 .896 2 2s-.894 2-2 2zm-7.855-13.312c-.78.78-2.05.78-2.828 0-.78-.78-.78-2.047 0-2.828l2.828-2.828c.78-.78 2.047-.78 2.828 0 .78.78.78 2.047 0 2.828l-2.828 2.828zm-14.14 23.31c-6.628 0-12-5.372-12-11.998 0-6.627 5.37-12 12-12 6.626 0 11.997 5.373 11.997 12 0 6.626-5.372 11.998-12 11.998zM24 16c-4.42 0-8 3.582-8 8 0 4.417 3.582 8 8 8 4.416 0 7.997-3.583 7.997-8 0-4.418-3.58-8-8-8zm0-7.998c-1.106 0-2-.896-2-2v-4c0-1.103.894-2 2-2 1.103 0 2 .897 2 2v4c0 1.104-.898 2-2 2zM9.86 12.688L7.032 9.86c-.78-.78-.78-2.047 0-2.828.78-.78 2.047-.78 2.828 0l2.828 2.828c.78.78.78 2.047 0 2.828-.78.78-2.047.78-2.828 0zM8.002 24c0 1.104-.896 2-2 2h-4c-1.104 0-2-.896-2-2s.897-2 2-2h4c1.105 0 2 .896 2 2zM9.86 35.312c.78-.78 2.047-.78 2.828 0 .78.78.78 2.048 0 2.828L9.86 40.968c-.78.78-2.047.78-2.828 0-.78-.78-.78-2.047 0-2.828l2.828-2.828zM24 39.998c1.105 0 2 .895 2 2v4c0 1.103-.895 2-2 2-1.104 0-2-.897-2-2v-4c0-1.105.896-2 2-2zm14.142-4.686l2.828 2.828c.78.78.78 2.048 0 2.828-.78.78-2.05.78-2.828 0l-2.828-2.828c-.78-.78-.78-2.047 0-2.828.78-.78 2.046-.78 2.828 0z" fill-rule="nonzero" fill="#000"/></svg>`,
  compass: `<svg width="28" height="28" viewBox="0 0 28 28" xmlns="http://www.w3.org/2000/svg"><title>Shape</title><path d="M14 .002C6.27.002 0 6.27 0 14c0 7.73 6.27 14 14 14s13.998-6.27 13.998-14S21.73.002 14 .002zM14 24C8.478 24 4 19.52 4 14 4 8.48 8.48 4.002 14 4.002c5.52 0 10 4.477 10 9.998 0 5.522-4.48 10-10 10zm-4-10c0 2.21 1.79 4 4 4s4-1.79 4-4-4-8-4-8-4 5.79-4 8zm5 0c0 .553-.448 1-1 1-.553 0-1-.447-1-1 0-.552.447-1 1-1 .552 0 1 .448 1 1z" fill-rule="nonzero" fill="#000"/></svg>`,
  pressure: `<svg width="26" height="26" viewBox="0 0 26 26" xmlns="http://www.w3.org/2000/svg"><title>Shape</title><path d="M13.014 11.002c-1.107.008-2.008-.884-2.016-1.987-.01-1.107.88-2.007 1.987-2.016.166-.002.324.022.478.06 1.156-.906 2.667-2.086 2.84-2.21.297-.21.64-.235.882.008.24.248.215.623-.01.886-.077.09-1.295 1.622-2.23 2.798.035.143.057.29.058.444.01 1.102-.88 2.008-1.99 2.016zM0 21c0-.553.448-1 1-1h9v-2.525C6.51 16.235 4 12.91 4 9c0-4.962 4.038-9 9-9 4.963 0 9 4.038 9 9 0 3.91-2.51 7.236-6 8.475V20h9c.553 0 1 .447 1 1 0 .553-.447 1-1 1H1c-.552 0-1-.447-1-1zm13-6c3.31 0 6-2.69 6-6s-2.69-6-6-6-6 2.69-6 6 2.69 6 6 6zm12 9H1c-.552 0-1 .447-1 1 0 .553.448 1 1 1h24c.553 0 1-.447 1-1 0-.553-.447-1-1-1z" fill-rule="nonzero" fill="#030104"/></svg>`,
  humidity: `<svg width="30" height="11" viewBox="0 0 30 11" xmlns="http://www.w3.org/2000/svg"><title>Group</title><g fill="#000" fill-rule="evenodd"><path d="M26 0H2c-.552 0-1 .447-1 1 0 .553.448 1 1 1h24c.553 0 1-.447 1-1 0-.553-.447-1-1-1zM29 3H5c-.552 0-1 .447-1 1 0 .553.448 1 1 1h24c.553 0 1-.447 1-1 0-.553-.447-1-1-1zM25 6H1c-.552 0-1 .447-1 1 0 .553.448 1 1 1h24c.553 0 1-.447 1-1 0-.553-.447-1-1-1zM28 9H4c-.552 0-1 .447-1 1 0 .553.448 1 1 1h24c.553 0 1-.447 1-1 0-.553-.447-1-1-1z"/></g></svg>`
};

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
              ${temperatureBadges(todaysForecast, units)}
              ${sunriseSunsetBadges(todaysForecast)}
              ${uvIndexBadge(currently)}
              ${cloudCoverRainChanceBadges(currently)}
              ${windSpeedGustBearingBadges(todaysForecast, units)}
              ${pressureBadge(todaysForecast, units)}
              ${humidityBadge(currently)}
            </div>
          </div>
          <div class="columns">
            <div class="column">
              <div class="columns">
                <div class="column">
                  Wind Gusts: ${currently.windGust} ${units.windSpeed}<br>          
                </div>
              </div> <!--top-->
            </div>
          </div>
        </div>
      </div>
      </div>`;
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
  // moonPhase
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
                           ${temperatureBadges(f, units)}
                           ${sunriseSunsetBadges(f)}
                           ${uvIndexBadge(f)}
                           ${cloudCoverRainChanceBadges(f)}
                           ${windSpeedGustBearingBadges(f, units)}
                           ${pressureBadge(f, units)}
                           ${humidityBadge(f)}
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

function timeGenerator(date) {
  let d = new Date(date * 1000);
  let h = hourMinFormatter(d.getHours());
  let m = hourMinFormatter(d.getMinutes());
  return `${h}:${m}`;
}
function temperatureBadges(w, u) {
  return `<div class="info-item has-text-centered">
            <div class="info-icon">${icons.thermometerQuarter}</div>
            <div class="info-time">${w.temperatureMin} ${u.temp}</div>
          </div>
          <div class="info-item has-text-centered">
            <div class="info-icon">${icons.thermometerFull}</div>
            <div class="info-time">${w.temperatureMax} ${u.temp}</div>
          </div>`;
}
function humidityBadge(w) {
  return `<div class="info-item has-text-centered">
            <div class="info-icon">${icons.humidity}</div>
            <div class="info-time">${asPercentageText(w.humidity)}</div>
          </div>`;
}
function cloudCoverRainChanceBadges(w) {
  return `<div class="info-item has-text-centered">
            <div class="info-icon">${icons.cloudCover}</div>
            <div class="info-time">${asPercentageText(w.cloudCover)}</div>
          </div>
          <div class="info-item has-text-centered">
            <div class="info-icon">${icons.rainChance}</div>
            <div class="info-time">${asPercentageText(w.precipProbability)}</div>
          </div>`;
}

function sunriseSunsetBadges(w) {
  return `<div class="info-item has-text-centered">
            <div class="info-icon">${icons.sunrise}</div>
            <div class="info-time">${timeGenerator(w.sunriseTime)}</div>
          </div>
          <div class="info-item has-text-centered">
            <div class="info-icon">${icons.sunset}</div>
            <div class="info-time">${timeGenerator(w.sunsetTime)}</div>
          </div>`;
}

function uvIndexBadge(w) {
  return `<div class="info-item has-text-centered">
            <div class="info-icon">${icons.sun}</div>
            <div class="info-time">${w.uvIndex}</div>
          </div>`
}

function windSpeedGustBearingBadges(w, u) {
  return `<div class="info-item has-text-centered">
            <div class="info-icon">${icons.wind}</div>
            <div class="info-time">${w.windSpeed} ${u.windSpeed}</div>
          </div>
          <div class="info-item has-text-centered">
            <div class="info-icon">${icons.windGust}</div>
            <div class="info-time">${w.windGust} ${u.windSpeed}</div>
          </div>
          <div class="info-item has-text-centered">
            <div class="info-icon" style="transform:rotate(${w.windBearing}deg)">${icons.compass}</div>
            <div class="info-time">${degToCompass(w.windBearing)}</div>
          </div>`
}
function pressureBadge(w, u) {
  return `<div class="info-item has-text-centered">
            <div class="info-icon">${icons.pressure}</div>
            <div class="info-time">${w.pressure.toFixed()} ${u.pressure}</div>
          </div>`;
}

function humidityBadge(w) {
  return `<div class="info-item has-text-centered">
            <div class="info-icon">${icons.humidity}</div>
            <div class="info-time">${asPercentageText(w.humidity)}</div>
          </div>`;
}

function dayGenerator(date) {
  return days[new Date(date * 1000).getDay()];
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
    windSpeed: 'm/s',
    pressure: 'hPa'
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