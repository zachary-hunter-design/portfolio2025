---
title: "Research Quote (V2)"
slots: ["text", "attribution?"]
classes: ["research-quote", "research-quote-mark", "research-quote-text", "research-quote-attribution"]
depends_on: ["body.accent-{color}"]
---

# Research Quote

Pull-quote for participant or stakeholder voices inside case studies. Soft tinted block in the case-study accent, big serif quote glyph anchoring the top-left, blockquote text in `Roboto Serif`, optional attribution.

Replaces the older `<p class="quote combo-{color}-light">` treatment, which read as a long highlighted phrase rather than a person speaking.

## Markup

```html
<figure class="research-quote">
  <span class="research-quote-mark" aria-hidden="true">&ldquo;</span>
  <blockquote class="research-quote-text">{text}</blockquote>
  <figcaption class="research-quote-attribution">{attribution}</figcaption>
</figure>
```

`figcaption` is optional. Drop it when the surrounding lead-in prose already names who's speaking ("Three of six participants...", "The engineering manager flagged it directly..."), which is the default in the current case studies.

## Color

Driven by the page-level accent, set by an `accent-{color}` class on `<body>`:

```html
<body class="accent-orange">  <!-- volunteer-bidding -->
<body class="accent-green">   <!-- calendar-app -->
<body class="accent-blue">    <!-- doc-verification -->
<body class="accent-pink">    <!-- ai-design-workflow -->
```

That class sets two CSS variables the component reads:
- `--accent` — bold tone, used for the quote glyph
- `--accent-tint` — soft fill tone (the `--lightest-{color}` token), used as the figure background

If no `accent-*` class is present, both fall back to the blue family. Body text stays `--text-dark` regardless of accent.

## When to use
- A direct quote from a research session, usability test, or stakeholder.
- One quote per `text-block` ideally; if stacking, use a flex column with `gap: 2.5rem` minimum (see calendar-app.html).

## Don't
- Don't wrap quote text in straight `"..."` characters. The component supplies the opening glyph; the closing one is implied.
- Don't add the old `quote` class. `.research-quote-text` handles type.
- Don't add a `combo-{color}` modifier on the figure. The accent is inherited from the page-level `body.accent-{color}` class.
