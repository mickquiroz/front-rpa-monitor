---
description: Stage 2 Test Coverage — add minimal tests for incidents drawer and key UI components
---

1) Detect Test Stack (debugging-agent)
   - Check package.json:
     - vitest/jest + react-testing-library?
   - If none exists, add Vitest + RTL minimal setup

2) Write Tests (test-writing-agent)
   - Add tests:
     - Dashboard renders KPI cards
     - Incidents table row click opens drawer
     - ESC closes drawer
   - Keep tests robust (role/text queries) and not brittle to styling

3) Run Tests (debugging-agent)
   - npm test (or npm run test)
   - Fix failures

4) Acceptance Criteria
   - Tests pass locally
   - Tests cover drawer open/close paths
