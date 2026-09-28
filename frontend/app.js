const startButton = document.querySelector(".start-button");
const timerDisplay = document.querySelector(".timer-display");
const pauseButton = document.querySelector(".pause-button");
const buddyDisplay = document.querySelector(".buddy-state");
const streakDisplay = document.querySelector(".streak-display");
const resetButton = document.querySelector(".reset-button");
const journalInput = document.querySelector(".journal-input");
const journalSaveButton = document.querySelector(".journal-save-button");
const journalStatus = document.querySelector(".journal-status");

let focusDuration = 25;
let isFocusActive = false;
let timerInterval = null;
let remainingSeconds = focusDuration * 60;

// Temporary identity bridge.
// Later this will come from real authenticated user identity.
let currentUserId = 2;

let buddyState = "ready";
let streakCount = 0;
let currentSessionId = null;


function formatTime(totalSeconds) {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;

    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}


function startTimer() {
    timerInterval = setInterval(function () {
        remainingSeconds = remainingSeconds - 1;

        timerDisplay.textContent = formatTime(remainingSeconds);

        if (remainingSeconds === 0) {
            clearInterval(timerInterval);
            timerInterval = null;

            isFocusActive = false;
            startButton.textContent = "Start Focus";

            fetch(
                `https://gdb-kd21.onrender.com/focus-sessions/${currentSessionId}/complete`,
                {
                    method: "PATCH"
                }
            )
            .then(function (response) {
                if (!response.ok) {
                    throw new Error("Focus session completion failed");
                }

                return response.json();
            })
            .then(function (data) {
                buddyState = "completed";
                streakCount++;

                buddyDisplay.textContent =
                    "🎉 Buddy completed the focus session!";

                streakDisplay.textContent =
                    `🔥 Streak: ${streakCount}`;

                console.log("Completed session:", data);

                currentSessionId = null;
            })
            .catch(function (error) {
                console.error("Focus completion failed:", error);

                buddyState = "ready";
                buddyDisplay.textContent = "😌 Buddy is ready";
            });
        }
    }, 1000);
}


function resetTimer() {
    clearInterval(timerInterval);
    timerInterval = null;

    remainingSeconds = focusDuration * 60;
    timerDisplay.textContent = formatTime(remainingSeconds);

    isFocusActive = false;
    buddyState = "ready";

    buddyDisplay.textContent = "😌 Buddy is ready";
    startButton.textContent = "Start Focus";
}


startButton.addEventListener("click", function () {
    if (isFocusActive === true) {
        return;
    }

    isFocusActive = true;
    buddyState = "focusing";

    buddyDisplay.textContent = "😤 Buddy is focusing";
    startButton.textContent = "Focus Started";

    // If a session already exists, this is a resume.
    if (currentSessionId !== null) {
        startTimer();
        return;
    }

    // Otherwise create a new focus session.
    fetch("https://gdb-kd21.onrender.com/focus-sessions", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            userId: currentUserId,
            durationMinutes: focusDuration
        })
    })
    .then(function (response) {
        if (!response.ok) {
            throw new Error("Focus session creation failed");
        }

        return response.json();
    })
    .then(function (data) {
        currentSessionId = data.session_id;

        console.log("Current session ID:", currentSessionId);

        startTimer();
    })
    .catch(function (error) {
        console.error("Focus session creation failed:", error);

        isFocusActive = false;
        buddyState = "ready";

        buddyDisplay.textContent = "😌 Buddy is ready";
        startButton.textContent = "Start Focus";
    });
});


pauseButton.addEventListener("click", function () {
    clearInterval(timerInterval);
    timerInterval = null;

    isFocusActive = false;
    buddyState = "ready";

    buddyDisplay.textContent = "😌 Buddy is ready";
    startButton.textContent = "Start Focus";
});


resetButton.addEventListener("click", function () {
    resetTimer();
});
journalSaveButton.addEventListener("click", function () {
    const entryText = journalInput.value;

    if (!entryText) {
        journalStatus.textContent = "Write something first.";
        return;
    }

    fetch("http://localhost:3000/journal-entries", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            userId: currentUserId,
            entryText: entryText
        })
    })
    .then(function (response) {
        if (!response.ok) {
            throw new Error("Journal save failed");
        }

        return response.json();
    })
    .then(function (data) {
        journalStatus.textContent = "Reflection saved.";
        journalInput.value = "";

        console.log("Saved journal entry:", data);
    })
    .catch(function (error) {
        console.error("Journal save failed:", error);
        journalStatus.textContent = "Could not save reflection.";
    });
});