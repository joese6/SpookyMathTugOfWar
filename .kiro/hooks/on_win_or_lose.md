---
name: on_win_or_lose
trigger: event
event: game_end
description: Automatically validates victory/defeat conditions and triggers appropriate spooky celebration or commiseration sequences
---

# Hook: On Win or Lose

## Trigger Condition
This hook triggers when:
- Any player reaches `totalSteps` (5 or 3 in Nightmare mode)
- `win(player)` function is called
- Game transitions from active to game over state

## Purpose
Automatically validate that victory/defeat is handled correctly, all game systems stop properly, and the appropriate spooky celebration or commiseration sequence plays with full atmospheric effects.

## Transformation Rules

### 1. Victory Validation
**Verify win condition met:**
```javascript
// Check winner reached totalSteps
if (leftSteps >= totalSteps) {
  winner = 'Left';
} else if (rightSteps >= totalSteps) {
  winner = 'Right';
} else {
  // ERROR: win() called without valid winner
  console.error('Invalid win condition!');
  return;
}
```

**Action:**
- Confirm winner has required steps
- Validate game state consistency
- Ensure only one winner
- Set gameOver flag

### 2. Game System Shutdown
**Stop all active systems:**
```javascript
function win(player) {
  // Stop timer
  clearInterval(timerInterval);
  
  // Stop AI timers
  clearTimeout(aiTimeout);
  clearTimeout(aiTypingTimeout);
  
  // Set game over flag
  gameOver = true;
  
  // Disable all inputs
  inputLeft.disabled = true;
  inputRight.disabled = true;
}
```

**Action:**
- Clear all timers and timeouts
- Set gameOver flag
- Disable all player inputs
- Prevent further actions
- Keep background music playing

### 3. Victory Message Selection
**Display appropriate spooky message:**
```javascript
const victoryMessages = {
  Left: [
    '👻 LEFT SPIRITS TRIUMPH!',
    '🎃 PUMPKIN KINGDOM VICTORIOUS!',
    '🧙‍♀️ WITCHES REIGN SUPREME!',
    '✨ MAGICAL MASTERY ACHIEVED!',
    '🔮 CRYSTAL PROPHECY FULFILLED!'
  ],
  Right: [
    '💀 RIGHT SKELETONS CONQUER!',
    '😈 DEMON REALM DOMINATES!',
    '🦇 BAT COLONY CLAIMS VICTORY!',
    '🕷️ SPIDER ARMY PREVAILS!',
    '🌙 MOONLIGHT CURSE COMPLETE!'
  ]
};

const message = messages[player][rand(0, messages.length - 1)];
gameMsg.textContent = message;
```

**Action:**
- Select random victory message for winner
- Ensure message has 2-3 Halloween emojis
- Display in large, glowing text
- Maintain spooky theme

### 4. Victory Sequence Activation
**Trigger all celebration effects:**

**Audio:**
```javascript
soundWin.play().catch(() => {});
// Victory fanfare plays
// Background music continues
```

**Visual:**
```javascript
document.body.classList.add('win');
// Screen flashes 8 times over 4 seconds
setTimeout(() => {
  document.body.classList.remove('win');
}, 4000);
```

**Animation:**
```css
body.win {
  animation: flash 0.8s alternate 8;
}

@keyframes flash {
  0%, 100% {
    background: linear-gradient(135deg, #0a0a0a 0%, #1a0f1a 100%);
  }
  50% {
    background: linear-gradient(135deg, 
      rgba(168, 85, 247, 0.3) 0%, 
      rgba(249, 115, 22, 0.3) 50%, 
      rgba(16, 185, 129, 0.3) 100%);
  }
}
```

**Atmospheric:**
```javascript
// Trigger multiple lightning strikes
// Increase fog intensity
// Accelerate creature animations
// Enhance glow effects
```

**Action:**
- Play victory sound
- Trigger screen flash animation (8 flashes)
- Enhance atmospheric effects
- Maintain effects for 4 seconds
- Keep game in victory state

### 5. Final State Recording
**Record game outcome:**
```javascript
const gameResult = {
  winner: player,
  mode: currentMode,
  aiDifficulty: aiDifficulty,
  finalScore: {
    left: leftSteps,
    right: rightSteps
  },
  duration: gameEndTime - gameStartTime
};

console.log('=== GAME RESULT ===', gameResult);
```

**Action:**
- Record winner
- Record final scores
- Record game mode
- Record AI difficulty
- Log to console
- (Optional: Save to localStorage)

## Example Automation Use-Case

### Scenario 1: Human player wins

**State:**
- Left player answered correctly
- leftSteps increased from 4 to 5
- totalSteps = 5
- Human defeats AI!

**Hook automatically:**
1. Validates left player reached 5 steps
2. Clears all timers
3. Sets gameOver = true
4. Disables all inputs
5. Selects random victory message: `👻 LEFT SPIRITS TRIUMPH!`
6. Plays victory sound
7. Triggers 8 screen flashes over 4 seconds
8. Enhances atmospheric effects
9. Logs final game result

**Console Output:**
```
=== VICTORY DETECTED ===
Winner: Left (Human)
Final Score: Left 5, Right 3

VICTORY SEQUENCE:
🔊 Sound: win.mp3
💬 Message: 👻 LEFT SPIRITS TRIUMPH!
🎨 Animation: Screen flash 8x
⚡ Atmosphere: Enhanced intensity
🎮 Game Over: true

=== GAME RESULT ===
{
  winner: 'Left',
  mode: 'Witch Master',
  aiDifficulty: 'normal',
  finalScore: { left: 5, right: 3 },
  duration: 145.67s
}

🎉 Congratulations! You defeated the Restless Spirit!
```

### Scenario 2: AI opponent wins

**State:**
- Right player (AI) answered correctly
- rightSteps increased from 4 to 5
- totalSteps = 5
- AI defeats human!

**Hook automatically:**
1. Validates right player reached 5 steps
2. Clears all timers
3. Sets gameOver = true
4. Disables all inputs
5. Selects random defeat message: `💀 RIGHT SKELETONS CONQUER!`
6. Plays victory sound (same for both)
7. Triggers 8 screen flashes
8. Enhances atmospheric effects
9. Logs final game result

**Console Output:**
```
=== VICTORY DETECTED ===
Winner: Right (AI)
Final Score: Left 2, Right 5

VICTORY SEQUENCE:
🔊 Sound: win.mp3
💬 Message: 💀 RIGHT SKELETONS CONQUER!
🎨 Animation: Screen flash 8x
⚡ Atmosphere: Enhanced intensity
🎮 Game Over: true

=== GAME RESULT ===
{
  winner: 'Right',
  mode: 'Demon Lord',
  aiDifficulty: 'hard',
  finalScore: { left: 2, right: 5 },
  duration: 98.23s
}

💀 The Demon Scholar has bested you! Try again?
```

### Scenario 3: Nightmare Blitz victory

**State:**
- Nightmare Blitz mode (totalSteps = 3)
- Left player reached 3 steps
- Fast victory!

**Hook automatically:**
1. Validates left player reached 3 steps
2. Recognizes Nightmare mode
3. Triggers enhanced victory sequence
4. Displays special Nightmare victory message
5. Extra dramatic effects

**Console Output:**
```
=== VICTORY DETECTED ===
Winner: Left (Human)
Mode: 💀 Nightmare Blitz
Final Score: Left 3, Right 1

SPECIAL VICTORY:
🔥 NIGHTMARE CONQUERED! 🔥
Message: 👻 LEFT SPIRITS TRIUMPH IN NIGHTMARE!
Bonus: Nightmare victory achievement
Animation: Enhanced screen flash + lightning storm

=== GAME RESULT ===
{
  winner: 'Left',
  mode: 'Nightmare Blitz',
  aiDifficulty: 'hard',
  finalScore: { left: 3, right: 1 },
  duration: 67.89s,
  special: 'Nightmare Victory'
}

🔥 You conquered the Nightmare! Legendary!
```

## Allowed Modifications

### ✅ PERMITTED:
- Adding victory statistics display
- Enhancing celebration effects
- Adding achievement system
- Customizing messages per mode
- Adding replay prompt
- Tracking win/loss records
- Adding confetti/particle effects
- Varying celebration intensity

### ❌ FORBIDDEN:
- Allowing game to continue after victory
- Skipping victory sequence
- Removing victory sound
- Removing screen flashes
- Allowing input after game over
- Breaking gameOver flag
- Removing victory message
- Skipping timer cleanup

## Dynamic Behaviors Based on Context

### Close Victory (Winner by 1 step):
```javascript
if (Math.abs(leftSteps - rightSteps) === 1) {
  gameMsg.textContent = '🔥 NARROW VICTORY! 🔥';
  // Extra dramatic effects
  // Tension release
}
```

### Dominant Victory (Winner by 3+ steps):
```javascript
if (Math.abs(leftSteps - rightSteps) >= 3) {
  gameMsg.textContent = '💀 CRUSHING DEFEAT! 💀';
  // Overwhelming victory effects
  // Dramatic music
}
```

### Perfect Victory (Winner 5, Loser 0):
```javascript
if ((leftSteps === 5 && rightSteps === 0) || 
    (rightSteps === 5 && leftSteps === 0)) {
  gameMsg.textContent = '👑 FLAWLESS VICTORY! 👑';
  // Special achievement
  // Maximum celebration
}
```

### AI Difficulty Context:
```javascript
// Beating Hard AI
if (winner === 'Left' && aiDifficulty === 'hard') {
  gameMsg.textContent = '🏆 DEMON SCHOLAR DEFEATED! 🏆';
  // Extra congratulations
}

// Losing to Easy AI
if (winner === 'Right' && aiDifficulty === 'easy') {
  gameMsg.textContent = '👻 Even the Friendly Ghost prevails...';
  // Encouraging message
}
```

## Validation Checklist

When hook executes, verify:
- [ ] Winner has reached totalSteps
- [ ] Only one winner declared
- [ ] All timers cleared
- [ ] All timeouts cleared
- [ ] gameOver flag set to true
- [ ] All inputs disabled
- [ ] Victory message displayed with emojis
- [ ] Victory sound played
- [ ] Screen flash animation triggered
- [ ] Atmospheric effects enhanced
- [ ] Final score recorded
- [ ] Game result logged
- [ ] Background music continues
- [ ] No further actions possible

## Hook Execution Flow

```
Player reaches totalSteps
  ↓
win(player) called
  ↓
Hook triggered
  ↓
Validate winner
  ↓
Clear all timers/timeouts
  ↓
Set gameOver = true
  ↓
Disable all inputs
  ↓
Select victory message
  ↓
Play victory sound
  ↓
Trigger screen flash (8x over 4s)
  ↓
Enhance atmospheric effects
  ↓
Record final game result
  ↓
Log to console
  ↓
Display victory state
  ↓
Wait for user action (Restart/Back)
```

## Integration with Steering Documents

This hook enforces rules from:
- **GAME_LOGIC_STEERING.md:** Win conditions, state management, timer cleanup
- **AUDIO_STEERING.md:** Victory sound, background music continuation
- **ANIMATION_STEERING.md:** Screen flash timing, atmospheric effects
- **THEME_STEERING.md:** Victory messages, emoji usage, spooky atmosphere
- **UI_STEERING.md:** Message display, input disabling

## Victory Animation Sequence

### Timeline:
```
0ms:    Victory detected
0ms:    Sound plays
0ms:    Message displays
0ms:    Screen flash begins
800ms:  Flash 1 complete
1600ms: Flash 2 complete
2400ms: Flash 3 complete
3200ms: Flash 4 complete
4000ms: Flash sequence complete
4000ms: Remove 'win' class
4000ms: Game remains in victory state
```

### Visual Effects:
```css
/* Screen flash colors */
0%:   Dark background
50%:  Purple/Orange/Green glow
100%: Dark background

/* 8 flashes = 8 cycles */
/* Each cycle = 800ms */
/* Total = 6400ms ≈ 4s (with alternate) */
```

## Performance Monitoring

Track victory sequence time:
```javascript
const victoryStart = performance.now();
// ... victory sequence ...
const victoryEnd = performance.now();
console.log(`⚡ Victory sequence completed in ${(victoryEnd - victoryStart).toFixed(2)}ms`);
```

**Target:** <100ms to start sequence

## Output Format

```
🎃 VICTORY VALIDATION 🎃

WINNER: Left (Human)
MODE: 🧙‍♀️ Witch Master
AI: 👻 Restless Spirit (70%)

FINAL SCORE:
Left:  5 steps ⭐ WINNER
Right: 3 steps

VICTORY SEQUENCE:
🔊 Sound: win.mp3 ✅
💬 Message: 👻 LEFT SPIRITS TRIUMPH! ✅
🎨 Animation: Screen flash 8x ✅
⚡ Atmosphere: Enhanced ✅
🎮 Game Over: true ✅

GAME STATISTICS:
Duration: 145.67 seconds
Questions: 8 total
Accuracy: 62.5%
Avg Response: 7.3s

RESULT:
{
  winner: 'Left',
  mode: 'Witch Master',
  aiDifficulty: 'normal',
  finalScore: { left: 5, right: 3 },
  duration: 145.67,
  accuracy: 0.625
}

🎉 Congratulations! You defeated the Restless Spirit!
💀 Ready for the Demon Scholar?
```

## Version Control
- **Created:** December 2, 2025
- **Last Updated:** December 2, 2025
- **Version:** 1.0
- **Maintained By:** Kiro AI Assistant

