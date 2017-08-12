$(document).ready(function(){
    var lat,
        lng,
        apiUrl,
        days = [
            "Sun",
            "Mon",
            "Tue",
            "Wed",
            "Thu",
            "Fri",
            "Sat"
        ];
    
    var storageAvailable = function(type) {
        try {
            var storage = window[type],
                x = '__storage_test__';
            storage.setItem(x, x);
            storage.removeItem(x);
            return true;
        }
        catch(e) {
            return false;
        }
    }

    var getWeatherAndReverseGeo = function() {
        var def = $.Deferred();

        navigator.geolocation.getCurrentPosition(function(pos) {
                
            if (storageAvailable('localStorage')) {
               localStorage.setItem('geoPermission', 'true');
               console.log('localstorage perms set');
            }

            // set lat and lng to vars
            var lat = pos.coords.latitude;
            var lng = pos.coords.longitude;

            // set weather and google maps API urls
            var weatherApiUrl = 'https://api.forecast.io/forecast/3f08fa997cb13e13a1696357754849ff/' + lat + ',' + lng + '?units=auto';
            var reverseGeoLookupApi = 'https://maps.googleapis.com/maps/api/geocode/json?latlng=' + lat + ',' + lng + '&key=AIzaSyBU6f9scZpIBUq0BJwEuyMI25g1Recm7FQ';

            // request weather data from API
            $.ajax({
                url: weatherApiUrl,
                dataType: 'jsonp',
                method: 'GET',
                success: function(data) {
                    // return data for manipulation
                    return data;
                }
            }).then(function(data) {
                // create structure for updating dom with current and forecast weather
                var forecast = {
                    tempr: data.currently.temperature,
                    condition: data.currently.summary,
                    icon: data.currently.icon,
                    days: []
                };

                // shorten reference for usability
                var weatherDays = data.daily.data;

                // maybe user $.each
                for(var i = 1; i < weatherDays.length; i++) {

                    // API returns in sections, js expects ms
                    var date = new Date(weatherDays[i].time * 1000);

                    // pushing forecast data into forecast.days[]
                    forecast.days.push({
                        name: days[date.getDay()],
                        min: Math.round(weatherDays[i].temperatureMin * 10) / 10,
                        max: Math.round(weatherDays[i].temperatureMax * 10) / 10,
                        icon: weatherDays[i].icon
                    });
                }

                // function for reverse lookup of address based on coords
                var getNamedLocationFromCoords = function() {
                    $.ajax({
                        url: reverseGeoLookupApi,
                        dataType: 'json',
                        method: 'GET',
                        success: function(geo) {
                            return geo
                        }
                    }).then(function(geo){
                        // simplify object reference
                        var locationDetails = geo.results[0].address_components;

                        // extract suburb and state to location object
                        var location = {
                            suburb: locationDetails[2].long_name,
                            state: locationDetails[3].long_name
                        };
                        // execute update location
                        updateLocationInDom(location);
                        def.resolve();
                    }, def.reject);
                };

                // call functions to update DOM
                getNamedLocationFromCoords();
                updateWeatherInDom(forecast);
            });
        });

        return def.promise();
    }

    var updateLocationInDom = function(location) {
        // updates location with suburb and state.
        $('#loc').text(location.suburb + ', ' + location.state);
    };

    var updateWeatherInDom = function(forecast) {
        $('#popup').fadeOut();

        // init skycons, resizeClean should fix an android compatability error
        var skycons = new Skycons({"color": "black", "resizeClear": true});

        // grab current weather canvas element to apply skycon
        var currentID = document.getElementById('current-weather');
        skycons.set(currentID, forecast.icon);

        // grab temp div and display current temperature
        var temp = document.getElementById('temp');
        temp.textContent = forecast.tempr + "º";

        // reduce forecast.days to days for easier use
        var days = forecast.days;

        // setup array for holding all html generated in loop below.
        var allHtml = [];

        // generate HTML dynamically with correct values
        $.each(days, function(key, val) {
            // console.log(key + " " + val.icon);
            allHtml.push("<div class='forecast'> \
                            <span>" + val.name + "</span> \
                            <canvas width='40' height='40' id='day2'></canvas> \
                            <div class='min temp' id='min'>" + val.min + "º</div> \
                            <div class='max temp' id='max'>" + val.max + "º</div> \
                        </div>");

        });

        // join elements in html array and inject into forecast container.
        $('.forecast-container').html(allHtml.join(""));

        // create array of all canvas elements in the document.
        var forecastNodes = document.querySelectorAll('canvas');
        var forecastArray = Array.prototype.slice.call(forecastNodes);

        // iterate over canvas items and forecast object to set correct icon per canvas
        for(var i = 1; i < forecastArray.length; i++) {
            var iconIndex = i - 1;
            skycons.set(forecastArray[i], days[iconIndex].icon);
        }

        skycons.play();

    };
    // check if location permission previously granted
    if (localStorage.geoPermission === "true") {
        if("geolocation" in navigator) {
            $('#popupLoading').show();
            $('#popup').hide();
            
            getWeatherAndReverseGeo().then(function() {
                    
                    $('#popupLoading').fadeOut();    
            });
        } else {
            alert("No Geolocation Support!");
        }
    }
    // check if browser supports geolocation
    if ("geolocation" in navigator) {

        // event handler for check weather button
        $('.show-temp').on('click touchstart', function() {
            getWeatherAndReverseGeo();
        });
    } else {
        // alert the user if they do not have geolocation
        alert("your browser is ghetto");
    }
});