
$(document).ready(startApp);

var moonPhaseDate = [];

function startApp(){
getWeatherData();
attachEventforWeather();
twitterRequest();
getMoonDataDate();
startImageCycle(2000);
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
            var displayWeatherInfo = Math.floor(response.list[0].main.temp)
            $('#displayWeather').text(displayWeatherInfo + ' Degrees')
            if(displayWeatherInfo < 80){
               var modalImage=$('<img src="images/werewolfjump2.gif">').addClass("modalImage")
               $("#modalBody").append(modalImage); 
                showWolfModal();
                $('#city').val('')
                setTimeout(closeWolfModal,3000);
            }
        },
        error: function(err){
        }
    });
   }
}

function showWolfModal(){
    $("#modalShadow").show();
}

function closeWolfModal(){
   $("#modalBody").empty();
   $('#modalShadow').hide(); 

}

function twitterRequest (){
    var twitterArray=[];
    var twitterObject={
          url: ' https://s-apis.learningfuze.com/hackathon/twitter/index.php',
          method: 'get', 
          dataType: 'json',
          success:function(result){
            console.log("twitter data", result); 
            var twitterData=(result.tweets.statuses);
            for (var index=0; index<twitterData.length; index++){
                twitterArray.push(result.tweets.statuses[index].text); 
                var twitterDiv= $("<div>", {class : "borderClass"}); 
                var twitterIcon=$("<i>",{class:"fab fa-twitter", src:"images/twitter.svg"}); 
                $("#tweets").append(twitterDiv);
                $(twitterDiv).append(twitterIcon, '   ', twitterArray[index]); 
            }

          },

          data:{
               "search_term":"werewolves",
                "hashtags":"werewolf",        
          },    
          metadata:{
              "iso_language_code":"en",
              "result_type": "recent",
          }
    }
    $.ajax(twitterObject); 
}

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
            var moonPhase = (result.phasedata[0].phase);
            var date = (result.phasedata[0].date);
            var time = (result.phasedata[0].time);
            moonPhaseDate.push(date, ", ", time, ", Moon Phase: ", moonPhase);
            displayMoon(moonPhase);
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
        src: "images/lastquartermoon.jpg",
        id: "moonID",
        width: "200",
        height: "200"
    },
    "Full Moon":{
        src: "images/fullmoon.jpg",
        id: "moonID",
        width: "200",
        height: "200"
    }
};
    var moon= $("#moonPhases");
    var moonDateDiv = $("<div>").addClass("moonDateDiv text-center").appendTo("#moonPhases");
    var moonImage=$("<img>").attr('src',moonArr[moonPhase].src);
    moon.append(moonImage, moonDateDiv, moonPhaseDate);
    if (moonPhase === "Full Moon"){
        showFullMoonModal(); 
        setTimeout(closeWolfModal,3000);
    }
}

function showFullMoonModal(){
    var fullMoonImage=$('<img src="images/fullmoon.gif">').addClass("modalImage")
    var warningDiv=$("<div>",{
        text:"Better Cancel Those Dinner Plans it is a Full Moon Tonight!",
        class:"FullMoonWarningDivText"
        });
    $("#modalBody").text("Better Cancel Those Dinner Plans it is a Full Moon Tonight!"); 
    $("#modalBody").append(fullMoonImage); 
    $("#modalShadow").show();  
}

function startImageCycle(timeBetweenCycle = 5000){
    var adArray = [
        {src: "images/ads/Werelix.png"},
        {src: "images/ads/bayer.png"},
        {src: "images/ads/whitestrips.png"},
        {src: "images/ads/justformen.png"},
        {src: "images/ads/datingsite.png"}
    ];
    var currentImage = 0;
    var timer = null;

    function cycleImageAndDisplay(){
        var adDivCreate=$("<img>").attr('src',adArray[currentImage].src);
        $("#adSpace").empty().append(adDivCreate);
        currentImage++;
        if(currentImage === adArray.length){
            currentImage=0;
        }
    }
    cycleImageAndDisplay();
    timer = setInterval(cycleImageAndDisplay, timeBetweenCycle);
}


