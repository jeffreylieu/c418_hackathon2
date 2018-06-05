
$(document).ready(startApp);

function startApp(){
getWeatherData();
attachEventforWeather();
twitterRequest();
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

var twitterArray=[]; 

function twitterRequest (){
    var twitterObject={
          url: ' https://s-apis.learningfuze.com/hackathon/twitter/index.php',
          method: 'get', 
          dataType: 'json',
          success:function(result){
            console.log(result); 
            console.log(result.tweets.statuses[0].text); 
            var twitterData=(result.tweets.statuses);
            for (var index=0; index<twitterData.length; index++){
                twitterArray.push(result.tweets.statuses[index].text); 
            }

          },

          data:{
               "search_term":"werewolves",
            //    "iso_language_code":"en",
            //    "hastags": "#werewolves",         
          },    
          metadata:{
              "iso_language_code":"en"
          }
    }
    $.ajax(twitterObject); 
}


