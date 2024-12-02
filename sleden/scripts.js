let gameStarted = false;
let progressBar = document.querySelector("#motorProgress");

function changeProgress(){
    progressBar.value += 4;
}

function startGame() {
    document.querySelector("#gameOver").style.display = "none"
    document.querySelector("#menu").style.display = "block"
    document.querySelector("#deer").style.display = "none";

    let startGameCountdown = document.querySelector("#startGameCountdown");
    document.querySelector("#startBtn").style.display = "none";
    startGameCountdown.style.display = "block";
    
    progressBar.value = 0;
    
    let countdownValue = 3;
    let countdownInterval = setInterval(countdown, 1000); 

    startGameCountdown.innerText = countdownValue;

    function countdown() {
        countdownValue--;
        startGameCountdown.innerText = countdownValue;

        if (countdownValue === 0) {
            clearInterval(countdownInterval);
            startGameCountdown.style.display = "none";
            document.querySelector("#progressGame").style.display = "flex"; 

            startProgressTimer();
        }
    }
}

function startProgressTimer() {
    let progressBar = document.querySelector("#motorProgress");
    let timerValue = 5;
    let timerInterval = setInterval(progressCountdown, 1000);

    function progressCountdown() {
        timerValue--;
        document.querySelector("#progressCountdown").innerText = timerValue

        if (progressBar.value >= progressBar.max) {
            clearInterval(timerInterval);
            youWon()
            return; 
        }

        if (timerValue === 0) {
            clearInterval(timerInterval);
            gameOver() 
            return;
        }

    }
}

function gameOver(){
    document.querySelector("#gameOver").style.display = "block"
    document.querySelector("#menu").style.display = "none"
    document.querySelector("#progressGame").style.display = "none"; 

    let buttons = document.querySelectorAll("button");
    buttons.forEach(button => button.disabled = true);


    setTimeout(() => {
        buttons.forEach(button => button.disabled = false);
    }, 1000);
}

function youWon(){
    document.querySelector("#progressGame").style.display = "none";
    document.querySelector("#menu").style.display = "none"
    document.querySelector("#youWon").style.display = "block" 

    let buttons = document.querySelectorAll("button");
    buttons.forEach(button => button.disabled = true);


    setTimeout(() => {
        buttons.forEach(button => button.disabled = false);
    }, 1000);
}

function help(){
    document.querySelector("#gameOver").style.display = "none"
    document.querySelector("#help").style.display = "block"

    let buttons = document.querySelectorAll("button");
    buttons.forEach(button => button.disabled = true);


    setTimeout(() => {
        buttons.forEach(button => button.disabled = false);
    }, 1000);
}

function beg(){
    document.querySelector("#elf").style.display = "flex"
    document.querySelector("#begBtn").innerHTML = "<a href='https://julekalender2024.w3spaces.com/Sluttside/Sluttside.html'><button>Til sluttskjermen</button></a>"

    let buttons = document.querySelectorAll("button");
    buttons.forEach(button => button.disabled = true);


    setTimeout(() => {
        buttons.forEach(button => button.disabled = false);
    }, 1000);
}