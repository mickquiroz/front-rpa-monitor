# Screenshot Instructions - Stage 1 UI Modernization

This document provides clear instructions for capturing before/after screenshots to document the Enterprise Modern / Observability UI transformation.

---

## Prerequisites

1. Have a baseline/before version of the app available (git checkout to previous commit before Stage 1 changes)
2. Have the current Stage 1 version running
3. Use a consistent browser (Chrome or Firefox recommended)
4. Ensure the CSV data file is loaded correctly

---

## Viewport Sizes to Test

Capture screenshots at these standard viewport sizes:

- **Desktop**: 1920x1080 (primary)
- **Laptop**: 1366x768 (secondary)
- **Tablet**: 768x1024 (optional)

---

## Pages to Screenshot

### 1. Dashboard Page (Main Focus)

**URL**: `http://localhost:5173` or base URL

**Elements to Focus On**:
- Full page view showing sidebar + header + main content
- Stats cards grid (4 cards at top)
- Bento grid layout with charts
- Activity timeline (2-column chart)
- Software distribution pie chart
- Top clients bar chart
- Recent critical incidents table

**Screenshot Names**:
- `01-dashboard-before.png`
- `01-dashboard-after.png`

**Key Visual Changes to Highlight**:
- Sidebar dark slate design with enhanced navigation
- Stats cards refined borders and shadows
- Bento grid responsive layout
- Chart styling and borders
- Table header styling

---

### 2. Logs Page

**URL**: Navigate to "All Logs" from sidebar

**Elements to Focus On**:
- Full page view with filters
- Table header styling
- Filter controls (search, level dropdown, client dropdown)
- Table rows with level badges
- Pagination controls at bottom

**Screenshot Names**:
- `02-logs-page-before.png`
- `02-logs-page-after.png`

**Key Visual Changes to Highlight**:
- Table header background (slate-50)
- Filter control styling
- Level badges with new colors
- Pagination button styles

---

### 3. Sidebar Navigation (Close-up)

**URL**: Any page

**Elements to Focus On**:
- Sidebar from top to bottom
- Brand header with logo
- Navigation items (active and inactive states)
- System health widget at bottom

**Screenshot Names**:
- `03-sidebar-before.png`
- `03-sidebar-after.png`

**How to Capture**:
- Take a cropped screenshot showing only the sidebar (left 256px)
- Ensure at least one nav item is active (highlighted)
- Show the full height from brand to health widget

**Key Visual Changes to Highlight**:
- Dark slate-900 background
- Enhanced brand header with border
- Active state with border-l-4 primary indicator
- System health status widget styling

---

### 4. Header Bar (Close-up)

**URL**: Any page

**Elements to Focus On**:
- Search bar
- Notification bell with error badge
- User profile section

**Screenshot Names**:
- `04-header-before.png`
- `04-header-after.png`

**How to Capture**:
- Take a cropped screenshot showing only the header bar (top 64px)
- Full width showing search on left, profile on right

**Key Visual Changes to Highlight**:
- Refined search input styling
- Notification bell with red dot badge
- User avatar and role display

---

### 5. Stats Cards (Close-up)

**URL**: Dashboard

**Elements to Focus On**:
- All 4 stat cards in grid
- Icon containers
- Values with tabular numbers
- Trend indicators (if present)

**Screenshot Names**:
- `05-stats-cards-before.png`
- `05-stats-cards-after.png`

**How to Capture**:
- Crop to show just the 4-card grid at top of dashboard
- Ensure all cards are fully visible

**Key Visual Changes to Highlight**:
- Border and shadow refinement
- Icon container backgrounds
- Typography hierarchy
- Spacing consistency

---

### 6. Charts Section (Close-up)

**URL**: Dashboard

**Elements to Focus On**:
- Bento grid with 3 charts
- Activity timeline (2-column)
- Software distribution (1-column)
- Container borders and shadows

**Screenshot Names**:
- `06-charts-bento-before.png`
- `06-charts-bento-after.png`

**How to Capture**:
- Crop to show the bento grid section (below stats cards)
- Show the 2+1 column layout

**Key Visual Changes to Highlight**:
- Bento grid responsive layout
- Chart container styling
- Borders and shadows
- Consistent spacing between charts

---

### 7. Responsive Mobile View (Optional)

**URL**: Dashboard and Logs pages

**Viewport**: 375x667 (iPhone SE)

**Screenshot Names**:
- `07-mobile-dashboard-after.png`
- `07-mobile-logs-after.png`

**Key Visual Changes to Highlight**:
- Sidebar collapse behavior (if implemented)
- Stack layout on mobile
- Touch-friendly controls

---

## Screenshot Capture Methodology

### Method 1: Browser DevTools (Recommended)

1. Open Chrome DevTools (F12)
2. Toggle device toolbar (Ctrl+Shift+M)
3. Select desired viewport size from dropdown
4. Use "Capture screenshot" from DevTools menu (⋮ > More tools > Capture screenshot)
5. Save with consistent naming convention

### Method 2: Browser Extensions

- Use "Full Page Screen Capture" or similar extension
- Ensures consistent sizing and quality

### Method 3: OS Screenshot Tools

- Windows: Win+Shift+S (Snipping Tool)
- Mac: Cmd+Shift+4
- Ensure browser window is at exact viewport size

---

## Before/After Comparison Tips

### Recommended Tool: Create Side-by-Side Comparison

Use an image editor or online tool to create side-by-side comparisons:

```
┌─────────────────────┬─────────────────────┐
│                     │                     │
│   BEFORE            │   AFTER             │
│   (Version 1.0.0)   │   (Version 1.1.0)   │
│                     │                     │
└─────────────────────┴─────────────────────┘
```

### Annotation Suggestions

Consider adding callout annotations to highlight key changes:
- Arrow pointing to refined shadow
- Highlight box around bento grid
- Label showing new color values
- Indicator for spacing improvements

---

## Quality Checklist

Before finalizing screenshots, verify:

- [ ] Data is loaded (not showing loading spinner or error)
- [ ] Screenshots are at specified viewport sizes
- [ ] Both before/after versions use same data
- [ ] Browser zoom is at 100%
- [ ] No browser extensions visible in UI
- [ ] Consistent background (slate-50)
- [ ] All text is readable and crisp
- [ ] Color accuracy (check in multiple displays if possible)

---

## Storage and Organization

Recommended folder structure:

```
screenshots/
├── before/
│   ├── 01-dashboard-before.png
│   ├── 02-logs-page-before.png
│   └── ...
├── after/
│   ├── 01-dashboard-after.png
│   ├── 02-logs-page-after.png
│   └── ...
└── comparisons/
    ├── 01-dashboard-comparison.png
    ├── 02-logs-page-comparison.png
    └── ...
```

---

## Timeline Estimate

- Full screenshot set: 30-45 minutes
- Creating side-by-side comparisons: 15-20 minutes
- Total: ~1 hour

---

## Notes

- Screenshots document visual changes only
- No functional differences should be captured (all functionality remains the same)
- Focus on design system consistency and enterprise aesthetics
- These screenshots will be used for stakeholder presentations and documentation
