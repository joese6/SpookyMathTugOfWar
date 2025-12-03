# 🎃 Spooky Math Tug of War - Kiro Configuration

## Overview
This directory contains the complete Kiro AI configuration for the Spooky Math Tug of War project, including steering documents and automated hooks that ensure code quality, thematic consistency, and proper game mechanics.

## Directory Structure

```
.kiro/
├── README.md                      # This file
├── steering/                      # Steering documents (always active)
│   ├── UI_STEERING.md            # UI/UX consistency rules
│   ├── THEME_STEERING.md         # Halloween theme enforcement
│   ├── AUDIO_STEERING.md         # Sound system guidelines
│   ├── ANIMATION_STEERING.md     # Animation performance rules
│   └── GAME_LOGIC_STEERING.md    # Game mechanics validation
└── hooks/                         # Automated event hooks
    ├── on_theme_apply.md         # Theme validation hook
    ├── on_game_start.md          # Game initialization hook
    ├── on_player_action.md       # Player action validation hook
    ├── on_round_end.md           # Round completion hook
    └── on_win_or_lose.md         # Victory/defeat hook
```

## Steering Documents

Steering documents provide continuous guidance to Kiro AI during all development tasks. They are automatically included in every interaction.

### 1. UI_STEERING.md
**Purpose:** Ensures visual consistency with dark Halloween theme

**Key Rules:**
- Maintain purple/green/orange color palette
- Apply glow effects to all interactive elements
- Use spooky fonts (Creepster, Nosifer, Griffy)
- Include Halloween emojis in all UI text
- Preserve responsive design across breakpoints

**When to Reference:**
- Adding new UI components
- Modifying existing layouts
- Changing colors or styles
- Updating button designs
- Adjusting responsive behavior

### 2. THEME_STEERING.md
**Purpose:** Master reference for Halloween aesthetic

**Key Rules:**
- Immutable color palette (purple, green, orange, dark backgrounds)
- Required atmospheric effects (rain, lightning, fog, creatures)
- Halloween emoji system enforcement
- Glow effect hierarchy
- Spooky tone consistency

**When to Reference:**
- Any visual changes
- Adding new elements
- Modifying atmospheric effects
- Changing emoji usage
- Adjusting overall mood

### 3. AUDIO_STEERING.md
**Purpose:** Governs all sound implementation

**Key Rules:**
- 8 audio files with specific purposes
- Volume hierarchy (effects > thunder > music > ambient)
- Audio-visual synchronization
- Browser compatibility (autoplay handling)
- Spooky sound selection

**When to Reference:**
- Adding sound effects
- Modifying audio triggers
- Adjusting volume levels
- Synchronizing audio with visuals
- Handling audio errors

### 4. ANIMATION_STEERING.md
**Purpose:** Ensures smooth, performant animations

**Key Rules:**
- GPU-accelerated properties only (transform, opacity)
- 60 FPS performance target
- Animation timing hierarchy (200ms to 45s)
- Easing function requirements
- Character movement system (30px per step)

**When to Reference:**
- Adding animations
- Modifying transitions
- Optimizing performance
- Changing character movement
- Adjusting atmospheric effects

### 5. GAME_LOGIC_STEERING.md
**Purpose:** Maintains game mechanics integrity

**Key Rules:**
- State management patterns
- Question generation algorithm
- AI opponent behavior (40%, 70%, 95% accuracy)
- Scoring system (30px step movement)
- Turn management flow

**When to Reference:**
- Modifying game rules
- Changing AI behavior
- Adjusting difficulty
- Updating state management
- Fixing game logic bugs

## Hooks

Hooks are automated processes that trigger on specific events to validate and enhance the game experience.

### 1. on_theme_apply.md
**Trigger:** Manual (when theme changes requested)

**Actions:**
- Validates color palette usage
- Checks emoji consistency
- Verifies atmospheric effects present
- Ensures glow effects on interactive elements
- Generates validation report

**Use Case:** User adds new button without Halloween styling
- Hook detects missing emoji and glow effects
- Suggests corrections with code examples
- Ensures spooky consistency

### 2. on_game_start.md
**Trigger:** Event (when game starts)

**Actions:**
- Validates state reset (steps = 0)
- Checks UI transition (home → game)
- Verifies questions generated
- Confirms audio system active
- Validates atmospheric effects running

**Use Case:** User starts "Witch Master" mode
- Hook validates all systems initialized
- Confirms questions in 10-20 range
- Ensures character centered
- Logs initialization report

### 3. on_player_action.md
**Trigger:** Event (when player submits answer)

**Actions:**
- Validates input (numeric, valid)
- Evaluates answer (correct/wrong)
- Updates state with bounds checking
- Triggers feedback (audio, visual, animation)
- Checks win condition

**Use Case:** Player submits wrong answer
- Hook validates input
- Updates opponent's steps
- Plays failure sound
- Displays spooky failure message
- Moves character toward opponent
- Checks if opponent won

### 4. on_round_end.md
**Trigger:** Event (when turn completes)

**Actions:**
- Validates round completion
- Checks win condition
- Generates new questions
- Manages turn transition
- Adjusts atmospheric tension

**Use Case:** Round ends with no winner
- Hook validates completion
- Generates new questions
- Waits 400ms transition
- Switches to next player
- Increases atmospheric intensity if late game

### 5. on_win_or_lose.md
**Trigger:** Event (when player reaches totalSteps)

**Actions:**
- Validates victory condition
- Clears all timers
- Displays victory message
- Plays victory sound
- Triggers screen flashes (8x)
- Records game result

**Use Case:** Human player defeats AI
- Hook validates left player reached 5 steps
- Displays random victory message
- Plays win.mp3
- Triggers 8 screen flashes over 4 seconds
- Logs final game statistics

## Cross-Document Consistency

All steering documents and hooks work together to maintain consistency:

```
Theme Change Request
  ↓
UI_STEERING.md (visual rules)
  ↓
THEME_STEERING.md (color/emoji validation)
  ↓
ANIMATION_STEERING.md (transition timing)
  ↓
AUDIO_STEERING.md (sound triggers)
  ↓
on_theme_apply.md (automated validation)
  ↓
Consistent, spooky result
```

## Spooky Consistency Layer

The "Spooky Consistency Layer" ensures all modifications maintain the Halloween theme:

### Visual Layer:
- Dark backgrounds (#0a0a0a, #1a0f1a)
- Purple/green/orange accents only
- Glow effects on everything
- Halloween emojis everywhere
- Spooky fonts (Creepster, Nosifer, Griffy)

### Audio Layer:
- Dark, ominous background music
- Supernatural sound effects
- Thunder synchronized with lightning
- Wolf howls at random intervals

### Animation Layer:
- Smooth, ethereal movements
- Floating, drifting effects
- Pulsing glows
- GPU-accelerated performance

### Logic Layer:
- Spooky messages with emojis
- Halloween-themed mode names
- Fair but challenging AI
- Tension building as game progresses

## Usage Guidelines

### For Developers:

**When adding new features:**
1. Read relevant steering documents
2. Follow established patterns
3. Maintain spooky theme
4. Test with hooks
5. Validate consistency

**When modifying existing code:**
1. Check which steering docs apply
2. Verify changes don't break rules
3. Maintain cross-file consistency
4. Test affected hooks
5. Update documentation if needed

### For Kiro AI:

**When processing requests:**
1. Load all active steering documents
2. Apply rules from relevant documents
3. Check cross-document consistency
4. Trigger appropriate hooks
5. Validate final result

**Decision Priority:**
1. User request (primary goal)
2. Steering documents (guidelines)
3. Hooks (validation)
4. Best practices (fallback)

## Validation Checklists

### Theme Validation:
- [ ] Uses approved color palette
- [ ] Includes Halloween emojis
- [ ] Has glow/shadow effects
- [ ] Uses spooky fonts
- [ ] Maintains dark atmosphere
- [ ] Preserves atmospheric effects

### Logic Validation:
- [ ] State within valid ranges
- [ ] Input validated
- [ ] Bounds checking present
- [ ] Timers cleared properly
- [ ] Win condition checked
- [ ] UI updated correctly

### Performance Validation:
- [ ] GPU-accelerated animations
- [ ] 60 FPS maintained
- [ ] No layout property animations
- [ ] Proper easing functions
- [ ] Optimized particle systems
- [ ] Efficient DOM updates

## Hackathon Showcase

This Kiro configuration demonstrates:

### 1. Advanced Steering Usage
- 5 comprehensive steering documents
- Cross-document consistency enforcement
- Clear behavioral rules and examples
- Forbidden behaviors explicitly listed

### 2. Automated Hooks
- 5 event-driven hooks
- Automatic validation and correction
- Dynamic behavior based on context
- Performance monitoring

### 3. Production-Ready Structure
- Clean, organized directory
- Comprehensive documentation
- Clear integration patterns
- Maintainable architecture

### 4. Engineering Excellence
- Explicit rules prevent hallucinations
- Validation checklists ensure quality
- Performance targets defined
- Error handling specified

### 5. Theme Consistency
- Spooky atmosphere enforced
- Halloween aesthetic maintained
- Cross-component coherence
- Immersive experience guaranteed

## Maintenance

### Adding New Steering Documents:
1. Create in `.kiro/steering/`
2. Add frontmatter with `inclusion: always`
3. Define purpose, scope, rules
4. Provide examples (correct/incorrect)
5. Update this README

### Adding New Hooks:
1. Create in `.kiro/hooks/`
2. Define trigger condition
3. Specify transformation rules
4. Provide use case examples
5. Update this README

### Updating Existing Documents:
1. Maintain version control section
2. Update "Last Updated" date
3. Increment version number
4. Document changes in comments
5. Test with existing code

## Version History

- **v1.0** (December 2, 2025)
  - Initial comprehensive Kiro configuration
  - 5 steering documents created
  - 5 automated hooks implemented
  - Full documentation completed

## Credits

**Project:** Spooky Math Tug of War  
**Kiro Configuration:** Production-ready AI steering system  
**Purpose:** Hackathon demonstration of advanced Kiro capabilities  
**Maintained By:** Kiro AI Assistant  

---

*This configuration showcases the full power of Kiro's steering and hooks system, demonstrating how AI can maintain code quality, thematic consistency, and engineering excellence throughout the development lifecycle.*

