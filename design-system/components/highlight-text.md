---
title: "Highlight Text"
slots: ["content"]
variants: ["combo-blue", "combo-pink", "combo-green", "combo-orange", "combo-blue-light", "combo-pink-light", "combo-green-light", "combo-orange-light"]
classes: ["highlight-text", "combo-{color}", "combo-{color}-light"]
---

# Highlight Text

Inline span that animates a colored background fill behind text as it scrolls into the top half of the viewport. The signature "playful" detail of the site.

## Markup

```html
<p class="body-primary">
  Setup text. <span class="highlight-text combo-blue-light">{content}</span> follow-on text.
</p>
```

## Variants
- `combo-{color}` — bolder fill (uses `--light-{color}`)
- `combo-{color}-light` — subtler fill (uses `--lightest-{color}`)
- `{color}` ∈ blue, pink, green, orange

## When to use which
- **combo-blue** — primary positive, headline metrics
- **combo-green** — semantic success, validation results
- **combo-pink** — emphasis, surprise, callouts
- **combo-orange** — alternative emphasis (use sparingly)
- **-light variants** — subtler, when the highlight should breathe

## Behavior
- Inert until in viewport. Fills with a 1.2s ease as it crosses the trigger zone.
- Pulses twice then holds (`animation: glow-pulse 1.8s ease-in-out 2 alternate forwards`).
- Honors `prefers-reduced-motion` (set highlighted at rest, no animation).
- Driven by `assets/js/highlighter.js`.

## Don't
- Don't highlight every emphatic phrase. Reserve for key claims or metrics.
- Don't highlight inside headings (use the type system itself).
- Don't pile multiple highlights in the same sentence.

## Related
- `static-highlight-{color}` — color-only, no background fill, no animation. Use for big metric numbers (`metric-lrg statichighlight-blue`).
