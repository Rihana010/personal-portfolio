# Aysha Rihana — Portfolio

Next.js 16 (App Router) · Tailwind v4 · GSAP + ScrollTrigger · Lenis · self-hosted fonts
(Schibsted Grotesk, Instrument Serif Italic, Geist Mono — files in `app/fonts`).

## Run
    npm install
    npm run dev      # http://localhost:3000
    npm run build && npm start

## Edit your content
- **Projects, stats, stack marquee** → `data/projects.ts` (single source of truth).
  Fill the `TODO` entries (Research-Pilot, ScamShield) and add one real metric per project.
- **Photos** → `public/images/hero-portrait.jpg` (hero) and `about-portrait.jpg` (About card).
- **Hero hook, bio, contact** → `components/Hero.tsx`, `components/About.tsx`, `components/Footer.tsx`.
- **Colours / type tokens** → `app/globals.css` (`@theme`). Palette: cream, surface, ink, muted, one vermilion accent.

## Motion
- Loader (once per session, `sessionStorage`) → `components/Loader.tsx`
- Smooth scroll synced to GSAP → `components/SmoothScroll.tsx`
- All animation respects `prefers-reduced-motion`; cursor + stacking are desktop-only.

## Deploy
Push to GitHub and import into Vercel. No env vars needed.
