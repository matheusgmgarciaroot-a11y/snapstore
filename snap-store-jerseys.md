# Snap Store - NFL & NBA Jersey E-Commerce Plan

## Overview
Build **Snap Store**, a dedicated NFL & NBA jersey e-commerce storefront in Portuguese (BRL `R$`), inspired by the clean catalog organization of Loja Oval Club and the bold athletic streetwear energy of OG Jersey Shop.
- **Home (`/`)**: High-impact Dark Arena landing page featuring clear entry points (clickable NFL & NBA league symbols/cards) and featured drops.
- **NFL (`/nfl`) & NBA (`/nba`)**: Clean Light Gallery catalog pages. Clicking the NFL or NBA emblem loads all jerseys in **fresh random order** on entry, paired with the exact **Conference -> Division -> Team** filter structure (32 NFL teams, 30 NBA teams) plus edition filter and search.
- **Product Detail & Customization**: Size selection (`P`, `M`, `G`, `GG`, `EGG`), edition (`Home` / `Throwback-Alternate`), and optional custom name & number.
- **Cart & Simulated Checkout**: Persistent slide-over cart drawer + `/checkout` flow with shipping calculation, payment method simulation, and order confirmation.

## Project Type
WEB (Next.js 16 App Router + TypeScript + Tailwind CSS v4 + Motion)

## Success Criteria
- Home (`/`) renders a memorable Dark Arena landing experience with direct NFL and NBA league gateways.
- `/nfl` loads all 64 NFL jerseys (2 per team x 32 teams) in randomized order on visit, with exact AFC/NFC -> East/North/South/West -> Team hierarchy filters.
- `/nba` loads all 60 NBA jerseys (2 per team x 30 teams) in randomized order on visit, with exact Conferencia Leste/Oeste -> Atlantic/Central/Southeast & Northwest/Pacific/Southwest -> Team hierarchy filters.
- `/produto/[slug]` allows selecting size, edition, and optional name/number customization and adding to cart.
- Cart drawer + `/checkout` supports quantity edits, removal, coupon/shipping simulation, and order confirmation.
- `npm run lint`, `npx tsc --noEmit`, `npm run build`, and verification scripts pass without errors.

## Tech Stack
- **Framework**: Next.js (App Router, TypeScript strict)
- **Styling**: Pure Tailwind CSS v4 (CSS-first `@theme` tokens matching `DESIGN.md`)
- **Animation**: `motion` (`motion/react`) with `useReducedMotion()` support
- **Icons**: `@phosphor-icons/react`
- **Fonts**: `Barlow Condensed` (display), `Plus Jakarta Sans` (body/UI), `JetBrains Mono` (numbers/prices)

## File Structure
```
snap-store/ (workspace root)
├── DESIGN.md
├── snap-store-jerseys.md
├── public/
│   └── images/                # Generated hero & league photography
└── src/
    ├── app/
    │   ├── layout.tsx         # Fonts, CartProvider, global metadata
    │   ├── globals.css        # Tailwind v4 theme tokens
    │   ├── page.tsx           # Dark Arena Home (NFL vs NBA entry)
    │   ├── nfl/page.tsx       # Light Gallery NFL Catalog (randomized + filters)
    │   ├── nba/page.tsx       # Light Gallery NBA Catalog (randomized + filters)
    │   ├── produto/[slug]/page.tsx # Jersey detail + size & customizer
    │   └── checkout/page.tsx  # Simulated checkout flow
    ├── components/
    │   ├── layout/            # Header, Footer, CartDrawer
    │   ├── home/              # Hero, LeagueGateways, FeaturedTicker
    │   ├── catalog/           # LeagueCatalog, ConferenceFilterMatrix, JerseyCard, JerseyGraphic
    │   └── product/           # ProductConfigurator
    ├── context/
    │   └── CartContext.tsx    # Persistent localStorage cart state
    ├── data/
    │   ├── leagues.ts         # Complete 32 NFL + 30 NBA hierarchy & team colors
    │   └── jerseys.ts         # 124 jersey products (Home + Throwback/Alternate)
    └── lib/
        ├── format.ts          # BRL formatting & installments
        └── shuffle.ts         # Fisher-Yates shuffle utility
```

## Task Breakdown
- [ ] **Task 1: Design Spec & Project Scaffold** (`project-planner` / `frontend-specialist`)
  - INPUT: User specs + `DESIGN.md` -> OUTPUT: Next.js + Tailwind v4 + `motion` + `@phosphor-icons/react` initialized in workspace -> VERIFY: `package.json` valid, `npm run build` baseline passes.
- [ ] **Task 2: League & Product Visual Assets** (`image-generator`)
  - INPUT: Brand direction -> OUTPUT: 3 custom photographic assets (`hero-arena.png`, `nfl-banner.png`, `nba-banner.png`) in `public/images/` -> VERIFY: Files exist and load cleanly.
- [ ] **Task 3: Complete NFL & NBA Data Architecture** (`frontend-specialist`)
  - INPUT: Exact 32 NFL + 30 NBA conferences/divisions/teams -> OUTPUT: `src/data/leagues.ts`, `src/data/jerseys.ts` (124 products), `src/lib/shuffle.ts`, `src/lib/format.ts` -> VERIFY: `npx tsc --noEmit` passes and team counts match 32 NFL / 30 NBA.
- [ ] **Task 4: Global Layout, Cart Context & Jersey Visual System** (`frontend-specialist`)
  - INPUT: `DESIGN.md` tokens -> OUTPUT: `CartContext.tsx`, `Header.tsx`, `Footer.tsx`, `CartDrawer.tsx`, `JerseyGraphic.tsx` -> VERIFY: Cart add/remove/persist works cleanly.
- [ ] **Task 5: Pages - Home (`/`), NFL (`/nfl`), NBA (`/nba`), Product (`/produto/[slug]`), Checkout (`/checkout`)** (`frontend-specialist`)
  - INPUT: User layout & filter specs -> OUTPUT: All 5 App Router routes implemented with randomized league load and Conference/Division/Team filter matrix -> VERIFY: Interactive filtering, randomization on entry, and checkout completion work in browser.
- [ ] **Task 6: Phase X Verification** (`test-engineer` / `frontend-specialist`)
  - INPUT: Full codebase -> OUTPUT: Passing lint, typecheck, build, UX/security checks, and live browser walkthrough -> VERIFY: All checks pass.

## Phase X: Verification Checklist
- [ ] `npm run lint && npx tsc --noEmit` passes
- [ ] `npm run build` succeeds cleanly
- [ ] `.agents/skills/vulnerability-scanner/scripts/security_scan.py .` passes
- [ ] `.agents/skills/frontend-design/scripts/ux_audit.py .` passes
- [ ] Live Playwright / browser verification across `/`, `/nfl`, `/nba`, `/produto/[slug]`, `/checkout`
- [ ] Zero em-dashes (`—`), zero purple/violet accents, zero `h-screen` issues
