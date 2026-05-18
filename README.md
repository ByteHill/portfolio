# /Alisha — personal portfolio

my little corner of the internet. built to be a bit more *me* than a standard portfolio — less resume, more "here's a slice of my brain."

live at → **[alinat.dev](https://alinat.dev)**

---

## what's inside

| section | what it is                                                                                                                                          |
|---|-----------------------------------------------------------------------------------------------------------------------------------------------------|
| **hero** | animated word carousel + a 3D mini-game scene (i wanted the cube to look a little like it's inspired by butter in the studio ghibli universe, haha) |
| **work quests** | experience timeline with glowcards and GSAP scroll animations                                                                                       |
| **research sandbox** | interactive 3D force graph of papers I've read, with notes and open ended questions on each one                                                     |
| **art** | ASCII ripple portrait, a scrollable art wall, and CS projects I'm proud of                                                                          |
| **touching grass** | a photo gallery proving I do, occasionally, go outside                                                                                              |
| **say hi** | ways to reach me                                                                                                                                    |

---

## stack

- **React 19** + **Vite**
- **Tailwind CSS v4** (no PostCSS — via `@tailwindcss/vite`)
- **Three.js** + **React Three Fiber** + **React Three Drei** — 3D scene + mini-game
- **react-force-graph-3d** + **three-spritetext** — research graph
- **GSAP** + **@gsap/react** — scroll animations, hero entrance, bubble fade

---

## running locally

```bash
npm install
npm run dev
```

```bash
npm run build    # production build
npm run preview  # preview the build
npm run lint     # eslint
```

---

## structure

```
src/
  sections/       # one file per page section
  components/     # reusable UI + the 3D scene (HeroModels/)
  constants/      # all static data lives here, not in the components
public/
  models/         # .glb files for the 3D scene
  images/         # all image assets (referenced with absolute paths)
```

all static content (nav links, experience cards, research papers, photos, projects, contact links) lives in `src/constants/` — if we want to update something, that's probably where to look.

---

*built as an evolving playground for ideas and experiments.*
