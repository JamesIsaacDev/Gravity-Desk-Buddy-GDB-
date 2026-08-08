const startButton = document.querySelector(".start-button");
const timerDisplay = document.querySelector(".timer-display");

let focusDuration = 25;
let isFocusActive = false;

function formatTime(totalSeconds) {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;

    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}

function startTimer() {
    let remainingSeconds = focusDuration * 60;

    setInterval(function () {
        remainingSeconds = remainingSeconds - 1;
        timerDisplay.textContent = formatTime(remainingSeconds);
    }, 1000);
}

startButton.addEventListener("click", function () {
    if (isFocusActive === false) {
        isFocusActive = true;
        startButton.textContent = "Focus Started";
        startTimer();
    }
});