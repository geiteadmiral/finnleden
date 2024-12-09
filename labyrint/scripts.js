//definier de ulike sidene------------------------
let mazeContainerEl = document.querySelector("#mazeContainer");
let menuPageEl = document.querySelector("#menu");
let shortBreakEl = document.querySelector("#shortBreak");
let gameOverEl = document.querySelector("#gameOver");
let youWonEl = document.querySelector("#youWon");
let revolutionEl = document.querySelector("#revolution");

//definer de ulike elementene i labyrint-spillet ----------------
let playerEl = document.querySelector("#player");
let timerEl = document.querySelector("#timer");
let mazeEl = document.querySelector("#maze");
let controllers = document.querySelectorAll(".controller")


//definer de ulike variablene i spillet -----------------
let gridSize = 15;
let position = {x: 1, y: 1};
let timer;
let haveRested = false;
let timeLeft = 30;
let held = false;

//lag labyrinten -----------------------------------
let mazeGrid = [
    [0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
    [0, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 1, 0],
    [0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0],
    [0, 1, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0],
    [0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0],
    [0, 1, 0, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 0],
    [0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0],
    [0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
    [0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
    [0, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0],
    [0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0],
    [0, 1, 0, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 0],
    [0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0],
    [0, 1, 0, 1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1],
    [0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0],
];

//lag en wall div hver gang det er et 1-tall i mazeGrid med grid-postiosjonen til tallet
function createMaze() {
    mazeGrid.forEach((row, rowIndex) => {
        row.forEach((cell, colIndex) => {
            if (cell === 1) {
                let wall = document.createElement("div");
                wall.classList.add("wall");
                wall.style.gridColumn = colIndex + 1;
                wall.style.gridRow = rowIndex + 1;
                mazeEl.appendChild(wall);
            }
        });
    });
}

createMaze();


//start spiillet funksjon -------------------------------------------
function startGame() {
    //flytt spillerens posisjon til øvre venstre hjørne
    position = { x: 1, y: 1 }; 
    playerEl.style.gridColumn = position.x;
    playerEl.style.gridRow = position.y;

    //vis labyrinten
    mazeContainerEl.style.display = "flex";
    menuPageEl.style.display = "none";
    shortBreakEl.style.display = "none";
    gameOverEl.style.display = "none";
    revolutionEl.style.display = "none";

    //bestem hvor lang tid man har på labyrinten avhengig av om man har hvilt
    if (haveRested) {
        timeLeft = 15;
    } else {
        timeLeft = 30;
    }

    //tell ned hvert sekund
    timer = setInterval(countdown, 1000);

    function countdown() {
        //stopp timeren og vis game over skjermen om tiden blir 0
        if (timeLeft === 0) {
            clearInterval(timer);
            gameOver();
        } else {
            timerEl.innerHTML = timeLeft + " sekunder igjen!";
            timeLeft--;
        }
    }
}

//Beveg spilleren ------------------------------------
function movePlayer(x, y) {
    const newX = position.x + x;
    const newY = position.y + y;

    //om man er innenfor labyrinten og det ikke er en vegg der
    if (
        newX >= 1 &&
        newX <= gridSize &&
        newY >= 1 &&
        newY <= gridSize &&
        mazeGrid[newY - 1][newX - 1] === 0 //om posisjonen er 0 i mazeGrid er det ikke en vegg
    ) { //flytt posisjonen til spilleren til den nye posisjonen
        position.x = newX;
        position.y = newY;
        playerEl.style.gridColumn = position.x;
        playerEl.style.gridRow = position.y;

        //om man kommer til det nedre høyre hjørnet av labyrinten vinner man
        if (position.x === gridSize && position.y === gridSize) {
            youWon()
        }
    }
}

//flytt spilleren avhengig av hvilken piltast man trykker på
document.addEventListener("keydown", (event) => {
    if (event.key === "ArrowUp") {
        movePlayer(0, -1);
    } else if (event.key === "ArrowDown") {
        movePlayer(0, 1);
    } else if (event.key === "ArrowLeft") {
        movePlayer(-1, 0);
    } else if (event.key === "ArrowRight") {
        movePlayer(1, 0);
    }
});


//flytt spilleren om man trykker på knappene på skjermen
document.querySelector("#up").addEventListener("click", () => movePlayer(0, -1));
document.querySelector("#down").addEventListener("click", () => movePlayer(0, 1));
document.querySelector("#left").addEventListener("click", () => movePlayer(-1, 0));
document.querySelector("#right").addEventListener("click", () => movePlayer(1, 0));


//vis og skjul de ulike delene --------------------------

//skjuler automatisk alle elementer bortsett fra en man velger å vise
function showScreen(elementId, displayType) {
    const elements = [
        mazeContainerEl,
        menuPageEl,
        shortBreakEl,
        gameOverEl,
        revolutionEl
    ];

    elements.forEach(el => el.style.display = "none");

    let element = document.getElementById(elementId)

    element.style.display = displayType;

    //hindre at man med et uhell trykker på knappen når skjermen skifter
    let buttons = document.querySelectorAll("button");
    buttons.forEach(button => button.disabled = true);

    setTimeout(() => {
        buttons.forEach(button => button.disabled = false);
    }, 500);
}


function gameOver() {
    showScreen("gameOver", "block")
}

function shortBreak() {
    haveRested = true; 
    showScreen("shortBreak", "block")
}

function revolution(button) {
    button.style.display = "none";
    showScreen("revolution", "block")
}

function timeTravel() {
    haveRested = false //resett hvilen når man bruker tidsmaskinen
    showScreen("menu", "block")
}

function youWon(){
    clearInterval(timer); //stopp timeren
    showScreen("youWon", "block")
}
