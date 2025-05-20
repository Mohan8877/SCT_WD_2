let startTime = 0;
let elapsedTime = 0;
let timerInterval = null;
let isRunning = false;

const display = document.getElementById("display");
const lapList = document.getElementById("laps");

function formatTime(ms) {
  const date = new Date(ms);
  return date.toISOString().substr(11, 12);
}

function updateTime() {
  elapsedTime = Date.now() - startTime;
  display.textContent = formatTime(elapsedTime);
}

document.getElementById("start").addEventListener("click", () => {
  if (!isRunning) {
    startTime = Date.now();
    timerInterval = setInterval(updateTime, 10);
    isRunning = true;
  }
});


document.getElementById("pause").addEventListener("click", () => {
  if (isRunning) {
    clearInterval(timerInterval);
    elapsedTime = Date.now() - startTime;
    isRunning = false;
  }
});


document.getElementById("resume").addEventListener("click", () => {
  if (!isRunning && elapsedTime !== 0) {
    startTime = Date.now() - elapsedTime;
    timerInterval = setInterval(updateTime, 10);
    isRunning = true;
  }
});

document.getElementById("reset").addEventListener("click", () => {
  clearInterval(timerInterval);
  elapsedTime = 0;
  startTime = 0;
  isRunning = false;
  display.textContent = "00:00:00.000";
  lapList.innerHTML = "";
});


document.getElementById("lap").addEventListener("click", () => {
  if (isRunning) {
    const li = document.createElement("li");
    li.textContent = `Lap: ${formatTime(elapsedTime)}`;
    lapList.appendChild(li);
  }
});
