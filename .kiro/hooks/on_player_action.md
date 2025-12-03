---
name: on_player_action
trigger: event
event: player_submit_answer
description: Automatically validates player actions and ensures proper feedback, state updates, and spooky atmosphere
---

# Hook: On Player Action

## Trigger Condition
This hook triggers when:
- Human player (left) submits answer via GO button or Enter key
- AI opponent (right) submits answer automatically
- Player's timer reaches zero (timeout)
- `submitLeft()` or `submitRight()` function is called

## Purpose
Automatically validate that player actions are processed correctly, game state updates properly, and all feedback systems (visual, audio, animation) respond appropriately with spooky theming.

## Transformation Rules

### 1. Input Validation
**Verify answer submission:**
```javascript
// Check input is valid number
const answer = Number(input.value);
if (isNaN(answer)) {
  // Invalid input - treat as wrong answer
}

// Check player is active
if (currentPlayer !== player) return;

// Check game not over
if (gameOver) return;

// Check not transitioning
if (isTransitioning) return;
```

**Action:**
- Validate numeric input
- Ensure player's turn
- Prevent actions during transitions
- Block actions after game over

### 2. Answer Evaluation
**Compare answer to correct value:**
```javascript
if (answer === question.ans) {
  // CORRECT ANSWER
  // Player gains step
  // Opponent loses step (if applicable)
  // Character moves toward player
} else {
  // WRONG ANSWER
  // Opponent gains step
  // Character moves toward opponent
}
```

**Action:**
- Strict equality check (no rounding)
- Update step counts with bounds checking
- Calculate character movement direction
- Determine feedback type

### 3. State Update Validation
**Ensure proper state changes:**
```javascript
// Bounds checking
leftSteps = Math.min(leftSteps + 1, totalSteps);
rightSteps = Math.min(rightSteps + 1, totalSteps);

// Never negative
leftSteps = Math.max(leftSteps, 0);
rightSteps = Math.max(rightSteps, 0);

// Clear timer
clearInterval(timerInterval);

// Disable input
input.disabled = true;
```

**Action:**
- Validate step counts within bounds (0 to totalSteps)
- Clear active timers
- Disable player input
- Update currentPlayer state

### 4. Feedback System Activation
**Trigger all feedback mechanisms:**

**Audio Feedback:**
```javascript
if (correct) {
  soundTrue.play().catch(() => {});
} else {
  soundFalse.play().catch(() => {});
}
```

**Visual Feedback:**
```javascript
if (correct) {
  // Green glow animation
  // Success message with emojis
} else {
  // Red flash animation
  // Failure message with emojis
}
```

**Animation Feedback:**
```javascript
// Character movement
updateRope(); // Moves ±30px

// Enhanced glow during movement
rope.classList.add('moving');
setTimeout(() => rope.classList.remove('moving'), 600);
```

**Message Feedback:**
```javascript
const messages = correct ? successMessages : failMessages;
gameMsg.textContent = messages[rand(0, messages.length - 1)];
```

**Action:**
- Play appropriate sound effect
- Display spooky message with emojis
- Animate character movement
- Update progress dots
- Trigger visual effects

### 5. Win Condition Check
**After every action:**
```javascript
function checkWinnerOrContinue(from) {
  updateRope();
  if (leftSteps >= totalSteps) return win('Left');
  if (rightSteps >= totalSteps) return win('Right');
  switchTurn(from === 'left' ? 'right' : 'left');
}
```

**Action:**
- Check if either player reached totalSteps
- Trigger victory sequence if winner
- Switch turns if no winner
- Generate new questions

## Example Automation Use-Case

### Scenario 1: Human player answers correctly

**Input:** User types "42" and clicks GO
**Question:** `15 + 12 × 3 = ?` (Answer: 51)

**Hook automatically:**
1. Validates input is number (42)
2. Compares to correct answer (51)
3. Determines WRONG answer
4. Updates state: `rightSteps++`
5. Plays `soundFalse.mp3`
6. Displays random failure message: `💀 Bone-chilling Blunder!`
7. Moves character RIGHT 30px
8. Updates progress dots
9. Checks win condition
10. Switches to AI's turn

**Console Output:**
```
=== LEFT PLAYER SUBMITTED ===
Answer: 42 Correct: 51
❌ LEFT WRONG! Right +1 → char moves RIGHT 30px

=== ROPE ANIMATION UPDATE ===
Left Steps: 0
Right Steps: 1
Step Difference: 1
Movement: 30 px (RIGHT →)
✅ Applied transform on ropeWrap: translateX(30px)
```

### Scenario 2: AI opponent answers correctly

**Question:** `18 - 10 ÷ 2 = ?` (Answer: 13)
**AI Difficulty:** Normal (70% accuracy)
**AI Decision:** Correct (random < 0.7)

**Hook automatically:**
1. AI types "13" digit-by-digit
2. Submits after 950ms delay
3. Validates answer is correct
4. Updates state: `rightSteps++`
5. Plays `soundTrue.mp3`
6. Displays: `😈 Demonic Dominance!`
7. Moves character RIGHT 30px
8. Updates progress dots
9. Checks win condition
10. Switches to human's turn

### Scenario 3: Player timeout

**Timer reaches 0 seconds**

**Hook automatically:**
1. Detects timeout condition
2. Plays `soundFalse.mp3`
3. Displays: `⏰ Time's Ghostly Grip Claims You!`
4. Updates state: opponent gains step
5. Moves character toward opponent
6. Updates progress dots
7. Checks win condition
8. Switches turns

## Allowed Modifications

### ✅ PERMITTED:
- Adjusting feedback message variety
- Enhancing visual effects
- Adding particle effects on answers
- Customizing animation intensity
- Varying sound effect volume
- Adding combo system (consecutive correct)
- Tracking statistics

### ❌ FORBIDDEN:
- Skipping state validation
- Allowing actions during transitions
- Removing audio feedback
- Removing visual feedback
- Skipping win condition check
- Breaking step bounds (0 to totalSteps)
- Removing spooky messages
- Allowing negative steps

## Dynamic Behaviors Based on Context

### Consecutive Correct Answers:
```javascript
// Track streak
let correctStreak = 0;

if (correct) {
  correctStreak++;
  if (correctStreak >= 3) {
    // Enhanced feedback
    gameMsg.textContent = '🔥 SPECTRAL STREAK! 🔥';
    // Extra glow effect
    // Bonus sound effect
  }
} else {
  correctStreak = 0;
}
```

### Close to Victory:
```javascript
if (leftSteps >= totalSteps - 1 || rightSteps >= totalSteps - 1) {
  // Tension building
  // More intense atmospheric effects
  // Dramatic music increase
  // Screen edge glow
}
```

### AI Difficulty Adaptation:
```javascript
// Easy AI: More encouraging messages
if (aiDifficulty === 'easy' && !correct) {
  gameMsg.textContent = '👻 The spirits are merciful...';
}

// Hard AI: More intimidating messages
if (aiDifficulty === 'hard' && correct) {
  gameMsg.textContent = '💀 The Demon Scholar is impressed!';
}
```

## Validation Checklist

When hook executes, verify:
- [ ] Input validated (number, not NaN)
- [ ] Player's turn confirmed
- [ ] Game not over
- [ ] Not transitioning
- [ ] Answer compared correctly
- [ ] State updated with bounds checking
- [ ] Timer cleared
- [ ] Input disabled
- [ ] Audio feedback played
- [ ] Visual feedback displayed
- [ ] Spooky message shown with emojis
- [ ] Character animated
- [ ] Progress dots updated
- [ ] Win condition checked
- [ ] Turn switched (if no winner)

## Hook Execution Flow

```
Player submits answer (or timeout)
  ↓
Hook triggered
  ↓
Validate input and game state
  ↓
Evaluate answer (correct/wrong)
  ↓
Update step counts (with bounds)
  ↓
Clear timer
  ↓
Disable input
  ↓
Play audio feedback
  ↓
Display visual feedback
  ↓
Animate character movement
  ↓
Update progress dots
  ↓
Check win condition
  ↓
If winner:
  - Trigger victory sequence
  - End game
  ↓
If no winner:
  - Generate new questions
  - Switch turns (400ms delay)
  - Start next turn
```

## Integration with Steering Documents

This hook enforces rules from:
- **GAME_LOGIC_STEERING.md:** State validation, answer evaluation, turn management
- **AUDIO_STEERING.md:** Sound effect triggers, volume levels
- **ANIMATION_STEERING.md:** Character movement, visual effects timing
- **THEME_STEERING.md:** Spooky messages, emoji usage
- **UI_STEERING.md:** Visual feedback, progress indicators

## Spooky Message System

### Success Messages (Correct Answer):
```javascript
const successMessages = [
  '👻 Spectral Success!',
  '🎃 Pumpkin Power!',
  '✨ Magical Mastery!',
  '😈 Demonic Dominance!',
  '🔮 Crystal Clear!',
  '⚡ Lightning Logic!',
  '🧙‍♀️ Witch\'s Wisdom!',
  '💀 Bone-afide Brilliance!'
];
```

### Failure Messages (Wrong Answer):
```javascript
const failMessages = [
  '💀 Bone-chilling Blunder!',
  '🕷️ Spidery Slip-up!',
  '🦇 Batty Mistake!',
  '🕸️ Caught in Web of Error!',
  '🌙 Moonlight Miscalculation!',
  '🍄 Mushroom Muddle!',
  '👻 Ghostly Gaffe!',
  '🎃 Pumpkin Predicament!'
];
```

### Timeout Messages:
```javascript
const timeoutMessages = [
  '⏰ Time\'s Ghostly Grip Claims You!',
  '🕰️ The Witching Hour Strikes!',
  '⌛ Sands of Doom Have Fallen!',
  '⏳ Spectral Clock Runs Out!',
  '🕐 Midnight Tolls for Thee!'
];
```

## Performance Monitoring

Track action processing time:
```javascript
const actionStart = performance.now();
// ... process action ...
const actionEnd = performance.now();
console.log(`⚡ Action processed in ${(actionEnd - actionStart).toFixed(2)}ms`);
```

**Target:** <50ms action processing time

## Output Format

```
🎃 PLAYER ACTION VALIDATION 🎃

PLAYER: Left (Human)
QUESTION: 15 + 12 × 3 = ?
ANSWER: 51
SUBMITTED: 42
RESULT: ❌ WRONG

STATE UPDATE:
Before: leftSteps=0, rightSteps=0
After:  leftSteps=0, rightSteps=1
Character: Moved RIGHT 30px

FEEDBACK:
🔊 Audio: soundFalse.mp3
💬 Message: 💀 Bone-chilling Blunder!
🎨 Animation: Character glow + movement
📊 Progress: Right dot 1 activated

NEXT:
✅ Win check: No winner yet
🔄 Turn switch: Right player (AI)
⏱️ New timer: 10 seconds

⚡ Processed in 23.45ms
```

## Version Control
- **Created:** December 2, 2025
- **Last Updated:** December 2, 2025
- **Version:** 1.0
- **Maintained By:** Kiro AI Assistant

