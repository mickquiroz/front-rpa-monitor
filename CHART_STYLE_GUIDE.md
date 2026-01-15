# Chart Style Guide - Quick Reference

## When to Use Which Color

### Semantic Colors (Use ONLY for their meaning)

```typescript
CHART_COLORS.semantic.error    // #ef4444 - Red
```
**Use for:**
- Error counts
- Failure rates
- Critical incidents
- System downtime
- Alert trends

**DON'T use for:**
- Total logs (use neutral)
- Generic data series
- Decoration

---

```typescript
CHART_COLORS.semantic.success   // #22c55e - Green
```
**Use for:**
- Success rates
- Completion percentages
- Growth trends
- Uptime metrics
- Positive deviations

**DON'T use for:**
- Neutral data
- Just because it looks nice

---

```typescript
CHART_COLORS.semantic.warning   // #f59e0b - Amber
```
**Use for:**
- Warning counts
- Pending states
- Moderate issues
- Approaching limits
- Caution indicators

**DON'T use for:**
- General metrics

---

```typescript
CHART_COLORS.semantic.neutral   // #64748b - Slate
```
**Use for:**
- Total counts (baseline)
- General metrics
- Non-critical data
- Reference lines

---

### Data Colors (Use for general data series)

```typescript
CHART_COLORS.primary[0]  // #3b82f6 - Blue
```
**Use for:**
- First data series
- Primary metric
- Main data point

---

```typescript
CHART_COLORS.primary[1-4]  // Lighter/darker blues
```
**Use for:**
- Additional data series
- Multiple metrics on same chart
- Grouped data

---

```typescript
CHART_COLORS.accent  // Teals, purples, slate
```
**Use for:**
- Accent data series
- Secondary metrics
- Visual variety without semantic meaning

---

## Style Constants Reference

### Grid Lines

```typescript
<CartesianGrid {...GRID_STYLE} />
```

Always use this for consistent grid appearance:
- Very light gray (#e5e7eb)
- 50% opacity
- Dashed (3 3)

**Vertical grids:**
- Usually hidden: `vertical={false}`
- Use sparingly to reduce clutter

---

### Axes

```typescript
<XAxis
  tick={AXIS_STYLE.tick}
  axisLine={AXIS_STYLE.axisLine}
  tickLine={false}
/>
```

**Key settings:**
- `tick`: Slate-500 color, Inter font, 12px
- `axisLine`: Slate-300, 1px
- `tickLine`: Always false (cleaner)

**Date formatting:**
```typescript
tickFormatter={(str) => {
  const d = new Date(str);
  return d.getDate() + '/' + (d.getMonth() + 1);
}}
```

**Number formatting:**
```typescript
tickFormatter={(value) => value.toLocaleString()}
```

---

### Tooltips

```typescript
<Tooltip
  {...TOOLTIP_STYLE}
  labelFormatter={(label) => /* format label */}
  formatter={(value) => /* format value */}
/>
```

**Custom formatters:**
```typescript
// Dates
labelFormatter={(label) => {
  return new Date(label).toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric'
  });
}}

// Numbers with context
formatter={(value: number) => [`${value} incidents`, 'Count']}
```

**Cursor styling:**
```typescript
cursor={TOOLTIP_STYLE.cursor}  // Default: subtle gray
cursor={{ fill: 'rgba(239, 68, 68, 0.05)' }}  // Red chart: subtle red
```

---

### Legends

```typescript
<Legend {...LEGEND_STYLE} />
```

**Custom placement:**
```typescript
<Legend
  {...LEGEND_STYLE}
  verticalAlign="bottom"
  height={36}
/>
```

---

## Animation Guidelines

### Duration
```typescript
animationDuration={300}  // Always 300ms
```

### Easing
Default easing is fine (smooth). Don't customize unless necessary.

### What to Animate
- Line drawing (yes)
- Bar growth (yes)
- Pie segment reveal (yes)
- Spinning, bouncing, excessive motion (NO)

---

## Chart Type Guidelines

### Line Charts

**Best for:**
- Time series data
- Trends over time
- Continuous data

**Settings:**
```typescript
<Line
  type="monotone"           // Smooth curves
  strokeWidth={2}           // Consistent thickness
  dot={false}               // No dots for dense data
  dot={{ r: 4 }}            // Small dots for sparse data
  animationDuration={300}
/>
```

**Dual Y-axes:**
Use when scales differ significantly
```typescript
<YAxis yAxisId="left" />
<YAxis yAxisId="right" orientation="right" />
<Line yAxisId="left" ... />
<Line yAxisId="right" ... />
```

---

### Bar Charts

**Best for:**
- Comparisons
- Rankings
- Categorical data

**Settings:**
```typescript
<Bar
  barSize={20}              // Consistent size
  radius={[0, 4, 4, 0]}     // Rounded right (horizontal)
  radius={[4, 4, 0, 0]}     // Rounded top (vertical)
  animationDuration={300}
/>
```

**Horizontal vs Vertical:**
- Horizontal: Better for long labels
- Vertical: Better for time-based categories

---

### Pie/Donut Charts

**Best for:**
- Part-to-whole relationships
- Proportions
- Distribution (use sparingly)

**Settings:**
```typescript
<Pie
  innerRadius={60}          // Donut style
  outerRadius={80}
  paddingAngle={5}          // Space between segments
  animationDuration={300}
/>

<Cell
  fill={color}
  stroke="#ffffff"          // White separation
  strokeWidth={2}
/>
```

**Color assignment:**
```typescript
{data.map((_entry, index) => {
  const colorPalette = index % 2 === 0
    ? CHART_COLORS.primary
    : CHART_COLORS.accent;
  const color = colorPalette[Math.floor(index / 2) % colorPalette.length];
  return <Cell key={index} fill={color} />;
})}
```

---

## Responsive Behavior

### Always wrap in ResponsiveContainer
```typescript
<ResponsiveContainer width="100%" height="100%">
  <LineChart data={data}>
    {/* ... */}
  </LineChart>
</ResponsiveContainer>
```

### Parent container must have height
```typescript
<div className="h-[400px]">
  <ResponsiveContainer>
    {/* chart */}
  </ResponsiveContainer>
</div>
```

---

## Common Patterns

### Pattern: Time series with baseline and errors
```typescript
<LineChart data={timelineData}>
  <CartesianGrid {...GRID_STYLE} vertical={false} />
  <XAxis tick={AXIS_STYLE.tick} axisLine={AXIS_STYLE.axisLine} tickLine={false} />
  <YAxis tick={AXIS_STYLE.tick} axisLine={AXIS_STYLE.axisLine} tickLine={false} />
  <Tooltip {...TOOLTIP_STYLE} />
  <Legend {...LEGEND_STYLE} />
  <Line
    dataKey="total"
    stroke={CHART_COLORS.semantic.neutral}
    strokeWidth={2}
    dot={false}
  />
  <Line
    dataKey="errors"
    stroke={CHART_COLORS.semantic.error}
    strokeWidth={2}
    dot={{ r: 4 }}
  />
</LineChart>
```

---

### Pattern: Top N ranking (errors)
```typescript
<BarChart data={topClients} layout="vertical">
  <CartesianGrid {...GRID_STYLE} horizontal={false} />
  <XAxis type="number" tick={AXIS_STYLE.tick} axisLine={AXIS_STYLE.axisLine} tickLine={false} />
  <YAxis dataKey="name" type="category" tick={AXIS_STYLE.tick} axisLine={AXIS_STYLE.axisLine} tickLine={false} />
  <Tooltip
    {...TOOLTIP_STYLE}
    cursor={{ fill: 'rgba(239, 68, 68, 0.05)' }}
    formatter={(value: number) => [`${value} incidents`, 'Count']}
  />
  <Bar
    dataKey="value"
    fill={CHART_COLORS.semantic.error}
    radius={[0, 4, 4, 0]}
    barSize={20}
  />
</BarChart>
```

---

### Pattern: Distribution (neutral data)
```typescript
<PieChart>
  <Pie
    data={distribution}
    innerRadius={60}
    outerRadius={80}
    paddingAngle={5}
  >
    {distribution.map((_entry, index) => {
      const colorPalette = index % 2 === 0
        ? CHART_COLORS.primary
        : CHART_COLORS.accent;
      const color = colorPalette[Math.floor(index / 2) % colorPalette.length];
      return (
        <Cell
          key={index}
          fill={color}
          stroke="#ffffff"
          strokeWidth={2}
        />
      );
    })}
  </Pie>
  <Tooltip {...TOOLTIP_STYLE} />
  <Legend {...LEGEND_STYLE} verticalAlign="bottom" />
</PieChart>
```

---

## Checklist for New Charts

Before merging:

- [ ] Uses CHART_COLORS constants (no hardcoded colors)
- [ ] Applies GRID_STYLE to grids
- [ ] Applies AXIS_STYLE to all axes
- [ ] Uses TOOLTIP_STYLE for tooltips
- [ ] Uses LEGEND_STYLE for legends
- [ ] Sets tickLine={false} on axes
- [ ] Includes animationDuration={300}
- [ ] Semantic colors used correctly (red = errors only)
- [ ] Custom formatters for dates/numbers in tooltips
- [ ] ResponsiveContainer wraps chart
- [ ] Parent has explicit height
- [ ] Tested in responsive breakpoints
- [ ] No TypeScript errors
- [ ] No console warnings

---

## Common Mistakes

### DON'T: Hardcode colors
```typescript
// ❌ Bad
<Line stroke="#ef4444" />
```

```typescript
// ✅ Good
<Line stroke={CHART_COLORS.semantic.error} />
```

---

### DON'T: Use red for non-errors
```typescript
// ❌ Bad - total logs is not an error
<Line dataKey="total" stroke={CHART_COLORS.semantic.error} />
```

```typescript
// ✅ Good
<Line dataKey="total" stroke={CHART_COLORS.semantic.neutral} />
```

---

### DON'T: Forget to style grids
```typescript
// ❌ Bad - harsh default grid
<CartesianGrid strokeDasharray="3 3" />
```

```typescript
// ✅ Good
<CartesianGrid {...GRID_STYLE} />
```

---

### DON'T: Leave default axis styling
```typescript
// ❌ Bad
<XAxis />
```

```typescript
// ✅ Good
<XAxis
  tick={AXIS_STYLE.tick}
  axisLine={AXIS_STYLE.axisLine}
  tickLine={false}
/>
```

---

### DON'T: Use slow animations
```typescript
// ❌ Bad - too slow
<Line animationDuration={1000} />
```

```typescript
// ✅ Good - subtle and quick
<Line animationDuration={300} />
```

---

## Need Help?

**See full documentation:**
- `CHART_CONFIGURATION.md` - Complete enterprise chart guide
- `CHART_REFACTORING_SUMMARY.md` - What changed and why
- `CHART_UPDATES_VISUAL_GUIDE.md` - Visual impact explanation

**In the code:**
- `src/pages/Dashboard.tsx` - Lines 38-116 for all style constants
- Tailwind config: `tailwind.config.js`
- Design tokens: `src/index.css`

**Key principle:**
> Colors should convey meaning, not just decoration. Charts should guide the eye to insights, not distract with visual noise.
