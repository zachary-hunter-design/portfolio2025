---
title: "Portfolio Design System"
version: "2.0.0"
updated: "2026-05-08"
---

# Portfolio Design System

Spec for AI agents and humans authoring this site. Each component file has frontmatter (`slots`, `variants`, `classes`) and a minimal usage example.

## Foundations
- [tokens.md](./tokens.md) — colors, typography, spacing, effects

## Components
- [layout.md](./components/layout.md) — `container`, `main-page`, `basic-section`, `cards-3`, `grid-2-2`
- [button.md](./components/button.md) — `btn`, `btn-square` + variants
- [card.md](./components/card.md) — base `card`, `project-card`, stat cards
- [navbar.md](./components/navbar.md) — `navbar` + `nav-toggle` (mobile hamburger)
- [back-link.md](./components/back-link.md) — case-study back nav
- [next-case-link.md](./components/next-case-link.md) — next-case-study footer card
- [highlight-text.md](./components/highlight-text.md) — animated inline text emphasis
- [comparison-table.md](./components/comparison-table.md) — data tables with mobile-stacked rows
- [quote.md](./components/quote.md) — research / participant pull-quote (V2)

## Patterns
- [case-study.md](./patterns/case-study.md) — full case-study page structure

## Authoring rules
- Use existing typography classes. Never declare custom `font:` shorthand.
- All sizes use `clamp(min, preferred, max)` for responsive scaling.
- No em dashes (—) in generated text. Use commas, periods, colons, or parens.
- Show, don't tell. Lean on artifacts (tables, quotes, callouts) over prose.
- See `CLAUDE.md` at the vault root for full voice and style rules.
