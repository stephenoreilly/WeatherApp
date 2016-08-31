// Return the co-ordinates of the user
$.getJSON('http://ipinfo.io', function(data){
  $(".city").text(data.city);
  $(".country").text(data.country);
  var coordinates = data["loc"].split(",");
  var lat = coordinates[0];
  var long = coordinates[1];
  // Set the query string for the openweather API
  var queryUrl = "http://api.openweathermap.org/data/2.5/weather?lat=" + lat +"&lon=" + long + "&APPID=b2dae1c7a020606b8e30b165b92e775a";
  queryOpenWeatherAPI(queryUrl);
});

function queryOpenWeatherAPI(queryUrl){
  $.getJSON(queryUrl, function(data){
    // Set the data to the correct fields
    $(".temperature").text(Math.round(data.main.temp - 273.15));
    $(".description").text(data["weather"][0].main + ", " + data["weather"][0].description);
    var iconUrl = "http://openweathermap.org/img/w/" + data["weather"][0].icon + ".png";
    $(".temp-icon").attr("src", iconUrl);
  });
}

// Toggle the units for temperature between Celcius and Fahrenheit
$(".change-units").click(function(){
  var $temperatureSpan = $(".temperature");
  var temp = $(".temperature").text();
  var unit = $temperatureSpan.data("unit");
  var newUnit = unit == "Farenheit" ? "Celcius" : "Farenheit";
  setTempFields(unit, newUnit, temp, $temperatureSpan);
  updateButtonText(unit);
});

function setTempFields(oldUnit, newUnit, temp, $temperatureField){
  $temperatureField.text(findTemperature(newUnit, temp));
  $temperatureField.data("unit", newUnit);
  $(".unit").text(String.fromCharCode(charCodeForUnit(newUnit)));
}

function charCodeForUnit(newUnit){
  return newUnit == "Celcius" ? 8451 : 8457;
}

function findTemperature(newUnit, temp){
  if(newUnit == "Celcius"){
    return Math.round((temp - 32)/1.8);
  } else {
    return Math.round(temp * 1.8 + 32);
  }
}

function updateButtonText(unit){
  baseText = $(".change-units").text().split("To ")[0];
  $(".change-units").text(baseText + "To " + unit);
}