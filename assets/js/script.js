// assets/js/script.js (UPDATED)
// audio
const soundTrue = new Audio('assets/audio/true.mp3');
const soundFalse = new Audio('assets/audio/false.mp3');
const soundWin = new Audio('assets/audio/win.mp3');
const bgMusicBat = document.getElementById('bgMusicBat');
const bgMusicBell = document.getElementById('bgMusicBell');
const soundClick = new Audio('assets/audio/click.mp3');
const bgMusicWolf = document.getElementById('bgMusicWolf');
const bgMusicThunder = document.getElementById('bgMusicThunder');

let totalSteps = 5, stepPx = 30;
let leftSteps = 0, rightSteps = 0, gameOver = false;
let leftQ, rightQ;
let currentPlayer = 'left';
let timeLeft = 10, timerInterval = null;
let rangeMin = 1, rangeMax = 10;
let currentMode = '';
let isTransitioning = false;

// AI opponent settings
let aiDifficulty = 'normal'; // easy, normal, hard
let aiTimeout = null;
let aiTypingTimeout = null;

const aiSettings = {
  easy: { accuracy: 0.4, minDelay: 1000, maxDelay: 1500 },
  normal: { accuracy: 0.7, minDelay: 800, maxDelay: 1300 },
  hard: { accuracy: 0.95, minDelay: 600, maxDelay: 1000 }
};

// DOM elements
const rope = document.getElementById('rope'); // the animated sprite element
const ropeWrap = document.querySelector('.rope-wrap'); // wrapper used for translateX
const gameMsg = document.getElementById('gameMsg');
const leftDots = document.getElementById('leftDots');
const rightDots = document.getElementById('rightDots');
const qLeft = document.getElementById('qLeft');
const qRight = document.getElementById('qRight');
const inputLeft = document.getElementById('inputLeft');
const inputRight = document.getElementById('inputRight');
const padLeft = document.getElementById('padLeft');
const padRight = document.getElementById('padRight');
const timerLeft = document.getElementById('timerLeft');
const timerRight = document.getElementById('timerRight');
const gameTitle = document.getElementById('gameTitle');
const homePage = document.getElementById('homePage');
const gamePage = document.getElementById('gamePage');

function rand(a, b) { return Math.floor(Math.random() * (b - a + 1)) + a; }

function genMixedQ(min, max) {
  const ops = ['+', '-', '×', '÷'];
  const opCount = 2;
  const nums = [];
  const usedOps = [];

  for (let i = 0; i < opCount + 1; i++) nums.push(rand(min, max));
  for (let i = 0; i < opCount; i++) usedOps.push(ops[rand(0, 3)]);

  for (let i = 0; i < usedOps.length; i++) {
    if (usedOps[i] === '÷') {
      let a = nums[i];
      let validDiv = [];
      for (let d = min; d <= max; d++) if (d !== 0 && a % d === 0) validDiv.push(d);
      nums[i + 1] = validDiv.length ? validDiv[rand(0, validDiv.length - 1)] : 1;
    }
  }

  let exprStr = '';
  for (let i = 0; i < nums.length; i++) {
    exprStr += nums[i];
    if (i < usedOps.length) exprStr += ' ' + usedOps[i] + ' ';
  }

  const jsExpr = exprStr.replace(/×/g, '*').replace(/÷/g, '/');
  let ans;
  try { ans = eval(jsExpr); } catch { return genMixedQ(min, max); }
  if (!Number.isFinite(ans) || ans % 1 !== 0 || Math.abs(ans) > 999) return genMixedQ(min, max);
  return { text: exprStr + ' = ?', ans };
}

function createPad(container, inputEl, submitFn) {
  container.innerHTML = '';
  const keys = ['1', '2', '3', '4', '5', '6', '7', '8', '9', 'C', '0', 'GO'];
  keys.forEach(k => {
    const el = document.createElement('div');
    el.className = 'key';
    if (k === 'C') el.classList.add('orange');
    if (k === 'GO') el.classList.add('tosca');
    el.textContent = k;
    el.onclick = () => {
      if (inputEl.disabled || gameOver) return;
      if (k === 'C') inputEl.value = '';
      else if (k === 'GO') submitFn();
      else inputEl.value += k;
    };
    container.appendChild(el);
  });
}

// Render dots
function renderDots() {
  leftDots.innerHTML = '';
  rightDots.innerHTML = '';

  for (let i = 0; i < totalSteps; i++) {
    const d = document.createElement('div');
    d.className = 'step-dot' + (i < leftSteps ? ' active' : '');
    leftDots.appendChild(d);
  }

  for (let i = 0; i < totalSteps; i++) {
    const d = document.createElement('div');
    d.className = 'step-dot' + (i < rightSteps ? ' active' : '');
    rightDots.appendChild(d);
  }
}

// Update rope/character position
function updateRope() {
  // offset: positive -> move RIGHT, negative -> move LEFT
  const offset = (rightSteps - leftSteps) * stepPx;

  console.log('=== ROPE ANIMATION UPDATE ===');
  console.log('Left Steps:', leftSteps);
  console.log('Right Steps:', rightSteps);
  console.log('Step Difference:', rightSteps - leftSteps);
  console.log('Movement:', offset, 'px', offset > 0 ? '(RIGHT →)' : offset < 0 ? '(← LEFT)' : '(CENTER)');
  console.log('Rope element exists:', !!rope, 'RopeWrap exists:', !!ropeWrap);

  // Apply transform on wrapper (not on the .rope which has transform animation)
  if (ropeWrap) {
    ropeWrap.style.transform = `translateX(${offset}px)`;
    console.log('✅ Applied transform on ropeWrap:', ropeWrap.style.transform);

    // Add a "moving" visual effect to the .rope (so animation intensity still visible)
    if (rope) {
      rope.classList.add('moving');
      setTimeout(() => {
        rope.classList.remove('moving');
      }, 600);
    }
  } else if (rope) {
    // fallback: if wrapper missing, try applying to rope (may be overridden by animation)
    rope.style.transform = `translateX(${offset}px)`;
    console.log('⚠️ ropeWrap not found, applied transform on rope (may be overridden):', rope.style.transform);
    rope.classList.add('moving');
    setTimeout(() => rope.classList.remove('moving'), 600);
  } else {
    console.error('❌ Neither ropeWrap nor rope found!');
  }

  renderDots();
}

function newQuestions() {
  leftQ = genMixedQ(rangeMin, rangeMax);
  rightQ = genMixedQ(rangeMin, rangeMax);
  qLeft.textContent = leftQ.text;
  qRight.textContent = rightQ.text;
  inputLeft.value = '';
  inputRight.value = '';
}

function startTurn(player) {
  if (gameOver || isTransitioning) return;
  clearInterval(timerInterval);
  currentPlayer = player;
  timeLeft = 10;

  timerLeft.textContent = "⏳";
  timerRight.textContent = "⏳";

  inputLeft.disabled = player !== 'left';
  inputRight.disabled = player !== 'right';

  const spookyMessages = {
    left: ['👻 Left Spirit Awakens!', '🎃 Left Pumpkin\'s Turn!', '🧙‍♀️ Left Witch Casts!'],
    right: ['💀 Right Skeleton Rises!', '😈 Right Demon Strikes!', '🦇 Right Bat Swoops!']
  };

  const messages = spookyMessages[player];
  gameMsg.textContent = messages[Math.floor(Math.random() * messages.length)];

  if(player === 'left') {
    setTimeout(() => inputLeft.focus(), 100);
  } else {
    // Start AI opponent for right player
    startAITurn();
  }

  timerInterval = setInterval(() => {
    timeLeft--;
    const tEl = player === 'left' ? timerLeft : timerRight;
    tEl.textContent = `⏳ ${timeLeft}s`;

    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      soundFalse.play();

      const timeoutMessages = [
        '⏰ Time\'s Ghostly Grip Claims You!',
        '🕰️ The Witching Hour Strikes!',
        '⌛ Sands of Doom Have Fallen!'
      ];
      gameMsg.textContent = timeoutMessages[Math.floor(Math.random() * timeoutMessages.length)];

      if (player === 'left') {
        // LEFT TIMEOUT -> move RIGHT
        rightSteps = Math.min(rightSteps + 1, totalSteps);
        console.log('⏰ LEFT TIMEOUT! Right +1 → char moves RIGHT 30px');
      } else {
        // RIGHT TIMEOUT -> move LEFT
        leftSteps = Math.min(leftSteps + 1, totalSteps);
        console.log('⏰ RIGHT TIMEOUT! Left +1 → char moves LEFT 30px');
      }

      updateRope();
      checkWinnerOrContinue(player);
    }
  }, 1000);
}

function switchTurn(next) {
  if (gameOver) return;
  isTransitioning = true;
  clearInterval(timerInterval);
  newQuestions();
  updateRope();
  setTimeout(() => { isTransitioning = false; startTurn(next); }, 400);
}

function submitLeft() {
  if (gameOver || currentPlayer !== 'left') return;
  clearInterval(timerInterval);
  inputLeft.disabled = true;
  const v = Number(inputLeft.value);

  console.log('=== LEFT PLAYER SUBMITTED ===');
  console.log('Answer:', v, 'Correct:', leftQ.ans);

  if (v === leftQ.ans) {
    // LEFT CORRECT -> move LEFT
    leftSteps = Math.min(leftSteps + 1, totalSteps);
    console.log('✅ LEFT CORRECT! Left +1 → char moves LEFT 30px');

    const successMessages = ['👻 Spectral Success!', '🎃 Pumpkin Power!', '✨ Magical Mastery!'];
    gameMsg.textContent = successMessages[Math.floor(Math.random() * successMessages.length)];
    soundTrue.play();
  } else {
    // LEFT WRONG -> move RIGHT
    rightSteps = Math.min(rightSteps + 1, totalSteps);
    console.log('❌ LEFT WRONG! Right +1 → char moves RIGHT 30px');

    const failMessages = ['💀 Bone-chilling Blunder!', '🕷️ Spidery Slip-up!', '🦇 Batty Mistake!'];
    gameMsg.textContent = failMessages[Math.floor(Math.random() * failMessages.length)];
    soundFalse.play();
  }

  updateRope();
  checkWinnerOrContinue('left');
}

function submitRight() {
  if (gameOver || currentPlayer !== 'right') return;
  clearInterval(timerInterval);
  inputRight.disabled = true;
  const v = Number(inputRight.value);

  console.log('=== RIGHT PLAYER SUBMITTED ===');
  console.log('Answer:', v, 'Correct:', rightQ.ans);

  if (v === rightQ.ans) {
    // RIGHT CORRECT -> move RIGHT
    rightSteps = Math.min(rightSteps + 1, totalSteps);
    console.log('✅ RIGHT CORRECT! Right +1 → char moves RIGHT 30px');

    const successMessages = ['😈 Demonic Dominance!', '🔮 Crystal Clear!', '⚡ Lightning Logic!'];
    gameMsg.textContent = successMessages[Math.floor(Math.random() * successMessages.length)];
    soundTrue.play();
  } else {
    // RIGHT WRONG -> move LEFT
    leftSteps = Math.min(leftSteps + 1, totalSteps);
    console.log('❌ RIGHT WRONG! Left +1 → char moves LEFT 30px');

    const failMessages = ['🕸️ Caught in Web of Error!', '🌙 Moonlight Miscalculation!', '🍄 Mushroom Muddle!'];
    gameMsg.textContent = failMessages[Math.floor(Math.random() * failMessages.length)];
    soundFalse.play();
  }

  updateRope();
  checkWinnerOrContinue('right');
}

function checkWinnerOrContinue(from) {
  updateRope();
  if (leftSteps >= totalSteps) return win('Left');
  if (rightSteps >= totalSteps) return win('Right');
  switchTurn(from === 'left' ? 'right' : 'left');
}

function win(p) {
  clearInterval(timerInterval);
  gameOver = true;

  const victoryMessages = {
    Left: ['👻 LEFT SPIRITS TRIUMPH!', '🎃 PUMPKIN KINGDOM VICTORIOUS!', '🧙‍♀️ WITCHES REIGN SUPREME!'],
    Right: ['💀 RIGHT SKELETONS CONQUER!', '😈 DEMON REALM DOMINATES!', '🦇 BAT COLONY CLAIMS VICTORY!']
  };

  const messages = victoryMessages[p];
  gameMsg.textContent = messages[Math.floor(Math.random() * messages.length)];

  soundWin.play();
  document.body.classList.add('win');
  setTimeout(() => document.body.classList.remove('win'), 4000);
}

function startGame(mode, min, max) {
  console.log('=== STARTING GAME ===');
  console.log('Mode:', mode);

  rangeMin = min; rangeMax = max;
  totalSteps = (mode === 'Nightmare Blitz') ? 3 : 5;
  homePage.style.display = 'none';
  gamePage.style.display = 'flex';

  leftSteps = 0;
  rightSteps = 0;
  gameOver = false;

  gameTitle.textContent = ` ${mode.toUpperCase()} `;
  createPad(padLeft, inputLeft, submitLeft);
  createPad(padRight, inputRight, submitRight);

  // Initialize ropeWrap (center)
  if (ropeWrap) ropeWrap.style.transform = 'translateX(0px)';
  updateRope();

  newQuestions();
  startTurn('left');
}

function backToHome() {
  clearInterval(timerInterval);
  gamePage.style.display = 'none';
  homePage.style.display = 'flex';
  gameOver = false;
}

function restartGame() {
  console.log('=== RESTARTING GAME ===');

  clearInterval(timerInterval);

  leftSteps = 0;
  rightSteps = 0;
  gameOver = false;
  isTransitioning = false;

  console.log('Reset steps to 0');

  if (ropeWrap) ropeWrap.style.transform = 'translateX(0px)';
  updateRope();
  newQuestions();

  startTurn('left');
}

document.addEventListener('keydown', e => {
  if (e.key === 'Enter') {
    if (document.activeElement === inputLeft && !inputLeft.disabled) submitLeft();
    else if (document.activeElement === inputRight && !inputRight.disabled) submitRight();
  }
});

document.addEventListener('click', () => {
  if (bgMusicBat.paused) {
    bgMusicBat.volume = 1;
    bgMusicBat.play().catch(() => { });
  }
  if (bgMusicBell.paused) {
    bgMusicBell.volume = 0.6;
    bgMusicBell.play().catch(() => { });
  }
  if (bgMusicWolf.paused) {
    bgMusicWolf.volume = 0.2;
    bgMusicWolf.play().catch(() => { });
  }
});

// ketika audio selesai, beri jeda acak sebelum play lagi
bgMusicWolf.addEventListener('ended', () => {

  // jeda acak antara 1000 ms (1 detik) sampai 5000 ms (5 detik)
  const minDelay = 1000;
  const maxDelay = 5000;
  const randomDelay = Math.floor(Math.random() * (maxDelay - minDelay)) + minDelay;

  console.log("Jeda acak:", randomDelay, "ms");

  setTimeout(() => {
    bgMusicWolf.play().catch(() => {});
  }, randomDelay);

});
function playClick() {
  soundClick.currentTime = 0;
  soundClick.play().catch(() => { });
}

// Rain & lightning (kept as-is)
function createRain() {
  const rainContainer = document.getElementById('rainContainer');
  if (!rainContainer) return;
  for (let i = 0; i < 100; i++) {
    const drop = document.createElement('div');
    drop.className = 'rain-drop';
    drop.style.left = Math.random() * 100 + '%';
    const duration = 0.8 + Math.random() * 1.2;
    drop.style.animationDuration = duration + 's';
    drop.style.animationDelay = Math.random() * 2 + 's';
    drop.style.opacity = 0.4 + Math.random() * 0.4;
    rainContainer.appendChild(drop);
  }
}

function triggerLightning() {
  const lightningFlash = document.getElementById('lightningFlash');
  if (!lightningFlash) return;

  // Play thunder sound
  if (bgMusicThunder) {
    bgMusicThunder.currentTime = 0;   // reset biar bisa play berulang
    bgMusicThunder.volume = 0.8;        // atur volume jika perlu
    bgMusicThunder.play().catch(() => {});
  }

  lightningFlash.classList.add('flash');
  document.body.classList.add('lightning-active');

  setTimeout(() => {
    lightningFlash.classList.remove('flash');
    document.body.classList.remove('lightning-active');
  }, 500);
}

function startLightningCycle() {
  function scheduleLightning() {
    const nextStrike = 5000 + Math.random() * 7000;
    setTimeout(() => {
      triggerLightning();
      scheduleLightning();
    }, nextStrike);
  }
  scheduleLightning();
}

document.addEventListener('DOMContentLoaded', () => {
  createRain();
  setTimeout(() => startLightningCycle(), 3000);
});


// ========================================
// AI OPPONENT SYSTEM
// ========================================

// Set AI difficulty level
function setAIDifficulty(difficulty) {
  aiDifficulty = difficulty;
  console.log('AI Difficulty set to:', difficulty);
  
  // Update UI to show active selection
  document.querySelectorAll('.ai-btn').forEach(btn => {
    btn.classList.remove('active');
  });
  const selectedBtn = document.querySelector(`[data-difficulty="${difficulty}"]`);
  if(selectedBtn) {
    selectedBtn.classList.add('active');
  }
}

// Start AI turn - AI will answer automatically
function startAITurn() {
  if(gameOver || currentPlayer !== 'right') return;
  
  console.log('=== AI TURN STARTED ===');
  console.log('AI Difficulty:', aiDifficulty);
  
  const settings = aiSettings[aiDifficulty];
  const delay = rand(settings.minDelay, settings.maxDelay);
  
  console.log('AI will answer in', delay, 'ms');
  
  // Clear the input first
  inputRight.value = '';
  
  // Start typing animation after a short delay
  aiTypingTimeout = setTimeout(() => {
    simulateAITyping();
  }, 300);
  
  // Submit answer after the calculated delay
  aiTimeout = setTimeout(() => {
    submitAIAnswer();
  }, delay);
}

// Simulate AI typing the answer
function simulateAITyping() {
  if(gameOver || currentPlayer !== 'right') return;
  
  const settings = aiSettings[aiDifficulty];
  let answer;
  
  // Determine if AI will be correct based on difficulty
  const willBeCorrect = Math.random() < settings.accuracy;
  
  console.log('AI will answer:', willBeCorrect ? 'CORRECTLY' : 'INCORRECTLY');
  
  if(willBeCorrect) {
    answer = rightQ.ans;
  } else {
    // Generate a plausible wrong answer
    const correctAnswer = rightQ.ans;
    const variation = rand(1, Math.max(3, Math.abs(correctAnswer)));
    const operations = [
      () => correctAnswer + variation,
      () => correctAnswer - variation,
      () => Math.max(0, correctAnswer + rand(-10, 10)),
      () => rand(Math.max(0, correctAnswer - 20), correctAnswer + 20)
    ];
    answer = operations[rand(0, operations.length - 1)]();
    
    // Ensure it's different from correct answer
    if(answer === correctAnswer) {
      answer = correctAnswer + (Math.random() < 0.5 ? 1 : -1);
    }
  }
  
  // Animate typing the answer
  const answerStr = answer.toString();
  let currentIndex = 0;
  
  function typeNextDigit() {
    if(gameOver || currentPlayer !== 'right' || currentIndex >= answerStr.length) return;
    
    inputRight.value += answerStr[currentIndex];
    currentIndex++;
    
    if(currentIndex < answerStr.length) {
      setTimeout(typeNextDigit, rand(100, 200));
    }
  }
  
  typeNextDigit();
}

// Submit AI answer
function submitAIAnswer() {
  if(gameOver || currentPlayer !== 'right') return;
  
  console.log('AI submitting answer:', inputRight.value);
  
  // Use the existing submitRight function
  submitRight();
}

// Initialize AI difficulty on page load
document.addEventListener('DOMContentLoaded', () => {
  setAIDifficulty('normal');
});


// Back to home screen
function backToHome(){
  clearInterval(timerInterval);
  clearTimeout(aiTimeout);
  clearTimeout(aiTypingTimeout);
  gamePage.style.display='none';
  homePage.style.display='flex';
  gameOver=false;
}

// Restart current game
function restartGame(){
  console.log('=== RESTARTING GAME ===');
  
  // Clear any running timers
  clearInterval(timerInterval);
  clearTimeout(aiTimeout);
  clearTimeout(aiTypingTimeout);
  
  // Reset game state
  leftSteps=0; 
  rightSteps=0; 
  gameOver=false;
  isTransitioning=false;
  
  console.log('Reset steps to 0');
  
  // Reset the game board and rope position
  updateRope(); 
  newQuestions();
  
  // Restart the game with the same settings
  startTurn('left');
}
