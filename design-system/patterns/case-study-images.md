---
title: "Case Study Images"
applies-to: "assets/images/{slug}/"
status: draft
---

# Case Study Images

How images on case study pages are composed. Written down from what already exists (calendar, cost seg, volunteer bidding) so new images match.

## Ground rules
- **Real screens only.** Shipped UI, Figma frames, or working prototypes. No generated or stock imagery.
- **One accent per case study.** Backgrounds use the page's accent from `body.accent-*`: `--lightest-{color}` for flat backgrounds, a soft wash of the accent for covers. Volunteer bidding is orange, doc verification blue, calendar green.
- **Fake data, always.** Placeholder Guest names, made-up confirmation codes. Real routes and flight numbers are fine.
- **Show, don't decorate.** Every in-body image should replace a paragraph, not sit next to one.

## The image types

| Type | Size | Used for | Reference |
|---|---|---|---|
| Cover | 2400x1000 | Page header | `volunteer-bidding/cover.webp` |
| Card | 1200x900 (4:3) | Homepage card | `volunteer-bidding/card.webp` |
| Component collage | 2200 wide | Showing a set of states or pieces | `calendar/NewOverlays.webp` |
| Framed screen | 2200 wide | One full screen in context | `costseg/desktop1.webp` |
| Before / after | 2200 wide | A single change, side by side | new, see below |
| Annotated screen | 2200 wide | Pointing at the decision inside a screen | new, see below |

### Cover and card
Hero screen centered, two or three supporting screens overlapping it at different depths, faded and rotated fragments of the UI scattered behind on an accent wash. The card uses the same composition, re-cut to 4:3 with the subject centered.

### Component collage
Flat `--lightest-{color}` background. UI pieces float as separate cards: 16px radius, shadow matching `--shadow` (`0 4px 24px rgba(0,0,0,0.08)`), generous even gaps. No rotation.

### Framed screen
Desktop screens sit in a light browser frame with window dots. Mobile screens sit on the accent background with a rounded corner and no device bezel.

### Before / after (new)
Two screens at equal scale on one accent background. A small caption above each ("Before", "After") in Figtree, `--text-light`. Same crop on both so the eye only sees what changed.

### Annotated screen (new)
One screen with numbered circular markers in the accent color. The numbers match a short list in the HTML below the image, not text baked into the image, so it stays readable and accessible.

## Placement: the band
In-body composed images sit in a full-bleed `.image-band`: a strip of `--accent-tint` that runs edge to edge, with the image centered at its native 1100px width. Author the image background in the exact same tint so band and image read as one surface.

```html
<figure>
  <figcaption class="image-caption caption-spaced">Caption</figcaption>
  <div class="image-band"><img loading="lazy" decoding="async" src="..." alt="..."></div>
  <ol class="list-spaced">...</ol>  <!-- optional key for annotated images -->
</figure>
```

Compose at 1100px wide, render at 2x (2200px). Screenshots of real UI that already carry their own frame (like `costseg/desktop1.webp`) keep using `.basic-image` instead.

Card groups that want a colored backdrop, like a research overview, use `.research-band`: the same full-bleed width, as a soft gradient from `--accent-tint` to `--accent-soft`.

## HTML instead of images
Anything that's mostly text or numbers is built in HTML inside a band, not baked into an image, so it stays readable at phone width:
- `.flow-compare` for a reordered sequence (stacks into two columns on phones)
- `.bar-chart` for a few single-series values, with an optional `.bar-threshold` pass line. Always pair it with a `.sr-only` table wrapped in a div, never a table carrying `.sr-only` itself (tables ignore the 1px width and widen the page)

## Production
- Compose in HTML, render with headless Chrome at 2x, export.
- Convert: `cwebp -q 90 -m 6 -sharp_yuv in.png -o out.webp`
- Keep the source PNG in `assets/images/{slug}/_original/`.
- Every `<img>` gets `loading="lazy"`, `decoding="async"`, and real alt text describing what the image shows.

## Open questions
- Mobile screens: bezel-less on accent (current proposal) or an actual phone frame?
- Before / after and annotated are new. Confirm they fit before using them on more than one page.
