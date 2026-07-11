// ==========================================
// 要素の取得
// ==========================================
const hoursEl = document.getElementById('hours');
const minutesEl = document.getElementById('minutes');
const secondsEl = document.getElementById('seconds');
const millisecondsEl = document.getElementById('milliseconds');

const startBtn = document.getElementById('btn-start');
const stopBtn = document.getElementById('btn-stop');
const resetBtn = document.getElementById('btn-reset');

// ==========================================
// 状態管理用の変数
// ==========================================
let elapsedSeconds = 0;   // これまでの経過秒数（1秒単位）
let timerId = null;       // setInterval() の戻り値（タイマーの識別子）
let isRunning = false;    // 計測中かどうかのフラグ

// ==========================================
// 表示を更新する関数
// ==========================================
function updateDisplay() {
  const hours = Math.floor(elapsedSeconds / 3600);
  const minutes = Math.floor((elapsedSeconds % 3600) / 60);
  const seconds = elapsedSeconds % 60;

  hoursEl.textContent = hours;
  minutesEl.textContent = minutes;
  secondsEl.textContent = seconds;
  // 1秒単位での計測のため、ミリ秒は常に0として表示する
  millisecondsEl.textContent = 0;
}

// ==========================================
// ボタンの活性・非活性を切り替える関数
// ==========================================
function setButtonState(state) {
  // state: 'idle'(初期状態) / 'running'(計測中) / 'paused'(停止中)
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

// ==========================================
// スタートボタンの処理
// ==========================================
function handleStart() {
  // 既に計測中の場合は何もしない（2回連続押下防止）
  if (isRunning) return;

  isRunning = true;
  setButtonState('running'); // ボタン操作直後にすぐ非活性化する

  // 1秒（1000ミリ秒）ごとに経過秒数を1増やし、表示を更新する
  timerId = setInterval(() => {
    elapsedSeconds++;
    updateDisplay();
  }, 1000);
}

// ==========================================
// ストップボタンの処理
// ==========================================
function handleStop() {
  // 計測中でない場合は何もしない（2回連続押下防止）
  if (!isRunning) return;

  isRunning = false;
  clearInterval(timerId); // setInterval() を停止する
  timerId = null;

  setButtonState('paused');
}

// ==========================================
// リセットボタンの処理
// ==========================================
function handleReset() {
  // 計測中はリセットできない仕様のため、
  // 万が一呼ばれても計測中なら何もしない
  if (isRunning) return;

  elapsedSeconds = 0;
  updateDisplay();

  setButtonState('idle');
}

// ==========================================
// イベントリスナーの登録
// ==========================================
startBtn.addEventListener('click', handleStart);
stopBtn.addEventListener('click', handleStop);
resetBtn.addEventListener('click', handleReset);

// ==========================================
// 初期表示
// ==========================================
updateDisplay();
setButtonState('idle');