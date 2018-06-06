
$(document).ready(startApp);

var twitterArray=[]; 

function startApp(){
getWeatherData();
attachEventforWeather();
twitterRequest();
//getMoonData();
getMoonDataDate();
}
function attachEventforWeather(){
    $("#weatherBtn").on("click", getWeatherData  )
}
function play(){
    var audio = document.getElementById("audio");
    audio.play();
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
            $('#displayWeather').text(displayWeatherInfo + ' Degrees')

            if(displayWeatherInfo < 100){
                showWolfModal(); 
                $('#city').val('')
                setTimeout(closeWolfModal,3000);
                // alert('who let the wolves out?'); //replace with modal later
            }
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

function twitterRequest (){
    var twitterObject={
          url: ' https://s-apis.learningfuze.com/hackathon/twitter/index.php',
          method: 'get', 
          dataType: 'json',
          success:function(result){
            console.log("twitter data", result); 
            var twitterData=(result.tweets.statuses);
            for (var index=0; index<twitterData.length; index++){
                twitterArray.push(result.tweets.statuses[index].text); 
                var twitterDiv= $("<div>").addClass("borderClass");
                $("#tweets").append(twitterDiv)
                $(twitterDiv).append(twitterArray[index]); 
            }

          },

          data:{
               "search_term":"werewolves",
                "iso_language_code":"en",         
          },    
          metadata:{
              "iso_language_code":"en"
          }
    }
    $.ajax(twitterObject); 
}

/*function getMoonData(year = (new Date()).getFullYear()) {

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
}*/
//updated moon data function so it grabs the current moon phase
function getMoonDataDate() {

    var today = new Date();
    var dd = today.getDate();

    var mm = today.getMonth()+1;
    var yyyy = today.getFullYear();
    if(dd<10)
    {
        dd='0'+dd;
    }

    if(mm<10)
    {
        mm='0'+mm;
    }

    today = mm+'/'+dd+'/'+yyyy;
    console.log(today);



    var ajaxConfig = {
        url: 'http://api.usno.navy.mil/moon/phase',
        method: "GET",
        dataType: 'JSON',
        data: {
            date: today,
            nump: 1
        },

        success: function (result) {
            console.log('2) AJAX Success function called, with the following result:', result);
            debugger;
            var moonPhase = (result.phasedata[0].phase);
            var date = (result.phasedata[0].date);
            var time = (result.phasedata[0].time);
        }
    };
    $.ajax(ajaxConfig)
}


function displayMoon(moonPhase) {
var moonArr={
    "First Quarter": {
        src: "images/firstquarter.jpg",
        id: "moonID",
        width: "200",
        height: "200"
    },
    "New Moon": {
        src: "images/newmoon.png",
        id: "moonID",
        width: "200",
        height: "200"
    },
    "Last Quarter": {
        src: "images/fullmoon.jpg",
        id: "moonID",
        width: "200",
        height: "200"
    },
    "Full Moon":{
        src: "images/lastquartermoon.jpg",
        id: "moonID",
        width: "200",
        height: "200"
    }
}
    var moon= $("#moonPhases");
    var moonImage=$("<img>").attr(moonArr[moonPhase].src); 

    moon.append(moonImage);
}
