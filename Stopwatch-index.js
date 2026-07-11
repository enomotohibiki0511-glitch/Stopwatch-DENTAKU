const hoursEl = document.getElementById('hours');
const minutesEl = document.getElementById('minutes');
const secondsEl = document.getElementById('seconds');
const millisecondsEl = document.getElementById('milliseconds');

const startBtn = document.getElementById('btn-start');
const stopBtn = document.getElementById('btn-stop');
const resetBtn = document.getElementById('btn-reset');


let elapsedSeconds = 0;   
let timerId = null;       
let isRunning = false;    


function updateDisplay() {
  const hours = Math.floor(elapsedSeconds / 3600);
  const minutes = Math.floor((elapsedSeconds % 3600) / 60);
  const seconds = elapsedSeconds % 60;

  hoursEl.textContent = hours;
  minutesEl.textContent = minutes;
  secondsEl.textContent = seconds;
  millisecondsEl.textContent = 0;
}


function setButtonState(state) {
  if (state === 'idle') {
    startBtn.disabled = false;
    stopBtn.disabled = true;
    resetBtn.disabled = true;
  } else if (state === 'running') {
    startBtn.disabled = true;
    stopBtn.disabled = false;
    resetBtn.disabled = true;
  } else if (state === 'paused') {
    startBtn.disabled = false;
    stopBtn.disabled = true;
    resetBtn.disabled = false;
  }
}

function handleStart() {
  if (isRunning) return;

  isRunning = true;
  setButtonState('running'); 

  timerId = setInterval(() => {
    elapsedSeconds++;
    updateDisplay();
  }, 1000);
}


function handleStop() {
  if (!isRunning) return;

  isRunning = false;
  clearInterval(timerId); 
  timerId = null;

  setButtonState('paused');
}


function handleReset() {
  if (isRunning) return;

  elapsedSeconds = 0;
  updateDisplay();

  setButtonState('idle');
}

startBtn.addEventListener('click', handleStart);
stopBtn.addEventListener('click', handleStop);
resetBtn.addEventListener('click', handleReset);


updateDisplay();
setButtonState('idle');
