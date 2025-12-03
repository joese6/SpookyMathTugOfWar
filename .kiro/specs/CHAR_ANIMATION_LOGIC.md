# Char.png Animation Logic

## Movement Rules (30px per step)

### Left Player (Left Calculator) Actions:

1. **✅ Left Correct Answer**
   - `leftSteps++` (left gains 1)
   - `rightSteps--` (right loses 1)
   - **Result: char.png moves LEFT 30px**

2. **❌ Left Wrong Answer**
   - `rightSteps++` (right gains 1)
   - **Result: char.png moves RIGHT 30px**

3. **⏰ Left Timeout**
   - `rightSteps++` (right gains 1)
   - **Result: char.png moves RIGHT 30px**

### Right Player (Right Calculator) Actions:

4. **✅ Right Correct Answer**
   - `rightSteps++` (right gains 1)
   - `leftSteps--` (left loses 1)
   - **Result: char.png moves RIGHT 30px**

5. **❌ Right Wrong Answer**
   - `leftSteps++` (left gains 1)
   - **Result: char.png moves LEFT 30px**

6. **⏰ Right Timeout**
   - `leftSteps++` (left gains 1)
   - **Result: char.png moves LEFT 30px**

## Technical Implementation

### Formula:
```javascript
offset = (rightSteps - leftSteps) * 30px
```

### Examples:
- `leftSteps=0, rightSteps=0` → offset = 0px (center)
- `leftSteps=1, rightSteps=0` → offset = -30px (left)
- `leftSteps=0, rightSteps=1` → offset = +30px (right)
- `leftSteps=2, rightSteps=1` → offset = -30px (left)
- `leftSteps=1, rightSteps=3` → offset = +60px (right)

### CSS Animation:
- Smooth 400ms transition with cubic-bezier easing
- Enhanced glow effect during movement
- GPU-accelerated transform

## Console Output:
Every action logs:
- Which player acted
- Whether correct/wrong/timeout
- Step changes
- Final offset and direction
- Transform applied to char.png
