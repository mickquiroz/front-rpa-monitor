# UI Copy Conventions - RPA Monitor

## Overview
This document establishes the enterprise-grade microcopy standards for the RPA Monitor application. All user-facing text must follow these conventions to ensure consistency, clarity, and professionalism.

---

## Voice & Tone

### General Principles
- **Professional**: Formal, business-appropriate language
- **Clear**: Immediately understandable without ambiguity
- **Concise**: Every word serves a purpose
- **Action-oriented**: Guide users toward successful outcomes
- **Neutral**: Avoid blame, humor, or emotional language

### Examples
✅ **Good**: "No critical incidents detected"
❌ **Bad**: "Yay! Everything looks good!"

✅ **Good**: "Data exported successfully"
❌ **Bad**: "Your export is ready! 🎉"

---

## Capitalization Standards

### Title Case
Use for:
- Page titles
- Card titles
- Section headers
- Dialog titles
- Navigation items

**Examples**:
- Dashboard
- System Logs
- Recent Critical Incidents
- Activity Trend (Last 14 Days)
- Incident Details

### Sentence case
Use for:
- Body text
- Descriptions
- Helper text
- Toast messages
- Empty states
- Error messages

**Examples**:
- "No logs match the current filters"
- "Data exported successfully"
- "Search clients, robots, processes..."

---

## Component-Specific Guidelines

### 1. Button Labels

**Pattern**: `[Action Verb] + [Object]`

| Context | Label | Notes |
|---------|-------|-------|
| Primary action | "Export Data" | Not "Export" or "Download" |
| View more | "View All Incidents" | Not "View All" or "See More" |
| Navigation | "Go to Logs" | Action-oriented |
| Destructive | "Delete Log" | Specific, not just "Delete" |
| Cancel | "Cancel" | Simple, standard |

### 2. Empty States

**Pattern**: `No [items] [state/action]`

| Context | Message | Notes |
|---------|---------|-------|
| No results | "No logs match the current filters" | Explains why empty |
| No errors | "No critical incidents detected" | Professional, neutral |
| No data | "No activity data available" | Clear status |

**Don't use**:
- "Nothing here yet"
- "Oops! No results"
- Emoji or playful language

### 3. Status Messages

**Pattern**: `[Object] + [action] + successfully`

| Context | Message |
|---------|---------|
| Export complete | "Data exported successfully" |
| Save complete | "Changes saved successfully" |
| Delete complete | "Log deleted successfully" |
| Update complete | "Configuration updated successfully" |

### 4. Error Messages

**Pattern**: `[What happened] + [How to fix it]` (when possible)

| Context | Message |
|---------|---------|
| Validation | "Enter a valid email address" |
| Required field | "Client name is required" |
| Format error | "Date must be in MM/DD/YYYY format" |
| Network error | "Unable to load data. Check your connection and try again." |

**Don't blame the user**:
- ❌ "You entered an invalid email"
- ✅ "Enter a valid email address"

### 5. Navigation & Menus

| Label | Context |
|-------|---------|
| Dashboard | Main overview page |
| All Logs | Complete log listing |
| Analytics | Data analysis page |
| Configuration | Settings page |

**Notes**:
- Keep navigation labels to 1-2 words
- Use familiar, standard terminology
- Avoid creative naming

### 6. Table Headers

Use clear, professional column names:

| Context | Header |
|---------|--------|
| Timestamp | "Time" |
| Severity | "Severity" |
| Organization | "Client" |
| Automation | "Robot" |
| Description | "Message" |

### 7. Filter & Search

**Placeholder text pattern**: `Search [item1], [item2], [item3]...`

Examples:
- "Search clients, robots, processes..."
- "Filter by name, status, date..."

**Filter labels**:
- "All Levels" (not "Show All" or "Any Level")
- "All Clients" (not "Every Client")

### 8. Stat Cards

**Label pattern**: `[Metric Name]`

| Label | Description |
|-------|-------------|
| Total Logs | Count of all log entries |
| Active Robots | Currently operational robots |
| Processes Run | Number of executed processes |
| Critical Incidents | High-severity error count |

**Trend labels**: `vs. previous period` (not "from last month" or "compared to before")

### 9. Chart Titles

**Pattern**: `[Data Type] [Visualization Type] [(Time Period)]`

Examples:
- "Activity Trend (Last 14 Days)"
- "Top Clients by Incidents"
- "RPA Software Distribution"

### 10. System Status

**Pattern**: `System Status: [State]`

| Status | Message |
|--------|---------|
| Normal | "System Status: Operational" |
| Degraded | "System Status: Degraded Performance" |
| Down | "System Status: Unavailable" |

---

## Badge Text Standards

### Severity Levels
Map log levels to user-friendly severity:

| Log Level | Severity Badge | Variant |
|-----------|----------------|---------|
| Fatal | Critical | error (red) |
| Error | High | error (red) |
| Warning | Medium | warning (orange) |
| Info | Low | info (blue) |
| Trace | Low | neutral (gray) |

**Rationale**: Users understand "Critical" better than "Fatal", "High" better than "Error".

### Log Level Badges
Display technical log level as-is:
- Fatal
- Error
- Warning
- Info
- Trace

---

## Accessibility (ARIA Labels)

### Drawer Components
- Close button: `aria-label="Close drawer"`
- Dialog: `aria-modal="true"`, `role="dialog"`

### Interactive Elements
- Row actions: `aria-label="View details for incident: [message]"`
- Icon buttons: Always include descriptive `aria-label`
- Loading states: Use `aria-hidden="true"` on decorative spinners

---

## Terminology Glossary

Use consistent terms throughout the application:

| Concept | Preferred Term | Avoid |
|---------|----------------|-------|
| Error/Issue | Incident | Problem, Bug, Failure |
| RPA Agent | Robot | Bot, Agent, Worker |
| Organization | Client | Customer, Company, Org |
| Automation | Process | Workflow, Job, Task |
| Importance | Severity | Priority, Criticality |
| Record | Log | Entry, Event, Record |

---

## Implementation Checklist

Before committing UI text changes:

- [ ] Capitalization follows standards (Title Case for headers, Sentence case for messages)
- [ ] Button labels are action-oriented and specific
- [ ] Error messages are helpful, not just descriptive
- [ ] Empty states explain why content is missing
- [ ] No casual language, slang, or emojis
- [ ] No blame language ("You did X wrong")
- [ ] Terminology matches glossary
- [ ] Consistent across similar components
- [ ] ARIA labels added where needed

---

## Review Process

All UI text changes should be reviewed for:

1. **Clarity**: Is it immediately understandable?
2. **Consistency**: Does it match existing patterns?
3. **Conciseness**: Can it be shorter without losing meaning?
4. **Professionalism**: Is it appropriate for enterprise B2B software?
5. **Actionability**: Does it guide users toward next steps?

---

## Examples of Improvements Made

### Before → After

| Location | Before | After | Rationale |
|----------|--------|-------|-----------|
| Header search | "Seach clients, robots..." | "Search clients, robots, processes..." | Fixed typo, added completeness |
| System status | "System Healthy" | "System Status: Operational" | More formal, professional |
| Stat card trend | "from last month" | "vs. previous period" | More generic, accurate |
| View button | "View All" | "View All Incidents" | More specific |
| Empty state | "No critical incidents found." | "No critical incidents detected" | Remove period, more precise verb |
| Export button | "Export Filtered" | "Export Data" | Clearer, more standard |
| Empty table | "No logs found matching filters." | "No logs match the current filters" | Cleaner, more natural |
| Toast message | "Export started successfully" | "Data exported successfully" | More accurate (export completed, not started) |

---

## Questions?

When in doubt:
1. Be clear over clever
2. Be concise over verbose
3. Be professional over casual
4. Be helpful over technical

**Remember**: Good microcopy is invisible—users should understand it instantly without thinking about it.
