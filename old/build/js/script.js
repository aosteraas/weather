$(document).ready(function(){var e=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],t=function(e){try{var t=window[e],o="__storage_test__";return t.setItem(o,o),t.removeItem(o),!0}catch(a){return!1}},o=function(){var o=$.Deferred();return navigator.geolocation.getCurrentPosition(function(r){t("localStorage")&&(localStorage.setItem("geoPermission","true"),console.log("localstorage perms set"));var c=r.coords.latitude,i=r.coords.longitude,s="https://api.forecast.io/forecast/3f08fa997cb13e13a1696357754849ff/"+c+","+i+"?units=auto",u="https://maps.googleapis.com/maps/api/geocode/json?latlng="+c+","+i+"&key=AIzaSyBU6f9scZpIBUq0BJwEuyMI25g1Recm7FQ";$.ajax({url:s,dataType:"jsonp",method:"GET",success:function(e){return e}}).then(function(t){for(var r={tempr:t.currently.temperature,condition:t.currently.summary,icon:t.currently.icon,days:[]},c=t.daily.data,i=1;i<c.length;i++){var s=new Date(1e3*c[i].time);r.days.push({name:e[s.getDay()],min:Math.round(10*c[i].temperatureMin)/10,max:Math.round(10*c[i].temperatureMax)/10,icon:c[i].icon})}var l=function(){$.ajax({url:u,dataType:"json",method:"GET",success:function(e){return e}}).then(function(e){var t=e.results[0].address_components,n={suburb:t[2].long_name,state:t[3].long_name};a(n),o.resolve()},o.reject)};l(),n(r)})}),o.promise()},a=function(e){$("#loc").text(e.suburb+", "+e.state)},n=function(e){$("#popup").fadeOut();var t=new Skycons({color:"black",resizeClear:!0}),o=document.getElementById("current-weather");t.set(o,e.icon);var a=document.getElementById("temp");a.textContent=e.tempr+"º";var n=e.days,r=[];$.each(n,function(e,t){r.push("<div class='forecast'>                             <span>"+t.name+"</span>                             <canvas width='40' height='40' id='day2'></canvas>                             <div class='min temp' id='min'>"+t.min+"º</div>                             <div class='max temp' id='max'>"+t.max+"º</div>                         </div>")}),$(".forecast-container").html(r.join(""));for(var c=document.querySelectorAll("canvas"),i=Array.prototype.slice.call(c),s=1;s<i.length;s++){var u=s-1;t.set(i[s],n[u].icon)}t.play()};"true"===localStorage.geoPermission&&("geolocation"in navigator?($("#popupLoading").show(),$("#popup").hide(),o().then(function(){$("#popupLoading").fadeOut()})):alert("No Geolocation Support!")),"geolocation"in navigator?$(".show-temp").on("click touchstart",function(){o()}):alert("your browser is ghetto")});