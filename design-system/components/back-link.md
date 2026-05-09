---
title: "Back Link"
slots: ["destination", "label"]
classes: ["back-link"]
---

# Back Link

Small muted link with a left arrow. Lives at the top of every case-study page (inside `.case-titles`, above the h1).

## Markup

```html
<a href="{destination}" class="back-link">
  <span aria-hidden="true">←</span> {label}
</a>
```

Typical use: `{destination}` = `../index.html#projects-section`, `{label}` = `Back to projects`.

## Behavior
- `--text-light` at rest, `--text-dark` on hover. No background fill on hover (was removed in v2).
- Inline-flex with 0.5rem gap between arrow and label.
- 0.5rem bottom margin to space from the title that follows.

## Don't
- Don't use this for primary navigation. It's a soft escape hatch.
- Don't add it to the home or about page.
