const testWrapper = document.querySelector(".test-wrapper");
const testArea = document.querySelector("#test-area");
const givenText = document.querySelector("#given-text p").innerHTML;
const resetButton = document.querySelector("#reset");
const theTimer = document.querySelector(".timer");

var timer = [0,0,0,0];
var interval;
var timerRunning = false;

function leadingZero(time) {
    if (time <= 9) {
        time = "0" + time;
    }
    return time;
}

function runTimer() {
    let currentTime = leadingZero(timer[0]) + ":" + leadingZero(timer[1]) + ":" + leadingZero(timer[2]);
    theTimer.innerHTML = currentTime;
    timer[3]++;

    timer[0] = Math.floor((timer[3]/100)/60);
    timer[1] = Math.floor((timer[3]/100) - (timer[0] * 60));
    timer[2] = Math.floor(timer[3] - (timer[1] * 100) - (timer[0] * 6000));
}

function spellCheck() {
    let textEntered = testArea.value;
    let givenTextMatch = givenText.substring(0,textEntered.length);

    if (textEntered == givenText) {
        clearInterval(interval);
        testWrapper.style.borderColor = "#16ffbd";
    } else {
        if (textEntered == givenTextMatch) {
            testWrapper.style.borderColor = "#65CCf3";
        } else {
            testWrapper.style.borderColor = "#E95D0F";
        }
    }

}

// Start the timer:
function start() {
    let textEnterdLength = testArea.value.length;
    if (textEnterdLength === 0 && !timerRunning) {
        timerRunning = true;
        interval = setInterval(runTimer, 10);
    }
    console.log(textEnterdLength);
}

// Reset everything:
function reset() {
    clearInterval(interval);
    interval = null;
    timer = [0,0,0,0];
    timerRunning = false;

    testArea.value = "";
    theTimer.innerHTML = "00:00:00";
    testWrapper.style.borderColor = "grey";
}

// Event listeners 
testArea.addEventListener("keypress", start, false);
testArea.addEventListener("keyup", spellCheck, false);
resetButton.addEventListener("click", reset, false);
