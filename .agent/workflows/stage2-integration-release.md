---
description: Stage 2 Integration & Release (post-Claude) — integrate, clean, verify, document, commit-ready
---

1) Define Inputs & Targets
   - Branch: master (or your current feature branch)
   - Target pages: src/pages/Dashboard.tsx, src/pages/LogsPage.tsx
   - Target components: Drawer/Modal (incidents), UI components (Card/Badge/Table), charts config
   - Target docs: CHANGELOG.md (Stage 2 section), optional RELEASE_NOTES.md

2) Planner Pass (strong-reasoner-planner-agent)
   - Read git status + list modified/untracked files
   - Produce a “Stage 2 Integration Checklist” with ordered steps and risk notes

3) Repo Hygiene (debugging-agent)
   - Ensure tmp folders are not committed:
     - Add to .gitignore: tmpclaude-*
     - Decide if .claude/ should be tracked (agents) or ignored (cache)
   - Remove tmpclaude-* directories if safe

4) Verify Commands (debugging-agent)
   - Run:
     - npm install (only if needed)
     - npm run dev (smoke)
     - npm run build
     - npm run lint
   - Fix any errors/warnings; do not change business logic/data.

5) Release Docs (code-review-agent)
   - Ensure CHANGELOG.md reflects Stage 2:
     - components standardized
     - chart styling updated
     - incident drawer behavior
     - UX/microcopy improvements

6) Acceptance Criteria
   - Dashboard renders with new components
   - Incidents drawer opens/closes (click + ESC) without console errors
   - build + lint pass
   - repo clean of tmpclaude-* tracked files

7) Commit Workflow (Optional)
   - git add .
   - git commit -m "chore(ui): stage 2 components + charts + incidents drawer"
