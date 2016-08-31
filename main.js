console.log("test");
$.getJSON('http://ipinfo.io', function(data){
  $(".city").text(data.city);
  $(".country").text(data.country);
  var coordinates = data["loc"].split(",");
  var lat = coordinates[0];
  var long = coordinates[1];
  var queryUrl = "http://api.openweathermap.org/data/2.5/weather?lat=" + lat +"&lon=" + long + "&APPID=b2dae1c7a020606b8e30b165b92e775a";
  $.getJSON(queryUrl, function(data){
    $(".temperature").text(Math.round(data.main.temp - 273.15));
    $(".description").text(data["weather"][0].main + ", " + data["weather"][0].description);
    var iconUrl = "http://openweathermap.org/img/w/" + data["weather"][0].icon + ".png";
    $(".temp-icon").attr("src", iconUrl);
  });
});

$(".change-units").click(function(){
  var $tempSpan = $(".temperature");
  var temp = $(".temperature").text();
  if($tempSpan.data("unit") == "Farenheit"){
    $tempSpan.text(Math.round((temp - 32)/1.8));
    $tempSpan.data("unit", "Celcius");
    $(".unit").text(String.fromCharCode(8451));
  } else {
    $tempSpan.text(Math.round(temp * 1.8 + 32));
    $tempSpan.data("unit", "Farenheit");
    $(".unit").text(String.fromCharCode(8457));
  }
  baseText = $(".change-units").text().split("To ")[0];
  $(".change-units").text(baseText + "To " + $tempSpan.data("unit"));
});