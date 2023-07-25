
var userClickedPattern = [];

var gamePattern = [];

const buttonColours = ["red", "blue", "green", "yellow"];

var blue = new Audio('sounds/blue.mp3');
var green = new Audio('sounds/green.mp3');
var red = new Audio('sounds/red.mp3');
var wrong = new Audio('sounds/wrong.mp3');
var yellow = new Audio('sounds/yellow.mp3');


var started = false;

var level = 0;

$(document).keypress(function() {
    
    if(!started){
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }

})

function nextSequence() {

    userClickedPattern = [];

    level++;
    $("#level-title").text("Level " +level);
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#" + randomChosenColour).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);

}



$(".btn").on("click", function(e){
    
    var userChosenColour = e.target.id;
    userClickedPattern.push(userChosenColour);
    console.log(userClickedPattern);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
})

function checkAnswer(currentLevel){

    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
        

        if(userClickedPattern.length === gamePattern.length) {
            setTimeout(function () {
                nextSequence();
            }, 1000);
        }

    }
    else{
        wrong.play();
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over")
        },200 );
        $("#level-title").text("Game Over, Press Any Key to Restart");
        startOver();
    }

}

function startOver(){
    level = 0;
    gamePattern = [];
    started = false;
}


function playSound(name){
    switch(name){
        case "red":
            red.play();
            break;
        case "blue":
            blue.play();
            break; 
        case "green":
            green.play();
            break;    
        case "yellow":
            yellow.play();
            break; 
        default:
            wrong.play();
              
    }
}

function animatePress(currentColour) {
    
    var activeColour = document.querySelector("." + currentColour);
    activeColour.classList.add("pressed");

    setTimeout(function(){
        activeColour.classList.remove("pressed")
    }, 100);

}


