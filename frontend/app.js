const startButton = document.querySelector(".start-button");

let focusDuration = 25;
let isFocusActive = false;
function startTimer() {
    let remainingSeconds = focusDuration * 60;

    setInterval(function () {
        remainingSeconds = remainingSeconds - 1;
        console.log(remainingSeconds);
    }, 1000);
}
startButton.addEventListener("click", function () {
    startButton.textContent = "Focus Started";
    startTimer();
});