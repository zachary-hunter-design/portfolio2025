---
title: "Next Case Link"
slots: ["href", "title"]
classes: ["next-case-section", "next-case-link", "next-case-text", "next-case-label", "next-case-title", "next-case-arrow"]
---

# Next Case Link

Bordered card at the bottom of every case study, pointing to the next study in the loop. Hover lifts it 2px with a soft shadow.

## Markup

```html
<section class="next-case-section">
  <a href="{href}" class="next-case-link">
    <div class="next-case-text">
      <span class="next-case-label caption-spaced">Next case study</span>
      <span class="next-case-title header3-primary">{title}</span>
    </div>
    <span class="next-case-arrow" aria-hidden="true">→</span>
  </a>
</section>
```

## Composition
- `next-case-label` composes with `caption-spaced` for the small uppercase eyebrow text.
- `next-case-title` composes with `header3-primary` for the heading typography.
- The wrapper classes `next-case-label` and `next-case-title` only set color (`--text-light` and `--text-dark`).

## Loop order
Maintain the same order as the home grid. Currently:
- volunteer-bidding → doc-verification → ai-design-workflow → calendar-app → volunteer-bidding
