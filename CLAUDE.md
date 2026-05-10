# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start dev server (Vite HMR)
npm run build    # Production build
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

No test suite is configured.

## Architecture

Personal portfolio site built with React 19 + Vite. All sections are mounted in `src/App.jsx` in order: `Navbar → Hero → Experience → Research → Art → Grass → Contact`.

### Sections and their anchor IDs

| File | `id` | Nav link |
|------|------|----------|
| `Hero.jsx` | `hero` | — |
| `Experience.jsx` | `experience` | Work Quests |
| `Research.jsx` | `research` | Research Sandbox |
| `Art.jsx` | `art` + unnamed `<section>` | Art |
| `Grass.jsx` | `grass` | Touching Grass |
| `contact.jsx` | `say-hi` | say hi! button |

`scroll-mt-24` is on the Experience section to offset the fixed navbar on anchor scroll. Add it to any new section that a nav link points to.

### Constants (data layer)

All static content lives in `src/constants/`:
- `index.js` — `navLinks`, `words`, `counterItems`, `expCards`, `techStackIcons`, etc.
- `researchPapers.js` — `graphData` (`{ nodes, links }`) for the 3D force graph.
- `grassPhotos.js` — `photos` array for the Touching Grass scroll rows.
- `personalProjects.js` — `projects` array rendered by `ProjectList.jsx` in the Art section.
- `ways.js` — `contactLinks` for the Contact section.

### Key component behaviours

**GlowCard** — tracks `mousemove` angle and sets `--start` CSS variable directly on the element, driving the `.card::before` conic-gradient arc. The `.glow` div is `display: none` (surface fill removed). `boldOpening` field on `expCards` renders the first phrase in bold; the component splits `card.review` at that string.

**Research section** — uses `react-force-graph-3d` with `three-spritetext` labels. `graphRef.current.cameraPosition()` controls camera. On mobile (`< md`), the graph hides when a node panel opens (`hidden md:block`) and the panel expands to `w-full`. `node.status` and `node.vibe` are top-level fields on each node object, not inside `details`.

**Grass section** — two horizontally scrollable `PhotoRow` components. Each manages its own `scrollRef` and shows/hides `‹`/`›` arrow buttons based on scroll position.

**AsciiRipple** — renders an ASCII art animation from an image source; used in the Art section hero figure.

### 3D scene (Hero)

Three parallel implementations exist, only `HeroExperience3.jsx` is active (rendered in `Hero.jsx`). It uses `RoomFour.jsx` + `HeroLights_Game.jsx`. `RoomFour.jsx` contains an interactive mini-game: D-pad buttons call `pressButton(direction)`, which moves a `PlayerCube` mesh on a 5×5 grid (75-unit tiles, clamped ±2 from center) via `useFrame` lerp.

The speech bubble (`.hero-bubble`) is positioned `top-[62%]` on mobile and `top-[25%]` on desktop, placed over the 3D model.

### Styling

Tailwind CSS v4 via `@tailwindcss/vite` (imported as `@import "tailwindcss"` in `index.css`, not PostCSS). Custom tokens in `@theme {}`, component classes in `@layer components {}`.

Current design tokens (light pastel theme):
- `--color-base: #faf7f2`
- `--color-white-50: #6b7a8d`
- `--color-black-50: #dedad3`
- `--color-black-100: #f0ece5`
- `--color-black-200: #e8e3db`
- `--color-blue-50: #7a8da0`
- `--color-blue-100: #e8e3db`

Custom scrollbars use `[&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:bg-[#bbb]` (no plugin needed in Tailwind v4 — avoid `scrollbar-thin` / `scrollbar-thumb-*` classes which require an uninstalled plugin).

The `.card::before` conic gradient is a CSS luminance mask — it controls arc visibility, not colour. Arc colour comes from `--gradient` in `:root`. Use white/near-white values in the conic mask so the gradient shows at full brightness.

Notable custom CSS: `.slide`/`.wrapper`/`@keyframes wordSlider` (hero carousel), `.cta-button`/`.bg-circle` (Button hover), `.timeline-logo` (circular logo with `overflow-hidden`), `.gradient-line` (timeline gradient).

Asset paths must be absolute (`/images/foo.png`, `/models/foo.glb`) — served from `public/`.
