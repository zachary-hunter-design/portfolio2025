---
title: "Button"
slots: ["label", "icon"]
variants: ["primary", "secondary"]
shapes: ["pill", "square"]
classes: ["btn", "btn-{shape}", "btn-{variant}", "btn-label"]
---

# {label}

Pill-shaped CTA. 44px min touch target. Always pair with `btn-label` typography class.

## Pill (default)

```html
<a href="#" class="btn btn-primary btn-label">
  {label} <span class="arrow">{icon}</span>
</a>

<a href="#" class="btn btn-secondary btn-label">
  {label} <span class="arrow">{icon}</span>
</a>
```

- `btn-primary` — dark background, white text
- `btn-secondary` — white background, gray border, dark text
- Hover: gray background + white text (both variants)

## Square

For case-study external links (e.g. "View Scheduling App").

```html
<a href="#" target="_blank" class="btn-square btn-primary btn-label">
  {label}
</a>
```

Same variants as pill. Square corners (8px radius).
