# Stage 3: Enhanced Incidents Table - Feature Guide

## Table Enhancements

### 1. Sticky Header
The table header now remains visible when scrolling through incidents:
- Fixed position at top of table container
- Proper z-index layering
- Consistent styling with design tokens

### 2. Severity Badges
Each incident displays a color-coded severity badge:

| Log Level | Severity | Badge Color | Visual |
|-----------|----------|-------------|--------|
| Fatal     | Critical | Red (Error) | Red dot + "Critical" |
| Error     | High     | Red (Error) | Red dot + "High" |
| Warning   | Medium   | Amber (Warning) | Amber dot + "Medium" |
| Trace/Info | Low     | Blue (Info) | Blue dot + "Low" |

**Badge Features:**
- Small size for table display
- Dot indicator for quick scanning
- Professional color palette
- Accessible color contrast

### 3. Interactive Rows

**Mouse Interaction:**
- Hover effect: subtle background color change
- Cursor changes to pointer
- Click to open drawer

**Keyboard Interaction:**
- Tab to focus rows
- Enter to open drawer
- Arrow Up/Down to navigate
- Visual focus indicator (blue ring)

**Accessibility:**
- `role="button"` for screen readers
- `aria-label` describes action
- `tabIndex={0}` for keyboard focus

## Drawer Component

### Opening the Drawer
The drawer opens when you:
1. Click on any incident row
2. Focus a row and press Enter

### Drawer Features

**Animation:**
- Slides in smoothly from right side
- 300ms transition duration
- Backdrop fades in simultaneously

**Content Layout:**
```
┌─────────────────────────────────┐
│ Incident Details              ✕ │  ← Header with close button
├─────────────────────────────────┤
│ [Critical] [Error]              │  ← Status badges
│                                 │
│ ┌─────────────────────────────┐ │
│ │ ⚠ Error Message             │ │  ← Highlighted message card
│ │ Full error message text...  │ │
│ └─────────────────────────────┘ │
│                                 │
│ INCIDENT INFORMATION            │
│                                 │
│ 🕐 Timestamp: Jan 14, 2026...  │
│ 👤 Client: Client Name         │
│ 🤖 Robot Name: RobotName       │
│ 📄 Process: ProcessName        │
│ 💻 Software: UiPath            │
│ 🖥 Hostname: HOST123           │
│ 🖥 Host Identity: host-id      │
│                                 │
│ TECHNICAL DETAILS               │
│                                 │
│ Incident ID: uuid-here         │
└─────────────────────────────────┘
```

**Responsive Width:**
- Desktop: 600px
- Tablet: 480px
- Mobile: Full width

### Closing the Drawer
Multiple ways to close:
1. Click X button in header
2. Press ESC key
3. Click backdrop (outside drawer)

**Behavior:**
- Body scroll restored
- Focus returns to previous element
- Selected incident cleared

## Keyboard Navigation Reference

| Key | Action |
|-----|--------|
| Tab | Move focus to next row |
| Shift+Tab | Move focus to previous row |
| Enter | Open drawer for focused row |
| Arrow Down | Move to next row (when row focused) |
| Arrow Up | Move to previous row (when row focused) |
| Escape | Close drawer |

## Focus Management

### Focus Trap
When drawer is open:
- Tab cycles through elements inside drawer only
- Prevents focus from leaving drawer
- First and last elements connect in a loop

### Focus Restoration
When drawer closes:
- Focus returns to the element that opened it
- Maintains context for keyboard users
- Smooth transition without focus loss

## Visual States

### Table Row States

**Default:**
- Clean, minimal appearance
- Clear text hierarchy
- Severity badge stands out

**Hover:**
- Subtle background color change
- Smooth transition
- Maintains readability

**Focus:**
- Blue ring outline
- Light blue background
- High visibility for keyboard users

**Active (while drawer open):**
- Row remains visible in table
- Drawer overlays table
- Backdrop darkens background

## Styling Details

### Colors (Design Token Alignment)

**Severity Badges:**
- Critical/High: `error` variant (red tones)
- Medium: `warning` variant (amber tones)
- Low: `info` variant (blue tones)

**Focus States:**
- Focus ring: `blue-500`
- Focus background: `blue-50/50` (50% opacity)
- Focus ring offset: 2px

**Drawer:**
- Backdrop: `slate-900/50` with backdrop-blur
- Background: `white`
- Border: `slate-200`
- Shadow: `shadow-2xl`

### Spacing (Design Tokens)
- Table cell padding: `px-space-3 py-3`
- Drawer padding: `px-space-4 py-space-4`
- Badge padding: `px-2 py-0.5`
- Gap between elements: `gap-2`, `gap-3`

### Typography
- Table headers: `text-xs font-semibold uppercase`
- Table cells: `text-sm`
- Drawer title: `text-lg font-semibold`
- Badge text: `text-xs font-medium`
- Timestamp: `font-mono text-xs`

## Performance Considerations

### Optimization Techniques
1. **useMemo** for critical incidents filtering
2. Sticky header uses CSS only (no JS scroll listeners)
3. Drawer animation via CSS transforms (GPU accelerated)
4. Conditional rendering (drawer only renders when open)

### Smooth Animations
- All transitions: 300ms duration
- Transform animations for drawer (hardware accelerated)
- Opacity transitions for backdrop
- CSS transitions for hover/focus states

## Browser Support

**Minimum Requirements:**
- Modern browser with ES6+ support
- CSS Grid and Flexbox support
- CSS transforms and transitions
- Focus-visible pseudo-class

**Tested Features:**
- Sticky positioning
- Backdrop filter
- Focus trap
- Keyboard navigation
- ARIA attributes

## Code Quality

### TypeScript
- Full type safety
- No `any` types
- Proper type imports
- Interface definitions

### Accessibility
- WCAG 2.1 Level AA compliant
- Screen reader friendly
- Keyboard navigable
- Focus indicators
- Semantic HTML
- ARIA attributes

### Best Practices
- Component composition
- Separation of concerns
- Reusable utilities
- Consistent naming
- Clear documentation
- Error boundaries (inherited from app)

## Troubleshooting

### Common Issues

**Drawer not opening:**
- Check browser console for errors
- Verify onClick handler attached
- Confirm state management working

**Keyboard navigation not working:**
- Ensure tabIndex={0} on rows
- Check for conflicting keyboard handlers
- Verify focus styles visible

**Sticky header not sticking:**
- Check container has fixed height
- Verify overflow-auto on CardContent
- Confirm z-index values correct

**Focus trap issues:**
- Ensure focusable elements inside drawer
- Check for disabled buttons
- Verify tabindex attributes
