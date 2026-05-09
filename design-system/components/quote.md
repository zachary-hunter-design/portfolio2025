---
title: "Research Quote (V2)"
slots: ["text", "attribution?"]
variants: ["combo-blue", "combo-pink", "combo-green", "combo-orange"]
classes: ["research-quote", "research-quote-mark", "research-quote-text", "research-quote-attribution"]
---

# Research Quote

Pull-quote for participant or stakeholder voices inside case studies. Big serif quote glyph in the case study accent color, blockquote text in `Roboto Serif`, optional attribution.

Replaces the older `<p class="quote combo-{color}-light">` treatment, which read as a long highlighted phrase rather than a person speaking.

## Markup

```html
<figure class="research-quote combo-orange">
  <span class="research-quote-mark" aria-hidden="true">&ldquo;</span>
  <blockquote class="research-quote-text">{text}</blockquote>
  <figcaption class="research-quote-attribution">{attribution}</figcaption>
</figure>
```

`figcaption` is optional. Drop it when the surrounding lead-in prose already names who's speaking ("Three of six participants...", "The engineering manager flagged it directly..."), which is the default in the current case studies.

## Variants
- `combo-blue` (default) — doc-verification, anything on the indigo accent
- `combo-orange` — volunteer-bidding
- `combo-green`, `combo-pink` — reserved for future case studies

The modifier only tints the opening quote glyph. Body text stays `--text-dark` regardless of accent.

## When to use
- A direct quote from a research session, usability test, or stakeholder.
- One quote per `text-block`, never stacked.

## Don't
- Don't wrap quote text in straight `"..."` characters. The component supplies the opening glyph; the closing one is implied.
- Don't add the old `quote` class. `.research-quote-text` handles type.
- Don't use `combo-{color}-light` here. The light tint was the old treatment's background; V2 has no fill.
