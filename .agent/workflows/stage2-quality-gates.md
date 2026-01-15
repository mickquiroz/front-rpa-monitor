---
description: Stage 2 Quality Gates — code review, performance baseline, security sanity checks
---

1) Code Review (code-review-agent)
   - Review changed files for:
     - consistency with tokens
     - duplicated Tailwind classes that should be componentized
     - TypeScript safety (no any, safe null checks)
     - no dead code, no unused imports

2) Performance Pass (performance-optimization-agent)
   - Identify obvious rerenders:
     - memoize expensive computed arrays (charts/table)
     - avoid inline object creation in render for chart props if hot
   - Keep changes minimal and measurable

3) Security Sanity (security-audit-agent)
   - Ensure table/drawer content is rendered safely:
     - no dangerouslySetInnerHTML unless absolutely required
     - sanitize any user-provided/log strings if they could contain HTML
   - Check for unsafe URL handling if any links exist

4) Acceptance Criteria
   - No new console warnings
   - No unsafe HTML rendering introduced
   - Perf improvements do not alter behavior
