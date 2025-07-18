var buttonColours = ["red","blue","green","yellow"];

var userClickedPattern = [];
var gamePattern = [];

var level = 0;
var started = false;

$(document).keydown(function(){
    if (!started) {
        $('h1').text('Level: ' + level); 
        nextSequence();
        started = true;
    }    
    })

function nextSequence(){
    userClickedPattern = [];
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
    level++;
    $('h1').text('Level: ' + level);
}

$(".btn").click(function(){
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
})

function playSound(name){
    var sound = new Audio("sounds/" + name + ".mp3")
    sound.play();
}

function animatePress(currentColour){
    $("#" + currentColour).addClass("pressed");
    setTimeout (function() {
        $("#" + currentColour).removeClass("pressed")
    }, 100);
}

function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        console.log("success");
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function(){
                nextSequence();
            }, 1000);
        }
    } else {
        playSound("wrong")
        $("body").addClass("game-over");
        setTimeout (function() {
            $("body").removeClass("game-over")
        }, 200);
        $("h1").text("Game Over, Press Any Key To Restart")
        console.log("wrong");
        startOver();
    }
}

function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
}