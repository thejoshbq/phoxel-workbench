# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this repo is

This is the **REACHER Suite landing site / platform-overview repository** — *not* the implementation code. The actual implementations (reacher backend, labrynth GUI, firmware, pynapse, axplorer, roigbiv, hardware models) live in sibling directories under `Projects/REACHER-Suite/` and have their own CLAUDE.md files. Refer to the parent `Projects/REACHER-Suite/CLAUDE.md` for suite-wide architecture and the per-package commands.

This repo contains:

- `site/` — Vite + React 19 + TypeScript SPA, deployed to GitHub Pages at `https://otis-lab-musc.github.io/REACHER-Suite/`. This is the canonical, current landing site.
- `docs/` — Older Jekyll/kramdown documentation set (per-package `.md` pages with a custom `_layout`/`_includes`). Still in the tree but the GH Pages workflow only deploys `site/`.
- `README.md` — Platform-level overview (mermaid architecture diagram, repo table, prerequisites). The site's `LandingPage.tsx` mirrors much of this content; keep them in sync when making suite-wide changes.

## Commands (site/)

```bash
cd site
npm ci
npm run dev              # Vite dev server (HMR)
npm run build            # tsc -b && vite build → site/dist/
npm run lint             # eslint (flat config; ignores dist/)
npm run preview          # serve built dist/
npm run sync-demo        # pull a fresh labrynth demo build into public/labrynth-demo/
npm run build:full       # sync-demo + build
npm run deploy           # build + gh-pages -d dist (manual deploy)
```

GitHub Actions (`.github/workflows/deploy-site.yml`) auto-deploys to GitHub Pages on push to `main` when files under `site/**` change. Manual `npm run deploy` is rarely needed.

## Architecture notes

- **Routing**: `HashRouter` (not BrowserRouter) — required because the site is hosted on GitHub Pages under a sub-path (`/REACHER-Suite/`). `vite.config.ts` sets `base: '/REACHER-Suite/'` accordingly. Don't switch to BrowserRouter without also fixing the GH Pages 404 fallback.
- **Pages**: `src/pages/` contains one component per suite member (Landing, Labrynth, Reacher, Pynapse, Axplorer, Firmware, Hardware, Roigbiv, Contact). Only `LandingPage`, `LabrynthPage`, and `ContactPage` are wired into routes in `App.tsx` — the others exist but are not currently linked. Adding a route means editing `App.tsx` and (typically) `Navbar.tsx`.
- **Layout shell**: `App.tsx` → `CyberpunkGridBackground` (decorative canvas/CSS), `Navbar`, `<Routes>` keyed on `location.pathname` so the `page-enter` animation re-fires on navigation, then `Footer`.
- **Styling**: Tailwind 3 + `index.css` design tokens. The keyed `page-enter` class in `App.tsx` drives route-change transitions; preserve it if you refactor the shell.

## Labrynth demo embedding

`scripts/build-demo.sh` reaches into `../../labrynth/web` and runs `VITE_BASE=./ npm run build:demo` there, then mirrors the output into `site/public/labrynth-demo/`. The demo is then served as a static iframe target by the site (see `components/shared/DemoFrame.tsx`).

Implications:
- The script assumes the sibling `labrynth/` checkout exists at `../../labrynth/`. CI does not run it; demo refreshes are committed manually via `npm run sync-demo` followed by a commit of `public/labrynth-demo/`.
- Don't edit files under `public/labrynth-demo/` by hand — they are regenerated.

## docs/ (Jekyll)

`docs/` is a separate Jekyll site (`_config.yml` sets `baseurl: /REACHER-Suite`) with per-package pages. It is **not** built by the GH Pages workflow in this repo. Treat it as legacy/reference material unless explicitly asked to update it; prefer changes in `site/` for anything user-facing.

## Conventions

- TypeScript with `tsconfig.app.json` / `tsconfig.node.json` split; `npm run build` runs `tsc -b` before Vite, so type errors block the build.
- ESLint flat config (`eslint.config.js`) extends `js.recommended`, `tseslint.recommended`, `react-hooks`, and `react-refresh/vite`. No type-aware rules enabled.
- `dist/` is gitignored within `site/` but `public/labrynth-demo/` is committed (it is the deployed demo bundle).
