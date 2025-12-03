# 🎃 Kiro Configuration Index - Spooky Math Tug of War

## Quick Reference Guide

This index provides quick access to all Kiro configuration files and their primary purposes.

---

## 📋 Steering Documents (Always Active)

### UI_STEERING.md
**Focus:** Visual consistency, responsive design, interactive elements  
**Key Concepts:** Color palette, typography, layout, glow effects  
**Use When:** Modifying HTML/CSS, adding UI components, changing styles

### THEME_STEERING.md  
**Focus:** Halloween aesthetic, atmospheric effects, emoji system  
**Key Concepts:** Spooky atmosphere, color immutability, creature animations  
**Use When:** Any visual changes, theme modifications, adding elements

### AUDIO_STEERING.md
**Focus:** Sound system, audio triggers, volume mixing  
**Key Concepts:** 8 audio files, synchronization, browser compatibility  
**Use When:** Adding sounds, modifying triggers, adjusting volumes

### ANIMATION_STEERING.md
**Focus:** Performance, smooth motion, GPU acceleration  
**Key Concepts:** 60 FPS, transform/opacity only, timing hierarchy  
**Use When:** Adding animations, optimizing performance, character movement

### GAME_LOGIC_STEERING.md
**Focus:** Game mechanics, state management, AI behavior  
**Key Concepts:** Turn flow, question generation, scoring system  
**Use When:** Modifying game rules, AI behavior, state management

---

## 🎯 Hooks (Event-Driven)

### on_theme_apply.md
**Trigger:** Manual (theme changes)  
**Purpose:** Validate spooky consistency  
**Checks:** Colors, emojis, atmospheric effects, glow effects

### on_game_start.md
**Trigger:** Game initialization  
**Purpose:** Validate proper setup  
**Checks:** State reset, UI transition, questions, audio, atmosphere

### on_player_action.md
**Trigger:** Answer submission  
**Purpose:** Validate action processing  
**Checks:** Input, evaluation, state update, feedback, win condition

### on_round_end.md
**Trigger:** Turn completion  
**Purpose:** Validate round transition  
**Checks:** Completion, win check, new questions, turn switch

### on_win_or_lose.md
**Trigger:** Victory condition  
**Purpose:** Validate game end  
**Checks:** Winner, timer cleanup, victory sequence, final state

---

## 🔍 Quick Lookup Tables

### By File Type

| File Type | Relevant Steering | Relevant Hooks |
|-----------|------------------|----------------|
| HTML | UI_STEERING, THEME_STEERING | on_theme_apply, on_game_start |
| CSS | UI_STEERING, THEME_STEERING, ANIMATION_STEERING | on_theme_apply |
| JavaScript | All steering docs | All hooks |
| Audio files | AUDIO_STEERING | on_game_start, on_player_action |

### By Task

| Task | Primary Steering | Secondary Steering | Hooks |
|------|-----------------|-------------------|-------|
| Add button | UI_STEERING | THEME_STEERING | on_theme_apply |
| Modify colors | THEME_STEERING | UI_STEERING | on_theme_apply |
| Add animation | ANIMATION_STEERING | THEME_STEERING | - |
| Add sound | AUDIO_STEERING | THEME_STEERING | on_player_action |
| Change AI | GAME_LOGIC_STEERING | - | on_player_action |
| Add game mode | GAME_LOGIC_STEERING | UI_STEERING | on_game_start |
| Fix bug | Relevant to bug area | - | Relevant hooks |

### By Component

| Component | Steering Documents | Hooks |
|-----------|-------------------|-------|
| Home page | UI_STEERING, THEME_STEERING | on_theme_apply |
| Game board | UI_STEERING, ANIMATION_STEERING | on_game_start |
| Character/rope | ANIMATION_STEERING, GAME_LOGIC_STEERING | on_player_action, on_round_end |
| Questions | GAME_LOGIC_STEERING, UI_STEERING | on_game_start, on_round_end |
| Timer | GAME_LOGIC_STEERING, UI_STEERING | on_player_action |
| AI system | GAME_LOGIC_STEERING | on_player_action |
| Audio system | AUDIO_STEERING | on_game_start, on_player_action |
| Atmosphere | THEME_STEERING, ANIMATION_STEERING | on_theme_apply, on_game_start |

---

## 🎨 Spooky Theme Quick Reference

### Approved Colors
```css
--bg-primary: #0a0a0a           /* Deep black */
--bg-secondary: #1a0f1a         /* Dark purple-black */
--accent: #8b5cf6               /* Purple (left/primary) */
--accent-secondary: #10b981     /* Green (right/AI) */
--accent-tertiary: #f97316      /* Orange (warnings) */
--text-primary: #e5e7eb         /* Light gray */
--text-glow: #a855f7            /* Bright purple */
```

### Approved Emojis
👻 🎃 🧙‍♀️ 😈 💀 🦇 🕷️ 🕸️ 🌙 🕯️ 🔮 ⚡ 🍄 ⏰ ⏳ ⌛ 🕰️

### Approved Fonts
- **Creepster:** Titles (32-64px)
- **Nosifer:** Buttons, messages (13-20px)
- **Griffy:** Body text (11-18px)

---

## ⚡ Performance Targets

| Metric | Target | Validation |
|--------|--------|------------|
| Frame Rate | 60 FPS | ANIMATION_STEERING |
| Load Time | <2s | - |
| Memory | <50MB | - |
| CPU | <10% | - |
| Game Init | <100ms | on_game_start |
| Action Process | <50ms | on_player_action |
| Transition | 400-450ms | on_round_end |

---

## 🎮 Game Mechanics Quick Reference

### Step System
- **Step Size:** 30px (IMMUTABLE)
- **Total Steps:** 5 (or 3 in Nightmare)
- **Movement:** `offset = (rightSteps - leftSteps) * 30px`

### AI Difficulty
- **Easy:** 40% accuracy, 1000-1500ms
- **Normal:** 70% accuracy, 800-1300ms
- **Hard:** 95% accuracy, 600-1000ms

### Game Modes
- **Ghostly Beginner:** 1-10, 5 steps
- **Pumpkin Apprentice:** 5-15, 5 steps
- **Witch Master:** 10-20, 5 steps
- **Demon Lord:** 15-25, 5 steps
- **Nightmare Blitz:** 1-25, 3 steps

---

## 🔧 Common Patterns

### Adding New UI Element
1. Check UI_STEERING.md for patterns
2. Check THEME_STEERING.md for colors/emojis
3. Apply glow effects
4. Use spooky fonts
5. Test with on_theme_apply hook

### Modifying Game Logic
1. Check GAME_LOGIC_STEERING.md for rules
2. Validate state changes
3. Update all related state
4. Trigger appropriate feedback
5. Test with relevant hooks

### Adding Animation
1. Check ANIMATION_STEERING.md for performance
2. Use transform/opacity only
3. Apply appropriate easing
4. Test at 60 FPS
5. Ensure spooky feel

### Adding Sound
1. Check AUDIO_STEERING.md for system
2. Use appropriate volume level
3. Add error handling (.catch)
4. Synchronize with visuals
5. Test browser compatibility

---

## 📊 Validation Workflow

```
Code Change
  ↓
Identify affected components
  ↓
Read relevant steering docs
  ↓
Apply rules and patterns
  ↓
Check cross-document consistency
  ↓
Test with relevant hooks
  ↓
Validate against checklists
  ↓
Confirm spooky consistency
  ↓
Complete
```

---

## 🎯 Hackathon Highlights

### What Makes This Configuration Special:

1. **Comprehensive Coverage**
   - 5 steering documents covering all aspects
   - 5 automated hooks for validation
   - Complete cross-reference system

2. **Production Quality**
   - Clear rules and examples
   - Explicit forbidden behaviors
   - Performance targets defined
   - Error handling specified

3. **Theme Enforcement**
   - Spooky consistency layer
   - Automatic validation
   - Cross-component coherence
   - Immersive atmosphere guaranteed

4. **Engineering Excellence**
   - Prevents hallucinations
   - Maintains code quality
   - Ensures best practices
   - Validates automatically

5. **Developer Experience**
   - Clear documentation
   - Quick reference guides
   - Easy to understand
   - Simple to maintain

---

## 📚 Documentation Hierarchy

```
.kiro/
├── README.md              ← Start here (overview)
├── INDEX.md              ← This file (quick reference)
├── steering/
│   ├── UI_STEERING.md           ← Visual rules
│   ├── THEME_STEERING.md        ← Theme master
│   ├── AUDIO_STEERING.md        ← Sound system
│   ├── ANIMATION_STEERING.md    ← Performance
│   └── GAME_LOGIC_STEERING.md   ← Game mechanics
└── hooks/
    ├── on_theme_apply.md        ← Theme validation
    ├── on_game_start.md         ← Init validation
    ├── on_player_action.md      ← Action validation
    ├── on_round_end.md          ← Round validation
    └── on_win_or_lose.md        ← Victory validation
```

---

## 🚀 Getting Started

### For New Developers:
1. Read `.kiro/README.md` for overview
2. Skim all steering documents
3. Understand the spooky theme
4. Review common patterns
5. Start coding with confidence

### For Kiro AI:
1. Load all steering documents
2. Apply rules automatically
3. Trigger hooks on events
4. Validate consistency
5. Maintain spooky atmosphere

---

## 📞 Support

For questions or issues:
- Review relevant steering document
- Check this index for quick reference
- Consult README.md for detailed info
- Test with appropriate hooks
- Validate against checklists

---

**Last Updated:** December 2, 2025  
**Version:** 1.0  
**Maintained By:** Kiro AI Assistant

