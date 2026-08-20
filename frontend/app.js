const startButton = document.querySelector(".start-button");
const timerDisplay = document.querySelector(".timer-display");
const pauseButton = document.querySelector(".pause-button");
const buddyDisplay = document.querySelector(".buddy-state");
const streakDisplay = document.querySelector(".streak-display");
let focusDuration = 25;
let isFocusActive = false;
let timerInterval = null;
// Buddy states: ready, focusing, completed, missed
let buddyState = "ready";
let streakCount = 0;
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

  if (remainingSeconds === 0) {
    clearInterval(timerInterval);
    isFocusActive = false;
    buddyState = "completed";
    streakCount++;
    streakDisplay.textContent = `🔥 Streak: ${streakCount}`;
    buddyDisplay.textContent = "🎉 Buddy completed the focus session!";
    startButton.textContent = "Start Focus";
}
}, 1000);
}
startButton.addEventListener("click", function () {
    if (isFocusActive === false) {
        isFocusActive = true;
        buddyState = "focusing";
        buddyDisplay.textContent = "😤 Buddy is focusing";
        startButton.textContent = "Focus Started";
        startTimer();
        fetch("http://localhost:3000/health")
        .then(function (response) {
            return response.text();
        })
        .then(function (data) {
            console.log(data);
        });
    }
});
pauseButton.addEventListener("click", function () {
    clearInterval(timerInterval);
    isFocusActive = false;
    buddyState = "ready";
    buddyDisplay.textContent = "😌 Buddy is ready";
    startButton.textContent = "Start Focus";
});