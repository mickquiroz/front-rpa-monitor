# Design Tokens - FRONT_RPA_LOG

## Overview

This design system implements an **Enterprise Modern / Observability UI** approach optimized for RPA monitoring dashboards. The tokens prioritize clarity, data density, and professional aesthetics suitable for enterprise operations teams.

---

## Core Principles

### 1. 8px Spacing Grid
All spacing uses multiples of 8px for visual rhythm and consistency.

### 2. Minimal Corner Radius
Restrained border radius creates a professional, data-focused aesthetic:
- **4px** - Badges, tags
- **6px** - Buttons, inputs, cards (default)
- **8px** - Modals, large containers

### 3. Refined Shadows
Subtle shadows combined with borders for depth without visual noise.

### 4. Tabular Numbers
All numeric content uses tabular (monospace) numbers for perfect alignment in tables and metrics.

### 5. Restrained Color Palette
Neutral grays dominate; semantic colors reserved for status indicators only.

---

## Token Reference

### Spacing Tokens (8px Grid)

Use semantic spacing names for consistency:

```jsx
// Tailwind classes
className="p-space-2 gap-space-3"

// Available tokens
space-1  // 8px  - tight spacing, small gaps
space-2  // 16px - default spacing, form fields
space-3  // 24px - section padding, card padding
space-4  // 32px - large section spacing
space-5  // 40px - major section breaks
space-6  // 48px - page-level spacing
```

**Usage Guidelines:**
- **space-1**: Icon gaps, badge padding, table cell padding
- **space-2**: Button padding, input padding, small gaps
- **space-3**: Card padding, form groups, default gaps
- **space-4**: Section spacing, modal padding
- **space-5**: Page header/footer spacing
- **space-6**: Hero sections, major page dividers

---

### Border Radius Tokens

```jsx
// Tailwind classes
className="rounded"      // 6px - default
className="rounded-sm"   // 4px - badges
className="rounded-md"   // 6px - cards
className="rounded-lg"   // 8px - modals
className="rounded-full" // Pills, avatars
```

**Component Mapping:**
- **Badges/Tags**: `rounded-sm` (4px)
- **Buttons/Inputs**: `rounded` (6px)
- **Cards**: `rounded-md` (6px)
- **Modals**: `rounded-lg` (8px)
- **Avatars/Pills**: `rounded-full`

---

### Shadow Tokens

Refined shadows for subtle elevation:

```jsx
className="shadow-xs" // Minimal lift - inputs, small cards
className="shadow-sm" // Subtle depth - buttons, badges
className="shadow-md" // Medium elevation - cards, dropdowns
className="shadow-lg" // High elevation - modals, popovers
```

**Usage Guidelines:**
- Use borders as primary separation
- Shadows add subtle depth on hover/interaction
- Avoid heavy shadows - keep the UI flat and clean

---

### Typography System

#### Font Family
```jsx
// Inter is loaded automatically
className="font-sans" // Inter with system fallbacks
```

#### Font Sizes

```jsx
text-xs   // 12px - Small labels, captions
text-sm   // 13px - Body small, secondary text
text-base // 14px - Default body text (PRIMARY)
text-lg   // 16px - Emphasized text, large labels
text-xl   // 20px - h3 headings
text-2xl  // 24px - h1, h2 headings
```

**Semantic Usage:**
- **text-base**: Default for all body text
- **text-sm**: Secondary information, metadata
- **text-xs**: Fine print, timestamps
- **text-lg**: Emphasized metrics, primary labels
- **text-xl**: Section headings (h3)
- **text-2xl**: Page headings (h1, h2)

#### Font Weights

```jsx
font-normal   // 400 - body text
font-medium   // 500 - emphasis, labels
font-semibold // 600 - headings, metrics
```

#### Tabular Numbers

```jsx
// Applied by default to body
// Force on specific elements:
className="tabular-nums"

// Or use metric utilities:
className="metric-large"  // Large metric display
className="metric-medium" // Medium metric display
className="metric-small"  // Small metric display
```

---

### Color System

#### Primary (Blue)
Interactive elements, primary actions, focus states.

```jsx
bg-primary-600  // Default primary
bg-primary-700  // Hover state
bg-primary-800  // Active/pressed
text-primary-600
border-primary-600
```

**Shades:**
- **50-100**: Very light backgrounds
- **500-600**: Primary default
- **700-800**: Hover/active states
- **900**: Dark text on light backgrounds

#### Semantic Colors
Status indicators only - use sparingly.

```jsx
// Success (Green)
text-success      // #059669
bg-success-light  // Light background
text-success-dark // Dark text

// Warning (Amber)
text-warning
bg-warning-light
text-warning-dark

// Error (Red)
text-error
bg-error-light
text-error-dark

// Info (Cyan)
text-info
bg-info-light
text-info-dark
```

#### Neutral/Slate (Primary Gray Scale)

```jsx
// Backgrounds
bg-slate-50   // Page background
bg-slate-100  // Subtle background
bg-white      // Card background

// Text
text-slate-900 // Primary text
text-slate-700 // Secondary text
text-slate-500 // Muted text
text-slate-400 // Placeholder text

// Borders
border-slate-200 // Default border
border-slate-300 // Hover border
```

**Border Utilities:**
```jsx
border-border       // Default border (slate-200)
border-border-light // Light border (slate-100)
border-border-dark  // Dark border (slate-300)
```

---

### Transitions

```jsx
// Duration
transition-fast   // 150ms - micro-interactions
transition-normal // 200ms - default (hover, focus)
transition-slow   // 300ms - complex animations

// Timing function
ease-smooth // cubic-bezier(0.4, 0, 0.2, 1)

// Complete transition
className="transition-all duration-normal ease-smooth"
```

---

## Component Utilities

### Pre-built Component Classes

#### Buttons

```jsx
// Primary button
<button className="btn-primary">
  Save Changes
</button>

// Secondary button
<button className="btn-secondary">
  Cancel
</button>

// Ghost button
<button className="btn-ghost">
  Reset
</button>
```

#### Cards

```jsx
// Static card
<div className="card">
  Card content
</div>

// Interactive card with hover
<div className="card-hover">
  Clickable card
</div>
```

#### Inputs

```jsx
<input
  type="text"
  className="input"
  placeholder="Enter value"
/>
```

#### Badges

```jsx
<span className="badge-success">Running</span>
<span className="badge-warning">Pending</span>
<span className="badge-error">Failed</span>
<span className="badge-info">Scheduled</span>
<span className="badge-neutral">Unknown</span>
```

#### Metrics

```jsx
<div className="metric-large">1,234</div>
<div className="metric-medium">567</div>
<div className="metric-small">89</div>
```

#### Dividers

```jsx
<hr className="divider" />
<div className="divider-vertical h-full" />
```

---

## Usage Examples

### Dashboard Card

```jsx
<div className="card space-y-space-2">
  <h3 className="text-lg font-medium">Active Robots</h3>
  <div className="metric-large">24</div>
  <p className="text-sm text-slate-600">
    <span className="badge-success">+3</span> since last hour
  </p>
</div>
```

### Form Layout

```jsx
<form className="space-y-space-3">
  <div>
    <label className="block text-sm font-medium text-slate-700 mb-1">
      Robot Name
    </label>
    <input type="text" className="input" />
  </div>

  <div className="flex gap-space-2">
    <button type="submit" className="btn-primary">
      Submit
    </button>
    <button type="button" className="btn-secondary">
      Cancel
    </button>
  </div>
</form>
```

### Status Table Row

```jsx
<tr className="border-t border-slate-200 hover:bg-slate-50">
  <td className="p-space-2 text-sm">Robot-01</td>
  <td className="p-space-2">
    <span className="badge-success">Running</span>
  </td>
  <td className="p-space-2 tabular-nums text-sm">
    1,234
  </td>
</tr>
```

---

## Best Practices

### Do's ✅

- **Use semantic spacing tokens** (`space-1` through `space-6`) instead of arbitrary values
- **Apply tabular-nums to all metrics** for perfect alignment
- **Use borders first, shadows second** for separation
- **Stick to the 8px grid** for all spacing decisions
- **Use semantic color names** only for status/state indicators
- **Default to slate neutral colors** for most UI elements

### Don'ts ❌

- **Don't use arbitrary spacing values** like `p-3` or `gap-5` - use `space-*` tokens
- **Don't use semantic colors decoratively** - they're for status only
- **Don't mix different gray scales** - stick with slate
- **Don't use large border radius** - keep it minimal (4-8px max)
- **Don't overuse shadows** - keep the UI flat and clean
- **Don't use proportional numbers** for metrics - always use `tabular-nums`

---

## Migration Guide

### Updating Existing Components

**Before:**
```jsx
<div className="p-6 rounded-lg shadow-lg bg-blue-500">
  <p className="text-base">Value: 123</p>
</div>
```

**After:**
```jsx
<div className="p-space-3 rounded-md shadow-md bg-primary-600">
  <p className="text-base tabular-nums">Value: 123</p>
</div>
```

### Common Replacements

| Old | New | Reason |
|-----|-----|--------|
| `p-6` | `p-space-3` | 8px grid (24px) |
| `gap-4` | `gap-space-2` | 8px grid (16px) |
| `rounded-lg` | `rounded-md` | Minimal radius (6px) |
| `shadow-xl` | `shadow-md` | Refined shadows |
| `bg-blue-500` | `bg-primary-600` | Semantic naming |
| `text-gray-600` | `text-slate-600` | Consistent gray scale |

---

## Theming & Customization

### Extending the System

To add custom tokens, update `tailwind.config.js`:

```js
theme: {
  extend: {
    spacing: {
      'space-7': '3.5rem', // 56px - if needed
    },
    colors: {
      brand: '#YOUR_COLOR',
    },
  },
}
```

### Dark Mode (Future)

The system is prepared for dark mode:

```jsx
// In your components
className="bg-white dark:bg-slate-900"
className="text-slate-900 dark:text-slate-100"
```

To enable, add `darkMode: 'class'` to `tailwind.config.js` and toggle a `dark` class on the root element.

---

## Resources

- **Tailwind Config**: `tailwind.config.js`
- **CSS Base Styles**: `src/index.css`
- **Font**: Inter via Google Fonts (400, 500, 600 weights)

---

## Questions?

This design system is optimized for RPA monitoring dashboards. When in doubt:
1. Choose simplicity over decoration
2. Prioritize data clarity
3. Use the 8px grid
4. Keep it professional and restrained

Happy building! 🚀
