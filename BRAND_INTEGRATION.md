# Brand Integration Guide

## Complete Brand Research Included

This project has been enhanced with comprehensive brand research from three distribution partners. All brand assets and guidelines are documented and ready for implementation in **Phase C: Embellish with Brand**.

### Research Sources

| Source | Location | Content |
|--------|----------|---------|
| **Main Design Guide** | `C:\cc\huginn\DESIGN_RESEARCH.md` | Complete visual identity guidelines for all 3 partners |
| **Brand Summary** | `C:\Users\sasha\brand_summary.md` | WCPG & JSE brand extraction |
| **CoCT Assets** | `C:\Users\sasha\Desktop\groundcontrol\resources\brands\coct\` | City of Cape Town complete dossier & logo assets |

---

## Brand Palette Summary

### 1. Western Cape Provincial Government (WCPG)

**Primary Colors**
| Role | Hex | Usage |
|------|-----|-------|
| Primary | #001489 | Headers, navigation, primary CTAs |
| Secondary | #FFFFFF | Backgrounds, text reversal |
| Accent | #0066CC | Links, highlights, secondary CTAs |
| Neutral Dark | #1F1F1F | Body text |
| Neutral Light | #F5F5F5 | Section backgrounds |

**Typography**
- Headings: Helvetica Neue / Arial, 600-700, 24-42px
- Body: Helvetica Neue / Arial, 400, 14-16px
- Fallback: system sans-serif

**Visual Style**
- Modern, minimal, government-focused
- Grid-based, structured information hierarchy
- Professional, citizen-focused, transparent
- WCAG AA minimum, high contrast ratios

---

### 2. Johannesburg Stock Exchange (JSE)

**Primary Colors**
| Role | Hex | Usage |
|------|-----|-------|
| Primary Accent | #A3CF61 | Highlights, CTAs, data visualization |
| Dark | #000000 | Text, strong contrast, headers |
| Light | #FFFFFF | Backgrounds, clean spaces |
| Neutral | #CCCCCC | Borders, dividers, disabled states |
| Data Green | #28A745 | Positive values, up trends |
| Data Red | #DC3545 | Negative values, down trends |
| Info Blue | #0066CC | Links, information highlights |

**Typography**
- Headings: Arial / Helvetica Neue, 600-700, 24-42px
- Body: Arial / Helvetica Neue, 400, 14-16px
- Monospace: Courier / monospace, 400, 12-14px
- Fallback: system sans-serif

**Visual Style**
- Clean corporate, data-driven, minimalist
- Responsive grid-based layouts
- Professional, authoritative, educational, inclusive
- WCAG AA+ (critical for financial services)

---

### 3. City of Cape Town (CoCT)

**Primary Colors**
| Role | Hex | Usage |
|------|-----|-------|
| Primary (Atoll) | #08677B | Navigation, headers, primary CTAs |
| Secondary (Link Water) | #ECF3F9 | Section backgrounds, light UI elements |
| Accent (Rio Grande) | #CCCC00 | Highlights, important information |
| Dark | #000000 | Text, strong contrast |
| Light | #FFFFFF | Clean backgrounds |
| Neutral Light | #F5F5F5 | Alternative backgrounds |
| Neutral Mid | #CCCCCC | Borders, dividers |
| Alert Red | #DC143C | Urgent information |
| Success Green | #28A745 | Confirmations, positive actions |

**Typography**
- Body Text: Helvetica Neue, 400-500, 14-16px
- Headings: Helvetica Neue, 700, 24-42px
- UI Elements: Helvetica Neue, 500-600, 14-16px
- Navigation: Helvetica Neue, 400, 14px

**Visual Style**
- Professional government aesthetic with accessibility focus
- Structured navigation with clear sectional organization
- Professional, accessible, service-oriented, authoritative yet approachable
- WCAG AA minimum (preferably AAA)

**Imagery**
- Cape Town landmarks (Table Mountain, Bo-Kaap)
- Diverse communities
- Municipal services
- Natural environment (fynbos, ocean)

---

## White-Label Implementation Strategy

### Database Configuration

The brand colors are **already seeded in the database** via `database/init/sample_data.sql`:

```sql
INSERT INTO tenants VALUES
  ('WCPG', '#001489', '#FFFFFF', '#0066CC', ...),
  ('JSE', '#A3CF61', '#000000', '#0066CC', ...),
  ('City of Cape Town', '#08677B', '#ECF3F9', '#CCCC00', ...);
```

### CSS Theme Variables (Phase C Implementation)

```css
:root {
  --primary-color: var(--tenant-primary-color);
  --secondary-color: var(--tenant-secondary-color);
  --accent-color: var(--tenant-accent-color);
  --dark-color: #1F1F1F;
  --light-color: #F5F5F5;
  --success-color: #28A745;
  --warning-color: #FFC107;
  --error-color: #DC3545;
}
```

### Quick Brand Swap (For Sales Demos)

To demo to different partners, only change:
1. **Tenant ID in session** (which tenant the user belongs to)
2. **CSS theme automatically loads** the tenant's brand colours
3. **Logo loads from tenant config**
4. **No code changes required!**

---

## Phase C: Brand Implementation Tasks

### Priority 1: Apply Brand to Login Page
- [ ] Use tenant primary color for login button
- [ ] Update header with tenant logo
- [ ] Apply brand fonts (Helvetica Neue / Arial fallback)
- [ ] Test all 3 tenant themes

### Priority 2: Update Dashboard
- [ ] Apply brand colours to navigation bar
- [ ] Update KPI card styling with tenant primary
- [ ] Apply brand to chart accent colors
- [ ] Ensure WCAG AA+ contrast ratios

### Priority 3: Generate Brand Assets
- [ ] Create SVG logos for each tenant (or use provided logos from CoCT)
- [ ] Generate hero illustrations using `/nano-illustrate` with brand configs
- [ ] Create branded email templates
- [ ] Generate favicon in brand colours

### Priority 4: Data Visualization Theming
- **WCPG**: Blue-based charts, professional government style
- **JSE**: Green for up/growth, red for down/decline, data-heavy tables
- **CoCT**: Community-focused visualizations, inclusive imagery

### Priority 5: Reports & PDF Export
- [ ] Apply tenant branding to generated report PDFs
- [ ] Include tenant logo in report headers
- [ ] Use tenant colours in charts/visualizations
- [ ] Test report generation for all 3 tenants

---

## Accessibility Compliance Matrix

All three partners have specific WCAG requirements:

| Partner | Standard | Color Contrast | Font Size Min | Mobile |
|---------|----------|-----------------|---------------|---------|
| WCPG | AA | 4.5:1 | 14px | Yes |
| JSE | AA+ | 7:1 (preferred) | 14px | Yes |
| CoCT | AA (AAA target) | 4.5:1 | 14px | Yes |

**Implementation Note:** All UI components must support:
- Keyboard navigation
- Screen readers (ARIA labels)
- Mobile responsiveness
- Never rely on color alone (use icons + text)

---

## Logo Assets

### Provided Assets
- **CoCT**: Primary logo files (220×70px, 519×198px, 1500×1500px banner)
- **WCPG & JSE**: Logos to be generated or sourced from official websites

### Storage Location
All tenant logos should be stored in:
```
frontend/public/logos/{tenant-slug}-logo.svg
```

Then referenced in templates:
```jsx
<img src={`/logos/${tenant}-logo.svg`} alt={tenantName} />
```

---

## Typography System

### Font Stack (All Partners)

Primary: `'Helvetica Neue', Arial, sans-serif`
Fallback: `system-ui, -apple-system, sans-serif`

### Size Scale

```
H1: 32-42px, weight 700
H2: 24-28px, weight 700
H3: 18-22px, weight 600
Body: 14-16px, weight 400
UI: 14px, weight 500-600
Monospace: 12-14px, weight 400
```

### Implementation in CSS

```css
h1 { font-family: var(--heading-font); font-size: 2.5rem; font-weight: 700; }
h2 { font-family: var(--heading-font); font-size: 1.75rem; font-weight: 700; }
body { font-family: var(--body-font); font-size: 1rem; line-height: 1.6; }
```

---

## Data Visualization Color Strategy

### WCPG (Blue-Based)
- Primary Series: #001489 (Dark Blue)
- Secondary Series: #0066CC (Blue)
- Accent: #FFFFFF (White)
- Positive: #28A745 (Green)
- Negative: #DC3545 (Red)

### JSE (Green-Based Financial)
- Primary Series: #A3CF61 (Accent Green)
- Secondary Series: #0066CC (Blue)
- Positive: #28A745 (Green)
- Negative: #DC3545 (Red)
- Neutral: #CCCCCC (Gray)

### CoCT (Teal-Based)
- Primary Series: #08677B (Teal)
- Secondary Series: #CCCC00 (Yellow-Green)
- Accent: #ECF3F9 (Light)
- Positive: #28A745 (Green)
- Negative: #DC143C (Red)

---

## Testing Checklist for Phase C

- [ ] **Color Contrast**: Verify 4.5:1 minimum for all text (7:1 for JSE)
- [ ] **Brand Colors Applied**: All three tenants show correct brand colours
- [ ] **Logo Display**: Tenant logos load correctly in navigation and footer
- [ ] **Responsive Design**: Brands look correct on mobile, tablet, desktop
- [ ] **Data Visualization**: Charts use tenant-appropriate color schemes
- [ ] **Accessibility**: Screen readers work, keyboard navigation works
- [ ] **Font Loading**: Helvetica Neue / Arial displays correctly
- [ ] **Theme Switching**: Can swap between tenants and branding updates instantly
- [ ] **PDF Reports**: Generated reports include tenant branding

---

## Quick Reference: CSS Custom Properties

These should be set dynamically based on logged-in tenant:

```css
:root[data-tenant="wcpg"] {
  --primary-color: #001489;
  --secondary-color: #FFFFFF;
  --accent-color: #0066CC;
}

:root[data-tenant="jse"] {
  --primary-color: #A3CF61;
  --secondary-color: #000000;
  --accent-color: #0066CC;
}

:root[data-tenant="coct"] {
  --primary-color: #08677B;
  --secondary-color: #ECF3F9;
  --accent-color: #CCCC00;
}
```

---

## Next Steps

1. **Load tenant config on login** (get colours from database)
2. **Apply CSS variables** to all UI components
3. **Generate brand assets** using the visual guides above
4. **Test on all three tenant instances**
5. **Validate accessibility** for each brand palette

---

**Document Version:** 1.0
**Last Updated:** 2026-03-11
**Status:** Ready for Phase C Implementation
