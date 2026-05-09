---
title: "Navbar"
slots: ["name", "links"]
classes: ["navbar", "name-links-div", "name-div", "nav-toggle", "nav-links", "nav-link", "nav-link-active"]
---

# Navbar

Sticky top, white bg, gray border-bottom. Wraps content. On mobile (<=768px) the link list collapses behind a hamburger toggle.

## Markup

```html
<header>
  <nav class="navbar">
    <div class="name-links-div">
      <div class="name-div">
        <a class="header3-primary" href="index.html">{name}</a>
      </div>
      <button class="nav-toggle" aria-label="Toggle navigation" aria-expanded="false">
        <span></span><span></span><span></span>
      </button>
      <ul class="nav-links">
        <li class="nav-link"><a href="index.html">Home</a></li>
        <li class="nav-link-active"><a href="about.html">About Me</a></li>
      </ul>
    </div>
  </nav>
</header>
```

## Behavior
- `nav-toggle` is hidden on desktop (>=769px).
- On mobile, clicking `nav-toggle` toggles `.active` on both itself (animates lines into X) and on `.nav-links` (full-width dropdown).
- Wired in `assets/js/main.js`. Closes when a link is tapped.

## Active state
- Desktop: 2px underline under `.nav-link-active`.
- Mobile dropdown: bold + dark text on the active item; non-active items use `--text-light`.

## Required JS
```html
<script src="assets/js/main.js"></script>
```
