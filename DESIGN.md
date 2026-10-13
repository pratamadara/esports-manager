# Design Brief

## Direction

Neon Arena — a dark-capable esports command center where tournaments, teams, and brackets read like a live broadcast control room.

## Tone

Broadcast-tech industrial: near-black charcoal surfaces, one electric magenta primary, and a cyan-blue accent for status and data — bold and competitive, never playful.

## Differentiation

Magenta-to-violet gradient used as a scarce energy signature (primary CTAs, live indicators, rank highlights) against dense, bordered tournament/team cards — a scoreboard feel, not a generic SaaS grid.

## Color Palette

| Token      | OKLCH       | Role   |
| ---------- | ----------- | ------ |
| background | 0.14 0.022 265 | app canvas (dark) |
| foreground | 0.95 0.01 265  | primary text |
| card       | 0.18 0.024 265 | tournament/team surfaces |
| primary    | 0.66 0.26 350  | CTAs, active nav, live |
| accent     | 0.7 0.2 250    | links, info, bracket lines |
| muted      | 0.23 0.028 265 | secondary panels, meta rows |
| success    | 0.68 0.17 150  | "Selesai" / win status |
| warning    | 0.78 0.15 85   | "Berlangsung" / attention |
| destructive | 0.6 0.22 25  | delete, loss |
| border     | 0.28 0.03 265  | card + divider lines |

## Typography

- Display: Space Grotesk — headings, tournament names, scores, nav wordmark
- Body: Plus Jakarta Sans — paragraphs, labels, buttons, meta
- Mono: JetBrains Mono — bracket seeds, scores, prize numbers, IDs
- Scale: hero `text-4xl md:text-6xl font-bold tracking-tight`, h2 `text-2xl md:text-3xl font-bold tracking-tight`, label `text-xs font-semibold tracking-widest uppercase text-muted-foreground`, body `text-base`

## Elevation & Depth

Layered dark surfaces: background → card → popover; depth via `border` lines and three shadow tiers (`shadow-subtle`, `shadow-elevated`, `shadow-floating`), no neon glow.

## Structural Zones

| Zone    | Background        | Border        | Notes |
| ------- | ----------------- | ------------- | ----- |
| Header  | `bg-card/80` + backdrop-blur | `border-b` | sticky; logo, primary nav, search, auth button |
| Content | `bg-background`   | —             | alternate `bg-muted/30` sections; cards on `bg-card` |
| Footer  | `bg-muted/40`     | `border-t`    | link columns, compact |

## Spacing & Rhythm

Sections gap `py-12 md:py-16`; card grids `gap-4 md:gap-6`; micro-spacing `p-4`/`p-5` inside cards; dense meta rows use `gap-2`.

## Component Patterns

- Buttons: `rounded-lg`; primary = gradient fill + `shadow-elevated`; secondary = `bg-secondary`; ghost for nav; hover lifts + brightens
- Cards: `rounded-xl bg-card border` + `shadow-subtle`, hover → `shadow-elevated` + `border-primary/40`
- Badges: pill `rounded-full`; status = success/warning/muted; game tags = accent tint

## Motion

- Entrance: staggered `fade-in` 0.4s ease-out on card grids
- Hover: `transition-smooth` 0.3s — lift, border brighten, shadow step-up
- Decorative: subtle `pulse-live` on live indicators; `float` on hero bracket motif

## Constraints

- Tokens only — no hex/rgb literals or arbitrary color classes in components
- Dark mode is the default experience; light mode stays AA+ for public pages
- Bahasa Indonesia UI, dense hierarchy, responsive desktop + mobile

## Signature Detail

The magenta→violet gradient as a scarce "energy" cue for live tournaments and primary actions — a broadcast scoreboard signature.
