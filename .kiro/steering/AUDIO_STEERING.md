---
inclusion: always
priority: high
---

# Audio Steering - Spooky Math Tug of War

## Purpose
This steering document governs all audio implementation, ensuring sound effects and music enhance the dark Halloween atmosphere while providing clear feedback for game events.

## Scope of Influence
- Background music and ambient sounds
- Sound effect triggers and timing
- Audio volume levels and mixing
- Audio file management
- Sound-visual synchronization
- Audio feedback for user actions

## Core Behavioral Rules

### 1. Audio File System (IMMUTABLE)

**Background Music (Looping):**
```javascript
bgMusicBat.mp3    // Ambient crows/bats - Volume: 1.0 - Loop: Yes
bgMusicBell.mp3   // Eerie bells - Volume: 0.6 - Loop: Yes
```

**Ambient Effects (Triggered):**
```javascript
bgMusicWolf.mp3     // Wolf howl - Volume: 0.2 - Random intervals: 1-5s
bgMusicThunder.mp3  // Thunder - Volume: 0.8 - Synced with lightning
```

**Sound Effects (One-shot):**
```javascript
soundTrue.mp3    // Correct answer - Volume: 1.0
soundFalse.mp3   // Wrong answer/timeout - Volume: 1.0
soundWin.mp3     // Victory - Volume: 1.0
soundClick.mp3   // Button clicks - Volume: 1.0
```

**NEVER:**
- Remove or replace audio files without thematic equivalents
- Use cheerful, upbeat music
- Use realistic horror sounds (screams, gore)
- Disable audio system entirely
- Change volume levels drastically (±0.3 max)

### 2. Audio Trigger Rules

**Automatic Triggers:**
```javascript
// On first user interaction (browser requirement)
document.addEventListener('click', () => {
  bgMusicBat.play();    // Start immediately
  bgMusicBell.play();   // Start immediately
  bgMusicWolf.play();   // Start immediately
}, { once: false });

// Lightning cycle (every 5-12 seconds)
triggerLightning() → bgMusicThunder.play()

// Wolf howl (random 1-5s after previous ends)
bgMusicWolf.addEventListener('ended', () => {
  setTimeout(() => bgMusicWolf.play(), randomDelay);
});
```

**User Action Triggers:**
```javascript
// Button clicks
onclick="playClick()"

// Correct answer
submitLeft/Right() → if (correct) soundTrue.play()

// Wrong answer or timeout
submitLeft/Right() → if (wrong) soundFalse.play()

// Victory
win() → soundWin.play()
```

**ALWAYS:**
- Play click sound on all button interactions
- Play success/failure sounds immediately after answer evaluation
- Sync thunder with lightning flash
- Maintain wolf howl random intervals
- Use .catch(() => {}) for all audio plays (browser compatibility)

**NEVER:**
- Play sounds without user interaction first (browser blocks)
- Stack multiple sounds simultaneously (except bg music)
- Play sounds during transitions (wait for completion)
- Remove sound feedback from any interaction

### 3. Volume Mixing Strategy

**Volume Hierarchy:**
```
Priority 1 (Loudest): Sound Effects (1.0)
  - soundTrue, soundFalse, soundWin, soundClick
  
Priority 2 (Medium): Thunder (0.8)
  - bgMusicThunder
  
Priority 3 (Background): Ambient Music (0.6-1.0)
  - bgMusicBat (1.0)
  - bgMusicBell (0.6)
  
Priority 4 (Subtle): Wolf Howl (0.2)
  - bgMusicWolf
```

**Mixing Rules:**
- Sound effects must be clearly audible over background
- Background music should be atmospheric, not distracting
- Thunder should be noticeable but not jarring
- Wolf howl should be distant and occasional

### 4. Audio Timing & Synchronization

**Immediate Playback (0ms delay):**
- Button clicks
- Correct/wrong answer feedback
- Victory sound

**Synchronized Playback:**
```javascript
function triggerLightning() {
  // Visual and audio must start together
  bgMusicThunder.currentTime = 0;  // Reset to start
  bgMusicThunder.play();
  lightningFlash.classList.add('flash');
}
```

**Delayed/Random Playback:**
```javascript
// Wolf howl: 1-5 seconds after previous
const randomDelay = Math.floor(Math.random() * 4000) + 1000;
setTimeout(() => bgMusicWolf.play(), randomDelay);
```

### 5. Audio State Management

**Initialization:**
```javascript
// Create audio objects
const soundTrue = new Audio('assets/audio/true.mp3');
const bgMusicBat = document.getElementById('bgMusicBat');

// Set initial volumes
bgMusicBat.volume = 1.0;
bgMusicBell.volume = 0.6;
bgMusicWolf.volume = 0.2;
```

**Cleanup:**
```javascript
// On game restart or back to home
function backToHome() {
  clearInterval(timerInterval);
  clearTimeout(aiTimeout);
  // Background music continues playing
}
```

**Error Handling:**
```javascript
// All audio plays must have error handling
audio.play().catch(() => {});
// Silent fail if:
// - Browser blocks autoplay
// - File not found
// - Format not supported
```

## Forbidden Behaviors

### NEVER:
1. Remove audio files or audio system
2. Use cheerful, upbeat, or happy music
3. Add realistic horror sounds (screams, gore, violence)
4. Play sounds before user interaction (browser blocks)
5. Remove error handling (.catch) from audio plays
6. Change volume levels drastically (keep within ±0.3)
7. Disable background music during gameplay
8. Remove sound feedback from user actions
9. Add non-thematic sounds (bells, chimes, success jingles)
10. Stack too many sounds simultaneously (causes distortion)

## Parameters Kiro May Adjust

### Safe to Modify:
- Volume levels (within ±0.3 of original)
- Wolf howl random interval range (1-10s acceptable)
- Lightning frequency (3-15s acceptable)
- Audio fade in/out durations
- Error handling messages (console logs)

### Requires Approval:
- Adding new audio files
- Removing existing audio files
- Changing audio file formats
- Major volume hierarchy changes
- Disabling audio system

## Style/Vibe Guidelines

### Audio Atmosphere:
- **Dark & Ominous:** Background music should be foreboding
- **Supernatural:** Sounds should feel otherworldly
- **Atmospheric:** Ambient sounds create immersion
- **Responsive:** Clear feedback for all actions
- **Layered:** Multiple audio sources create depth

### Sound Design Principles:
- **Clarity:** Effects must be distinguishable
- **Consistency:** Similar actions = similar sounds
- **Subtlety:** Background shouldn't overpower gameplay
- **Immersion:** Sounds enhance the spooky theme
- **Feedback:** Every action has audio response

## Examples

### When Adding Sound Triggers:

**✅ CORRECT:**
```javascript
function submitLeft() {
  if (v === leftQ.ans) {
    soundTrue.play().catch(() => {});
    gameMsg.textContent = '👻 Spectral Success!';
  } else {
    soundFalse.play().catch(() => {});
    gameMsg.textContent = '💀 Bone-chilling Blunder!';
  }
}
```

**❌ INCORRECT:**
```javascript
function submitLeft() {
  if (v === leftQ.ans) {
    // No sound feedback
    gameMsg.textContent = 'Correct!';
  } else {
    // No sound feedback
    gameMsg.textContent = 'Wrong!';
  }
}
```

### When Synchronizing Audio-Visual:

**✅ CORRECT:**
```javascript
function triggerLightning() {
  // Audio and visual start together
  if (bgMusicThunder) {
    bgMusicThunder.currentTime = 0;
    bgMusicThunder.volume = 0.8;
    bgMusicThunder.play().catch(() => {});
  }
  lightningFlash.classList.add('flash');
  document.body.classList.add('lightning-active');
}
```

**❌ INCORRECT:**
```javascript
function triggerLightning() {
  // Visual only, no audio
  lightningFlash.classList.add('flash');
}
```

## Kiro Execution Protocol

### When Asked to Modify Audio:

1. **Analyze Audio Context:**
   - What event triggers the sound?
   - Is it background or effect?
   - What's the priority level?
   - Does it sync with visuals?

2. **Check Theme Compliance:**
   - Is the sound spooky/atmospheric?
   - Does it fit Halloween theme?
   - Is volume appropriate for context?
   - Does it enhance immersion?

3. **Verify Technical Requirements:**
   - Error handling present (.catch)?
   - Volume level appropriate?
   - Timing synchronized correctly?
   - Browser compatibility maintained?

4. **Test Integration:**
   - Does it play at right moment?
   - Does it conflict with other sounds?
   - Is it audible but not overwhelming?
   - Does it enhance user experience?

### Decision Tree:
```
Request to add/modify audio
  ↓
Is it thematically appropriate? → NO → Reject or propose spooky alternative
  ↓ YES
Does it have error handling? → NO → Add .catch(() => {})
  ↓ YES
Is volume level appropriate? → NO → Adjust to hierarchy
  ↓ YES
Is timing synchronized? → NO → Sync with visual/event
  ↓ YES
Does it enhance experience? → NO → Reconsider necessity
  ↓ YES
PROCEED with implementation
```

### Cross-File Consistency:
- Check THEME_STEERING.md for atmospheric requirements
- Check ANIMATION_STEERING.md for timing synchronization
- Check GAME_LOGIC_STEERING.md for event triggers
- Check UI_STEERING.md for interaction feedback

## Audio-Visual Synchronization Matrix

| Visual Event | Audio Trigger | Timing | Volume |
|--------------|---------------|--------|--------|
| Button hover | None | N/A | N/A |
| Button click | soundClick | Immediate | 1.0 |
| Correct answer | soundTrue | Immediate | 1.0 |
| Wrong answer | soundFalse | Immediate | 1.0 |
| Timeout | soundFalse | Immediate | 1.0 |
| Victory flash | soundWin | Immediate | 1.0 |
| Lightning flash | bgMusicThunder | Synchronized | 0.8 |
| Character move | None | N/A | N/A |
| Turn switch | None | N/A | N/A |
| Game start | bgMusic (all) | On first click | Varies |

## Audio Feedback Patterns

### Success Pattern:
```javascript
soundTrue.play() + Green glow + Success message
```

### Failure Pattern:
```javascript
soundFalse.play() + Red flash + Failure message
```

### Victory Pattern:
```javascript
soundWin.play() + Screen flashes + Victory message
```

### Atmospheric Pattern:
```javascript
bgMusicBat (continuous) + 
bgMusicBell (continuous) + 
bgMusicWolf (random) + 
bgMusicThunder (lightning-synced)
```

## Browser Compatibility Notes

### Autoplay Restrictions:
```javascript
// Modern browsers block autoplay until user interaction
// Solution: Start audio on first click
document.addEventListener('click', () => {
  if (bgMusicBat.paused) {
    bgMusicBat.play().catch(() => {});
  }
});
```

### Error Handling:
```javascript
// Always use .catch() to prevent console errors
audio.play().catch(() => {
  // Silent fail - acceptable for audio
  // User may have:
  // - Blocked autoplay
  // - Muted browser
  // - No audio device
  // - Unsupported format
});
```

### Format Support:
- **Primary:** MP3 (best compatibility)
- **Fallback:** Not implemented (MP3 works everywhere)
- **Bitrate:** 128kbps recommended
- **Sample Rate:** 44.1kHz standard

## Audio Performance Optimization

### Best Practices:
- Preload audio elements in HTML
- Use Audio() constructor for effects
- Reset currentTime for repeated sounds
- Limit simultaneous audio streams (4-5 max)
- Use compressed formats (MP3)
- Keep file sizes small (<500KB each)

### Current Implementation:
```html
<!-- Preloaded in HTML -->
<audio id="bgMusicBat" src="assets/audio/bat.mp3" loop></audio>
<audio id="bgMusicBell" src="assets/audio/bell.mp3" loop></audio>
<audio id="bgMusicWolf" src="assets/audio/wolf.mp3"></audio>
<audio id="bgMusicThunder" src="assets/audio/thunder.mp3"></audio>
```

```javascript
// Created on demand
const soundTrue = new Audio('assets/audio/true.mp3');
const soundFalse = new Audio('assets/audio/false.mp3');
const soundWin = new Audio('assets/audio/win.mp3');
const soundClick = new Audio('assets/audio/click.mp3');
```

## Spooky Audio Checklist

Before completing any audio modification, verify:

- [ ] Sound is thematically appropriate (spooky/atmospheric)
- [ ] Error handling present (.catch)
- [ ] Volume level appropriate for context
- [ ] Timing synchronized with visuals (if applicable)
- [ ] No cheerful or upbeat sounds
- [ ] No realistic horror/gore sounds
- [ ] Browser compatibility maintained
- [ ] Performance impact minimal
- [ ] User feedback clear and immediate
- [ ] Enhances overall atmosphere

## Version Control
- **Created:** December 2, 2025
- **Last Updated:** December 2, 2025
- **Version:** 1.0
- **Maintained By:** Kiro AI Assistant
- **Audio Authority:** Master reference for all sound decisions

