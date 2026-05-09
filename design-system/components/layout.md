---
title: "Layout Containers"
classes: ["container", "main-page", "basic-section", "cards-3", "grid-2-2"]
---

# Layout Containers

Composable wrappers that handle widths, padding, and gap.

## container
Page-level wrapper. 1200px max width.

```html
<div class="container">...</div>
```

## main-page
Narrower wrapper for case-study and about content. 975px max.

```html
<div class="main-page">...</div>
```

## basic-section
Standard section: flex column, centered children, responsive gap. Used for every section in case studies.

```html
<section class="basic-section">
  <div class="text-block">...</div>
  <img class="basic-image image-help" loading="lazy" decoding="async" src="..." alt="">
</section>
```

## cards-3
Three-card row. Stacks on mobile, row at >=768px. Max width 1040px.

```html
<div class="cards-3">
  <div class="card">...</div>
  <div class="card">...</div>
  <div class="card">...</div>
</div>
```

## grid-2-2
2x2 responsive grid. Falls back to 1-column at <=768px.

```html
<div class="grid-2-2">
  <div class="card">...</div>
  <div class="card">...</div>
  <div class="card">...</div>
  <div class="card">...</div>
</div>
```

## about-container
Single-column flow on the about page. Max width 720px for readable line length. Children get consistent gap via flex; per-element margins are zeroed.

```html
<div class="about-container">
  <div class="recent">...</div>
  <img loading="lazy" decoding="async" class="basic-image image-help" src="..." alt="">
  <div class="text-block">...</div>
</div>
```
