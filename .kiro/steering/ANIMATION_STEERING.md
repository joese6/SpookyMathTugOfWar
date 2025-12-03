---
inclusion: always
priority: high
---

# Animation Steering - Spooky Math Tug of War

## Purpose
This steering document governs all animations, transitions, and motion effects, ensuring smooth, ethereal movements that enhance the supernatural Halloween atmosphere while maintaining 60 FPS performance.

## Scope of Influence
- CSS animations and keyframes
- JavaScript-triggered animations
- Transition timing and easing
- Character/rope movement
- Atmospheric effects (fog, rain, lightning, creatures)
- UI element animations
- Performance optimization

## Core Behavioral Rules

### 1. Animation Performance (CRITICAL)

**GPU-Accelerated Properties ONLY:**
```css
/* ALWAYS animate these (GPU-accelerated): */
transform: translateX(), translateY(), scale(), rotate()
opacity: 0-1
filter: blur(), brightness(), drop-shadow()

/* NEVER animate these (CPU-bound, causes jank): */
width, height, top, left, right, bottom
margin, padding
background-position (use transform instead)
```

**Performance Directives:**
```css
/* Required for smooth animations */
.animated-element {
  will-change: transform;
  transform: translateZ(0);  /* Force GPU layer */
  transition: transform 400ms ease-in-out;
}
```

**ALWAYS:**
- Use `transform` for position changes
- Use `opacity` for visibility changes
- Use `will-change` for frequently animated elements
- Target 60 FPS (16.67ms per frame)
- Test on mobile devices

**NEVER:**
- Animate layout properties (width, height, margin, padding)
- Use `position: absolute` with animated top/left
- Create more than 5-6 simultaneous complex animations
- Animate without easing functions
- Forget to remove `will-change` after animation

### 2. Character/Rope Movement System (IMMUTABLE)

**Movement Formula:**
```javascript
offset = (rightSteps - leftSteps) * 30px
```

**Implementation:**
```javascript
function updateRope() {
  const offset = (rightSteps - leftSteps) * stepPx; // stepPx = 30
  
  // Apply to wrapper (not the animated .rope element)
  if (ropeWrap) {
    ropeWrap.style.transform = `translateX(${offset}px)`;
    
    // Add visual effect
    if (rope) {
      rope.classList.add('moving');
      setTimeout(() => rope.classList.remove('moving'), 600);
    }
  }
}
```

**CSS:**
```css
.rope-wrap {
  transition: transform 0.45s ease-in-out;
  will-change: transform;
}

.rope {
  animation: ropeFloat 4s ease-in-out infinite;
  transition: transform 400ms cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.rope.moving {
  filter: 
    drop-shadow(0 0 25px rgba(168, 85, 247, 0.9))
    drop-shadow(0 0 35px rgba(249, 115, 22, 0.7))
    brightness(1.3);
}
```

**NEVER:**
- Change the 30px step size
- Animate rope position with left/right properties
- Remove the floating animation
- Skip the "moving" visual effect
- Change timing below 300ms or above 800ms

### 3. Animation Timing Hierarchy

**Interaction Animations (Fast - 200-400ms):**
```css
/* Button hover, key press, input focus */
transition: all 0.3s ease;
transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
```

**Character Movement (Medium - 400-600ms):**
```css
/* Rope position, character effects */
transition: transform 0.45s ease-in-out;
transition: transform 400ms cubic-bezier(0.175, 0.885, 0.32, 1.275);
```

**Ambient Effects (Slow - 2-8s):**
```css
/* Title glow, panel shimmer, mystical effects */
animation: titleGlow 3s ease-in-out infinite alternate;
animation: panelShimmer 6s ease-in-out infinite;
animation: mysticalGlow 8s ease-in-out infinite alternate;
```

**Atmospheric Effects (Very Slow - 12-45s):**
```css
/* Ghosts, bats, fog, weather */
animation: ghostFloat 18s ease-in-out infinite;
animation: batFly1 12s linear infinite;
animation: fogDrift 20s ease-in-out infinite;
animation: fogSwirl 30s linear infinite;
```

### 4. Easing Functions (REQUIRED)

**Standard Easing:**
```css
ease-in-out      /* Smooth start and end */
ease-out         /* Fast start, slow end */
linear           /* Constant speed (creatures, fog) */
```

**Custom Easing (Bouncy):**
```css
cubic-bezier(0.175, 0.885, 0.32, 1.275)  /* Slight overshoot */
```

**Usage Rules:**
- **ease-in-out:** UI interactions, character movement
- **ease-out:** Lightning, flashes, quick effects
- **linear:** Continuous loops (fog, rain, creatures)
- **cubic-bezier:** Playful interactions (buttons, hover)

**NEVER:**
- Use `ease-in` (feels sluggish)
- Use no easing (feels robotic)
- Use extreme cubic-bezier values (causes jank)

### 5. Atmospheric Animation System

**Rain System:**
```css
.rain-drop {
  animation: rainFall linear infinite;
  animation-duration: 0.8s to 2s (randomized);
  animation-delay: 0s to 2s (randomized);
  opacity: 0.4 to 0.8 (randomized);
}

@keyframes rainFall {
  0% { transform: translateY(-100px); opacity: 0; }
  10% { opacity: 0.7; }
  90% { opacity: 0.7; }
  100% { transform: translateY(100vh); opacity: 0; }
}
```

**Lightning System:**
```css
.lightning-flash {
  animation: lightningStrike 0.5s ease-out;
}

@keyframes lightningStrike {
  0% { opacity: 0; }
  5% { opacity: 1; }
  10% { opacity: 0.3; }
  15% { opacity: 0.95; }
  25% { opacity: 0.2; }
  30% { opacity: 0.9; }
  40% { opacity: 0.1; }
  45% { opacity: 0.7; }
  100% { opacity: 0; }
}
```

**Fog System:**
```css
.fog-overlay {
  animation: fogDrift 20s ease-in-out infinite;
}

.fog-overlay::before {
  animation: fogSwirl 30s linear infinite;
}

.fog-overlay::after {
  animation: groundFog 15s ease-in-out infinite alternate;
}
```

**Creature System:**
```css
/* Ghosts: Floating, rotating, fading */
.ghost {
  animation: ghostFloat 18-20s ease-in-out infinite;
}

/* Bats: Flying paths with direction flip */
.bat {
  animation: batFly1/2/3 12-18s linear infinite;
}

/* Candles: Flickering brightness */
.container::before,
.container::after {
  animation: candleFlicker 1.8-2s ease-in-out infinite alternate;
}
```

## Forbidden Behaviors

### NEVER:
1. Animate width, height, margin, padding, or layout properties
2. Use position: absolute with animated top/left/right/bottom
3. Remove GPU acceleration (will-change, translateZ)
4. Create animations faster than 200ms (too jarring)
5. Create animations slower than 45s (feels broken)
6. Remove easing functions (use linear at minimum)
7. Disable atmospheric animations for "performance"
8. Stack more than 6 complex animations simultaneously
9. Animate during page load (wait for DOMContentLoaded)
10. Use `!important` to override animation properties

## Parameters Kiro May Adjust

### Safe to Modify:
- Animation durations (within 2x of original)
- Easing functions (within standard set)
- Opacity ranges (0.1-0.9)
- Transform values (scale, rotate, translate)
- Animation delays
- Iteration counts (finite to infinite)
- Filter intensities (blur, brightness)

### Requires Approval:
- Changing from transform to layout animations
- Removing GPU acceleration
- Major timing changes (>2x original)
- Removing atmospheric effects
- Adding CPU-intensive animations

## Style/Vibe Guidelines

### Animation Personality:
- **Ethereal:** Floating, drifting, ghostly
- **Smooth:** No sharp movements or jumps
- **Mystical:** Pulsing glows, swirling effects
- **Supernatural:** Defying physics slightly
- **Atmospheric:** Continuous ambient motion
- **Responsive:** Immediate feedback to actions

### Motion Principles:
- **Floating:** Everything should feel weightless
- **Drifting:** Slow, meandering movements
- **Pulsing:** Rhythmic intensity changes
- **Fading:** Smooth opacity transitions
- **Glowing:** Expanding/contracting light
- **Swirling:** Circular, rotating motions

## Examples

### When Adding Character Animation:

**✅ CORRECT:**
```javascript
function updateRope() {
  const offset = (rightSteps - leftSteps) * 30;
  ropeWrap.style.transform = `translateX(${offset}px)`;
  
  rope.classList.add('moving');
  setTimeout(() => rope.classList.remove('moving'), 600);
}
```

```css
.rope-wrap {
  transition: transform 0.45s ease-in-out;
  will-change: transform;
}
```

**❌ INCORRECT:**
```javascript
function updateRope() {
  const offset = (rightSteps - leftSteps) * 30;
  rope.style.left = offset + 'px';  // BAD: Animating layout property
}
```

```css
.rope {
  transition: left 0.45s ease-in-out;  /* BAD: CPU-bound */
}
```

### When Adding UI Animation:

**✅ CORRECT:**
```css
.button {
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.button:hover {
  transform: translateY(-4px) scale(1.02);
  box-shadow: 0 0 35px rgba(168, 85, 247, 0.7);
}
```

**❌ INCORRECT:**
```css
.button {
  transition: all 0.4s;
}

.button:hover {
  margin-top: -4px;  /* BAD: Animating layout */
  width: 102%;       /* BAD: Animating layout */
}
```

## Kiro Execution Protocol

### When Asked to Add/Modify Animations:

1. **Check Performance Impact:**
   - Is it GPU-accelerated (transform/opacity)?
   - Does it use will-change appropriately?
   - Will it maintain 60 FPS?
   - How many simultaneous animations?

2. **Verify Timing Appropriateness:**
   - Interaction: 200-400ms
   - Character: 400-600ms
   - Ambient: 2-8s
   - Atmospheric: 12-45s

3. **Confirm Easing Selection:**
   - UI: ease-in-out or cubic-bezier
   - Character: ease-in-out
   - Ambient: ease-in-out alternate
   - Atmospheric: linear or ease-in-out

4. **Test Supernatural Feel:**
   - Does it feel ethereal/floating?
   - Does it enhance spooky atmosphere?
   - Is it smooth and fluid?
   - Does it fit the theme?

### Decision Tree:
```
Request to add/modify animation
  ↓
Is it GPU-accelerated? → NO → Convert to transform/opacity
  ↓ YES
Is timing appropriate? → NO → Adjust to hierarchy
  ↓ YES
Does it have easing? → NO → Add appropriate easing
  ↓ YES
Does it feel supernatural? → NO → Add floating/pulsing effect
  ↓ YES
Will it maintain 60 FPS? → NO → Optimize or simplify
  ↓ YES
PROCEED with implementation
```

### Cross-File Consistency:
- Check THEME_STEERING.md for visual effects requirements
- Check AUDIO_STEERING.md for audio-visual synchronization
- Check UI_STEERING.md for interaction timing
- Check GAME_LOGIC_STEERING.md for state-triggered animations

## Animation Synchronization Matrix

| Event | Animation | Duration | Easing | Audio Sync |
|-------|-----------|----------|--------|------------|
| Button hover | translateY(-2px) | 300ms | cubic-bezier | None |
| Button click | scale(0.98) | 100ms | ease-out | soundClick |
| Correct answer | Green glow pulse | 1000ms | ease-in-out | soundTrue |
| Wrong answer | Red flash | 800ms | ease-out | soundFalse |
| Character move | translateX(±30px) | 450ms | ease-in-out | None |
| Victory | Screen flash 8x | 4000ms | ease-in-out | soundWin |
| Lightning | Flash multi-stage | 500ms | ease-out | bgMusicThunder |
| Turn switch | Fade transition | 400ms | ease-in-out | None |

## Performance Optimization Checklist

Before completing any animation modification, verify:

- [ ] Uses transform/opacity (not layout properties)
- [ ] Has will-change on frequently animated elements
- [ ] Uses appropriate easing function
- [ ] Duration within acceptable range
- [ ] Tested at 60 FPS
- [ ] No more than 6 simultaneous complex animations
- [ ] GPU-accelerated (translateZ(0) if needed)
- [ ] Removes will-change after animation complete
- [ ] Feels smooth and ethereal
- [ ] Enhances supernatural atmosphere

## Common Animation Patterns

### Glow Pulse:
```css
@keyframes glowPulse {
  0%, 100% { 
    box-shadow: 0 0 20px rgba(168, 85, 247, 0.4);
    transform: scale(1);
  }
  50% { 
    box-shadow: 0 0 35px rgba(168, 85, 247, 0.7);
    transform: scale(1.02);
  }
}
```

### Float Effect:
```css
@keyframes float {
  0%, 100% { 
    transform: translateY(0px) rotate(0deg);
  }
  50% { 
    transform: translateY(-10px) rotate(2deg);
  }
}
```

### Fade In/Out:
```css
@keyframes fadeInOut {
  0%, 100% { opacity: 0; }
  10%, 90% { opacity: 0.5; }
  50% { opacity: 1; }
}
```

### Shimmer:
```css
@keyframes shimmer {
  0% { opacity: 0.3; }
  50% { opacity: 0.6; }
  100% { opacity: 0.3; }
}
```

## Version Control
- **Created:** December 2, 2025
- **Last Updated:** December 2, 2025
- **Version:** 1.0
- **Maintained By:** Kiro AI Assistant
- **Animation Authority:** Master reference for all motion decisions

