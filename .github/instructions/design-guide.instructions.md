---
name: design-guide
description: Use this skill when the user asks for a redesigned UI, new visual direction, or creative styling for the app.
---

Design work in this repo should feel intentional, immersive, and tailored to the app's current experience. Avoid generic, default UI outcomes; instead create thoughtful, distinctive interfaces with a strong visual identity.

Focus on:
- Theme cohesion: commit to a clear aesthetic and use CSS variables (`@theme`) for consistent color, glow, and surface tokens.
- Atmosphere: prefer layered backgrounds, subtle gradients, and contextual effects over plain color fills.
- Motion: add purposeful animations or micro-interactions using CSS only when it enhances the mood.
- Typography: choose expressive headings and balanced body text with careful letter spacing, weight, and line height.
- Component polish: use rounded containers, soft glow borders, glassmorphism, and contrast to give cards and buttons depth.
- Tailwind v4: favor utility-first class combinations, custom CSS variables, and native gradient/glow utilities.

Avoid:
- Bland system-default designs or overly generic "clean" admin panels.
- Reusing the same predictable palette across all designs.
- Overloading the interface with noise; keep the visual language focused.
- Breaking the app's established structure or changing gameplay logic.

Implementation hints:
- Put core color tokens in `src/index.css` with `@theme`, then apply them as `bg-[var(--color-surface)]`, `text-[var(--color-text)]`, etc.
- Use `backdrop-filter: blur(...)` and transparent surfaces for glassy card effects.
- Prefer `shadow-[...]`, `bg-gradient-to-r`, `border-white/10`, and `text-slate-300` for modern dark-themed visuals.
- Keep buttons and interactive states vivid with glow rings, hover shadows, and accessible focus outlines.

When in doubt, choose a stronger mood rather than a generic default. Design should feel specific to the app's purpose and the user's request.