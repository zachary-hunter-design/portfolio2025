---
title: "Case Study Page"
file: "case-studies/{slug}.html"
slots: ["title", "subtitle", "summary", "role", "duration", "responsibilities", "sections", "nextSlug", "nextTitle"]
---

# Case Study Page

Standard structure for every case study. Reference implementations: `volunteer-bidding.html`, `doc-verification.html`, `ai-design-workflow.html`, `calendar-app.html`.

## Required head
- `<title>`, `<meta name="description">`, full Open Graph tags
- favicon link to `../assets/images/avatar.png`
- Two CSS links (alt-main, alt-components), single set of font preconnects, font import
- gtag block inside `</head>`

## Required body structure

```html
<body>
  <!-- Standard navbar with hamburger toggle -->
  <header><nav class="navbar">...</nav></header>

  <main>
    <!-- Full-width header image, capped at 60vh -->
    <img src="../assets/images/{slug}/cover.svg" class="case-header-img" alt="{title} cover">

    <!-- Title block with back link -->
    <section class="basic-section">
      <div class="case-titles">
        <a href="../index.html#projects-section" class="back-link">
          <span aria-hidden="true">←</span> Back to projects
        </a>
        <h1 class="hero-primary">{title}</h1>
        <h2 class="header2-accent">{subtitle}</h2>
      </div>

      <!-- Summary + meta -->
      <div class="summary-duties">
        <div class="summary">
          <h2 class="header1-primary">Executive Summary</h2>
          <p class="body-primary">{summary}</p>
        </div>
        <hr class="vertical-hr"/>
        <div class="duties-list">
          <!-- 3 duties-item blocks: Role, Duration, Responsibilities -->
        </div>
      </div>
    </section>

    <!-- Content sections (use basic-section per major beat) -->
    {sections}

    <!-- Next case link -->
    <section class="next-case-section">
      <a href="{nextSlug}.html" class="next-case-link">
        <div class="next-case-text">
          <span class="next-case-label caption-spaced">Next case study</span>
          <span class="next-case-title header3-primary">{nextTitle}</span>
        </div>
        <span class="next-case-arrow" aria-hidden="true">→</span>
      </a>
    </section>
  </main>

  <footer class="site-footer">...</footer>

  <script src="../assets/js/main.js"></script>
  <script src="../assets/js/highlighter.js"></script>
</body>
```

## Section beats (typical)
Pick 3–6 of these per case study. Don't force all of them.
- Introduction
- The Problem (or "The Spark" for process-led case studies)
- Research
- The Decisions / The Framework / Design
- Results
- Production Impact (when shipped data exists)
- What I Learned
- Coda

Each section uses `<section class="basic-section">` with `text-block`s, occasional `cards-3`, occasional `comparison-table`, occasional `image-text` pairs.

## Image rules
- Cover image: SVG placeholder OK if no real cover ready (`assets/images/{slug}/cover.svg`)
- Inline images: always include `loading="lazy" decoding="async"` and an `alt`
- Cap large images by re-encoding at 2200px max (use `magick input.webp -resize "2200x2200>" -quality 82 output.webp`)

## Voice
- Show, don't tell. Use quotes, tables, callouts over prose summaries.
- No em dashes. Commas, periods, colons, parens.
- Lean on existing typography classes; never declare custom font shorthand.
