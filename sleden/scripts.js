let gameStarted = false;
let progressBar = document.querySelector("#motorProgress");

function changeProgress(){
    progressBar.value += 4;
}

function startGame() {
    document.querySelector("#gameOver").style.display = "none"
    document.querySelector("#menu").style.display = "block"
    document.querySelector("#deer").style.display = "none";
    document.querySelector("#helpBtn").style.display = "none"

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
    document.querySelector("#menu").style.display = "none"
    document.querySelector("#help").style.display = "block"

    let buttons = document.querySelectorAll("button");
    buttons.forEach(button => button.disabled = true);


    setTimeout(() => {
        buttons.forEach(button => button.disabled = false);
    }, 500);
}

function beg(){
    let input = document.querySelector("#helpInput")

    function getRandom (list) {
        return list[Math.floor((Math.random()*list.length))];
      }

    let elfAnswerList = ["Jeg liker ikke måten du snakker til meg på. Hvorfor tråkker du alltid på meg? Prøv igjen.",
        "Spør meg igjen. Med respekt. Jeg er så lei.", 
        "Lærte du ikke hva det magiske ordet er i barnehagen? Spør meg igjen.",
        "Jeg kommer til å gråte. Seriøst. Jeg kan gjøre hva som helst for deg, men spør meg hyggelig.",
        "Over mitt lik om du ikke spør meg på en hyggelig måte.",
        "Er det sånn man snakker med en liten alv? Tror ikke det, nei."]

    if (input.value.toLowerCase().includes("snill") || input.value.toLowerCase().includes("takk") || input.value.toLowerCase().includes("please") || input.value.toLowerCase().includes("pls") || input.value.toLowerCase().includes("plis"))  {
        document.querySelector("#elf").style.display = "flex"
        document.querySelector("#elfAnswer").innerHTML = "Selvfølgelig, store leder. <br> <br> <em>trykker på knappen</em>"
        document.querySelector("#begBtn").innerHTML = "<a href='/sluttside'><button>Til sluttskjermen</button></a>"
    } else {
        document.querySelector("#elf").style.display = "flex"
        document.querySelector("#elfAnswer").innerText = getRandom(elfAnswerList)
    }

    //hindre klikking ved et uhell før man har hatt mulighet til å lese teksten 
    let buttons = document.querySelectorAll("button");
    buttons.forEach(button => button.disabled = true);


    setTimeout(() => {
        buttons.forEach(button => button.disabled = false);
    }, 500);

    
}

