const startButton = document.querySelector(".start-button");

let focusDuration = 25;
let isFocusActive = false;

startButton.addEventListener("click", function () {
    startButton.textContent = "Focus Started";
});