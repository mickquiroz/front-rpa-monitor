# Changelog

All notable changes to the FRONT_RPA_LOG project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [1.2.0] - Stage 2 Integration & Release - 2026-01-14

### Integrated
- **Component Library Engineering**: Completed component library foundation.
- **Chart Visualization**: Enhanced dashboard charts.
- **Table Drill-down**: Added interactions for table rows.
- **Microcopy**: Refined UI text.

### Changed
- **Repo Hygiene**: Added `.claude/` to gitignore.
- **Quality Gates**:
  - Fixed impure `Math.random` in `Input.tsx` (Use `useId`).
  - Linting and build passed.

### Fixed
- **Input Component**: Replaced impure ID generation with `useId` to prevent hydration mismatches and accessiblity issues.

---

## [1.1.0] - Enterprise UI Modernization (Stage 1) - 2026-01-13

### Added - Design System Foundation
- **Design Tokens (tailwind.config.js)**
  - Implemented 8px grid spacing system (space-1 through space-6)
  - Defined enterprise-focused border radius scale (4px-8px for components)
  - Created refined shadow system with subtle elevation levels
  - Established Inter font family as primary typeface with optimized size scale
  - Configured enterprise color palette with primary (blue) and semantic colors
  - Added consistent transition timing tokens (fast/normal/slow)

- **Global Styles (src/index.css)**
  - Imported Inter font from Google Fonts (weights: 400, 500, 600)
  - Configured tabular numbers for metrics consistency
  - Defined heading hierarchy (h1/h2/h3) with proper sizing
  - Created reusable button variants (primary, secondary, ghost)
  - Implemented card component utilities with hover states
  - Added input field styles with focus states
  - Created status badge variants for all severity levels
  - Defined metric display utilities for data visualization
  - Added custom scrollbar styling for observability UI

### Changed - Component Modernization

- **Layout Component (src/components/Layout.tsx)**
  - Redesigned sidebar with dark slate (slate-900) background
  - Enhanced brand header with logo container and subtitle
  - Improved navigation items with active state indicators and hover effects
  - Added system health status widget at sidebar bottom
  - Modernized top header with improved search bar styling
  - Enhanced notification bell with error count badge
  - Refined user profile section with avatar and role display

- **StatCard Component (src/components/StatCard.tsx)**
  - Refined card styling with border and shadow-sm on hover
  - Improved icon container with consistent background colors
  - Enhanced typography hierarchy for labels and values
  - Added tabular numbers class for consistent metric display
  - Maintained trend indicators with proper color coding

- **Dashboard Page (src/pages/Dashboard.tsx)**
  - Converted layout to bento grid system (grid-based responsive layout)
  - Implemented 2-column activity timeline chart (lg:col-span-2)
  - Added 1-column software distribution pie chart
  - Created full-width bar chart for top clients by incidents
  - Designed full-width recent critical incidents table
  - Applied consistent spacing tokens (space-3) throughout
  - Enhanced chart containers with proper border and shadow styling
  - Improved table styling with hover effects and truncation

- **LogsPage Component (src/pages/LogsPage.tsx)**
  - Updated table header styling with slate-50 background
  - Enhanced filter controls with consistent border and focus states
  - Improved pagination controls with disabled state styling
  - Applied refined spacing and typography tokens
  - Enhanced row hover effects with subtle background transition

### Fixed - Code Quality & Type Safety

- **Type System Improvements**
  - Added `NavigationParams` interface in types.ts for type-safe navigation
  - Created `CSVRow` interface in LogContext for proper PapaParse typing
  - Removed all `any` type usages, replacing with proper interfaces
  - Fixed TypeScript compilation errors in App.tsx and Dashboard.tsx

- **ESLint Compliance**
  - Resolved react-refresh/only-export-components warnings in context files
  - Added appropriate eslint-disable comments for legitimate patterns
  - Fixed all @typescript-eslint/no-explicit-any errors
  - Removed unused eslint-disable directives

- **Build & Lint**
  - All TypeScript compilation passes without errors
  - All ESLint rules pass without warnings or errors
  - Production build succeeds with optimized bundle

### Technical Details

- **Dependencies**: No new dependencies added
- **Breaking Changes**: None - all changes are visual/styling only
- **Bundle Size**: 646.23 kB (gzipped: 196.00 kB) - unchanged from previous version
- **Browser Compatibility**: Modern browsers supporting CSS Grid and Flexbox

### Notes

- Stage 1 focuses exclusively on visual modernization and design system foundation
- No functional changes to data fetching, filtering, or business logic
- All existing features remain fully functional
- Type safety improvements enhance developer experience and maintainability

---

## [1.0.0] - Initial Release - 2025-01-XX

### Added
- Initial RPA log monitoring dashboard
- CSV data import from robot logs
- Dashboard with stats cards and charts
- Logs page with filtering and pagination
- Client detail view
- Context-based state management (LogContext, ToastContext)
- Toast notification system
- Responsive layout with sidebar navigation
