
var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];

// a way to keep track of whether if the game has started or not, 
// so you only call nextSequence() on the first keypress.

var enteredOnce = false;

//  games level from which starts the game

var level = 0;

$(".btn").click(function(event){
    //  my option
    var userChosenColour = event.target.id;
    console.log(event);
    // angela option
    // var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    console.log(userClickedPattern);
    // In the same way we played sound in nextSequence() , when a user clicks on a button, the corresponding sound should be played.
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.lastIndexOf(userChosenColour));
})
   
//  Add Evenet Listener on key press "a" and execute nextSequence() by changing also "h1".
//  My attempt:

$(document).keypress(function(){
    // console.log(event);
    if(!enteredOnce){
        $("#level-title").text("Level " + level);
        nextSequence();
        enteredOnce = true;
    }
})

// AppBrewery attempt:

// $(document).keypress(function() {
//     if (!started) {
  
//       //3. The h1 title starts out saying "Press A Key to Start", when the game has started, change this to say "Level 0".
//       $("#level-title").text("Level " + level);
//       nextSequence();
//       started = true;
//     }
//   });

// creating function nextSequence, generating random color, pushing that color to array, calling playSound() function; 

function nextSequence(){
    level++;
    $("#level-title").text("Level " + level);

    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    console.log(gamePattern);
    $("#" + randomChosenColour).fadeOut(100).fadeIn(100);
    // Refactor the code in playSound() so that it will work for both
    // playing sound in nextSequence() and when the user clicks a button.
    playSound(randomChosenColour);
    userClickedPattern = [];
}

function checkAnswer(currentLevel){
        if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
            console.log("success");
            var count = 0;
            for (var i = 0; i < gamePattern.length; i++){
                if(gamePattern[i] === userClickedPattern[i])
                count++;
            }
            if(gamePattern.length === count){
                setTimeout(function(){
                    nextSequence();
                }, 1000);
            }
        } else {
            console.log("fail");
            playSound("wrong");
            $("body").addClass("game-over");
            setTimeout(function(){
                $("body").removeClass("game-over");
            }, 200);
            $("h1").text("Game Over, Press Any Key to Restart");
            startOver();
        }
    }

function startOver(){
    gamePattern = [];
    level = 0;
    enteredOnce = false;
}

    // Create a new function called playSound() that takes a single input parameter called name.
function playSound(name){
    // Take the code we used to play sound in the nextSequence() function and add it to playSound().
    var makeSound = new Audio("sounds/"+name+".mp3");
    makeSound.play();
} 

// nextSequence();

    // add class from css .pressed to clicked button and removes

function animatePress(currentColour){
     $("." + currentColour).addClass("pressed");
     setTimeout(function(){
        $("." + currentColour).removeClass("pressed");
    }, 100);
}

