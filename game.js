
//create array of the colors
var buttonColors = ["red", "blue", "green", "yellow"];

//Create empty array "gamePattern"
var gamePattern = [];

//create empty array for userClickedPattern
var userClickedPattern = [];

//way to keep tack whether game has started or not - start game at level 0
var start = false;
var level = 0;

//detect when key has been pressed and call nextSequence when key is pressed for the first time
$(document).keydown(function() {
  if(!start){
    //h1 chnages text when first key is pressed to display levels
    $("#level-title").text("Level " + level);
    nextSequence();
    //start is now true, so !start is no longer true, therefore keydown function no longer runs
    start = true;
  }
});



//use jQuery to detect when a button is clicked and trigger a handler function
$(".btn").click(function() {
 //create variable to store the id of button clicked
 var userChosenColor = $(this).attr("id");
 userClickedPattern.push(userChosenColor);

playSound(userChosenColor);

animatePress(userChosenColor);

// Call checkAnswer() after a user has clicked and chosen their answer, passing in the index of the last answer in the user's sequence.
checkAnswer(userClickedPattern.length-1);

});


//create function to check answer
function checkAnswer(currentLevel) {

  //if the most recent userClickedPattern equals gamePattern then success
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    console.log("success");

    // check that they have finished their sequence with another if statement - then call nextSequence of 1000 millisecs
    if (userClickedPattern.length === gamePattern.length) {
       setTimeout(function() {
        nextSequence();
      }, 1000);
    }

  } else {
    //if answer is wrong then start over
    startOver();

  }

}

//Create function to restart game when game is over
function startOver() {

//Reset parameters so as to satrt from beggining
  level = 0;
  gamePattern = [];
  //reset start so that game is restarted by clicking a key
  start = false;

//Play wrong-sound
  playSound("wrong");
  $("body").addClass("game-over");

//add game-over style for 200 millisecs
  setTimeout(function() {
    $("body").removeClass("game-over");
  }, 200);

 //Change title to "Game Over, Press Any Key to Restart"
  $("h1").text("Game Over, Press Any Key to Restart");


}

//create function that generates random number between 0 and 3 using variable "randomNumber"
function nextSequence() {

  //6. Once nextSequence() is triggered, reset the userClickedPattern to an empty array ready for the next level.
  userClickedPattern = [];

  //increase "level" each time nextSequence is called
  level++;
  $("#level-title").text("Level " + level);

  var randomNumber = Math.floor(Math.random() * 4);

  //create a variable to generate random color using variable "randomNumber"
  var randomChosenColor = buttonColors[randomNumber];

  //add randomChosenColor to gamepattern
  gamePattern.push(randomChosenColor);

  //select randomChosenColor
  $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);

  playSound(randomChosenColor);

}

//function to play sound when clicked
function playSound (name) {

  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();

}

//create function to animate buttons when pressed
function animatePress (currentColor) {

//add css style .pressed for animation
$("#" + currentColor).addClass("pressed");

//turn of css style .pressed after delay of 100 millisecs
setTimeout(function() {
  $("#" + currentColor).removeClass("pressed");
}, 100);

}
