const startButton = document.querySelector(".start-button");
const timerDisplay = document.querySelector(".timer-display");
const pauseButton = document.querySelector(".pause-button");
const buddyDisplay = document.querySelector(".buddy-state");
let focusDuration = 25;
let isFocusActive = false;
let timerInterval = null;
// Buddy states: ready, focusing, completed, missed
let buddyState = "ready";
function formatTime(totalSeconds) {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;

    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}

function startTimer() {
    let remainingSeconds = focusDuration * 60;

    timerInterval = setInterval(function () {
        remainingSeconds = remainingSeconds - 1;
        timerDisplay.textContent = formatTime(remainingSeconds);
    }, 1000);
}

startButton.addEventListener("click", function () {
    if (isFocusActive === false) {
        isFocusActive = true;
        buddyState = "focusing";
        buddyDisplay.textContent = "😤 Buddy is focusing";
        startButton.textContent = "Focus Started";
        startTimer();
    }
});
pauseButton.addEventListener("click", function () {
    clearInterval(timerInterval);
    isFocusActive = false;
    startButton.textContent = "Start Focus";
});