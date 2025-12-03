---
inclusion: always
priority: high
---

# Theme Steering - Spooky Math Tug of War

## Purpose
This steering document enforces the dark Halloween aesthetic across all visual, audio, and interactive elements. It serves as the master reference for maintaining thematic consistency throughout the entire project.

## Scope of Influence
- Color palette and gradients
- Visual effects (fog, rain, lightning, particles)
- Creature animations (ghosts, bats)
- Atmospheric elements (candles, shadows)
- Emoji usage and iconography
- Overall mood and tone
- Cross-component theme coherence

## Core Behavioral Rules

### 1. Color Palette (IMMUTABLE)

**Primary Colors:**
```css
:root {
  --bg-primary: #0a0a0a;           /* Deep black - main background */
  --bg-secondary: #1a0f1a;         /* Dark purple-black - secondary bg */
  --panel: #2a1a2acc;              /* Semi-transparent panel bg */
  --accent: #8b5cf6;               /* Purple - left player, primary */
  --accent-secondary: #10b981;     /* Green - right player/AI, success */
  --accent-tertiary: #f97316;      /* Orange - warnings, timers */
  --text-primary: #e5e7eb;         /* Light gray - readable text */
  --text-glow: #a855f7;            /* Bright purple - glow effects */
}
```

**Shadow Presets:**
```css
--shadow-glow: 0 0 20px rgba(168, 85, 247, 0.3);      /* Purple glow */
--shadow-orange: 0 0 15px rgba(249, 115, 22, 0.4);    /* Orange glow */
--shadow-green: 0 0 15px rgba(16, 185, 129, 0.4);     /* Green glow */
```

**NEVER:**
- Use colors outside this palette
- Add bright, cheerful colors (yellow, pink, cyan, bright blue)
- Use pure white (#ffffff) except for lightning flashes
- Remove or dilute the purple undertones
- Create light mode or bright themes

### 2. Halloween Emoji System

**Approved Emojis:**
- **Ghosts:** 👻 (primary mascot)
- **Pumpkins:** 🎃 (secondary mascot)
- **Witches:** 🧙‍♀️ (magic theme)
- **Demons:** 😈 (challenge theme)
- **Skulls:** 💀 (danger theme)
- **Bats:** 🦇 (atmospheric)
- **Spiders:** 🕷️ (creepy)
- **Webs:** 🕸️ (spooky)
- **Moon:** 🌙 (night theme)
- **Candles:** 🕯️ (ambiance)
- **Crystal Ball:** 🔮 (mystical)
- **Lightning:** ⚡ (power)
- **Mushrooms:** 🍄 (forest/poison)
- **Timers:** ⏰⏳⌛🕰️ (time pressure)

**Usage Rules:**
- Every game mode button MUST have an emoji
- Every status message MUST include at least one emoji
- Victory/defeat messages MUST have 2-3 emojis
- AI difficulty levels MUST have emoji indicators

**NEVER:**
- Use happy, cute emojis (😊, 🌈, ⭐, 🎉)
- Remove emojis from existing UI text
- Use non-Halloween themed emojis

### 3. Atmospheric Effects (REQUIRED)

**Weather System:**
```javascript
// Rain: 100 drops, purple-tinted, continuous
// Lightning: Every 5-12 seconds, white flash with thunder
// Fog: 3 layers (drift, swirl, ground), purple/green tints
```

**Creature System:**
```javascript
// Ghosts: 2 floating, 18-20s cycles, purple glow
// Bats: 3 flying, 12-18s paths, fade in/out
// Candles: 2 flickering, corners, 1.8-2s cycles
```

**ALWAYS:**
- Keep all atmospheric effects active
- Maintain particle counts (100 rain drops)
- Preserve animation timing ranges
- Keep creature opacity ranges (0.2-0.5)

**NEVER:**
- Disable weather effects for "performance"
- Remove creatures or candles
- Make effects too subtle (must be noticeable)
- Add non-Halloween creatures (butterflies, birds, flowers)

### 4. Visual Effect Hierarchy

**Glow Intensity Levels:**
```css
/* Subtle: Background ambiance */
box-shadow: 0 0 10px rgba(168, 85, 247, 0.2);

/* Medium: Interactive elements */
box-shadow: 0 0 20px rgba(168, 85, 247, 0.4);

/* Strong: Active/hover states */
box-shadow: 0 0 35px rgba(168, 85, 247, 0.7);

/* Intense: Victory/special events */
box-shadow: 0 0 50px rgba(168, 85, 247, 1.0);
```

**Blur & Transparency:**
- Panels: `backdrop-filter: blur(15px)`, opacity 0.8-0.9
- Fog: opacity 0.3-0.7, multiple layers
- Creatures: opacity 0.2-0.5, drop-shadow filters
- Rain: opacity 0.4-0.8, gradient transparency

### 5. Thematic Consistency Rules

**Dark & Mysterious:**
- All backgrounds must be dark (#0a0a0a to #2a1a2a range)
- Light sources only from glows, lightning, candles
- Shadows should be deep and prominent
- Contrast should be high but not harsh

**Supernatural & Ethereal:**
- Everything glows (purple, green, orange)
- Smooth, floating animations (no sharp movements)
- Transparency and blur create depth
- Particles and effects always present

**Ominous but Playful:**
- Scary aesthetic but not horror/gore
- Competitive but not aggressive
- Mysterious but not confusing
- Spooky but family-friendly

## Forbidden Behaviors

### NEVER:
1. Add bright, cheerful themes or "light mode"
2. Remove atmospheric effects (rain, fog, lightning, creatures)
3. Use non-Halloween emojis or remove existing ones
4. Change color palette to non-spooky colors
5. Simplify effects for a "cleaner" look
6. Add realistic gore or truly scary horror elements
7. Remove glow effects from any element
8. Use flat design without depth/shadows
9. Add daytime or bright outdoor themes
10. Break the supernatural, mystical atmosphere

## Parameters Kiro May Adjust

### Safe to Modify:
- Glow intensity within established ranges
- Animation timing (keep within 2x of original)
- Particle counts (±20% of original)
- Opacity values (within 0.2-0.9 range)
- Shadow blur radius (within reason)
- Creature animation paths (maintain character)
- Fog density and movement speed

### Requires Approval:
- Color palette changes
- Removing atmospheric effects
- Changing emoji system
- Major theme direction changes
- Adding non-Halloween elements

## Style/Vibe Guidelines

### Visual Mood Board:
```
🌙 Midnight graveyard under purple moon
👻 Friendly ghosts floating in mist
🎃 Jack-o'-lanterns glowing in darkness
⚡ Lightning illuminating haunted mansion
🦇 Bats flying across foggy sky
🕯️ Flickering candles casting shadows
🔮 Crystal ball with swirling purple energy
```

### Atmosphere Keywords:
- **Dark** - Deep blacks, minimal light sources
- **Mystical** - Purple glows, magical effects
- **Ethereal** - Floating, transparent, ghostly
- **Ominous** - Foreboding but not terrifying
- **Supernatural** - Beyond natural, magical
- **Competitive** - Two sides battling
- **Atmospheric** - Weather, particles, ambiance

### Tone Balance:
```
Spooky ████████░░ (80%) - Dominant theme
Playful ██████░░░░ (60%) - Keep it fun
Mysterious ███████░░░ (70%) - Maintain intrigue
Competitive ████████░░ (80%) - Clear opposition
Educational ████░░░░░░ (40%) - Subtle, not primary
```

## Examples

### When Adding New Visual Elements:

**✅ CORRECT:**
```css
.new-element {
  background: linear-gradient(135deg, 
    rgba(42, 26, 42, 0.8) 0%, 
    rgba(26, 15, 26, 0.9) 100%);
  border: 2px solid rgba(168, 85, 247, 0.4);
  box-shadow: 
    0 0 20px rgba(168, 85, 247, 0.3),
    inset 0 0 10px rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(15px);
}
```

**❌ INCORRECT:**
```css
.new-element {
  background: #ffffff;
  border: 1px solid #cccccc;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}
```

### When Adding Messages:

**✅ CORRECT:**
```javascript
const messages = [
  '👻 Spectral Success!',
  '🎃 Pumpkin Power Unleashed!',
  '💀 Bone-chilling Blunder!',
  '🧙‍♀️ Witch\'s Wisdom Prevails!'
];
```

**❌ INCORRECT:**
```javascript
const messages = [
  'Great job!',
  'Nice work!',
  'Oops, try again!',
  'You got it!'
];
```

## Kiro Execution Protocol

### When Asked to Add/Modify Theme Elements:

1. **Verify Theme Compliance:**
   - Check color palette adherence
   - Ensure Halloween emoji usage
   - Confirm atmospheric effects maintained
   - Validate glow/shadow presence

2. **Cross-Reference Steering:**
   - UI_STEERING.md for visual consistency
   - ANIMATION_STEERING.md for effect timing
   - AUDIO_STEERING.md for sound atmosphere

3. **Maintain Balance:**
   - Spooky but not terrifying
   - Dark but readable
   - Atmospheric but performant
   - Themed but functional

4. **Test Coherence:**
   - Does it fit the Halloween theme?
   - Does it match existing aesthetic?
   - Does it enhance the atmosphere?
   - Does it maintain playfulness?

### Decision Tree:
```
Request to add/modify theme element
  ↓
Is it Halloween-themed? → NO → Reject or propose spooky alternative
  ↓ YES
Does it use approved colors? → NO → Convert to palette colors
  ↓ YES
Does it include appropriate emojis? → NO → Add Halloween emojis
  ↓ YES
Does it maintain dark atmosphere? → NO → Darken and add glow
  ↓ YES
Does it fit supernatural vibe? → NO → Add ethereal effects
  ↓ YES
PROCEED with implementation
```

## Spooky Consistency Layer

### Cross-Component Theme Enforcement:

**UI Components:**
- All buttons: Purple gradient + glow + emoji
- All panels: Dark semi-transparent + blur + border glow
- All text: Spooky fonts + appropriate shadows
- All inputs: Dark + purple border + glow on focus

**Animations:**
- All movements: Smooth, floating, ethereal
- All transitions: 400-600ms with easing
- All effects: Pulsing, drifting, fading
- All particles: Continuous, atmospheric

**Audio:**
- All music: Dark, ominous, atmospheric
- All effects: Supernatural, mystical sounds
- All feedback: Thematically appropriate

**Logic:**
- All messages: Include Halloween emojis
- All modes: Halloween-themed names
- All states: Spooky descriptions

## Theme Validation Checklist

Before completing any modification, verify:

- [ ] Uses only approved color palette
- [ ] Includes Halloween emojis where appropriate
- [ ] Maintains dark background
- [ ] Has glow/shadow effects
- [ ] Uses spooky fonts (Creepster/Nosifer/Griffy)
- [ ] Preserves atmospheric effects
- [ ] Fits supernatural/mystical vibe
- [ ] Balances spooky with playful
- [ ] Maintains competitive distinction
- [ ] Enhances overall atmosphere

## Version Control
- **Created:** December 2, 2025
- **Last Updated:** December 2, 2025
- **Version:** 1.0
- **Maintained By:** Kiro AI Assistant
- **Theme Authority:** Master reference for all aesthetic decisions

