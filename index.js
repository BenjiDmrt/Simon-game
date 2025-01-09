let buttonColors = ["red", "blue", "green", "yellow"];
let gamePattern  = [];
let userClickedPattern = [];
let level = 0;
let started = false;

document.addEventListener("keydown", function(){
    if(!started){
        nextSequence();
        document.getElementById("level-title").textContent = "Level 0";
        started = true;
    }
    
});





$(".btn").on("click", function(){
    let userChosenColor = this.id;

    if (started){
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatedPress(userChosenColor);
    checkAnswer(userClickedPattern.length -1);
    }
    else{
        animatedPress(userChosenColor);
    }
})

function playSound(name){
    new Audio(`sounds/${name}.mp3`).play();
}
function animatedPress(currentColor){
    $(`#${currentColor}`).addClass("pressed")
    setTimeout(function(){
        $(`#${currentColor}`).removeClass("pressed");
    }, 100);
}
function checkAnswer(currentLevel){
    if(gamePattern[currentLevel] == userClickedPattern[currentLevel]){
        console.log("success");
        if(userClickedPattern.length == gamePattern.length){
            setTimeout(function(){
                nextSequence();
            }, 1000);
        }
    }
    
    else{
        console.log("wrong");
        new Audio(`sounds/wrong.mp3`).play();
        document.body.classList.add("game-over")
        setTimeout(function(){
            document.body.classList.remove("game-over");}, 200);
        document.getElementById("level-title").textContent = "Game Over, Press Any Key to Restart";
        startOver();

    }
}

function startOver(){
    started = false;
    level = 0;
    gamePattern = [];
}



function nextSequence(){
    userClickedPattern = [];

    level ++;
    document.getElementById("level-title").textContent = `Level ${level}`;

    let randomNumber = Math.floor(Math.random()*4);
    let randomChosenColour = buttonColors[randomNumber];
    gamePattern.push(randomChosenColour);
    $(`#${randomChosenColour}`).fadeOut().fadeIn('slow');
    playSound(randomChosenColour);
}

