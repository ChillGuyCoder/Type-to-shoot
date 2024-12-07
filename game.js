const words = ["apple", "banana", "cherry", "orange", "grape", "pineapple", "strawberry", "blueberry"];
let currentWord = "";
let score = 0;
let gameActive = false;
let timeLeft = 30;
let timerInterval;

const wordDisplay = document.getElementById("wordDisplay");
const inputField = document.getElementById("inputField");
const scoreDisplay = document.getElementById("score");
const timerDisplay = document.getElementById("timer");
const startButton = document.getElementById("startButton");

function getRandomWord() {
    return words[Math.floor(Math.random() * words.length)];
}

function startGame() {
    score = 0;
    timeLeft = 30; // Reset timer
    scoreDisplay.textContent = score;
    timerDisplay.textContent = timeLeft;
    gameActive = true;
    inputField.disabled = false;
    inputField.value = "";
    inputField.focus();
    nextWord();
    startTimer();
    startButton.textContent = "Restart Game";
}

function nextWord() {
    currentWord = getRandomWord();
    wordDisplay.textContent = currentWord;
}

function startTimer() {
    timerInterval = setInterval(function() {
        timeLeft--;
        timerDisplay.textContent = timeLeft;

        if (timeLeft <= 0) {
            endGame();
        }
    }, 1000); // Decrease time every second
}

function endGame() {
    clearInterval(timerInterval); // Stop the timer when the game ends
    gameActive = false;
    inputField.disabled = true;
    wordDisplay.textContent = "Game Over! Time's Up!";
}

inputField.addEventListener("input", () => {
    if (!gameActive) return;

    const typedWord = inputField.value;

    if (typedWord === currentWord) {
        score += 10;
        scoreDisplay.textContent = score;
        nextWord();
        inputField.value = "";
    }
});

startButton.addEventListener("click", () => {
    if (!gameActive) {
        startGame();
    } else {
        endGame(); // End game if it's already active and button is clicked again
    }
});
