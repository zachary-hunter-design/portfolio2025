---
title: "Comparison Table"
slots: ["columnHeaders", "rowLabel", "cells"]
variants: ["default"]
classes: ["comparison-table", "trh", "td-right"]
---

# Comparison Table

Horizontally laid-out data table on desktop. Stacks each row as a card with `data-label` pseudo-elements on mobile (<=768px).

## Markup

```html
<table class="comparison-table">
  <thead>
    <tr>
      <th class="header3-primary"></th>
      <th class="header3-primary" style="color: var(--text-light)">Original</th>
      <th class="header3-primary" style="color: var(--text-light)">New</th>
      <th class="header3-primary" style="color: var(--text-light)">Change</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th class="header3-primary trh combo-blue">{rowLabel}</th>
      <td class="body-primarylrg combo-blue-light" data-label="Original">{cell1}</td>
      <td class="body-primarylrg combo-blue-light" data-label="New">{cell2}</td>
      <td class="body-primarylrg combo-blue-light td-right" data-label="Change">{cell3}</td>
    </tr>
  </tbody>
</table>
```

## Required attributes
- Every `<td>` MUST include `data-label="{column header}"`. The mobile stacked layout uses `attr(data-label)` to render the column name beside the value.
- The first cell of each row uses `<th class="trh">` for the row label. `trh` provides the rounded-left corner.
- The last `<td>` uses class `td-right` for the rounded-right corner.

## Color rules (de-Skittle)
- **One accent color per table.** Don't rotate combo classes row by row.
- Pick the accent based on table content:
  - Blue for primary outcome metrics
  - Pink for secondary/contrast
  - Green for validated results
- If you want a row to "win," highlight just that row with a stronger combo (e.g., `combo-green` instead of `combo-green-light`).

## Mobile behavior
At <=768px:
- `<thead>` hides, `<tbody>`, `<tr>`, `<td>`, `<th>` all stack as block elements.
- Each row becomes a card-like block with row label on top and value pairs below.
- `data-label` content renders as a 600-weight prefix before each value.
