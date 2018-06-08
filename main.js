
$(document).ready(startApp);

var moonPhaseDate = [];

function startApp(){
getWeatherData();
attachEventforWeather();
twitterRequest();
getMoonDataDate();
getNews();
getCocktail();
clickForAdvice();
startImageCycle(3000);
}

function attachEventforWeather(){
    $("#weatherBtn").on("click", getWeatherData  );
    var input = document.getElementById("city");
    input.addEventListener("keyup", function(event) {
        event.preventDefault();
        if (event.keyCode === 13) {
            document.getElementById("weatherBtn").click();
        }
    });
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
               $("#modalBody").text("Bolt yourself in tonight it's going to be a cold one! You don't want to end up nude in a frosty field!");
               $("#modalBody").append(modalImage);
                showWolfModal();
                $('#city').val('')
                setTimeout(closeWolfModal,4000);
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
            //console.log("twitter data", result);
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
    //console.log(today);
    var ajaxConfig = {
        url: 'http://api.usno.navy.mil/moon/phase',
        method: "GET",
        dataType: 'JSON',
        data: {
            date: today,
            nump: 1
        },
        success: function (result) {
           // console.log('2) AJAX Success function called, with the following result:', result);
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
        src: "images/newmoon.jpg",
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
    var fullMoonImage=$('<img src="images/fullmoonresizedcropped.gif">').addClass("modalImage")
    $("#modalBody").text("Better Cancel Those Dinner Plans it is a Full Moon Tonight!"); 
    $("#modalBody").append(fullMoonImage); 
    $("#modalShadow").show();
}


function startImageCycle(timeBetweenCycle = 3000){
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


function getNews() {

    var ajaxConfig ={
        url: 'https://newsapi.org/v2/top-headlines',
        data: {
            sources: 'bbc-news',
            apiKey: 'a301402e78e34cf99746d40c3083b2cb'
        },
        dataType: 'json',
        success: function (response) {
           //console.log(response);
            var newsData = response.articles;
            for (var index=0; index<newsData.length; index++) {
                var description = response.articles[index].description;
                var title = response.articles[index].title;
                var img = response.articles[index].urlToImage;
                var link = response.articles[index].url;

                var makeDivforNews = $("<div>").addClass("news");
                var makeTitle = $("<p>").addClass("newsTitle").text(title);
                var makeDescription = $("<div>").addClass("newsDescription").text(description);
                var makeImg = $("<img>").addClass("newsPic").attr("src", img);
                var makeLink = $("<a>").attr("href", link).attr("target", "__blank");
                makeLink.append(makeImg);


                makeDivforNews.append(makeTitle, makeLink, makeDescription);
                $("#news").append(makeDivforNews);


            }


        }
    };
    $.ajax(ajaxConfig);
}

function getCocktail() {

    var ajaxConfig ={
        url: 'https://www.thecocktaildb.com/api/json/v1/1/random.php',
        data: {
        },
        dataType: 'json',
        success: function (response) {
            //console.log(response);



            var boozeyTime = response.drinks[0];
            var cocktail = response.drinks[0].strDrink;
            var img = response.drinks[0].strDrinkThumb;
            var instructions = response.drinks[0].strInstructions;

            var ingredient1 = boozeyTime.strIngredient1;
            var ingredient2 = boozeyTime.strIngredient2;
            var ingredient3 = boozeyTime.strIngredient3;
            var ingredient4 = boozeyTime.strIngredient4;
            var ingredient5 = boozeyTime.strIngredient5;
            var ingredient6 = boozeyTime.strIngredient6;
            var ingredient7 = boozeyTime.strIngredient7;
            var ingredient8 = boozeyTime.strIngredient8;
            var ingredient9 = boozeyTime.strIngredient9;
            var ingredient10 = boozeyTime.strIngredient10;

            var ingredientArray = [];

            ingredientArray.push(ingredient1, ingredient2, ingredient3, ingredient4,
                ingredient5, ingredient6, ingredient7, ingredient8, ingredient9, ingredient10);



            var makeDivforBooze = $("<div>").addClass("booze");
            var makeCocktailName = $("<p>").addClass("drinkName").text(cocktail);
            var recipeInstructions = $("<div>").addClass("instructions").text(instructions);
            var makeImg = $("<img>").addClass("drinkPic").attr("src", img);
            var ingredientList = $('<ul>');
            var measurementList = $("<ul>");



            var measure1 = boozeyTime.strMeasure1;
            var measure2 = boozeyTime.strMeasure2;
            var measure3 = boozeyTime.strMeasure3;
            var measure4 = boozeyTime.strMeasure4;
            var measure5 = boozeyTime.strMeasure5;
            var measure6 = boozeyTime.strMeasure6;
            var measure7 = boozeyTime.strMeasure7;
            var measure8 = boozeyTime.strMeasure8;
            var measure9 = boozeyTime.strMeasure9;
            var measure10 = boozeyTime.strMeasure10;

            var measurementArray = [];

            measurementArray.push(measure1, measure2, measure3, measure4,
                measure5, measure6, measure7, measure8, measure9, measure10);

            $(ingredientList).append();
            makeDivforBooze.append(makeImg, makeCocktailName, ingredientList, measurementList, recipeInstructions);
            $("#recipe").append(makeDivforBooze);

            var badValues = ['', " ", null];

            for (var i=0; i<ingredientArray.length; i++) {
                if (badValues.indexOf(ingredientArray[i]) === -1) {
                    var listItem =$("<li>").text(measurementArray[i] + " " + ingredientArray[i]);
                    // $(ingredientList).append(listItem);

                    //var measurementItem =$("<li>").text(measurementArray[i]);
                    measurementList.append(listItem);
                }
            }


        }


    };
    $.ajax(ajaxConfig)
}

function clickForAdvice() {
    $("#adviceTitle").on("click", getAdvice);
    $(".advice").text("");
    //console.log("advice was clicked")
}
function getAdvice() {

    var ajaxConfig ={
        url: 'http://api.adviceslip.com/advice',
        data: {

        },
        dataType: 'json',
        success: function (response) {
           // console.log(response);

            $("#adviceQuote").text(response.slip.advice);


        }

    };
    $.ajax(ajaxConfig);
}

