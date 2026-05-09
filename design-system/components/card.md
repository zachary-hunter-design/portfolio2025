---
title: "Card"
slots: ["heading", "body", "metric", "icon"]
variants: ["base", "stat", "project"]
classes: ["card", "stat-card", "project-card"]
---

# Card

White background, gray border, 16px radius, internal flex column with 1rem gap.

## Base card

```html
<div class="card">
  <h3 class="header2-accent">{heading}</h3>
  <hr/>
  <p class="body-primary">{body}</p>
</div>
```

The `<hr/>` inside `.card` renders as a small 33%-width divider in border gray. Useful between heading and body.

## Stat card (hero)

```html
<div class="stat-card card">
  <h2 class="metric-lrg statichighlight-blue">{metric}</h2>
  <h3 class="header2-accent">{heading}</h3>
  <hr/>
  <p class="body-primary">{body}</p>
</div>
```

Used in the home hero. Apply a `statichighlight-{color}` to the metric for emphasis.

## Project card

```html
<div class="card-description-div">
  <a href="case-studies/foo.html"
     class="project-card btn-label"
     style="background-image: url(assets/images/foo/cover.svg); background-size: cover; background-position: center;"></a>
  <h3 class="header3-primary">{heading}</h3>
  <p class="body-primarylrg">{body}</p>
</div>
```

Background image fills the card. Hover scales 0.98 + soft shadow. Height clamps 300–425px (250px on mobile).

## In a 3-card row

Wrap three `.card` elements in `.cards-3`:

```html
<div class="cards-3">
  <div class="card">...</div>
  <div class="card">...</div>
  <div class="card">...</div>
</div>
```

Stacks on mobile, row at >=768px.
