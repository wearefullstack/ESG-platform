# ESG-Platform - UX & User Journey Feedback Report
**Date**: March 12, 2026 | **Status**: Ready for Implementation

---

## Executive Summary

The ESG-Platform has strong visual design and accessibility, but the user journeys lack clarity and have friction points that could reduce adoption. This report identifies 5 key user journeys, analyzes pain points, and provides actionable UX improvements.

**Overall Score**: 6.5/10 (Good visuals, needs UX refinement)

---

## Current User Journeys Analysis

### Journey 1: Landing → Brand Selection → Call-to-Action
**Current Flow**:
```
Landing Page → Brand Selector (top-right) → Hero Section → CTA Button → Login
```

**Pain Points**:
- 🔴 Brand selector is hidden in top-right (non-obvious placement)
- 🔴 Users might not realize they can switch brands
- 🟡 No indication of what each brand is for
- 🟡 Single CTA button - only "Get Started" visible

**UX Score**: 5/10

---

## Priority 1: Fix Critical Friction (Quick Wins - 1-2 weeks)

### 1.1 Brand Selector Visibility
**Issue**: Brand selector hidden in top-right corner
**Solution**:
- Move brand selector to **prominent landing page dropdown**
- Add visual labels: "WCPG - Western Cape", "JSE - Stock Exchange", "CoCT - Cape Town"
- Show currently selected brand in navigation
- Add "Switch Brand" link in footer

### 1.2 Demo Mode Clarity
**Issue**: Login doesn't indicate this is demo mode
**Solution**:
- Add banner: "🔒 Demo Mode - Use any password"
- Add inline text: "Demo credentials: admin@wcpg.local | any password"
- Change button: "Demo Login" instead of "Sign In"
- Add info icon explaining demo mode

### 1.3 Onboarding Field Hints
**Issue**: Users don't know what data is required
**Solution**:
- Add **tooltips** on every field with examples
- Show **required vs optional** fields clearly
- Add "Estimated time: 5 minutes" at top
- Show progress: "Step 1 of 4 - About Your Organization"

---

## Priority 2: Improve Dashboard (2-3 weeks)

### 2.1 Add Context to KPI Cards
**Issue**: KPI cards show numbers without meaning
**Solution**:
- Add sparkline trend (up/down arrow)
- Show period: "Scope 1 - Total GHG (2023-24)"
- Add "vs. previous year" comparison
- Make cards clickable to drill-down
- Add tooltips explaining metrics

### 2.2 Make Chart Interactive
**Issue**: Chart doesn't support filtering
**Solution**:
- Add date range picker: "View Jan 2023 - Dec 2024"
- Add metric selector: Choose which metrics to display
- Add export button: "Download as PNG/CSV"
- Add hover tooltips with exact values
- Add comparison toggle: "Show industry average"

### 2.3 Improve Metrics Table
**Issue**: Dense table is hard to scan
**Solution**:
- Add column filtering: Sort by metric type
- Add search: "Find metrics by name"
- Add pagination: Show 10/25/50 rows per page
- Add visual indicators: Color-code good/bad metrics
- Add export: "Download as Excel"

---

## Priority 3: Simplify Report Generation (2-3 weeks)

### 3.1 Add Framework Guidance
**Issue**: Users don't understand ISSB vs JSE vs GRI
**Solution**:
- Replace dropdown with **guided wizard**
- Show framework cards with descriptions and best-use cases
- ISSB: "Investor-Focused"
- JSE: "South Africa Listed Companies"
- GRI: "Stakeholder-Focused"

### 3.2 Add Report Preview
**Issue**: Users can't see what they're generating
**Solution**:
- Add preview step before download
- Show table of contents
- Show sample page
- Let users customize sections
- Estimate report size and generation time

### 3.3 Improve Report Options
**Issue**: Format/period selection unclear
**Solution**:
- Show visual icons: 📄 PDF, 📊 Excel, 🔗 JSON
- Add period presets: "Last Year", "Last 6 Months", "Custom"
- Show example: "Report will include: 5 sections, ~25 pages, 2.3 MB"

---

## Priority 4: Navigation & Help (1-2 weeks)

### 4.1 Improve Top Navigation
**Current**:
```
[Logo] [Dashboard] [Report] [User Email] [Logout]
```

**Improved**:
```
[Logo] [Dashboard] [Report] [Help] [User: admin@wcpg.local] [Logout]
  ↓
  [Documentation] [Video Tutorials] [Contact Support]
```

### 4.2 Add Contextual Help
**Solution**:
- Add Help (?) icon linking to contextual docs
- Add "Guided Tours": "First time? Take a tour"
- Add "Video Tutorials": "How to submit ESG data" (3-min)
- Add "FAQ" section for common questions
- Add "Contact Support": Email/chat link

### 4.3 Add Breadcrumb Navigation
**Solution**:
```
Dashboard > KPIs > Scope 1 Emissions > Detail View
```

---

## Priority 5: Mobile Experience (1-2 weeks)

### 5.1 Mobile-First Dashboard
**Solution**:
- Show 1 KPI per screen on mobile with full details
- Add swipe navigation between KPIs
- Keep chart interactive but simplified
- Stack table vertically with card layout
- Add sticky header for easy navigation

### 5.2 Mobile-Friendly Forms
**Solution**:
- Use full-width inputs
- Option: One field per screen on mobile
- Large touch buttons (48px minimum)
- Mobile-optimized dropdowns
- "Save progress" - allow resuming later

---

## User Personas & Their Needs

### Persona 1: SME Business Owner (Small Company)
- **Goal**: Submit ESG data quickly without confusion
- **Pain**: Forms are too long, unclear why data needed
- **Need**: Step-by-step guidance, inline help, quick-submit option

### Persona 2: Sustainability Manager (Medium Company)
- **Goal**: Track ESG metrics over time, generate reports
- **Pain**: Dashboard hard to understand, no comparisons
- **Need**: Filtering, drill-down analytics, export options

### Persona 3: Listed Company ESG Officer (Large Enterprise)
- **Goal**: Generate investor-ready reports, prove compliance
- **Pain**: Limited report customization, no regulatory templates
- **Need**: ISSB/TCFD templates, executive summary, peer comparison

### Persona 4: Distribution Partner Admin (WCPG/JSE/CoCT)
- **Goal**: Monitor all organizations in their network
- **Pain**: No aggregation view, can't see business progress
- **Need**: Admin dashboard, bulk actions, analytics roll-up

### Persona 5: Data Analyst/Reviewer
- **Goal**: Validate and approve submitted ESG data
- **Pain**: No review workflow, can't comment on submissions
- **Need**: Approval workflow, notes/comments, audit trail

---

## Implementation Roadmap

### Phase 1: Quick Wins (Week 1-2) 🟢
- Move brand selector to landing page
- Add demo mode labels
- Add field tooltips to onboarding
- Add KPI card improvements (trend + context)
- Add help icons throughout

**Effort**: 20-30 hours | **Impact**: High | **Dependencies**: None

### Phase 2: Dashboard & Report (Week 3-4) 🟡
- Add chart interactivity (date filtering)
- Improve metrics table (search, export)
- Add report framework guide
- Add report preview functionality
- Improve navigation/breadcrumbs

**Effort**: 40-50 hours | **Impact**: High | **Dependencies**: Phase 1

### Phase 3: Mobile & Accessibility (Week 5-6) 🟡
- Mobile-first dashboard redesign
- Mobile form optimization
- ARIA labels & screen reader support
- Reduce cognitive load patterns

**Effort**: 30-40 hours | **Impact**: Medium | **Dependencies**: Phase 1-2

### Phase 4: Advanced Features (Week 7+) 🔴
- Guided tours (video/interactive)
- Admin aggregation dashboard
- Data comparison & benchmarking
- Approval workflow for reviewers

**Effort**: 60+ hours | **Impact**: Medium | **Dependencies**: All phases

---

## Success Metrics

### Current Baseline (Estimated)
- Onboarding completion rate: ~60%
- Time to submit ESG data: ~20 minutes
- Dashboard bounce rate: ~40%
- Report generation success: ~80%

### Post-Implementation Targets
- ✅ Onboarding completion rate: 85%+
- ✅ Time to submit ESG data: <10 minutes (SME), <5 min (Expert)
- ✅ Dashboard bounce rate: <30%
- ✅ Report generation success: 95%+
- ✅ User satisfaction: 4.5/5 stars

---

## Summary Table

| Area | Current Issue | Quick Win | Medium | Long-term |
|------|---------------|-----------|--------|-----------|
| **Brand Selection** | Hidden | Move to landing | Persistent memory | AI recommendations |
| **Login** | Unclear demo | Add labels | Tutorial | OAuth integration |
| **Onboarding** | No guidance | Add tooltips | Guided wizard | AI form completion |
| **Dashboard** | Lacks context | Add KPI details | Interactivity | Predictive analytics |
| **Reports** | Confusing options | Preview button | Framework guide | Custom templates |
| **Navigation** | Not clear | Breadcrumbs | Help system | Contextual guides |
| **Mobile** | Poor UX | Responsive fixes | Mobile-first design | Progressive web app |

---

## Next Steps

1. **Validate**: Get user feedback on priority ranking
2. **Design**: Create wireframes for Phase 1 (1 week)
3. **Build**: Implement quick wins (2 weeks)
4. **Test**: User testing with SMEs (1 week)
5. **Iterate**: Phase 2 improvements (4 weeks)

---

**Report Prepared**: March 12, 2026
**Project**: ESG-Platform
**Status**: Ready for Design & Implementation
