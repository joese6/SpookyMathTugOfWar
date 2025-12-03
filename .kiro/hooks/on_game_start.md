---
name: on_game_start
trigger: event
event: game_start
description: Automatically validates game initialization and ensures proper state setup
---

# Hook: On Game Start

## Trigger Condition
This hook triggers when:
- User clicks any game mode button (👻 Ghostly Beginner, 🎃 Pumpkin Apprentice, etc.)
- `startGame(mode, min, max)` function is called
- Game transitions from home page to game page

## Purpose
Automatically validate that game initialization is correct, all systems are ready, and the spooky atmosphere is properly established.

## Transformation Rules

### 1. State Initialization Validation
**Verify all state variables reset:**
```javascript
leftSteps = 0
rightSteps = 0
gameOver = false
isTransitioning = false
currentPlayer = 'left'
```

**Action:**
- Check all state variables are at initial values
- Verify no lingering timers from previous game
- Ensure clean slate for new game

### 2. UI Preparation Check
**Ensure UI elements ready:**
- Home page hidden (`display: none`)
- Game page visible (`display: flex`)
- Game title set to mode name
- Keypads created for both players
- Character/rope centered (translateX(0px))
- Progress dots rendered (all inactive)

**Action:**
```javascript
// Verify DOM state
// Ensure all game elements visible
// Confirm character at center position
```

### 3. Question Generation Validation
**Verify questions generated:**
- `leftQ` has valid question object
- `rightQ` has valid question object
- Both questions have `text` and `ans` properties
- Answers are integers within valid range
- Questions displayed in UI

**Action:**
```javascript
// Validate question objects
// Ensure no NaN, Infinity, or decimals
// Confirm questions visible to players
```

### 4. Audio System Activation
**Ensure audio ready:**
- Background music playing (if user interacted)
- Sound effects loaded
- Volume levels correct
- No audio errors

**Action:**
```javascript
// Check audio state
// Verify no playback errors
// Ensure atmospheric sounds active
```

### 5. Atmospheric Effects Check
**Verify effects active:**
- Rain drops falling
- Lightning cycle scheduled
- Fog drifting
- Ghosts floating
- Bats flying
- Candles flickering

**Action:**
```javascript
// Confirm all animations running
// Verify particle systems active
// Ensure atmospheric immersion
```

## Example Automation Use-Case

### Scenario: User starts "Witch Master" mode

**Hook automatically:**
1. Validates state reset
2. Checks UI transition
3. Verifies questions generated (10-20 range)
4. Confirms audio playing
5. Validates atmospheric effects
6. Logs initialization report

**Console Output:**
```
=== GAME START VALIDATION ===
Mode: Witch Master
Range: 10-20
Total Steps: 5

✅ State Reset: VALID
✅ UI Transition: VALID
✅ Questions Generated: VALID
  - Left: 15 + 12 × 3 = ? (Answer: 51)
  - Right: 18 - 10 ÷ 2 = ? (Answer: 13)
✅ Audio System: ACTIVE
✅ Atmospheric Effects: ACTIVE
✅ Character Position: CENTERED

🎃 Game Ready! Left player's turn begins.
```

## Allowed Modifications

### ✅ PERMITTED:
- Adjusting question difficulty ranges
- Modifying timer duration (8-15s)
- Changing AI difficulty
- Adjusting atmospheric effect intensity
- Adding pre-game animations
- Customizing game mode parameters

### ❌ FORBIDDEN:
- Skipping state reset
- Starting with non-zero steps
- Generating invalid questions
- Disabling atmospheric effects
- Starting without UI transition
- Skipping question generation

## Dynamic Behaviors Based on Game Mode

### Ghostly Beginner (1-10):
- Simpler questions
- Longer timer (12s)
- Encouragement messages
- Brighter atmosphere

### Pumpkin Apprentice (5-15):
- Moderate questions
- Standard timer (10s)
- Balanced messages
- Standard atmosphere

### Witch Master (10-20):
- Complex questions
- Standard timer (10s)
- Challenging messages
- Darker atmosphere

### Demon Lord (15-25):
- Expert questions
- Shorter timer (8s)
- Intense messages
- Very dark atmosphere

### Nightmare Blitz (1-25):
- Wide range questions
- Fast timer (8s)
- Only 3 steps to win
- Maximum atmospheric intensity

## Validation Checklist

When hook executes, verify:
- [ ] State variables reset to initial values
- [ ] Home page hidden, game page visible
- [ ] Game title displays mode name
- [ ] Keypads created and functional
- [ ] Character centered (offset = 0)
- [ ] Progress dots rendered (all inactive)
- [ ] Questions generated and valid
- [ ] Questions displayed in UI
- [ ] Timer ready to start
- [ ] Audio system active
- [ ] Atmospheric effects running
- [ ] No errors in console
- [ ] Left player's turn begins

## Hook Execution Flow

```
User clicks game mode button
  ↓
startGame(mode, min, max) called
  ↓
Hook triggered
  ↓
Validate state reset
  ↓
Check UI transition
  ↓
Verify question generation
  ↓
Validate audio system
  ↓
Check atmospheric effects
  ↓
Generate initialization report
  ↓
If any validation fails:
  - Log error details
  - Attempt auto-correction
  - Notify user if critical
  ↓
If all valid:
  - Log success
  - Begin left player's turn
  - Start timer
```

## Integration with Steering Documents

This hook enforces rules from:
- **GAME_LOGIC_STEERING.md:** State management, question generation, turn flow
- **UI_STEERING.md:** Page transitions, element visibility
- **AUDIO_STEERING.md:** Audio initialization, volume levels
- **ANIMATION_STEERING.md:** Character positioning, atmospheric effects
- **THEME_STEERING.md:** Spooky atmosphere, visual consistency

## Error Handling

### Common Issues & Auto-Corrections:

**Issue: Questions not generated**
```javascript
// Auto-correction
if (!leftQ || !rightQ) {
  console.warn('⚠️ Questions missing, regenerating...');
  newQuestions();
}
```

**Issue: Character not centered**
```javascript
// Auto-correction
if (ropeWrap.style.transform !== 'translateX(0px)') {
  console.warn('⚠️ Character not centered, resetting...');
  ropeWrap.style.transform = 'translateX(0px)';
}
```

**Issue: Timers not cleared**
```javascript
// Auto-correction
if (timerInterval || aiTimeout || aiTypingTimeout) {
  console.warn('⚠️ Lingering timers detected, clearing...');
  clearInterval(timerInterval);
  clearTimeout(aiTimeout);
  clearTimeout(aiTypingTimeout);
}
```

## Performance Monitoring

Track initialization time:
```javascript
const startTime = performance.now();
// ... initialization ...
const endTime = performance.now();
console.log(`⚡ Game initialized in ${(endTime - startTime).toFixed(2)}ms`);
```

**Target:** <100ms initialization time

## Output Format

```
🎃 GAME START VALIDATION 🎃

MODE: 🧙‍♀️ Witch Master
RANGE: 10-20
STEPS: 5
AI: 👻 Restless Spirit (70%)

STATE VALIDATION:
✅ leftSteps: 0
✅ rightSteps: 0
✅ gameOver: false
✅ currentPlayer: left

UI VALIDATION:
✅ Home page hidden
✅ Game page visible
✅ Title set
✅ Keypads created
✅ Character centered

QUESTIONS:
✅ Left: 15 + 12 × 3 = ? (51)
✅ Right: 18 - 10 ÷ 2 = ? (13)

SYSTEMS:
✅ Audio: ACTIVE
✅ Atmosphere: ACTIVE
✅ Animations: RUNNING

⚡ Initialized in 45.23ms
👻 Left player's turn begins!
```

## Version Control
- **Created:** December 2, 2025
- **Last Updated:** December 2, 2025
- **Version:** 1.0
- **Maintained By:** Kiro AI Assistant

