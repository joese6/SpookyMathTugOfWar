---
name: on_round_end
trigger: event
event: turn_complete
description: Automatically validates turn completion and ensures smooth transition to next round
---

# Hook: On Round End

## Trigger Condition
This hook triggers when:
- Player submits answer (correct or wrong)
- Player's timer reaches zero (timeout)
- Answer has been evaluated and state updated
- Before switching to next player's turn
- `checkWinnerOrContinue(from)` is called

## Purpose
Automatically validate that the current round ends properly, all cleanup is performed, new questions are generated, and the transition to the next round is smooth and spooky.

## Transformation Rules

### 1. Round Completion Validation
**Verify round ended properly:**
```javascript
// Answer was evaluated
// State was updated (steps changed)
// Timer was cleared
// Input was disabled
// Feedback was provided
// Character was moved
```

**Action:**
- Confirm all round-end tasks completed
- Validate state consistency
- Ensure no lingering timers
- Check UI reflects current state

### 2. Win Condition Check
**Determine if game should end:**
```javascript
if (leftSteps >= totalSteps) {
  // Left player wins
  return win('Left');
}

if (rightSteps >= totalSteps) {
  // Right player wins
  return win('Right');
}

// No winner yet, continue game
```

**Action:**
- Check both players' step counts
- Trigger victory sequence if winner
- Continue to turn switch if no winner

### 3. Question Regeneration
**Generate new questions for next round:**
```javascript
function newQuestions() {
  leftQ = genMixedQ(rangeMin, rangeMax);
  rightQ = genMixedQ(rangeMin, rangeMax);
  qLeft.textContent = leftQ.text;
  qRight.textContent = rightQ.text;
  inputLeft.value = '';
  inputRight.value = '';
}
```

**Action:**
- Generate valid questions for both players
- Validate questions (no decimals, NaN, infinity)
- Display questions in UI
- Clear previous answers from inputs

### 4. Turn Transition
**Switch to next player:**
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

**Action:**
- Set transition flag
- Clear any active timers
- Generate new questions
- Update character position
- Wait 400ms for smooth transition
- Start next player's turn

### 5. Atmospheric Adjustment
**Adjust atmosphere based on game state:**
```javascript
// Tension building as steps increase
const tension = Math.max(leftSteps, rightSteps) / totalSteps;

if (tension > 0.6) {
  // Increase atmospheric intensity
  // More frequent lightning
  // Darker fog
  // Faster creature movements
}
```

**Action:**
- Calculate game tension level
- Adjust atmospheric effects accordingly
- Enhance drama as game progresses

## Example Automation Use-Case

### Scenario 1: Normal round end (no winner)

**State:**
- Left player answered wrong
- rightSteps increased from 1 to 2
- No winner yet (totalSteps = 5)

**Hook automatically:**
1. Validates round completion
2. Checks win condition (no winner)
3. Generates new questions
4. Updates character position
5. Waits 400ms transition
6. Switches to right player (AI)
7. Starts AI turn with timer

**Console Output:**
```
=== ROUND END VALIDATION ===
Round completed: ✅
Winner: None
Next player: Right (AI)

NEW QUESTIONS:
Left: 12 + 8 × 2 = ? (28)
Right: 20 - 15 ÷ 3 = ? (15)

TRANSITION:
Character position updated
Waiting 400ms...
Starting AI turn...

=== AI TURN STARTED ===
AI Difficulty: normal
AI will answer in 1050ms
```

### Scenario 2: Round end with winner

**State:**
- Right player (AI) answered correctly
- rightSteps increased from 4 to 5
- Right player wins! (totalSteps = 5)

**Hook automatically:**
1. Validates round completion
2. Checks win condition (RIGHT WINS!)
3. Triggers victory sequence
4. Skips turn switch
5. Displays victory message
6. Plays victory sound
7. Triggers screen flashes

**Console Output:**
```
=== ROUND END VALIDATION ===
Round completed: ✅
Winner: RIGHT PLAYER (AI)

🎉 VICTORY SEQUENCE INITIATED 🎉

Message: 💀 RIGHT SKELETONS CONQUER!
Sound: win.mp3
Animation: Screen flash 8x over 4s
Game Over: true

Final Score:
Left: 2 steps
Right: 5 steps (WINNER!)
```

### Scenario 3: Nightmare Blitz mode (3 steps)

**State:**
- Nightmare Blitz mode (totalSteps = 3)
- Left player answered correctly
- leftSteps increased from 2 to 3
- Left player wins!

**Hook automatically:**
1. Validates round completion
2. Checks win condition (LEFT WINS!)
3. Recognizes fast victory (only 3 steps)
4. Triggers enhanced victory sequence
5. Displays special Nightmare victory message

**Console Output:**
```
=== ROUND END VALIDATION ===
Round completed: ✅
Mode: 💀 Nightmare Blitz
Winner: LEFT PLAYER (Human)

🔥 NIGHTMARE CONQUERED! 🔥

Message: 👻 LEFT SPIRITS TRIUMPH IN NIGHTMARE!
Special: Nightmare victory bonus
Animation: Enhanced screen flash
Game Over: true

Final Score:
Left: 3 steps (WINNER!)
Right: 1 step
```

## Allowed Modifications

### ✅ PERMITTED:
- Adjusting transition delay (300-600ms)
- Enhancing atmospheric effects based on tension
- Adding round statistics tracking
- Customizing question difficulty progression
- Adding combo/streak bonuses
- Varying transition animations
- Adding round-end sound effects

### ❌ FORBIDDEN:
- Skipping win condition check
- Allowing turn switch during transition
- Generating invalid questions
- Skipping question regeneration
- Removing transition delay entirely
- Breaking turn alternation
- Allowing simultaneous turns

## Dynamic Behaviors Based on Game State

### Early Game (Steps < 2):
```javascript
// Standard atmosphere
// Normal transition speed
// Encouraging messages
```

### Mid Game (Steps 2-3):
```javascript
// Increasing tension
// Slightly faster transitions
// Competitive messages
// Enhanced atmospheric effects
```

### Late Game (Steps 4+):
```javascript
// Maximum tension
// Dramatic atmosphere
// Intense messages
// Frequent lightning
// Darker fog
// Faster creature movements
```

### Match Point (One player at totalSteps - 1):
```javascript
// Critical moment
// Screen edge glow
// Dramatic music increase
// Tension messages:
// "🔥 One step from victory!"
// "💀 On the brink of defeat!"
```

## Validation Checklist

When hook executes, verify:
- [ ] Answer was evaluated
- [ ] State was updated correctly
- [ ] Timer was cleared
- [ ] Input was disabled
- [ ] Feedback was provided
- [ ] Character position updated
- [ ] Progress dots updated
- [ ] Win condition checked
- [ ] New questions generated (if continuing)
- [ ] Questions are valid
- [ ] Transition flag set
- [ ] Turn switched to correct player
- [ ] Next turn started properly

## Hook Execution Flow

```
Round ends (answer submitted/timeout)
  ↓
Hook triggered
  ↓
Validate round completion
  ↓
Update character position
  ↓
Update progress dots
  ↓
Check win condition
  ↓
If winner found:
  - Trigger victory sequence
  - Set gameOver = true
  - Display victory message
  - Play victory sound
  - Trigger screen flashes
  - END
  ↓
If no winner:
  - Set isTransitioning = true
  - Clear timers
  - Generate new questions
  - Validate questions
  - Display questions
  - Clear inputs
  - Wait 400ms
  - Set isTransitioning = false
  - Switch to next player
  - Start next turn
```

## Integration with Steering Documents

This hook enforces rules from:
- **GAME_LOGIC_STEERING.md:** Win conditions, turn management, question generation
- **ANIMATION_STEERING.md:** Transition timing, character movement
- **AUDIO_STEERING.md:** Round-end sound effects
- **THEME_STEERING.md:** Atmospheric adjustments, tension building
- **UI_STEERING.md:** Progress indicators, question display

## Transition Animation Sequence

### Visual Transition:
```css
/* 400ms smooth transition */
.isTransitioning {
  opacity: 0.8;
  filter: blur(2px);
  transition: all 400ms ease-in-out;
}
```

### Character Movement:
```javascript
// Character moves to new position
// Enhanced glow during movement
rope.classList.add('moving');
setTimeout(() => rope.classList.remove('moving'), 600);
```

### Question Fade:
```javascript
// Old questions fade out
// New questions fade in
// Smooth content replacement
```

## Performance Monitoring

Track transition time:
```javascript
const transitionStart = performance.now();
// ... transition ...
const transitionEnd = performance.now();
console.log(`⚡ Transition completed in ${(transitionEnd - transitionStart).toFixed(2)}ms`);
```

**Target:** 400-450ms total transition time

## Output Format

```
🎃 ROUND END VALIDATION 🎃

ROUND RESULT:
Player: Left
Answer: Correct
Steps: leftSteps 2→3, rightSteps 2

WIN CHECK:
Left: 3/5 steps
Right: 2/5 steps
Winner: None (continue)

NEW QUESTIONS:
✅ Left: 18 + 5 × 4 = ? (38)
✅ Right: 25 - 20 ÷ 4 = ? (20)

TRANSITION:
Character: Updated to -30px (LEFT)
Progress: Dots updated
Delay: 400ms
Next: Right player (AI)

ATMOSPHERE:
Tension: 60% (3/5 steps)
Effects: Enhanced intensity
Lightning: Increased frequency

⚡ Transition completed in 412.34ms
👻 AI turn begins!
```

## Version Control
- **Created:** December 2, 2025
- **Last Updated:** December 2, 2025
- **Version:** 1.0
- **Maintained By:** Kiro AI Assistant

