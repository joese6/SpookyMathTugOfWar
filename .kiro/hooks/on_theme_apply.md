---
name: on_theme_apply
trigger: manual
description: Automatically validates and enforces spooky theme consistency across all project files
---

# Hook: On Theme Apply

## Trigger Condition
This hook is manually triggered when:
- User requests theme modifications
- User adds new UI components
- User changes colors or visual effects
- User modifies atmospheric elements
- User updates emoji usage

## Purpose
Automatically validate that all theme changes maintain the dark Halloween aesthetic and spooky consistency across HTML, CSS, and JavaScript files.

## Transformation Rules

### 1. Color Palette Validation
**Check all CSS files for:**
- Only approved colors from palette
- No bright, cheerful colors (yellow, pink, cyan, bright blue)
- Purple (#8b5cf6) for left player/primary
- Green (#10b981) for right player/AI
- Orange (#f97316) for warnings/timers
- Dark backgrounds (#0a0a0a, #1a0f1a)

**Action:**
```javascript
// Scan style.css for color usage
// Flag any colors outside approved palette
// Suggest spooky alternatives
```

### 2. Emoji Consistency Check
**Verify all HTML and JavaScript for:**
- Game mode buttons have Halloween emojis
- Status messages include spooky emojis
- Victory/defeat messages have 2-3 emojis
- No happy/cute emojis (😊, 🌈, ⭐, 🎉)

**Action:**
```javascript
// Scan index.html and script.js
// Ensure all user-facing text has appropriate emojis
// Replace non-Halloween emojis with spooky alternatives
```

### 3. Atmospheric Effects Validation
**Ensure presence of:**
- Rain system (100 drops)
- Lightning cycle (5-12s intervals)
- Fog layers (3 layers: drift, swirl, ground)
- Ghosts (2 floating)
- Bats (3 flying)
- Candles (2 flickering)

**Action:**
```javascript
// Verify all atmospheric elements present in CSS
// Check JavaScript initialization functions
// Ensure particle counts maintained
```

### 4. Glow Effect Enforcement
**Check all interactive elements for:**
- Box-shadow glow effects
- Text-shadow on titles
- Drop-shadow on creatures
- Hover state enhancements

**Action:**
```javascript
// Scan CSS for missing glow effects
// Add appropriate shadows to new elements
// Ensure hover states enhance spookiness
```

## Example Automation Use-Case

### Scenario: User adds new button
```html
<!-- User adds: -->
<button class="newBtn" onclick="doSomething()">
  Start Game
</button>
```

**Hook automatically:**
1. Detects missing Halloween emoji
2. Detects missing spooky styling
3. Suggests correction:

```html
<button class="newBtn" onclick="playClick(); doSomething()">
  👻 Start Haunted Game
</button>
```

```css
.newBtn {
  background: linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%);
  border: 2px solid #8b5cf6;
  box-shadow: 0 0 20px rgba(168, 85, 247, 0.3);
  font-family: 'Nosifer', cursive;
  text-shadow: 0 0 8px rgba(0, 0, 0, 0.8);
}
```

## Allowed Modifications

### ✅ PERMITTED:
- Adjusting glow intensity (within ranges)
- Adding new spooky elements
- Enhancing atmospheric effects
- Improving Halloween theme
- Adding more creatures/particles
- Darkening backgrounds further
- Increasing shadow depth

### ❌ FORBIDDEN:
- Removing atmospheric effects
- Using non-Halloween colors
- Removing emojis
- Adding bright themes
- Simplifying for "cleaner" look
- Removing glow effects
- Using non-spooky fonts

## Dynamic Behaviors Based on Difficulty

### Easy Mode (Friendly Ghost):
- Slightly brighter atmosphere (opacity +10%)
- More playful creature animations
- Softer glow effects

### Normal Mode (Restless Spirit):
- Standard atmospheric intensity
- Balanced spookiness
- Medium glow effects

### Hard Mode (Demon Scholar):
- Darker atmosphere (opacity -10%)
- More intense creature movements
- Stronger glow effects
- More frequent lightning

## Validation Checklist

When hook executes, verify:
- [ ] All colors from approved palette
- [ ] All buttons have Halloween emojis
- [ ] All messages have spooky emojis
- [ ] Atmospheric effects present
- [ ] Glow effects on interactive elements
- [ ] Dark backgrounds maintained
- [ ] Spooky fonts used (Creepster/Nosifer/Griffy)
- [ ] No bright, cheerful elements
- [ ] Shadows and depth present
- [ ] Theme consistency across files

## Hook Execution Flow

```
User modifies theme element
  ↓
Hook triggered
  ↓
Scan HTML for emoji usage
  ↓
Scan CSS for color palette
  ↓
Scan CSS for atmospheric effects
  ↓
Scan CSS for glow effects
  ↓
Generate validation report
  ↓
If violations found:
  - List violations
  - Suggest corrections
  - Provide code examples
  ↓
If all valid:
  - Confirm theme consistency
  - Log validation success
```

## Integration with Steering Documents

This hook enforces rules from:
- **THEME_STEERING.md:** Color palette, emoji system, atmospheric effects
- **UI_STEERING.md:** Visual consistency, interactive elements
- **ANIMATION_STEERING.md:** Creature animations, effect timing

## Output Format

```
🎃 THEME VALIDATION REPORT 🎃

✅ Color Palette: VALID
✅ Emoji Usage: VALID
✅ Atmospheric Effects: VALID
⚠️  Glow Effects: 2 elements missing shadows

SUGGESTIONS:
1. Add box-shadow to .newBtn
2. Add text-shadow to .newTitle

CODE EXAMPLES:
.newBtn {
  box-shadow: 0 0 20px rgba(168, 85, 247, 0.3);
}
```

## Version Control
- **Created:** December 2, 2025
- **Last Updated:** December 2, 2025
- **Version:** 1.0
- **Maintained By:** Kiro AI Assistant

