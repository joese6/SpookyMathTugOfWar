# Spooky Math Tug of War - Complete Specifications

## Project Overview
A Halloween-themed competitive math game where a human player battles an AI opponent by solving arithmetic problems. Features full spooky atmosphere with rain, lightning, fog, ghosts, bats, and supernatural visual effects.

---

## 1. FUNCTIONAL REQUIREMENTS

### 1.1 Game Modes
- **5 Halloween-themed difficulty levels:**
  - 👻 Ghostly Beginner (1-10)
  - 🎃 Pumpkin Apprentice (5-15)
  - 🧙‍♀️ Witch Master (10-20)
  - 😈 Demon Lord (15-25)
  - 💀 Nightmare Blitz (1-25, 3 steps)

### 1.2 AI Opponent System
- **3 AI difficulty levels:**
  - 👶 Friendly Ghost: 40% accuracy, 1000-1500ms response
  - 👻 Restless Spirit: 70% accuracy, 800-1300ms response
  - 💀 Demon Scholar: 95% accuracy, 600-1000ms response
- AI automatically answers for right player
- AI simulates typing animation
- AI generates plausible wrong answers

### 1.3 Question Generation
- Mixed arithmetic: +, -, ×, ÷
- 2 operations per question (3 numbers)
- Division ensures integer results only
- Answers range: -999 to 999
- Auto-regeneration for invalid questions

### 1.4 Scoring System
- Correct answer: +1 step for player, -1 for opponent
- Wrong answer: +1 step for opponent
- Timeout: +1 step for opponent
- Steps capped at maximum (5 or 3)
- First to max steps wins

### 1.5 Character Animation
- char.png moves 30px per step change
- Left advantage: moves LEFT
- Right advantage: moves RIGHT
- Smooth 400ms cubic-bezier transition
- Enhanced glow during movement

### 1.6 User Interface
- **Home Page:**
  - Large character image (800px)
  - Large glowing title (64px)
  - AI difficulty selector
  - 5 game mode buttons
  - No scrolling required
  
- **Game Page:**
  - Back button (top-left)
  - Restart button (top-right)
  - Animated character/rope
  - Progress dots for both players
  - Question panels with keypads
  - Timer displays
  - Status messages

### 1.7 Audio System
- Background ambient music (crows)
- Success/failure sound effects
- Victory fanfare
- Click sounds
- Thunder sound for lightning
- Auto-play on user interaction

### 1.8 Visual Effects
- **Background:** Dark haunted graveyard scene with moon
- **Weather:** Heavy rain (100 drops) + lightning (every 5-12s)
- **Fog:** Multi-layer drifting fog with swirl effects
- **Creatures:** Floating ghosts (2) + flying bats (3)
- **Ambiance:** Flickering candles in corners
- **Animations:** Glowing effects, pulsing timers, shimmer panels

---

## 2. GAME MECHANICS

### 2.1 Turn Management
- Game starts with left player (human)
- 10-second timer per turn
- Players alternate after each answer/timeout
- 400ms transition delay between turns
- AI auto-plays on right player's turn

### 2.2 Question Algorithm
```
1. Generate 3 random numbers in range
2. Select 2 random operations
3. For division: find valid divisors
4. Build expression string
5. Evaluate with JavaScript eval()
6. Validate: finite, integer, in range
7. If invalid: regenerate recursively
```

### 2.3 AI Decision Logic
```
1. Check accuracy threshold (40%, 70%, or 95%)
2. If correct: answer = rightQ.ans
3. If wrong: generate plausible mistake
   - Add/subtract variation
   - Random nearby value
   - Ensure different from correct
4. Type answer digit-by-digit (100-200ms/digit)
5. Submit after total delay (600-1500ms)
```

### 2.4 Character Movement
```
offset = (rightSteps - leftSteps) * 30px

Examples:
- leftSteps=1, rightSteps=0 → -30px (LEFT)
- leftSteps=0, rightSteps=1 → +30px (RIGHT)
- leftSteps=2, rightSteps=3 → +30px (RIGHT)
- leftSteps=3, rightSteps=1 → -60px (LEFT)
```

### 2.5 Win Conditions
- Player reaches 5 steps (or 3 in Nightmare Blitz)
- Game immediately ends
- Victory animation (8 flashes over 4 seconds)
- Victory sound plays
- Random victory message displayed

---

## 3. FLOW SPECIFICATIONS

### 3.1 Application Startup
```
1. Load HTML/CSS/JavaScript
2. Create rain drops (100)
3. Start lightning cycle (5-12s intervals)
4. Initialize AI difficulty (normal)
5. Display home page
6. Wait for user interaction to start audio
```

### 3.2 Game Start Flow
```
User clicks game mode button
  ↓
Set number range and total steps
  ↓
Hide home page, show game page
  ↓
Reset steps to 0
  ↓
Create keypads (left: interactive, right: AI)
  ↓
Generate questions
  ↓
Update rope to center position
  ↓
Trigger lightning flash
  ↓
Play start sound
  ↓
Start ambient music
  ↓
Begin left player's turn
```

### 3.3 Turn Cycle
```
startTurn(player)
  ↓
If left player:
  - Enable left input
  - Focus left input
  - Start 10s timer
  - Wait for human input
  
If right player (AI):
  - Disable right input
  - Start AI thinking (300ms delay)
  - AI types answer (100-200ms/digit)
  - AI submits after delay (600-1500ms)
  ↓
Answer submitted
  ↓
Update steps based on correctness
  ↓
Update rope position (30px movement)
  ↓
Play success/failure sound
  ↓
Check win condition
  ↓
If no winner: switch turn (400ms delay)
```

### 3.4 Character Animation Flow
```
Steps change
  ↓
Calculate offset = (rightSteps - leftSteps) * 30
  ↓
Apply transform: translateX(offset px)
  ↓
Add "moving" class
  ↓
Enhanced glow effect (600ms)
  ↓
Remove "moving" class
  ↓
Update progress dots
```

---

## 4. UI BEHAVIOR SPECIFICATIONS

### 4.1 Home Page
- **Layout:** Centered, no scroll, all visible
- **Image:** 800px char.png with auto height
- **Title:** 64px Creepster font with purple glow
- **AI Selector:** Compact, 3 horizontal buttons
- **Game Buttons:** 5 buttons, 350px width, purple gradient
- **Hover Effects:** Lift, glow, shimmer animation

### 4.2 Game Page
- **Back Button:** Top-left, green gradient, hover lift
- **Restart Button:** Top-right, orange gradient, spin on hover
- **Board Area:** 220px height, purple border, glowing center line
- **Character:** Animated, floating, glowing, moves horizontally
- **Progress Dots:** 16px, pulsing green when active
- **Panels:** Semi-transparent, backdrop blur, shimmer effect

### 4.3 Interactive Elements
- **Left Input:** Manual entry, numeric keypad, keyboard support
- **Right Input:** AI-controlled, readonly, shows 🤖 indicator
- **Keypads:** 3x4 grid, purple/orange/green themed
- **Timers:** Orange glow, pulsing animation, countdown display

### 4.4 Visual Feedback
- **Correct Answer:** Green glow animation (1s)
- **Wrong Answer:** Red blood-splash effect (0.8s)
- **AI Answer:** Ghost fade effect (1.2s)
- **Rope Movement:** Enhanced glow, scale, rotation
- **Victory:** 8 screen flashes, color cycling

### 4.5 Atmospheric Effects
- **Rain:** 100 drops, 0.8-2s fall, purple tint
- **Lightning:** Every 5-12s, multi-stage flicker
- **Fog:** 3 layers, drifting, swirling, ground fog
- **Ghosts:** 2 floating, 15-20s cycles
- **Bats:** 3 flying, 12-18s paths
- **Candles:** 2 flickering in corners

---

## 5. TECHNICAL ARCHITECTURE

### 5.1 File Structure
```
/
├── index.html                    # Main HTML
├── CHAR_ANIMATION_LOGIC.md      # Animation documentation
├── COMPLETE_SPECS.md            # This file
├── assets/
│   ├── css/
│   │   └── style.css            # All styling (800+ lines)
│   ├── js/
│   │   └── script.js            # Game logic (400+ lines)
│   ├── images/
│   │   ├── char.png             # Character/rope image
│   │   └── favicon.png          # Browser icon
│   └── audio/
│       ├── true.mp3             # Success sound
│       ├── false.mp3            # Error sound
│       ├── win.mp3              # Victory sound
│       ├── click.mp3            # Button click
│       └── crows.mp3            # Ambient background
```

### 5.2 Technology Stack
- **Frontend:** Vanilla HTML5, CSS3, JavaScript ES6+
- **Fonts:** Google Fonts (Creepster, Nosifer, Griffy)
- **Graphics:** SVG background, CSS animations
- **Audio:** HTML5 Audio API
- **No Dependencies:** Self-contained, no frameworks

### 5.3 CSS Architecture
- **Custom Properties:** 11 CSS variables for theming
- **Animations:** 30+ keyframe animations
- **Responsive:** 4 breakpoints (900px, 600px, 800px height, 700px height)
- **Performance:** GPU-accelerated transforms, will-change properties
- **Effects:** Gradients, shadows, filters, blend modes

### 5.4 JavaScript Architecture
```javascript
// Global State (20 variables)
- Game state: steps, gameOver, currentPlayer
- Timer state: timeLeft, timerInterval
- Question state: leftQ, rightQ
- AI state: aiDifficulty, aiTimeout, aiTypingTimeout
- Config: rangeMin, rangeMax, totalSteps

// Core Functions (25+)
- Question generation: genMixedQ()
- UI creation: createPad(), renderDots()
- Game flow: startGame(), startTurn(), switchTurn()
- Answer processing: submitLeft(), submitRight()
- AI system: startAITurn(), simulateAITyping()
- Animation: updateRope(), triggerLightning()
- Weather: createRain(), startLightningCycle()
```

### 5.5 Performance Optimizations
- **60 FPS animations** using CSS transforms
- **GPU acceleration** with will-change
- **Efficient DOM updates** with fragments
- **Debounced effects** to prevent overload
- **Lazy audio loading** with error fallbacks
- **Optimized particle system** (100 rain + 20 particles)

### 5.6 Browser Compatibility
- Modern browsers (Chrome, Firefox, Safari, Edge)
- ES6+ JavaScript support required
- CSS Grid and Flexbox required
- HTML5 Audio support required
- Touch and mouse input supported

---

## 6. VISUAL DESIGN SPECIFICATIONS

### 6.1 Color Palette
```css
--bg-primary: #0a0a0a (deep black)
--bg-secondary: #1a0f1a (dark purple-black)
--accent: #8b5cf6 (purple)
--accent-secondary: #10b981 (green)
--accent-tertiary: #f97316 (orange)
--text-primary: #e5e7eb (light gray)
--text-glow: #a855f7 (bright purple)
```

### 6.2 Typography
- **Titles:** Creepster (32-64px)
- **Buttons:** Nosifer (13-18px)
- **Body:** Griffy (11-18px)
- **All text:** Glowing shadows, letter-spacing

### 6.3 Animation Timing
- **Fast:** 200-400ms (button hovers, input effects)
- **Medium:** 600-1000ms (rope movement, feedback)
- **Slow:** 2-6s (ambient effects, fog, shimmer)
- **Very Slow:** 15-45s (weather, creatures)

### 6.4 Layout Dimensions
- **Max width:** 1100px
- **Home image:** 800px
- **Title:** 64px font
- **Buttons:** 350px width
- **Panels:** 48% width each
- **Character:** 80% of board width

---

## 7. AUDIO SPECIFICATIONS

### 7.1 Sound Effects
- **true.mp3:** Correct answer (plays immediately)
- **false.mp3:** Wrong answer (plays immediately)
- **win.mp3:** Victory fanfare (plays on win)
- **click.mp3:** Button clicks (plays on interaction)

### 7.2 Background Music
- **crows.mp3:** Ambient loop (0.4 volume)
- Auto-starts on first user click
- Continues throughout gameplay
- Stops when returning home

### 7.3 Audio Settings
- All sounds have error fallbacks
- Volume levels: 0.4-0.6
- Silent fail if blocked by browser
- No audio controls exposed

---

## 8. RESPONSIVE DESIGN

### 8.1 Desktop (>900px)
- Side-by-side panels
- Full-size character (800px)
- Large title (64px)
- All effects visible

### 8.2 Tablet (600-900px)
- Stacked panels
- Medium character (500px)
- Medium title (36px)
- Reduced rope height

### 8.3 Mobile (<600px)
- Vertical layout
- Small character (300px)
- Compact title (24px)
- Touch-optimized buttons

### 8.4 Short Screens (<700px height)
- Ultra-compact spacing
- Smaller fonts
- Reduced image sizes
- Minimal margins

---

## 9. ACCESSIBILITY FEATURES

### 9.1 Keyboard Support
- Enter key submits answers
- Tab navigation
- Focus indicators
- Keyboard input for left player

### 9.2 Visual Indicators
- High contrast colors
- Clear player separation (blue left, green right)
- Timer countdown visible
- Status messages always shown
- AI indicator (🤖) on right panel

### 9.3 Audio Cues
- Success/failure sounds
- Victory fanfare
- Ambient atmosphere
- Sounds enhance but don't replace visual feedback

---

## 10. PERFORMANCE SPECIFICATIONS

### 10.1 Target Metrics
- **Frame Rate:** 60 FPS for all animations
- **Load Time:** <2 seconds on broadband
- **Memory:** <50MB total usage
- **CPU:** <10% on modern hardware

### 10.2 Optimization Techniques
- CSS transforms (not layout changes)
- will-change properties
- GPU acceleration
- Efficient DOM manipulation
- Debounced effects
- Lazy loading

### 10.3 Asset Sizes
- **Total:** <2MB including all assets
- **HTML:** ~3KB
- **CSS:** ~30KB
- **JavaScript:** ~15KB
- **Images:** <500KB
- **Audio:** <1MB

---

## 11. DEPLOYMENT REQUIREMENTS

### 11.1 Hosting
- Static file hosting
- No server-side processing
- No database required
- Works with file:// protocol

### 11.2 Browser Requirements
- Modern browser (2020+)
- JavaScript enabled
- CSS3 support
- HTML5 Audio support
- 1024x768 minimum resolution

### 11.3 Dependencies
- Google Fonts CDN (Creepster, Nosifer, Griffy)
- No npm packages
- No build process
- No external libraries

---

## 12. FEATURE SUMMARY

### Core Features
✅ Single-player vs AI opponent
✅ 5 difficulty levels for math problems
✅ 3 AI difficulty levels
✅ Turn-based gameplay with 10s timer
✅ Animated character movement (30px/step)
✅ Progress tracking with visual dots
✅ Restart without returning home

### Atmospheric Features
✅ Dark haunted graveyard background
✅ Heavy rain effect (100 drops)
✅ Lightning strikes (every 5-12s)
✅ Multi-layer drifting fog
✅ Floating ghosts (2)
✅ Flying bats (3)
✅ Flickering candles
✅ Ambient crow sounds

### Visual Polish
✅ Glowing neon effects (purple/green/orange)
✅ Smooth transitions and animations
✅ Success/error visual feedback
✅ Ghost fade for AI answers
✅ Blood splash for wrong answers
✅ Screen flashes for victory
✅ Pulsing timers and dots

### UX Enhancements
✅ Large prominent title and character
✅ Compact AI selector
✅ No scrolling on home page
✅ Keyboard and touch support
✅ Responsive design
✅ Spooky themed messages
✅ Console logging for debugging

---

*Last Updated: December 2, 2025*
*Version: 2.0 - Halloween Enhanced Edition*
