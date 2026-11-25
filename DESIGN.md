---
version: alpha
name: Snap Store Hybrid Arena & Gallery
description: Hybrid visual system combining a Dark Arena flagship landing page with crisp Light Gallery league catalogs for NFL and NBA jerseys.
colors:
  primary: "#D61F26"
  primary-hover: "#B3171D"
  arena-bg: "#0D0F12"
  arena-surface: "#161A20"
  arena-border: "#272C35"
  arena-text: "#F4F5F7"
  arena-muted: "#9AA3B2"
  gallery-bg: "#F6F7F8"
  gallery-surface: "#FFFFFF"
  gallery-border: "#E1E4E8"
  gallery-text: "#111317"
  gallery-muted: "#5A6270"
  nfl-navy: "#013369"
  nfl-red: "#D50A0A"
  nba-blue: "#1D428A"
  nba-red: "#C8102E"
  success: "#15803D"
  error: "#DC2626"
typography:
  headline-display:
    fontFamily: Barlow Condensed
    fontSize: 64px
    fontWeight: 800
    lineHeight: 0.96
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Barlow Condensed
    fontSize: 40px
    fontWeight: 700
    lineHeight: 1.05
    letterSpacing: -0.015em
  headline-md:
    fontFamily: Barlow Condensed
    fontSize: 28px
    fontWeight: 700
    lineHeight: 1.1
    letterSpacing: -0.01em
  body-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 18px
    fontWeight: 400
    lineHeight: 1.55
  body-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 15px
    fontWeight: 400
    lineHeight: 1.55
  body-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 13px
    fontWeight: 500
    lineHeight: 1.45
  label-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 14px
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: 0.04em
  label-md:
    fontFamily: JetBrains Mono
    fontSize: 12px
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: 0.06em
  label-sm:
    fontFamily: JetBrains Mono
    fontSize: 11px
    fontWeight: 500
    lineHeight: 1.2
    letterSpacing: 0.05em
rounded:
  none: 0px
  xs: 2px
  full: 9999px
spacing:
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 40px
  2xl: 64px
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "#FFFFFF"
    typography: "{typography.label-lg}"
    rounded: "{rounded.xs}"
    padding: 14px
  button-primary-hover:
    backgroundColor: "{colors.primary-hover}"
    textColor: "#FFFFFF"
    rounded: "{rounded.xs}"
    padding: 14px
  jersey-card:
    backgroundColor: "{colors.gallery-surface}"
    rounded: "{rounded.xs}"
    padding: 16px
  filter-chip:
    backgroundColor: "{colors.gallery-surface}"
    textColor: "{colors.gallery-text}"
    typography: "{typography.body-sm}"
    rounded: "{rounded.xs}"
    padding: 8px
---

# Snap Store Hybrid Arena & Gallery

## Overview
Snap Store is a Brazilian NFL and NBA jersey storefront built with a deliberate **Hybrid Visual Architecture**:
1. **Home (`/`) - Dark Arena Mode**: Deep obsidian charcoal surfaces (`#0D0F12`), dramatic stadium lighting imagery, oversized condensed athletic display typography, and high-impact entry gateways for the NFL and NBA emblems.
2. **Catalogs (`/nfl`, `/nba`, `/produto/[slug]`, `/checkout`) - Light Gallery Mode**: Crisp off-white studio backgrounds (`#F6F7F8` and `#FFFFFF`) inspired by classic retail jersey galleries, maximizing contrast for team colors, jersey stitching details, and multi-division filtering.

Each page stays strictly locked to its own surface theme without mid-page light/dark inversions.

## Colors
- **Primary Brand Accent (`#D94E28`)**: Signal Blaze Orange-Red. Used as the sole primary CTA and active selection accent across both Dark Arena and Light Gallery pages. Zero purple, violet, or indigo anywhere in the interface.
- **Dark Arena Surfaces**: `#0D0F12` (canvas), `#161A20` (elevated panel), `#272C35` (hairline border), `#F4F5F7` (primary text), `#9AA3B2` (secondary text).
- **Light Gallery Surfaces**: `#F6F7F8` (canvas), `#FFFFFF` (product card / filter surface), `#E1E4E8` (1px hairline border), `#111317` (primary ink), `#5A6270` (secondary ink).
- **League Identity Accents**: NFL Shield Navy (`#013369`) + Red (`#D50A0A`) and NBA Hardwood Blue (`#1D428A`) + Red (`#C8102E`), used exclusively for league emblems and division headers. Team colors are used strictly inside jersey visuals and team indicator bars.

## Typography
- **Display (`Barlow Condensed`)**: Heavy, condensed athletic jersey-style numerals and uppercase headlines (`700` and `800` weights) for scoreboard clarity and stadium authority.
- **Body & UI (`Plus Jakarta Sans`)**: Clean geometric sans for readable Portuguese product names, filter labels, and checkout forms.
- **Technical & Pricing (`JetBrains Mono`)**: Tabular monospace for prices (`R$ 349,90`), installment lines, SKU tags, and jersey numbers.

## Layout
- Desktop container max-width `1400px` (`max-w-[1400px] mx-auto px-4 md:px-8`).
- Single-line top navigation capped at `68px` height with Snap Store mark, NFL link, NBA link, search trigger, and Cart counter button.
- Home hero fits cleanly within `min-h-[calc(100dvh-68px)]` without forcing scroll to reach the NFL and NBA league gateways.
- League catalog pages (`/nfl` and `/nba`) feature a prominent Conference/Division/Team interactive selector (two side-by-side conference columns matching the exact division hierarchy) paired with a responsive 2-to-4 column jersey grid.

## Elevation & Depth
- Flat architectural precision over heavy shadows: `1px` crisp borders (`#272C35` on dark, `#E1E4E8` on light) define hierarchy.
- Subtle tinted elevation (`0 12px 32px -12px rgba(17, 19, 23, 0.12)`) only on interactive drawers (Cart, Mobile Filter) and hovered jersey cards.
- Subtle fixed grain overlay (`pointer-events-none`) on Dark Arena hero surfaces for tactile print depth.

## Shapes
- **Sharp Athletic Geometry (`2px` / `rounded-[2px]`)** across all cards, buttons, badges, inputs, and filter chips.
- No generic `6px-8px` rounded-md defaults. Circular `9999px` radius reserved strictly for miniature color swatch dots (`10px`).

## Components
- **Header**: `68px` sticky bar, theme-aware per route (dark on `/`, crisp light on catalog/checkout routes), single-row desktop layout.
- **League Gateway Cards**: Prominent clickable NFL and NBA emblem panels on `/` that navigate to `/nfl` and `/nba` with immediate visual feedback.
- **Conference Filter Matrix**: Side-by-side Conference columns (`AFC` vs `NFC` for NFL; `Conferencia Leste` vs `Conferencia Oeste` for NBA), grouped by Division, with clickable Conference, Division, and individual Team buttons.
- **Jersey Card**: Clean vertical card showing custom team-colored jersey silhouette with front/back details, edition badge (`Home` / `Throwback`), team/division label, price + Pix/installment info, and quick link to `/produto/[slug]`.
- **Product Configurator**: Size matrix (`P`, `M`, `G`, `GG`, `EGG`), optional custom name + jersey number live preview on the jersey visual, and tactile Add to Cart CTA.
- **Cart Drawer & Simulated Checkout**: Slide-over cart with quantity controls, subtotal, free shipping progress bar, and full simulated `/checkout` form.

## Do's and Don'ts
- **Do** randomize the jersey grid order every time the user enters `/nfl` or `/nba` via the league emblem or navigation, and keep a manual "Embaralhar Camisas" button available.
- **Do** honor `prefers-reduced-motion` on all Motion animations.
- **Do** keep button labels concise (1-3 words, single line on desktop) and contrast WCAG AA compliant.
- **Don't** use em-dashes (`—`) or en-dashes (`–`) anywhere in UI copy; use regular hyphens (`-`) or colons.
- **Don't** use purple, violet, or indigo hues anywhere in the UI or tokens.
- **Don't** invert light and dark themes mid-page within the same route.
