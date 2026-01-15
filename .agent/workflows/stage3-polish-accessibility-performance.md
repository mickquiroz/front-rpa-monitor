---
description: Stage 3 — Final Polish (micro-interactions, skeleton loaders, accessibility, performance baseline)
---

1) Scope & Constraints
   - Do not change business logic, data flow, routing, or CSV parsing.
   - Enterprise modern style only (no playful/cute visuals).
   - All changes must align with Stage 1 tokens.

2) Micro-interactions (debugging-agent + performance-optimization-agent)
   - Add subtle transitions (150–200ms) to:
     - cards, buttons, table rows, drawer open/close
   - Ensure hover/focus states are consistent and not “flashy”.

3) Loading States (test-writing-agent + debugging-agent)
   - Add skeleton loaders for:
     - KPI cards
     - charts container
     - incidents table
   - Skeleton should render while data is loading or when data is not ready.
   - Keep skeleton components reusable (src/components/ui/Skeleton.tsx).

4) Accessibility (security-audit-agent + code-review-agent)
   - Drawer accessibility:
     - ESC closes
     - focus moves into drawer on open
     - close button has aria-label
   - Table accessibility:
     - rows focusable (keyboard)
     - visible focus ring
   - Check color contrast of text/badges.

5) Performance Baseline (performance-optimization-agent)
   - Identify avoidable re-renders in charts/table:
     - memoize derived arrays
     - avoid inline objects for heavy props
   - Keep optimizations minimal and safe.

6) Verification (debugging-agent)
   - Run:
     - npm run dev (manual smoke)
     - npm run build
     - npm run lint
     - npm test (if configured)
   - Fix all failures.

7) Deliverables
   - Short report:
     - what was changed
     - how to test (click paths)
     - known limitations
   - Update CHANGELOG.md with Stage 3 notes.
