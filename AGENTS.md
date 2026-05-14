# AI Agent Guide for Bingo Mixer

This guide helps AI agents quickly understand the codebase structure and conventions.

## Quick Start Commands

```bash
npm run dev      # Start Vite dev server (port 5173)
npm run build    # Build with TypeScript + Vite (output: dist/)
npm run lint     # Run ESLint
npm run test     # Run Vitest unit tests
```

## Project Overview

**Bingo Mixer** is a social bingo game built with React 19 + TypeScript + Vite + Tailwind CSS v4. It's a small, focused app designed as a teaching project with comprehensive workshop materials.

- **Stack**: React 19, TypeScript (strict mode), Vite, Tailwind CSS v4, Vitest
- **Key Docs**: See [workshop/GUIDE.md](workshop/GUIDE.md) for multi-part teaching labs

## Architecture at a Glance

### State Management Pattern
- **No Redux/Zustand**: Uses a custom React hook (`useBingoGame`) for all game state
- **Immutable updates**: All state mutations create new references (spread operator)
- **Persistence**: localStorage with schema versioning + deserialization validation
- **State machine**: 3-state FSM (`'start' | 'playing' | 'bingo'`) for game flow

**Key Hook**: [src/hooks/useBingoGame.ts](src/hooks/useBingoGame.ts) — returns game state + action callbacks

### Component Structure

```
App (entry point, conditionally renders screens)
├── StartScreen (menu)
├── GameScreen (board container with logic passed down)
└── Modals
    ├── BingoModal (victory screen)
    └── BingoBoard (5×5 grid)
        └── BingoSquare (individual cell)
```

**Pattern**: Container/Presentational separation with strict unidirectional props + callbacks

### Business Logic Layer

Pure functions in [src/utils/bingoLogic.ts](src/utils/bingoLogic.ts):
- `generateBoard()` — Fisher-Yates shuffle + fixed free space
- `toggleSquare(board, id)` — Immutable toggle, returns new board
- `checkBingo(board)` — Tests all 12 winning lines
- `getWinningSquareIds(board, winningLine)` — Returns `Set<number>` for efficient render optimization

**Key Principle**: Business logic is **completely decoupled from React** for easy testing.

## Type System

All domain types in [src/types/index.ts](src/types/index.ts):

```typescript
type GameState = 'start' | 'playing' | 'bingo'
interface BingoSquareData { id: number; question: string; marked: boolean }
interface BingoLine { type: 'row' | 'column' | 'diagonal'; index: number }
```

**Convention**: Use `import type` for compile-time-only imports; types are re-exported from utilities for convenience.

## Styling with Tailwind CSS v4

- **Theme config**: [src/index.css](src/index.css) defines `@theme` block with custom brand colors
  - `--color-accent` (#2563eb), `--color-marked` (#dcfce7), `--color-bingo` (#fbbf24)
- **Pattern**: Inline conditional Tailwind classes based on component state
- **Vite Integration**: [@tailwindcss/vite](https://www.npmjs.com/package/@tailwindcss/vite) plugin for optimized builds

See [.github/instructions/tailwind-4.instructions.md](.github/instructions/tailwind-4.instructions.md) for Tailwind v4 best practices.

## Data & Questions

Questions sourced from [src/data/questions.ts](src/data/questions.ts):
- 24 + 1 free space (center) = 25-square board
- Question objects: `{ type?: string; en: string; pt?: string; es?: string; }`
- New translations handled via same `questions` array (i18n ready)

## Testing

**Framework**: Vitest (ESM-native, fast)  
**Setup**: [src/test/setup.ts](src/test/setup.ts) configures Testing Library matchers + jsdom

**Test File**: [src/utils/bingoLogic.test.ts](src/utils/bingoLogic.test.ts)
- Unit tests for pure `bingoLogic` functions
- No component tests yet (good opportunity for contribution)
- Edge cases: free space immutability, randomization verification

**Run tests**: `npm run test` (or `npm run test -- --watch`)

## Key Conventions

| Aspect | Convention |
|--------|-----------|
| **Component Props** | Colocated interfaces suffixed with `Props` (e.g., `StartScreenProps`) |
| **Event Handlers** | Prefix with `handle` (e.g., `handleSquareClick`) |
| **State Actions** | Verb-based (e.g., `startGame`, `toggleSquare`, `resetGame`) |
| **Naming** | Domain-driven (use `BingoSquareData` not generic `Square`) |
| **Immutability** | Never mutate state; always create new references |
| **Type Safety** | Strict TypeScript mode; no implicit any |
| **Error Handling** | Silent catches with `console.warn`; clean up localStorage on deserialization failure |
| **Accessibility** | Use `aria-label`, `aria-pressed`, semantic HTML |

## Common Tasks

### Add a New Question
Edit [src/data/questions.ts](src/data/questions.ts):
```typescript
{ en: "Find someone who...", pt: "...", es: "..." }
```

### Update Colors/Theme
Edit the `@theme` block in [src/index.css](src/index.css):
```css
@theme {
  --color-accent: #your-hex;
}
```

### Fix a Bug in Game Logic
1. Add a failing test to [src/utils/bingoLogic.test.ts](src/utils/bingoLogic.test.ts)
2. Fix [src/utils/bingoLogic.ts](src/utils/bingoLogic.ts)
3. Run `npm run test` to verify

### Add a Component
1. Create `src/components/YourComponent.tsx` with colocated `Props` interface
2. Import & render in parent component
3. Receive all state + actions via props (no internal state unless absolutely needed)

## Documentation

For in-depth guides, see [workshop/](workshop/) folder:
- [00-overview.md](workshop/00-overview.md) — Project intro
- [01-setup.md](workshop/01-setup.md) — Environment setup
- [02-design.md](workshop/02-design.md) — UI/design patterns
- [03-quiz-master.md](workshop/03-quiz-master.md) — Custom agent for question generation
- [04-multi-agent.md](workshop/04-multi-agent.md) — Multi-agent workflows

## Accessibility & Inclusivity

- All interactive elements must have `aria-label` or descriptive text
- Color is never the only differentiator (add patterns, borders, text)
- Support multiple languages (en, es, pt_BR)

See [CONTRIBUTING.md](CONTRIBUTING.md) and [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md).

## Workspace Structure

```
src/
  ├── App.tsx              # Entry point; conditionally renders screens
  ├── main.tsx             # React 19 entry; root element setup
  ├── index.css            # Tailwind config + theme variables
  ├── components/          # UI components (presentational + containers)
  ├── hooks/               # useBingoGame (all game state + actions)
  ├── utils/               # Pure business logic (bingoLogic.ts) + tests
  ├── types/               # Centralized domain types
  ├── data/                # questions.ts (content)
  └── test/                # setup.ts for Vitest config
```

---

**Last Updated**: 2025 | Made to support rapid multi-agent development
