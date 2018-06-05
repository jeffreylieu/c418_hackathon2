
$(document).ready(startApp);

function startApp(){
getWeatherData();
attachEventforWeather();
twitterRequest();
getMoonData();
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
            $('#displayWeather').text(displayWeatherInfo).append('<div class="degreeSymbol">&#176;</div>')
        },
        error: function(err){
            console.log('failed');
        }
    });
   }

}

function showWolfModal(){
    document.querySelector("#modalShadow").style.display = "block";
}

function closeWolfModal(){
    document.querySelector("#modalShadow").style.display = "none";
}

function setTimeOutForModal(){
    setTimeout(closeWolfModal,2000); 
}

var twitterArray=[]; 

function twitterRequest (){
    var twitterObject={
          url: ' https://s-apis.learningfuze.com/hackathon/twitter/index.php',
          method: 'get', 
          dataType: 'json',
          success:function(result){
            console.log("twitter data", result); 
            // console.log(result.tweets.statuses[0].text); 
            debugger; 
            var twitterData=(result.tweets.statuses);
            for (var index=0; index<twitterData.length; index++){
                twitterArray.push(result.tweets.statuses[index].text); 
                $("#tweets").append(twitterArray[index]); 
            }

          },

          data:{
               "search_term":"werewolves",
                "iso_language_code":"en",
            //    "hastags": "#werewolves",         
          },    
          metadata:{
              "iso_language_code":"en"
          }
    }
    $.ajax(twitterObject); 
}

function getMoonData(year = (new Date()).getFullYear()) {

    var ajaxConfig = {
        url: 'http://api.usno.navy.mil/moon/phase',
        method: "GET",
        dataType: 'JSON',
        data: {
            year
        },

        success: function (result) {
            console.log('2) AJAX Success function called, with the following result:', result);

        }
    };
    $.ajax(ajaxConfig)
}

function play(){
    var audio = document.getElementById("audio");
    audio.play();
}
function displayMoon() {
var moonArr=[
    {
        src: "images/firstquarter.jpg",
        id: "moonID",
        width: "200",
        height: "200"
    },
    {
        src: "images/newmoon.png",
        id: "moonID",
        width: "200",
        height: "200"
    },
    {
        src: "images/fullmoon.jpg",
        id: "moonID",
        width: "200",
        height: "200"
    },
    {
        src: "images/lastquartermoon.jpg",
        id: "moonID",
        width: "200",
        height: "200"
    }
]



}


