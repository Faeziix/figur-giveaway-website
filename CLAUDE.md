# Project: Figur Giveaway Microsite

## Overview
- **Type**: Standalone Next.js microsite for a brand giveaway campaign
- **Stack**: Next.js 16, React 19, Tailwind v4, TypeScript, Framer Motion, GSAP
- **Package Manager**: bun (never npm)
- **Started**: 2026-04-18
- **Parent brand docs**: `/home/faezix/Work/My Clients/Figur/CLAUDE.md`

## Visual Direction
**Pixar 3D — Wonder** — approved 2026-04-18, replacing the prior Persian Celestial Heritage direction.
Full spec in `docs/pixar-redesign.md`.

Key rules:
- OKLCH colors only — never hex or rgb in CSS
- Fonts: Fraunces (display, variable SOFT axis), Plus Jakarta Sans (body), Caveat (decorative)
- Brand essence: *wonder*. Chubby 3D characters, spring physics, warm candlelight palette
- Signature accent: `--color-butter` (warm marigold) replaces gold
- No ambient glow, no neon, no lens flare — but DO use soft subsurface scattering on 3D assets
- Space sky: plum-deep → blush gradient (NOT black, NOT flat)
- Sparkle sprites: `public/images/pixar/sparkle-0*.png` (4 variations, chubby 3D stars)

## Architecture Decisions
- Single-page multi-act (earth → liftoff → figland → form → prize-selection → confirmation)
- State managed in a single Zustand store (avoid prop-drilling)
- All acts are full-viewport sections swapped with AnimatePresence
- API: one route `/api/entry` (POST), one `/api/check-duplicate` (POST)
- Locality of behavior: underscore-prefix folders `_components`, `_lib`, `_hooks`, `_types` per route
- Shared code: `components/ui/`, `lib/`

## Preferences & Rules
- Use `axios` not `fetch` per global rule
- Use `motion` (Framer Motion v11) for component transitions; GSAP for scroll-timeline
- All primitive components (Button, Input, Select, Link) live in `components/ui/` and use CVA
- Design tokens in `app/globals.css` under `@theme` — OKLCH only
- No comments in code; use expressive names
- No build checks unless explicitly requested

## Patterns & Conventions
- Act components: `app/_components/act-{name}/index.tsx`
- Shared UI: `app/_components/shared/`
- Primitives: `components/ui/{button,input,select,link}.tsx`
- Font variables: `--font-playfair`, `--font-inter`, `--font-cormorant`
- Color token format: `--color-brand-{name}` for raw, `--color-{semantic}` for alias

## Learnings & Corrections

## Dependencies & Tooling
- `motion` — Framer Motion v11 (component animations, AnimatePresence)
- `gsap` — ScrollTrigger narrative timeline
- `@studio-freight/lenis` — smooth scroll
- `react-hook-form` + `zod` + `@hookform/resolvers` — form validation
- `class-variance-authority` + `tailwind-merge` + `clsx` — CVA primitives
- `airtable` — entry storage
- `@shopify/admin-api-client` — discount code creation
- `resend` — transactional email
- `posthog-js` + `posthog-node` — analytics
- `zustand` — global giveaway state
- `axios` — HTTP calls

## Component Registry
- `components/ui/Button` — CVA, variants: primary/ghost/gold/outline
- `components/ui/Input` — with label + error
- `components/ui/Select` — with options + label + error
- `components/ui/Link` — wraps Next Link + external
- `app/_components/shared/BackgroundStars` — SVG Islamic geometric stars
- `app/_components/shared/ManuscriptBorder` — gold corner ornament frame
- `app/_components/shared/SectionEyebrow` — italic gold label with rules
- `app/_components/act-earth` — hero landing act
- `app/_components/act-liftoff` — auto-advance transition act (3.2s)
- `app/_components/act-figland` — arrival + CTA act
- `app/_components/act-form` — 5-field entry form
- `app/_components/act-prize-selection` — 6 moon cards, pick one, flip reveal
- `app/_components/act-confirmation` — prize display + code copy + store CTA

## API & Data Layer
- `POST /api/check-duplicate` — checks email uniqueness in Airtable before form advance
- `POST /api/entry` — validate → dedupe → award → Airtable write → Shopify code → Resend email → set cookie → return result
- Airtable base: set via `AIRTABLE_BASE_ID` env var; PAT via `AIRTABLE_PAT`
- Shopify: `SHOPIFY_STORE_DOMAIN`, `SHOPIFY_ADMIN_API_TOKEN` (needs `write_discounts` scope)
- Resend: `RESEND_API_KEY`, sending from `noreply@figur.ae`

## Environment Variables Required
```
AIRTABLE_PAT=
AIRTABLE_BASE_ID=
SHOPIFY_STORE_DOMAIN=figur-7317.myshopify.com
SHOPIFY_ADMIN_API_TOKEN=
RESEND_API_KEY=
POSTHOG_KEY=
POSTHOG_HOST=https://app.posthog.com
```

## Current State
- **Full Pixar redesign complete** (2026-04-18)
- New token system: cream, plum, butter, persimmon, honey, blush (all OKLCH) in `app/globals.css`
- New fonts: Fraunces + Plus Jakarta Sans + Caveat in `lib/fonts.ts`
- New shared components: `Sparkles`, `CharacterFloat`, `SplitText`, `LenisProvider`
- Lenis smooth scroll activated in `app/layout.tsx`
- All 5 acts redesigned: Earth, Liftoff, Form, Prize-Selection (chest mechanic), Confirmation
- 11 Pixar 3D assets generated + cropped in `public/images/pixar/`
- API routes scaffolded: `/api/entry`, `/api/check-duplicate`
- Zustand store (`app/_lib/store.ts`) left dormant — page.tsx uses local state
- Needs: env vars from client (Airtable, Shopify, Resend)

## Image Generation Notes
- Model: `gemini-3.1-flash-image-preview` (Nano Banana 2) via `NANOBANANA_MODEL` env var
- To pass reference image (logo): `gemini --yolo -p "/generate '...'" < "public/Figur logo/PNG/05 Figur logomark.png"`
- `--aspect` flag is NOT supported; specify ratio in prompt text instead
- All prompts saved in `docs/image-generation-prompts.md`
- Star sprites cropped from grid using `magick` (ImageMagick v7)
