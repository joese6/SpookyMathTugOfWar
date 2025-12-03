---
inclusion: always
priority: critical
---

# Game Logic Steering - Spooky Math Tug of War

## Purpose
This steering document governs all game mechanics, state management, AI behavior, and mathematical question generation, ensuring fair, balanced, and engaging gameplay while maintaining code quality and performance.

## Scope of Influence
- Game state management
- Turn-based mechanics
- Question generation algorithm
- AI opponent behavior
- Scoring and win conditions
- Timer system
- Input validation
- State transitions

## Core Behavioral Rules

### 1. Game State Management (IMMUTABLE CORE)

**Global State Variables:**
```javascript
// Game Configuration
let totalSteps = 5;              // Win condition (5 or 3 for Nightmare)
let stepPx = 30;                 // Pixels per step movement
let rangeMin = 1;                // Question number range min
let rangeMax = 10;               // Question number range max
let currentMode = '';            // Game mode name

// Game State
let leftSteps = 0;               // Human player progress (0-5)
let rightSteps = 0;              // AI opponent progress (0-5)
let gameOver = false;            // Game ended flag
let isTransitioning = false;     // Turn switch in progress
let currentPlayer = 'left';      // Active player ('left' or 'right')

// Question State
let leftQ;                       // { text: string, ans: number }
let rightQ;                      // { text: string, ans: number }

// Timer State
let timeLeft = 10;               // Seconds remaining
let timerInterval = null;        // setInterval reference

// AI State
let aiDifficulty = 'normal';     // 'easy', 'normal', 'hard'
let aiTimeout = null;            // AI answer delay timer
let aiTypingTimeout = null;      // AI typing animation timer
```

**NEVER:**
- Modify state variables outside designated functions
- Allow negative step counts
- Allow steps to exceed totalSteps
- Skip state validation
- Mutate state during transitions

### 2. Question Generation Algorithm (CRITICAL)

**Generation Rules:**
```javascript
function genMixedQ(min, max) {
  // 1. Generate 3 random numbers in range
  const nums = [rand(min, max), rand(min, max), rand(min, max)];
  
  // 2. Select 2 random operations from ['+', '-', '×', '÷']
  const ops = ['+', '-', '×', '÷'];
  const usedOps = [ops[rand(0,3)], ops[rand(0,3)]];
  
  // 3. Handle division - ensure integer results
  for (let i = 0; i < usedOps.length; i++) {
    if (usedOps[i] === '÷') {
      let validDiv = [];
      for (let d = min; d <= max; d++) {
        if (d !== 0 && nums[i] % d === 0) validDiv.push(d);
      }
      nums[i + 1] = validDiv.length ? validDiv[rand(0, validDiv.length-1)] : 1;
    }
  }
  
  // 4. Build expression string
  const exprStr = `${nums[0]} ${usedOps[0]} ${nums[1]} ${usedOps[1]} ${nums[2]}`;
  
  // 5. Evaluate with JavaScript eval()
  const jsExpr = exprStr.replace(/×/g, '*').replace(/÷/g, '/');
  const ans = eval(jsExpr);
  
  // 6. Validate result
  if (!Number.isFinite(ans) || ans % 1 !== 0 || Math.abs(ans) > 999) {
    return genMixedQ(min, max); // Regenerate if invalid
  }
  
  return { text: exprStr + ' = ?', ans };
}
```

**Validation Requirements:**
- Answer must be finite number
- Answer must be integer (no decimals)
- Answer must be in range: -999 to 999
- Division must result in whole numbers
- Invalid questions regenerate recursively

**NEVER:**
- Generate questions with decimal answers
- Allow division by zero
- Generate answers outside -999 to 999
- Skip validation checks
- Use floating-point arithmetic without validation

### 3. AI Opponent System (BALANCED)

**AI Difficulty Configuration:**
```javascript
const aiSettings = {
  easy: { 
    accuracy: 0.4,      // 40% correct
    minDelay: 1000,     // 1 second min
    maxDelay: 1500      // 1.5 seconds max
  },
  normal: { 
    accuracy: 0.7,      // 70% correct
    minDelay: 800,      // 0.8 seconds min
    maxDelay: 1300      // 1.3 seconds max
  },
  hard: { 
    accuracy: 0.95,     // 95% correct
    minDelay: 600,      // 0.6 seconds min
    maxDelay: 1000      // 1 second max
  }
};
```

**AI Behavior Algorithm:**
```javascript
function simulateAITyping() {
  const settings = aiSettings[aiDifficulty];
  const willBeCorrect = Math.random() < settings.accuracy;
  
  let answer;
  if (willBeCorrect) {
    answer = rightQ.ans; // Correct answer
  } else {
    // Generate plausible wrong answer
    const correctAnswer = rightQ.ans;
    const variation = rand(1, Math.max(3, Math.abs(correctAnswer)));
    const operations = [
      () => correctAnswer + variation,
      () => correctAnswer - variation,
      () => Math.max(0, correctAnswer + rand(-10, 10)),
      () => rand(Math.max(0, correctAnswer - 20), correctAnswer + 20)
    ];
    answer = operations[rand(0, operations.length - 1)]();
    
    // Ensure different from correct
    if (answer === correctAnswer) {
      answer = correctAnswer + (Math.random() < 0.5 ? 1 : -1);
    }
  }
  
  // Type digit-by-digit (100-200ms per digit)
  const answerStr = answer.toString();
  let currentIndex = 0;
  
  function typeNextDigit() {
    if (currentIndex >= answerStr.length) return;
    inputRight.value += answerStr[currentIndex];
    currentIndex++;
    if (currentIndex < answerStr.length) {
      setTimeout(typeNextDigit, rand(100, 200));
    }
  }
  
  typeNextDigit();
}
```

**AI Balance Rules:**
- Easy: Challenging for beginners, makes frequent mistakes
- Normal: Balanced opponent, requires focus
- Hard: Very difficult, nearly perfect play
- Wrong answers must be plausible (not random)
- Response time varies realistically

**NEVER:**
- Make AI perfect (100% accuracy)
- Make AI instant (0ms delay)
- Generate random wrong answers (must be plausible)
- Allow AI to cheat (see correct answer after timeout)
- Skip typing animation

### 4. Scoring & Step Mechanics (IMMUTABLE)

**Step Change Rules:**
```javascript
// LEFT PLAYER ACTIONS:
// Correct: leftSteps++, character moves LEFT
// Wrong: rightSteps++, character moves RIGHT
// Timeout: rightSteps++, character moves RIGHT

// RIGHT PLAYER (AI) ACTIONS:
// Correct: rightSteps++, character moves RIGHT
// Wrong: leftSteps++, character moves LEFT
// Timeout: leftSteps++, character moves LEFT
```

**Character Movement Formula:**
```javascript
offset = (rightSteps - leftSteps) * 30px

// Examples:
// leftSteps=1, rightSteps=0 → offset = -30px (LEFT)
// leftSteps=0, rightSteps=1 → offset = +30px (RIGHT)
// leftSteps=2, rightSteps=3 → offset = +30px (RIGHT)
```

**Win Condition:**
```javascript
function checkWinnerOrContinue(from) {
  updateRope();
  if (leftSteps >= totalSteps) return win('Left');
  if (rightSteps >= totalSteps) return win('Right');
  switchTurn(from === 'left' ? 'right' : 'left');
}
```

**NEVER:**
- Change the 30px step size
- Allow steps to go negative
- Allow steps to exceed totalSteps
- Skip win condition check
- Modify step logic without updating character movement

### 5. Turn Management System

**Turn Flow:**
```javascript
startTurn(player) → 
  Set currentPlayer → 
  Enable/disable inputs → 
  Start 10s timer → 
  Wait for answer/timeout → 
  submitLeft/Right() → 
  Update steps → 
  updateRope() → 
  checkWinnerOrContinue() → 
  switchTurn(nextPlayer)
```

**Turn Switching:**
```javascript
function switchTurn(next) {
  if (gameOver) return;
  isTransitioning = true;
  clearInterval(timerInterval);
  newQuestions();
  updateRope();
  setTimeout(() => {
    isTransitioning = false;
    startTurn(next);
  }, 400); // 400ms transition delay
}
```

**Timer System:**
```javascript
function startTurn(player) {
  timeLeft = 10;
  timerInterval = setInterval(() => {
    timeLeft--;
    const tEl = player === 'left' ? timerLeft : timerRight;
    tEl.textContent = `⏳ ${timeLeft}s`;
    
    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      soundFalse.play();
      // Opponent gains step
      if (player === 'left') rightSteps++;
      else leftSteps++;
      updateRope();
      checkWinnerOrContinue(player);
    }
  }, 1000);
}
```

**NEVER:**
- Skip turn transitions
- Allow simultaneous turns
- Forget to clear timers
- Allow actions during transitions
- Skip question regeneration

## Forbidden Behaviors

### NEVER:
1. Modify core game state variables directly (use functions)
2. Skip input validation
3. Allow negative or excessive step counts
4. Generate invalid questions (decimals, infinity, NaN)
5. Make AI perfect or instant
6. Skip win condition checks
7. Allow actions during transitions
8. Forget to clear timers/timeouts
9. Mutate state without updating UI
10. Break the 30px step movement system

## Parameters Kiro May Adjust

### Safe to Modify:
- Timer duration (8-15 seconds acceptable)
- AI accuracy (±10% of original)
- AI response time (±300ms of original)
- Question validation ranges (±200 of current)
- Transition delay (300-600ms acceptable)
- Console logging verbosity

### Requires Approval:
- Step size (30px is core mechanic)
- Win condition (totalSteps)
- Question generation algorithm
- AI behavior patterns
- State management structure
- Turn flow logic

## Style/Vibe Guidelines

### Game Feel:
- **Fair:** Both players have equal opportunity
- **Balanced:** AI difficulty matches description
- **Responsive:** Immediate feedback to actions
- **Clear:** Game state always visible
- **Engaging:** Tension builds as steps increase
- **Spooky:** Messages maintain Halloween theme

### Difficulty Balance:
```
Easy AI (40%):    Beginner-friendly, frequent mistakes
Normal AI (70%):  Balanced challenge, requires focus
Hard AI (95%):    Expert challenge, nearly perfect

Question Ranges:
Ghostly Beginner (1-10):     Simple arithmetic
Pumpkin Apprentice (5-15):   Intermediate
Witch Master (10-20):        Advanced
Demon Lord (15-25):          Expert
Nightmare Blitz (1-25):      Fast-paced, wide range
```

## Examples

### When Modifying Game Logic:

**✅ CORRECT:**
```javascript
function submitLeft() {
  if (gameOver || currentPlayer !== 'left') return;
  clearInterval(timerInterval);
  inputLeft.disabled = true;
  const v = Number(inputLeft.value);
  
  if (v === leftQ.ans) {
    leftSteps = Math.min(leftSteps + 1, totalSteps);
    soundTrue.play().catch(() => {});
    gameMsg.textContent = '👻 Spectral Success!';
  } else {
    rightSteps = Math.min(rightSteps + 1, totalSteps);
    soundFalse.play().catch(() => {});
    gameMsg.textContent = '💀 Bone-chilling Blunder!';
  }
  
  updateRope();
  checkWinnerOrContinue('left');
}
```

**❌ INCORRECT:**
```javascript
function submitLeft() {
  const v = Number(inputLeft.value);
  if (v === leftQ.ans) {
    leftSteps++; // BAD: No bounds checking
    // BAD: No sound feedback
    // BAD: No spooky message
  }
  // BAD: No rope update
  // BAD: No win check
}
```

### When Adding AI Behavior:

**✅ CORRECT:**
```javascript
function startAITurn() {
  const settings = aiSettings[aiDifficulty];
  const delay = rand(settings.minDelay, settings.maxDelay);
  
  inputRight.value = '';
  
  aiTypingTimeout = setTimeout(() => {
    simulateAITyping(); // Realistic typing
  }, 300);
  
  aiTimeout = setTimeout(() => {
    submitAIAnswer();
  }, delay);
}
```

**❌ INCORRECT:**
```javascript
function startAITurn() {
  // BAD: Instant answer, no delay
  inputRight.value = rightQ.ans;
  submitRight();
}
```

## Kiro Execution Protocol

### When Asked to Modify Game Logic:

1. **Analyze Impact:**
   - Which state variables are affected?
   - Does it change game balance?
   - Does it affect both players equally?
   - Does it maintain fairness?

2. **Verify Consistency:**
   - Does it follow existing patterns?
   - Does it update all related state?
   - Does it trigger appropriate UI updates?
   - Does it maintain spooky theme?

3. **Test Edge Cases:**
   - What if steps are at maximum?
   - What if timer reaches zero?
   - What if game is already over?
   - What if transition is in progress?

4. **Validate Balance:**
   - Is AI still beatable?
   - Is difficulty appropriate?
   - Are questions fair?
   - Is timing reasonable?

### Decision Tree:
```
Request to modify game logic
  ↓
Does it maintain fairness? → NO → Reject or rebalance
  ↓ YES
Does it validate input? → NO → Add validation
  ↓ YES
Does it update all state? → NO → Add missing updates
  ↓ YES
Does it check edge cases? → NO → Add edge case handling
  ↓ YES
Does it maintain balance? → NO → Adjust difficulty
  ↓ YES
PROCEED with implementation
```

### Cross-File Consistency:
- Check UI_STEERING.md for state-dependent UI updates
- Check ANIMATION_STEERING.md for state-triggered animations
- Check AUDIO_STEERING.md for state-triggered sounds
- Check THEME_STEERING.md for spooky message requirements

## Game State Validation Checklist

Before completing any logic modification, verify:

- [ ] State variables within valid ranges
- [ ] Input validation present
- [ ] Bounds checking on step counts
- [ ] Timer cleanup on state changes
- [ ] Win condition checked after state change
- [ ] UI updated to reflect state
- [ ] Audio feedback triggered
- [ ] Spooky messages included
- [ ] Edge cases handled
- [ ] Game balance maintained

## Common Logic Patterns

### State Update Pattern:
```javascript
function updateGameState() {
  // 1. Validate input
  if (gameOver || isTransitioning) return;
  
  // 2. Clear timers
  clearInterval(timerInterval);
  
  // 3. Update state with bounds checking
  leftSteps = Math.min(leftSteps + 1, totalSteps);
  
  // 4. Update UI
  updateRope();
  renderDots();
  
  // 5. Provide feedback
  soundTrue.play().catch(() => {});
  gameMsg.textContent = '👻 Spectral Success!';
  
  // 6. Check win condition
  checkWinnerOrContinue('left');
}
```

### Timer Pattern:
```javascript
function startTimer(duration, callback) {
  timeLeft = duration;
  timerInterval = setInterval(() => {
    timeLeft--;
    updateTimerDisplay();
    
    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      callback();
    }
  }, 1000);
}
```

### Cleanup Pattern:
```javascript
function cleanup() {
  clearInterval(timerInterval);
  clearTimeout(aiTimeout);
  clearTimeout(aiTypingTimeout);
  timerInterval = null;
  aiTimeout = null;
  aiTypingTimeout = null;
}
```

## Console Logging Standards

### Required Logs:
```javascript
// Game events
console.log('=== STARTING GAME ===');
console.log('=== RESTARTING GAME ===');

// Character movement
console.log('=== ROPE ANIMATION UPDATE ===');
console.log('Left Steps:', leftSteps);
console.log('Right Steps:', rightSteps);
console.log('Movement:', offset, 'px');

// Player actions
console.log('=== LEFT PLAYER SUBMITTED ===');
console.log('Answer:', v, 'Correct:', leftQ.ans);
console.log('✅ LEFT CORRECT! Left +1 → char moves LEFT 30px');

// AI behavior
console.log('=== AI TURN STARTED ===');
console.log('AI Difficulty:', aiDifficulty);
console.log('AI will answer:', willBeCorrect ? 'CORRECTLY' : 'INCORRECTLY');
```

## Version Control
- **Created:** December 2, 2025
- **Last Updated:** December 2, 2025
- **Version:** 1.0
- **Maintained By:** Kiro AI Assistant
- **Logic Authority:** Master reference for all game mechanics decisions

