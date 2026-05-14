---
name: dogfood-bingo-mixer
description: |
  Validate Bingo Mixer functionality by running end-to-end manual tests, automated tests, and checking for regressions. Use this skill when: testing new features, validating a code change works as intended, catching bugs before release, verifying UI/UX quality, or ensuring game logic is sound.
difficulty: intermediate
tags: [testing, validation, qa, e2e]
---

# Dogfood Bingo Mixer

**Purpose**: Systematically validate that the Bingo Mixer app works correctly across core gameplay, UI, and business logic.

**Duration**: ~10–15 minutes per full cycle

---

## Prerequisites

- [ ] Dev server running (`npm run dev`)
- [ ] Browser with DevTools available
- [ ] Access to test command (`npm run test`)

---

## Step-by-Step Workflow

### Phase 1: Setup & Automated Tests ✅

1. **Start dev server** (if not already running)
   ```bash
   npm run dev
   ```
   - Verify no build errors; check console for warnings.

2. **Run unit tests**
   ```bash
   npm run test
   ```
   - All tests must pass.
   - If tests fail, pause and debug before proceeding.

3. **Lint check** (optional but recommended)
   ```bash
   npm run lint
   ```
   - Fix any issues before manual testing.

---

### Phase 2: Manual Gameplay Validation 🎮

Open app in browser (default: `http://localhost:5173`) and play through a full game:

#### 2a. Start Screen
- [ ] Title and description are visible.
- [ ] **"Start Game"** button is clickable.
- [ ] No console errors when clicking start.

#### 2b. Gameplay
- [ ] **5×5 bingo board** loads with 25 squares (24 questions + 1 free space).
- [ ] Free space (center) is pre-marked and not clickable.
- [ ] Clicking a square marks it visually (background color changes).
- [ ] Questions are readable and relevant.
- [ ] Clicking again **unmarks** the square.

#### 2c. Bingo Detection
- [ ] Mark 5 squares in a **row** → **Bingo modal** appears.
- [ ] Mark 5 squares in a **column** → **Bingo modal** appears.
- [ ] Mark a **diagonal (5 squares)** → **Bingo modal** appears.
- [ ] Verify **"Reset Game"** button in modal works → returns to Start Screen.

#### 2d. State Persistence (localStorage)
- [ ] Play a few moves and **refresh the page**.
- [ ] Board state is restored (same squares marked).
- [ ] **Reset from modal** clears localStorage → page refresh shows Start Screen.

---

### Phase 3: UI/UX Spot Checks 🎨

- [ ] **Colors & styling** are consistent with Tailwind theme (accent color, marked state, bingo highlight).
- [ ] **Button states** (hover, active, disabled) work visually.
- [ ] **Responsive**: Test on mobile viewport (resize DevTools).
  - Layout doesn't break.
  - Squares are still clickable.
  - Text is readable.
- [ ] **Accessibility**: Use keyboard tab navigation.
  - All buttons focusable.
  - `aria-label`/`aria-pressed` attributes present (check DevTools Inspector).

---

### Phase 4: Edge Cases & Error Handling ⚠️

- [ ] **Console errors**: Open DevTools (F12) and verify no red errors during gameplay.
- [ ] **Rapid clicking**: Click many squares quickly → no state corruption.
- [ ] **Browser back button**: After bingo, click browser back → graceful fallback (no crash).
- [ ] **Multiple wins**: Mark additional lines after first bingo → modal doesn't appear again until reset.
- [ ] **Language toggle** (if i18n present): Verify questions/buttons display correctly.

---

### Phase 5: Code Inspection Checks 🔍

Run this tool to spot-check code alignment with architecture:

```bash
# Verify no stale or test files in dist
npm run build && ls -la dist/

# Check that all types are strict
grep -r "any" src/ --include="*.ts" --include="*.tsx" | grep -v "node_modules" || echo "✓ No implicit any"
```

- [ ] Build succeeds without warnings.
- [ ] No `any` types in src (unless justified in comments).
- [ ] No console.error calls outside of error handlers.

---

## Decision Tree: When to Stop & Debug

```
Did all tests pass?
├─ NO → Stop. Debug failing test. Fix code. Re-run tests. Restart Phase 2.
└─ YES ✓

Did manual gameplay work end-to-end?
├─ NO → Identify failing scenario. Check console errors. File bug. Fix. Restart Phase 2.
└─ YES ✓

Are there UI/responsive issues?
├─ YES → Note issue. File bug or fix. Rebuild. Restart Phase 3.
└─ NO ✓

Are there console errors?
├─ YES → Investigate error message. Fix source. Restart Phase 1.
└─ NO ✓

Did all edge cases pass?
├─ NO → Isolate and reproduce. File detailed bug. Fix. Restart Phase 5.
└─ YES ✓

→ **DOGFOODING COMPLETE** ✅
```

---

## Success Criteria

✅ **All tests pass** (automated)  
✅ **Game is fully playable** (start → bingo → reset)  
✅ **State persists correctly** (localStorage)  
✅ **No console errors or warnings**  
✅ **UI is responsive** (mobile & desktop)  
✅ **Keyboard navigation works**  
✅ **Edge cases handled gracefully**  

---

## Output / What to Document

After dogfooding, document:

```markdown
## Dogfooding Report: [Date]

**Status**: ✅ PASS / ⚠️ ISSUES FOUND

### Summary
[1-2 sentences: overall health]

### Tests
- Automated: ✅ All pass
- Manual gameplay: ✅ / ⚠️
- Responsive: ✅ / ⚠️

### Issues Found
1. [Issue description + severity + reproduction steps]
2. ...

### Recommendations
- [Action item or improvement suggestion]
```

---

## Tips for Agents

- **Parallelize tests**: Run `npm run test` in one terminal while doing manual testing in browser.
- **Reproduce bugs systematically**: If you find an issue, narrow it down to exact steps before filing.
- **Check localStorage**: Use DevTools Application tab → Storage → localStorage to verify persistence.
- **Accessibility audit**: Use axe DevTools browser extension for automated a11y checks (optional).
- **Track time**: Note how long each phase takes; trends help identify bottlenecks.

---

## Related Skills & Workflows

- **suggest-fix-issue**: If you find a bug, use this to propose a fix.
- **TDD Supervisor**: If fixing a bug requires tests, orchestrate with TDD workflow.
- **Pixel Jam**: For UI/styling refinements discovered during dogfooding.

---

*Last updated: May 2026*
