$(document).ready(intializingApp);

function intializingApp(){
    console.log("hello"); 
    twitterRequest(); 
}

var twitterArray=[]; 

function twitterRequest (){
    var twitterObject={
          url: ' https://s-apis.learningfuze.com/hackathon/twitter/index.php',
          method: 'get', 
          dataType: 'json',
          success:function(result){
              console.log(result.tweets.statuses[i].text);
              
            //   var twitterArray=[];
            //   twitterArray.push(result); 

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