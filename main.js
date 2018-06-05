$(document).ready(startApp);

function startApp(){
getWeatherData();
attachEventforWeather();

}
function attachEventforWeather(){
    $("#weatherBtn").on("click", getWeatherData  )
}

function getWeatherData(){
    
   var cityInput = $('#city').val(); // grabbing input value from DOM
   var temperatureUnit = '&units=imperial' // converting to fareinheit
   var apiKey = '&appid=9dd197942a0bc259df00f2207629ec26' // API key
    var baseUrl = 'http://api.openweathermap.org/data/2.5/forecast?q=';
    var url = baseUrl + cityInput + temperatureUnit + apiKey;

   if(cityInput){
    $.ajax({
        url: url,
        type: 'GET',
        dataType: 'json',
        success: function(response){
            console.log('Weather called');
            var displayWeatherInfo = Math.floor(response.list[0].main.temp)
            $('#displayWeather').text(displayWeatherInfo); 
            $('#degreeSymbol').append('<div>&#176;</div>')
        },
        error: function(err){
            console.log('failed');
        }
    });
   }

}




