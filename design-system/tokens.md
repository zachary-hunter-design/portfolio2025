---
title: "Design Tokens"
version: "2.0.0"
---

# Tokens

All values are CSS custom properties on `:root` in `assets/css/alt-main.css`.

## Color

Refined Stripe-leaning palette. Four primary accents plus functional grays.

| Token | Value | Use |
|---|---|---|
| `--primary-blue` | `#4F46E5` | Primary brand accent (indigo, slight purple lean) |
| `--primary-skyblue` | `#6366F1` | Secondary blue for hover/icons |
| `--primary-pink` | `#C026D3` | Warm accent for emphasis |
| `--primary-green` | `#059669` | Emerald, calendar case study identity |
| `--primary-orange` | `#EA580C` | Warm tertiary accent |
| `--light-{color}` | `#E0E7FF`, `#FAE8FF`, `#D1FAE5`, `#FFEDD5` | Background fills (combo highlight bg) |
| `--lightest-{color}` | `#EEF2FF`, `#FAF5FF`, `#ECFDF5`, `#FFF7ED` | Subtle background fills (combo-light highlight bg) |
| `--text-dark` | `#1A1A1A` | Body and heading text |
| `--text-light` | `#6B7280` | Muted secondary text (gray-500) |
| `--border-gray` | `#9CA3AF` | Borders and dividers (gray-400) |
| `--btn-hover` | `#374151` | Button hover background (gray-700) |
| `--bg-light` | `#FEFEFE` | Page background |

**Usage rules:**
- Don't pile every color into one component. One or two accents per page section.
- Comparison tables: prefer monochrome rows, accent only the row that matters.
- Highlight-text spans on prose may rotate freely.

## Typography

Two families:
- `--font-primary` (Figtree, sans-serif) — body and most headings
- `--font-accent` (Roboto Serif) — display/quote moments

All scale classes use `clamp()`. Use the class, never the raw values.

| Class | Use |
|---|---|
| `hero-primary`, `hero-accent` | Page-level h1 |
| `header1-primary` | Section h2 |
| `header2-primary`, `header2-accent` | Subsection h3 |
| `header3-primary` | Small headings, card titles |
| `body-primarylrg` | Lead paragraph or large body |
| `body-primary` | Standard body |
| `body-primary-bold` | Emphasis body |
| `btn-label` | Interactive labels |
| `caption-spaced` | Uppercase 700-weight small labels |
| `metric-lrg` | Big numbers (stat cards) |
| `quote` | Pull-quotes (Roboto Serif) |

## Spacing

Two patterns:
- `clamp(min, preferred, max)` for responsive properties
- Discrete scale: `4px, 8px, 12px, 16px, 24px, 32px, 48px, 64px, 96px, 128px`

Common patterns:
- Section padding: `clamp(2rem, 6vw, 4rem)`
- Card padding: `clamp(1rem, 3vw, 1.25rem)`
- Gap (small/med/large): `clamp(0.5rem, 2vw, 1rem)` / `clamp(1rem, 3vw, 1.5rem)` / `clamp(2rem, 5vw, 3rem)`

## Effects

| Token | Value |
|---|---|
| `--border-radius` | `16px` |
| `--shadow` | `0 4px 24px rgba(0,0,0,0.08)` |
| `--transition` | `all 0.3s ease` |

## Breakpoints

Mobile-first. Common breakpoints used in CSS:
- `768px` — tablet/landscape phone
- `900px` — hero row layout
- `1024px` — desktop (hero card overlap activates)
- `1440px` — large desktop
