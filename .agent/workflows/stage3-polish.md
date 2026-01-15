---
description: Stage 3 — Final polish (microinteractions, skeleton, accessibility, performance, tooltip fixes)
---

1) Microinteractions (no flashy)
- Add subtle transitions (150–200ms) for:
  cards, buttons, table rows, drawer open/close

2) Skeleton loaders
- Add reusable Skeleton component and show skeletons for:
  KPI cards, charts area, incidents table, logs table while loading

3) Accessibility
- Drawer: ESC close, aria-label for close, focus management
- Table: rows focusable + visible focus ring

4) Tooltip fix (donut chart)
- Ensure donut tooltip does not overlap center label.
- Prefer: custom tooltip positioning outside center, or custom tooltip content.

5) Performance baseline
- Address large bundle warning:
  - split code for pages (Dashboard, Logs)
  - avoid heavy inline objects and memoize derived arrays where needed

6) Verification
- npm run build
- npm run lint
- npm test (if exists)
