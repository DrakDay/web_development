var buttonColours = ["red", "blue", "green", "yellow"]

var gamePattern = []
var userClickedPattern = []
var started = false;
var level = 0

$(document).keypress(function () {
    if (!started) {
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
      }
})

$(".btn").click(function (event) {
    userChosenColour = event.target.id
    userClickedPattern.push(userChosenColour)
    playSound(userChosenColour);
    animatePress(userChosenColour)
    checkAnswer(userClickedPattern.length-1);
})

function nextSequence(){
    userClickedPattern = [];
    level++;
    $("#level-title").text("Level " + level);
    var randomNumber = Math.floor(Math.random() * 4) 
    var randomChosenColour = buttonColours[randomNumber]
    gamePattern.push(randomChosenColour)

    playSound(randomChosenColour)
    $("#"+randomChosenColour).fadeOut(100).fadeIn(100)

}

function playSound(name){
    var audio = new Audio("sounds/" + name+".mp3")
    audio.play()
}

function animatePress(currentColour){
    $("#"+currentColour).addClass("pressed")
    setTimeout(function name(params) {
        $("#"+currentColour).removeClass("pressed")
    }, 100)
}

function checkAnswer(currentLevel) {

    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
      if (userClickedPattern.length === gamePattern.length){
        setTimeout(function () {
          nextSequence();
        }, 1000);
      }
    } else {
      playSound("wrong");
      $("body").addClass("game-over");
      $("#level-title").text("Game Over, Press Any Key to Restart");

      setTimeout(function () {
        $("body").removeClass("game-over");
      }, 200);

      startOver();
    }

}

function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
  }
  