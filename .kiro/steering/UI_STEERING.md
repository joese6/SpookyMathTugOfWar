---
inclusion: always
priority: high
---

# UI Steering - Spooky Math Tug of War

## Purpose
This steering document governs all user interface modifications, ensuring visual consistency with the dark Halloween theme while maintaining accessibility and responsive design principles.

## Scope of Influence
- HTML structure and semantic markup
- CSS styling and layout
- Visual hierarchy and spacing
- Responsive breakpoints
- Interactive element design
- Color palette adherence
- Typography usage

## Core Behavioral Rules

### 1. Spooky Theme Consistency
**ALWAYS:**
- Use the established color palette from CSS variables
- Maintain purple (#8b5cf6) as primary accent for left player
- Maintain green (#10b981) as secondary accent for right player/AI
- Maintain orange (#f97316) as tertiary accent for warnings/timers
- Apply glowing effects to all interactive elements
- Use dark backgrounds (#0a0a0a, #1a0f1a) exclusively
- Include Halloween emojis in UI text (👻, 🎃, 💀, 🧙‍♀️, 😈, 🦇)

**NEVER:**
- Use bright, cheerful colors (yellow, pink, light blue)
- Remove glow effects or shadows
- Use light backgrounds
- Remove Halloween-themed emojis
- Break the dark, atmospheric aesthetic

### 2. Typography Rules
**Font Assignments:**
- **Creepster:** Main titles, large headings (32-64px)
- **Nosifer:** Buttons, game messages, timers (13-20px)
- **Griffy:** Body text, input fields, descriptions (11-18px)

**Text Effects:**
```css
/* All titles must have glow */
text-shadow: 
  0 0 10px var(--text-glow),
  0 0 20px var(--text-glow),
  0 0 30px var(--text-glow);

/* All buttons must have depth */
text-shadow: 0 0 8px rgba(0, 0, 0, 0.8);
```

### 3. Layout Principles
**Container Structure:**
- Max-width: 1100px
- Centered with flexbox
- Padding: 20px (desktop), 15px (tablet), 10px (mobile)
- No horizontal scrolling at any breakpoint

**Component Spacing:**
- Large gaps: 20px (between major sections)
- Medium gaps: 12px (within panels)
- Small gaps: 6px (within keypads)
- Tiny gaps: 4px (between dots)

### 4. Interactive Elements
**Buttons:**
```css
/* Standard button pattern */
.button {
  background: linear-gradient(135deg, var(--accent) 0%, #7c3aed 100%);
  border: 2px solid var(--accent);
  border-radius: 18px;
  padding: 12px 24px;
  box-shadow: var(--shadow-glow);
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.button:hover {
  transform: translateY(-4px) scale(1.02);
  box-shadow: 0 0 35px rgba(168, 85, 247, 0.7);
}
```

**Input Fields:**
- Dark background with purple border
- Glowing effect on focus
- Numeric keyboard on mobile (inputmode="numeric")
- Minimum 44x44px touch targets

### 5. Responsive Breakpoints
```css
/* Desktop: >900px - Full layout */
/* Tablet: 600-900px - Stacked panels */
/* Mobile: <600px - Compact layout */
/* Short: <700px height - Reduced spacing */
/* Very Short: <650px height - Minimal spacing */
```

## Forbidden Behaviors

### NEVER:
1. Remove or reduce glow effects
2. Use light mode or bright backgrounds
3. Change font families to non-spooky alternatives
4. Remove Halloween emojis from UI text
5. Break responsive design at any breakpoint
6. Use position: absolute without careful consideration
7. Animate width, height, or layout properties (use transform)
8. Remove backdrop-filter blur effects
9. Use colors outside the defined palette
10. Create horizontal scrolling

## Parameters Kiro May Adjust

### Safe to Modify:
- Spacing values (margins, padding, gaps)
- Font sizes within established ranges
- Animation durations and easing functions
- Shadow intensities and blur radii
- Border radius values
- Opacity values for atmospheric effects
- Z-index layering (maintain logical stacking)

### Requires Approval:
- Color palette changes
- Font family changes
- Major layout restructuring
- Breakpoint values
- Core component removal

## Style/Vibe Guidelines

### Visual Atmosphere:
- **Dark & Mysterious:** Deep blacks with purple undertones
- **Glowing & Ethereal:** Everything should have subtle glow
- **Layered Depth:** Use shadows, blur, and transparency
- **Smooth Transitions:** All interactions should feel fluid
- **Supernatural Feel:** Floating, drifting, pulsing animations

### UI Personality:
- **Ominous but Playful:** Scary but not terrifying
- **Mystical:** Magic and supernatural elements
- **Competitive:** Clear visual distinction between players
- **Atmospheric:** Weather and creature effects always visible

## Examples

### When Modifying UI Components:

**✅ CORRECT:**
```html
<button class="menuBtn" onclick="playClick(); startGame('Ghostly Beginner',1,10)">
  👻 Ghostly Beginner
</button>
```
```css
.menuBtn {
  background: linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%);
  font-family: 'Nosifer', cursive;
  text-shadow: 0 0 8px rgba(0, 0, 0, 0.8);
  box-shadow: 0 0 20px rgba(168, 85, 247, 0.3);
}
```

**❌ INCORRECT:**
```html
<button class="menuBtn" onclick="startGame('Beginner',1,10)">
  Start Easy Mode
</button>
```
```css
.menuBtn {
  background: #ffffff;
  font-family: Arial, sans-serif;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}
```

### When Updating Assets:

**✅ CORRECT:**
- Add new spooky UI elements with glow effects
- Enhance existing animations with more atmospheric effects
- Improve responsive behavior while maintaining theme
- Add accessibility features without breaking aesthetic

**❌ INCORRECT:**
- Add bright, cheerful UI elements
- Remove atmospheric effects for "cleaner" look
- Simplify design by removing glow/shadow effects
- Change to standard, non-themed UI components

## Kiro Execution Protocol

### When Asked to Modify UI:

1. **Analyze Request:** Determine which UI components are affected
2. **Check Theme Compliance:** Ensure changes maintain spooky aesthetic
3. **Verify Responsive Impact:** Test changes across all breakpoints
4. **Maintain Consistency:** Use existing patterns and variables
5. **Preserve Accessibility:** Keep touch targets, focus states, keyboard nav
6. **Test Interactions:** Ensure hover, active, focus states work
7. **Document Changes:** Update comments if adding new patterns

### Decision Tree:
```
Request to modify UI
  ↓
Does it maintain dark theme? → NO → Reject or propose spooky alternative
  ↓ YES
Does it use established colors? → NO → Use CSS variables instead
  ↓ YES
Does it break responsive design? → YES → Adjust for all breakpoints
  ↓ NO
Does it maintain accessibility? → NO → Add proper ARIA/keyboard support
  ↓ YES
PROCEED with modification
```

### Cross-File Consistency:
- Always check THEME_STEERING.md for color/aesthetic rules
- Always check ANIMATION_STEERING.md for transition timing
- Always check AUDIO_STEERING.md for interaction sound triggers
- Coordinate with GAME_LOGIC_STEERING.md for state-dependent UI

## Spooky Tone Enforcement

### Visual Checklist:
- [ ] Dark background maintained
- [ ] Glow effects present
- [ ] Halloween emojis included
- [ ] Spooky fonts used
- [ ] Purple/green/orange accents only
- [ ] Smooth, eerie transitions
- [ ] Atmospheric depth (shadows, blur)

### Interaction Checklist:
- [ ] Hover effects enhance spookiness
- [ ] Click feedback feels supernatural
- [ ] Focus states are visible but themed
- [ ] Animations feel ghostly/mystical
- [ ] Sound effects trigger appropriately

## Version Control
- **Created:** December 2, 2025
- **Last Updated:** December 2, 2025
- **Version:** 1.0
- **Maintained By:** Kiro AI Assistant

