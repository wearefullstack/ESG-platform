# ESG Platform: Comprehensive UX & User Journey Analysis

**Date**: March 12, 2026
**Status**: Complete Analysis with Actionable Recommendations
**Scope**: Landing Page → Dashboard → Report Generation flow

---

## Executive Summary

The ESG Platform has achieved **solid visual design and technical infrastructure** (responsive, accessible, brand-aware). However, the **user experience** needs optimization across five critical areas:

1. **Decision Fatigue**: Users face unclear choices (register vs login, which framework, what format)
2. **Hidden Workflows**: Key actions (upload data, view history) are discoverable but not intuitive
3. **Data Confidence**: Users don't know if their inputs are "correct" (estimated vs actual, required vs optional)
4. **Contextual Clarity**: Missing explanations for ESG concepts, metrics, and terminology
5. **Mobile Experience**: Some flows not optimized for phone/tablet users (forms, charts, tables)

**Bottom Line**: The platform is visually premium but feels like a "configuration wizard" rather than a "data exploration tool." Users need guidance, not just forms.

---

## Part 1: Current State Analysis

### 1.1 User Journey Map: Landing → Registration → Dashboard → Report

#### Journey 1: New User Registration Flow
```
Landing Page
    ↓ (Brand selector)
    ├─ Hero (CTA: Get Started)
    ├─ Value Prop (4 cards: Dashboards, Compliance, Onboarding, Security)
    ├─ Partner Cards (3 partners with features)
    ├─ How It Works (4-step overview)
    └─ CTA Button
    ↓ (Click "Get Started" or "Register with [Brand]")
Onboarding Wizard - 4 Steps
    Step 1: Business Info (org name, reg number, industry, employees)
    Step 2: Contact Details (name, email, phone)
    Step 3: ESG Baseline Data (5 fields: revenue, GHG, energy, water, waste)
    Step 4: Review & Submit (checkbox for T&C)
    ↓ (Submit)
Success Alert → Navigate to /login
    ↓ (User returns to login with new credentials)
```

**Current Experience**:
- ✅ Clear visual progression (4-step indicator, progress bar)
- ✅ Form validation provides feedback
- ✅ Review page shows what will be submitted
- ⚠️ Step 3 (ESG Data) is confusing—users asked "Where did you get these numbers?" and "Can I estimate?"
- ⚠️ No context on why these specific ESG metrics matter
- ⚠️ File upload (Step 3) is optional but not labeled clearly
- ⚠️ After registration, user must navigate back to /login manually (no auto-redirect)

---

#### Journey 2: Existing User Login Flow
```
Landing Page / Login Page
    ↓ (Click "Login" or skip to /login directly)
Login Form
    ├─ Email input (placeholder: admin@wcpg.local)
    ├─ Password input
    └─ Demo credentials shown (reduces anxiety)
    ↓ (Submit)
Authentication Check
    ├─ Success → Auto-redirect to /dashboard
    └─ Failure → Error message, form stays
```

**Current Experience**:
- ✅ Simple, clean form (no unnecessary fields)
- ✅ Demo credentials visible (lowers barrier)
- ✅ Clear error messages
- ⚠️ No "Forgot Password" link (demo-only)
- ⚠️ No "Don't have an account? Register" link (requires manual navigation)
- ⚠️ No brand logo on login page (feels generic despite brand selector existing)

---

#### Journey 3: Dashboard Exploration Flow
```
Login → Dashboard
    ↓
DashboardNav (top bar)
    ├─ Brand logo | Brand name
    ├─ Dashboard link (active)
    ├─ Report link
    └─ User email | Logout
    ↓
Main Content (3 sections)
    1. KPI Cards (4 cards: GHG, Energy, Water, Diversity)
        ├─ Shows value + trend (+/-)
        └─ Color-coded (green for positive, red for negative)
    2. 12-Month Trend Chart
        ├─ Dual Y-axes (GHG vs Energy)
        ├─ Tooltip on hover
        └─ Legend shows both metrics
    3. Detailed Metrics Table
        ├─ Search box (filter by metric name)
        ├─ 8 rows: metric name, value, unit, status (On-Track/Off-Track)
        └─ Status badges (color-coded)
    4. Actions Section (3 buttons)
        ├─ Generate Report
        ├─ Upload Data
        └─ View History
```

**Current Experience**:
- ✅ Clean layout, good visual hierarchy
- ✅ KPI cards immediately visible
- ✅ Trend chart shows performance over time
- ✅ Search in metrics table works well
- ⚠️ **KPI trends lack context**: Why is +2% water usage bad? (For some companies, it might be neutral or acceptable)
- ⚠️ **Chart is dense**: Two Y-axes can confuse users; no toggle to show one metric at a time
- ⚠️ **Metrics table is static**: No way to drill down into a metric (e.g., click "GHG Scope 1" to see breakdown)
- ⚠️ **Action buttons have no descriptions**: Users don't know what "View History" does
- ⚠️ **Mobile layout**: Table doesn't scroll well on phones; action buttons stack awkwardly

---

#### Journey 4: Report Generation Flow
```
Dashboard → Click "Generate Report" or navigate to /report
    ↓
Report Wizard (3 steps)
    1. Framework Selection (radio buttons)
        ├─ ISSB (IFRS S1/S2)
        ├─ JSE Guidance
        └─ GRI Standards
        + Info box explains selected framework
    2. Period Selection (month picker)
        ├─ Input: month-year format
        └─ Helper text: "Select the end month of your reporting period"
    3. Format Selection (3 options: PDF, Excel, JSON)
        ├─ Icons + names
        └─ Info box explains selected format
    ↓
Generate Button (blue, states "Generate [Framework] Report ([FORMAT])")
    ↓
Download or Display
    ├─ PDF/Excel: Browser downloads file
    └─ JSON: Logged to console (no UI display)
```

**Current Experience**:
- ✅ Clear 3-step wizard structure
- ✅ Radio buttons make single-selection clear
- ✅ Info boxes provide helpful context
- ✅ Format preview shows what's included
- ⚠️ **Framework choice is overwhelming**: Average user doesn't know the difference between ISSB/JSE/GRI
- ⚠️ **Period selection is unclear**: "End month of reporting period"—do I enter March if my fiscal year ends March 31?
- ⚠️ **No default framework**: ISSB is selected by default, but why? Should it be based on brand/organization tier?
- ⚠️ **JSON format has no UI feedback**: Download triggers console log, which users won't see
- ⚠️ **No preview of actual report**: Users can't see what they're downloading before they generate it
- ⚠️ **No error handling**: What if report generation fails mid-process? (No recovery UX)

---

#### Journey 5: Brand Switching (Meta Journey)
```
Any Page → Top-right Brand Selector
    ↓ (Click dropdown or toggle)
Brand Options (3)
    ├─ WCPG (deep blue)
    ├─ JSE (green/gold)
    └─ CoCT (teal)
    ↓ (Select new brand)
    ├─ Page reloads with brand colors
    ├─ Logo updates
    └─ BrandContext state changes
```

**Current Experience**:
- ✅ Instant visual feedback
- ✅ All pages apply brand colors
- ✅ Stored in localStorage (persists across sessions)
- ⚠️ **Confusing for multi-tenant**: Users might not realize this is a "demo switcher," not a real "switch organizations" feature
- ⚠️ **No indication of current brand**: Unclear which brand is currently selected (only obvious from colors)
- ⚠️ **Selector placement**: Top-right is not standard (might be overlooked)

---

### 1.2 Interaction Friction Points

| Journey | Friction Point | Severity | Cause | Impact |
|---------|---|---|---|---|
| Registration | ESG Data step lacks guidance | High | No explanations for metric definitions | Users don't know if estimates are OK |
| Registration | No file upload validation UI | Medium | Upload is optional, but unclear | Users might skip data they should provide |
| Registration | Auto-redirect after submit | Low | Manual step to /login required | Extra navigation |
| Login | No account recovery | Medium | Demo-only (expected) | First-time users can't reset passwords |
| Login | No direct link to register | Low | Requires manual navigation | Slightly longer discovery path |
| Dashboard | KPI trends lack business context | High | No explanation of trend significance | Users can't interpret results |
| Dashboard | Chart too information-dense | Medium | Two metrics, two Y-axes | Users might misread data |
| Dashboard | Metrics table not interactive | Medium | Static data display | No way to drill down or compare periods |
| Dashboard | Action buttons undefined | Medium | No descriptions or icons consistency | Users don't know what buttons do |
| Report | Framework selection is overwhelming | High | No guidance on which standard to use | Users might choose wrong framework |
| Report | Period selection unclear | Medium | "End month" wording is ambiguous | Users might select wrong period |
| Report | JSON format not user-friendly | Medium | Console.log only | Users might think generation failed |
| Report | No report preview | High | Can't see output before generating | Users unsure what they're getting |
| Brand | Selector suggests data switching | High | Placement and styling suggest multi-org | Users might accidentally "switch" brands |

---

## Part 2: User Personas

### Persona 1: Sarah - Small Business ESG Beginner

**Profile**:
- **Role**: Operations Manager at small wine estate (~30 employees)
- **Age**: 38, South Africa-based
- **Company Size**: < 50 employees
- **ESG Experience**: None—this is the first ESG initiative
- **Tech Comfort**: Moderate (uses spreadsheets, basic CRM)

**Goals**:
- Understand what ESG is and why it matters
- Report basic environmental metrics (energy, water, waste)
- Comply with local regulations (CoCT or WCPG requirements)
- Avoid complex frameworks

**Pain Points**:
- Doesn't know ESG terminology (Scope 1? ISSB? GRI?)
- No existing data systems—will need to estimate initially
- Worried about "getting it wrong"
- Prefers simple forms over technical APIs

**ESG Platform Behaviors**:
- Starts at landing page, reads value prop
- Registers with SME tier (small business option)
- Fills ESG data by estimating (based on experience)
- Generates simple PDF report to show stakeholders
- Logs in monthly to update metrics
- Rarely uses advanced features

**UX Needs**:
- ✅ Contextual help for every metric
- ✅ Examples of good estimates ("Your energy bill shows MWh; that's what we need")
- ✅ Reassurance that estimates are acceptable
- ✅ Clear, jargon-free language
- ✅ Mobile-friendly forms (input from phone)
- ✅ Quick wins (simple reports, not 50-page documents)

---

### Persona 2: Marcus - Medium Company Data Manager

**Profile**:
- **Role**: Sustainability Manager at mid-cap logistics company (~200 employees)
- **Age**: 45, corporate environment
- **Company Size**: 50-500 employees
- **ESG Experience**: 2-3 years, some prior reporting
- **Tech Comfort**: High (data analyst, SQL, APIs familiar)

**Goals**:
- Aggregate ESG data from multiple operational sites
- Track metrics over 24 months to show progress
- Export data for investor presentations
- Ensure JSE compliance (if listed)

**Pain Points**:
- Current solution is manual spreadsheets (time-consuming)
- Data comes from different departments (inconsistent formats)
- Needs to validate completeness and accuracy
- Must support multiple reporting frameworks (ISSB, JSE, GRI)

**ESG Platform Behaviors**:
- Skips landing page, goes directly to /login
- Wants API access for data upload (not forms)
- Checks dashboard daily for alerts/updates
- Exports data monthly for board presentations
- Needs detailed metrics table with sorting/filtering
- Uses report generation for investor deck

**UX Needs**:
- ✅ Bulk data upload (CSV, Excel, API)
- ✅ Data validation with clear error messages
- ✅ Dashboard alerts ("Missing April water data")
- ✅ Detailed historical reports (12-36 months)
- ✅ Export to multiple formats (PDF, Excel, JSON)
- ✅ API documentation and integration guides

---

### Persona 3: Amara - Enterprise ESG Officer

**Profile**:
- **Role**: Group Sustainability Officer at large financial services firm (~2,000+ employees, multiple countries)
- **Age**: 52, C-level experience
- **Company Size**: 500+ employees, complex structure
- **ESG Experience**: 5+ years, expert-level
- **Tech Comfort**: High (enterprise systems, governance frameworks)

**Goals**:
- Implement comprehensive ESG program across organization
- Ensure regulatory compliance (JSE, international standards)
- Provide board-level reporting and dashboards
- Benchmark against industry peers
- Support capital markets disclosures (IPO, investor relations)

**Pain Points**:
- Complex organizational structure (subsidiaries, business units)
- Must aggregate data from 50+ entities
- Requires audit trails and version control
- Needs multi-level approval workflows
- High stakes: board visibility, regulatory scrutiny

**ESG Platform Behaviors**:
- Delegates most data entry to team members
- Uses dashboard to review consolidated metrics
- Needs quarterly board reports (not monthly)
- Requires audit logs and data provenance
- Focuses on specific frameworks (JSE, ISSB) based on listing
- Needs to benchmark against competitors

**UX Needs**:
- ✅ Multi-level hierarchy (head office → regions → sites)
- ✅ Role-based access control (admin, reviewer, data entry)
- ✅ Approval workflows (submitted → reviewed → approved)
- ✅ Audit logs and change history
- ✅ Advanced filtering and drill-down analysis
- ✅ Custom report builder (select metrics, date ranges, formats)

---

### Persona 4: Thabo - Distribution Partner Admin (WCPG/JSE/CoCT)

**Profile**:
- **Role**: Program Manager at distribution partner (WCPG or JSE)
- **Age**: 41, government/NGO background
- **Organization**: Partner organization (WCPG, JSE, CoCT)
- **ESG Experience**: High (policy, standards expertise)
- **Tech Comfort**: Moderate (not a data engineer, but understands business logic)

**Goals**:
- Enable hundreds of member organizations to report ESG data
- Aggregate data for provincial/stock exchange reporting
- Monitor compliance and data quality
- Support members with training and guidance
- Generate aggregate reports (state-of-ESG by sector)

**Pain Points**:
- Diverse user base (from tiny SMEs to large corporates)
- Different data maturity levels (some have no data, others have systems)
- Must ensure data quality before aggregation
- Limited budget for member support
- Regulatory pressure to show progress

**ESG Platform Behaviors**:
- Uses admin dashboard to see all members
- Monitors data submission rates and completeness
- Approves or rejects data submissions
- Generates aggregate reports (e.g., "SMEs reduced GHG 3% this year")
- Provides templates and guidance to members
- Exports for policy makers (Minister, agency)

**UX Needs**:
- ✅ Organization management dashboard (add/remove members)
- ✅ Data quality monitoring (completion %, missing fields)
- ✅ Submission status tracking (pending, approved, rejected)
- ✅ Bulk messaging to members
- ✅ Aggregate reporting by sector, size, region
- ✅ Template library with guidance docs
- ✅ Admin ability to override or correct member data

---

### Persona 5: Dr. Lisa - ESG Analyst / Reviewer

**Profile**:
- **Role**: ESG Analyst at rating agency or consultancy
- **Age**: 36, data science background (MSc Environmental Science)
- **Organization**: Independent analyst or consultancy firm
- **ESG Experience**: Expert (publishes ESG ratings, research)
- **Tech Comfort**: Very high (Python, data visualization, API use)

**Goals**:
- Analyze ESG data from multiple organizations
- Compare performance across sectors
- Identify trends and outliers
- Generate research reports
- Build custom models and indices

**Pain Points**:
- Data from multiple platforms in inconsistent formats
- Validation and data quality checks are time-consuming
- Needs granular access to underlying data (not just reports)
- Requires ability to export raw data for external analysis

**ESG Platform Behaviors**:
- Downloads raw data (JSON, CSV, API)
- Loads into R/Python for analysis
- Cross-references with external databases
- Focuses on data integrity and provenance
- Needs to cite data sources in publications
- Uses machine-readable formats only

**UX Needs**:
- ✅ Raw data exports (JSON, CSV, Parquet)
- ✅ API with full data access (with auth)
- ✅ Data documentation (metadata, units, definitions)
- ✅ Version history (track when data was submitted vs. updated)
- ✅ Batch download capability
- ✅ Integration guides (how to load into analytics tools)

---

## Part 3: Improved User Journeys

### 3.1 Redesigned Registration Journey (Sarah - SME)

**Improved Flow**:

```
Landing Page (Redesigned)
├─ Hero Section
│  ├─ "Report ESG Like a Pro" (headline)
│  ├─ 3-minute video: "What is ESG?" (animated)
│  ├─ CTA: "Start in 3 minutes" (prominent)
│  └─ Secondary: "See demo" (linked to /dashboard?demo=true)
├─ Partner Cards (unchanged structure, but):
│  ├─ Each card shows "Pick Your Program"
│  ├─ Includes SME-specific language ("Simple questionnaires, no jargon")
│  └─ CTA: "Register" (brand-specific)
└─ Footer with FAQ + Glossary

↓ (Click "Register")

Onboarding Wizard (Redesigned - 5 steps instead of 4)
├─ Step 0: Business Size Selector (NEW)
│  ├─ SME (< 50 employees, simple reporting)
│  ├─ Medium (50-500, multiple locations)
│  └─ Large (500+, complex hierarchy, API)
│  └─ Info: "This helps us show you relevant fields"
├─ Step 1: Business Info (unchanged)
├─ Step 2: Contact Details (unchanged)
├─ Step 3: ESG Data - REDESIGNED
│  ├─ Context section: "Why we ask this" + glossary links
│  ├─ Form fields with:
│  │  ├─ Label + definition link
│  │  ├─ Unit info ("e.g., from your energy bill")
│  │  ├─ Example value ("e.g., 285.5")
│  │  ├─ Confidence toggle: "This is (Estimated / Actual)"
│  │  └─ Help text: "Not sure? See examples below"
│  ├─ "Can't find this data?" section
│  │  └─ Links to: "Download template" + "Skip for now"
│  └─ Progress indicator: "Fields completed: 4/5"
├─ Step 4: Review & Submit (with optional file upload)
│  ├─ Shows summary of all data
│  ├─ Confidence level summary: "4 Actual, 1 Estimated"
│  ├─ File upload section: "Upload source documents (optional)"
│  ├─ T&C checkbox
│  └─ CTA: "Create Account & Register"
└─ Success Page (NEW)
   ├─ "Welcome to [Brand Name]!"
   ├─ Email verification prompt (if applicable)
   ├─ Quick start guide: "Next steps"
   │  ├─ Link to login
   │  ├─ Link to dashboard
   │  └─ Link to help center
   └─ "You'll receive a confirmation email shortly"
```

**Key Improvements**:
- Step 0 tailors UI/UX to user tier (SME vs. Medium vs. Large)
- ESG Data step includes definitions, examples, and confidence flags
- "Can't find this data?" reduces abandonment anxiety
- Success page provides clear next steps (no manual redirect)
- Glossary/help available throughout (inline + popup)

**Mobile Optimization**:
- Single-column form layout (no side-by-side fields)
- Expandable help text (tap to reveal)
- Confidence toggle uses radio buttons (easier on mobile)
- Skip buttons for optional sections

---

### 3.2 Redesigned Dashboard Journey (Marcus - Medium Company)

**Current Problems**:
1. KPI trends lack business context
2. Chart is too dense (two metrics, two Y-axes)
3. Metrics table is static (can't drill down)
4. Action buttons are undefined

**Improved Flow**:

```
Login → Dashboard (Redesigned)
  ↓
DashboardNav (enhanced)
├─ Brand logo | Brand name
├─ Organization selector dropdown (NEW - if user has multiple orgs)
├─ Time period picker (NEW - Year / Quarter / Month)
├─ Dashboard link (active)
├─ Report link
├─ Admin link (if user is admin)
├─ Alerts badge (shows # of warnings)
└─ User menu (Settings, Help, Logout)

↓

Main Content (Redesigned - 4 sections)

Section 1: KPI Overview (Redesigned)
├─ Selector: "Show me" (Last 12 months / YTD / Custom date range)
├─ 4 KPI Cards with ENHANCED CONTEXT:
│  └─ GHG Emissions Card
│     ├─ Value: "1,245 tCO2e" (large)
│     ├─ Trend: "-5%" (green, positive)
│     ├─ Context line: "Down 5% vs last year" (NEW)
│     ├─ Comparison: "Below 2024 target of 1,300 tCO2e" (NEW)
│     ├─ Intensity: "1.2 tCO2e / $M revenue" (NEW)
│     └─ Drill-down link: "View breakdown" (clicks to Section 3)
├─ Status banner (if any alerts):
│  └─ "⚠️ Warning: May water data missing"
└─ CTA buttons:
   ├─ "📊 Update Metrics" (Upload new data)
   ├─ "📅 Schedule Reporting" (Calendar for submissions)
   └─ "❓ Need Help?" (Contextual help)

Section 2: Trend Analysis (Redesigned)
├─ Metric selector: "View metrics for" (dropdown)
│  ├─ GHG (all scopes) [selected]
│  ├─ Energy
│  ├─ Water
│  ├─ Waste
│  └─ Custom (select multiple)
├─ Date range selector:
│  ├─ Last 12 months (default)
│  ├─ YTD
│  ├─ Last 24 months
│  └─ Custom range
├─ Chart (simplified - single metric or stacked)
│  ├─ Hover tooltip: Shows value + % change
│  ├─ Download button: "Save as PNG/SVG"
│  └─ Analysis tool: "Show trend line" (checkbox)
└─ Insights box (NEW):
   ├─ "📈 GHG down 5% YoY" (AI-generated summary)
   ├─ "Target progress: 62% of annual goal"
   └─ "Similar companies in [sector] average -3% YoY"

Section 3: Detailed Metrics Breakdown (Redesigned)
├─ Table view WITH enhanced interactivity:
│  ├─ Column sorters (click header to sort)
│  ├─ Filter by status: All / On-Track / At-Risk / Off-Track
│  ├─ Search by metric name
│  └─ Columns:
│     ├─ Metric Name (with definition icon/tooltip)
│     ├─ Value (formatted with units)
│     ├─ Last Updated (date)
│     ├─ Status (badge color-coded)
│     ├─ Trend (% change, color-coded)
│     └─ Actions (drill-down icon, view history)
├─ Drill-down view (when clicking a metric row):
│  ├─ Scope breakdown (e.g., GHG → Scope 1, 2, 3)
│  ├─ 24-month history (mini chart)
│  ├─ Data source & confidence level
│  ├─ Validation checks (passed/failed)
│  └─ Edit button (change data, add notes)
└─ Comparison tools (NEW):
   ├─ "Compare to:" dropdown (Industry avg / Target / Previous year)
   ├─ Shows benchmark percentage
   └─ "See detailed comparison report"

Section 4: Data Health & Actions (Redesigned)
├─ Data completeness indicator:
│  ├─ Progress bar: "82% complete (7/8 metrics)"
│  ├─ Missing data warning: "Water usage for Site B"
│  └─ "Add missing data" button
├─ Next submission deadline:
│  ├─ "Next report due: April 30, 2026"
│  ├─ Days remaining countdown
│  └─ "Set reminder" button
├─ Action cards (redesigned from buttons):
│  ├─ "📤 Upload Data"
│  │  ├─ Icon: upload symbol
│  │  ├─ Description: "Bulk upload via CSV/Excel"
│  │  └─ File size: "Max 10MB"
│  ├─ "📊 Generate Report"
│  │  ├─ Icon: document symbol
│  │  ├─ Description: "Create PDF, Excel, or JSON reports"
│  │  └─ Formats: PDF, Excel, JSON
│  ├─ "📈 View History"
│  │  ├─ Icon: time symbol
│  │  ├─ Description: "See all submitted data & changes"
│  │  └─ Shows: Timeline view
│  ├─ "🎯 Set Targets"
│  │  ├─ Icon: target symbol
│  │  ├─ Description: "Define ESG goals & track progress"
│  │  └─ Links to: Target setting page
│  └─ "❓ Get Help"
│     ├─ Icon: question mark
│     ├─ Description: "View metrics guide & FAQ"
│     └─ Links to: Help center + contextual tooltips

Mobile Optimization (Stack vertically):
├─ KPI cards: Single column, landscape mode shows 2 columns
├─ Trend chart: Full-width, auto-scales
├─ Metrics table: Swipe-scroll horizontally, collapsible columns
├─ Action cards: Stack vertically, full-width tappable
```

**Key Improvements**:
- **Context**: Every KPI shows comparison, trend, and related metrics
- **Discoverability**: Action cards describe what they do (vs. abstract buttons)
- **Interactivity**: Charts and tables support drill-down and customization
- **Mobile**: Stack-based layout, swipeable components
- **Completeness**: Data health indicator shows what's missing

---

### 3.3 Redesigned Report Generation Journey (Marcus → Amara)

**Current Problems**:
1. Framework selection is overwhelming (no guidance)
2. Period selection wording is ambiguous
3. JSON format not user-friendly
4. No preview of actual report

**Improved Flow**:

```
Dashboard → "Generate Report" button
OR Navigate to /report
  ↓
Report Generation Page (Redesigned)
  ↓
Section 1: Report Type Selector (NEW)
├─ Radio buttons: "I want to..."
│  ├─ "Submit to regulatory body"
│  │  └─ Framework → JSE (pre-selected)
│  ├─ "Share with investors"
│  │  └─ Framework → ISSB (pre-selected)
│  ├─ "Internal stakeholder report"
│  │  └─ Framework → GRI (pre-selected)
│  └─ "Custom / Multi-framework report"
│     └─ Framework → "Choose below"
├─ Info box: "Not sure which type?"
│  └─ Link to: "Choose the right framework" (guide)
└─ Next: "Choose your framework" button

↓

Section 2: Framework Selection (Redesigned)
├─ Context: "Based on your selection above, we recommend:"
├─ 3 Framework Cards (interactive):
│  └─ ISSB Card (if "Investor" selected)
│     ├─ Badge: "RECOMMENDED FOR YOU"
│     ├─ Logo: ISSB logo (visual)
│     ├─ Name: "ISSB (IFRS S1/S2)"
│     ├─ Description: "Focused on investor-relevant sustainability metrics. Includes climate and general sustainability standards."
│     ├─ Compliance: "✓ Covers your listed status"
│     ├─ Metrics included: "GHG, Energy, Water, Governance, Risk Management"
│     ├─ Report length: "Est. 12-15 pages"
│     ├─ Time to generate: "Avg. 30 seconds"
│     ├─ Cost: "Free"
│     └─ Radio: Select this framework
├─ Comparison table (expandable):
│  ├─ Rows: ISSB, JSE, GRI
│  ├─ Cols: Coverage, Page Count, Time, Cost, Best for
│  └─ Expandable: "See detailed comparison"
└─ Selected framework summary:
   └─ "You selected: ISSB (IFRS S1/S2) — Estimated 12-15 page report"

↓

Section 3: Period Selection (Redesigned)
├─ Context: "Which period do you want to report?"
├─ Date pickers (clearer labels):
│  ├─ "Reporting period start:"
│  │  └─ Date input (YYYY-MM-DD)
│  ├─ "Reporting period end:"
│  │  └─ Date input (YYYY-MM-DD)
│  └─ "Or select a preset:"
│     ├─ Button: "Fiscal Year 2026 (Apr 2025 - Mar 2026)"
│     ├─ Button: "Calendar Year 2025 (Jan - Dec 2025)"
│     ├─ Button: "Last 12 months"
│     └─ Button: "Custom range"
├─ Info: "Your organization's fiscal year is set to Apr 2025 - Mar 2026. Change in settings."
└─ Data availability check:
   └─ "✓ Data available for selected period (12 data points collected)"

↓

Section 4: Customization Options (NEW)
├─ Framework-specific options:
│  ├─ For ISSB:
│  │  ├─ "Include Scope 3 emissions?" (toggle - if available)
│  │  ├─ "Include climate scenario analysis?" (toggle)
│  │  └─ "Highlight areas of greatest risk?" (toggle)
│  ├─ For JSE:
│  │  ├─ "Include corporate governance section?" (toggle)
│  │  └─ "Include stakeholder engagement summary?" (toggle)
│  └─ For GRI:
│     ├─ "Include materiality matrix?" (toggle)
│     └─ "Include GRI index?" (toggle)
├─ General options:
│  ├─ "Include charts & visualizations?" (toggle - default on)
│  ├─ "Include 12-month trend analysis?" (toggle - default on)
│  ├─ "Include industry benchmarking?" (toggle - if available)
│  └─ "Include executive summary?" (toggle - default on)
├─ Branding options (for partner admins):
│  ├─ "Include organization logo?" (toggle)
│  ├─ "Add cover page with organization details?" (toggle)
│  └─ "Include footer with data sources?" (toggle)
└─ Info: "Standard options shown. Your organization's profile may affect which options are available."

↓

Section 5: Format Selection (Redesigned)
├─ Context: "How do you want to download your report?"
├─ 4 Format Cards (vs. 3):
│  ├─ PDF Card (default)
│  │  ├─ Icon: 📄
│  │  ├─ Name: "PDF Report"
│  │  ├─ Best for: "Sharing with stakeholders, printing"
│  │  ├─ Size: "Est. 2-5 MB"
│  │  ├─ Compatibility: "Opens in all browsers, requires Adobe Reader"
│  │  └─ Radio: Select
│  ├─ Excel Card
│  │  ├─ Icon: 📊
│  │  ├─ Name: "Excel Spreadsheet"
│  │  ├─ Best for: "Data analysis, further processing"
│  │  ├─ Size: "Est. 500 KB"
│  │  ├─ Compatibility: "Works with Excel, Google Sheets, Numbers"
│  │  └─ Radio: Select
│  ├─ JSON Card
│  │  ├─ Icon: 💾
│  │  ├─ Name: "JSON (Machine-Readable)"
│  │  ├─ Best for: "API integration, automated processing"
│  │  ├─ Size: "Est. 100 KB"
│  │  ├─ Compatibility: "For developers, APIs, databases"
│  │  └─ Radio: Select
│  └─ (Future) API Card
│     ├─ Icon: 🔌
│     ├─ Name: "API Download (Real-time)"
│     ├─ Best for: "Automated updates, live dashboards"
│     ├─ Availability: "For Premium tier"
│     └─ "Learn more about API"
├─ Info: "You can download in multiple formats. Choose your primary format now."
└─ Advanced options (collapsible):
   ├─ "Include data sources & methodology?"
   ├─ "Include audit trail (who submitted data when)?"
   └─ "Compress file (ZIP)?"

↓

Section 6: Report Preview (NEW - CRITICAL)
├─ "Preview your report:"
├─ Mini preview showing:
│  ├─ Cover page (if PDF)
│  ├─ Table of contents
│  ├─ Sample metrics section (first 3 metrics)
│  ├─ Sample chart (first metric trend)
│  └─ Footer/credits
├─ CTA: "View full preview (opens in new tab)" (for PDF)
├─ Info: "This is a preview. Final report will include all data."
└─ Options:
   ├─ "Go back and change options"
   └─ "Proceed to generate"

↓

Section 7: Review & Generate
├─ Summary box: "You're about to generate:"
│  ├─ Framework: "ISSB (IFRS S1/S2)"
│  ├─ Period: "April 1, 2025 — March 31, 2026"
│  ├─ Format: "PDF"
│  ├─ Size (est.): "3 MB"
│  ├─ Time (est.): "30 seconds"
│  └─ Cost: "Free"
├─ Advanced options (shown if any selected):
│  └─ "Customizations applied: Include Scope 3, Trend Analysis, Benchmarking"
├─ CTA Button: "Generate & Download" (large, prominent)
└─ Secondary: "Save report settings as template" (checkbox)

↓

Section 8: Generation Progress (NEW - for long reports)
├─ Progress indicator:
│  ├─ "Generating your report..."
│  ├─ Progress bar with steps:
│  │  ├─ ✓ Validating data
│  │  ├─ ✓ Calculating metrics
│  │  ├─ ⏳ Generating charts (in progress)
│  │  ├─ ⏳ Compiling report
│  │  └─ ⏳ Finalizing
│  └─ "This usually takes 30 seconds"
├─ Background processing option:
│  ├─ "Or send me a download link via email" (checkbox)
│  └─ "I'll notify you when your report is ready"
└─ Cancel button

↓

Section 9: Success & Download
├─ Success message:
│  ├─ "✅ Your report is ready!"
│  ├─ "Generated: March 12, 2026 at 2:45 PM"
│  └─ "Report Name: ESG-Report-ISSB-2026-Q1.pdf"
├─ Download options:
│  ├─ "📥 Download Now" (primary button)
│  ├─ "📧 Send via Email" (secondary)
│  ├─ "🔗 Get Share Link" (secondary)
│  └─ "📋 Copy to Clipboard" (for API response)
├─ Next steps:
│  ├─ "Generate another report"
│  ├─ "Back to dashboard"
│  ├─ "View report history"
│  └─ "Share this report"
├─ Report metadata:
│  ├─ File size: 2.8 MB
│  ├─ Generated by: [User name] on [date]
│  ├─ Data source: [Organization name]
│  ├─ Period: April 1, 2025 — March 31, 2026
│  ├─ Framework: ISSB (IFRS S1/S2)
│  └─ Expiry: "Download link expires in 7 days"
└─ Email option: "We'll send a download link to [email@example.com]"

Mobile Optimization:
├─ Collapsible sections (tap to expand/collapse)
├─ Full-width buttons
├─ Stacked format/framework cards
├─ Swipeable through sections (gestures)
└─ Save progress option (auto-save draft)
```

**Key Improvements**:
- **Guided selection**: "What do you want to do?" → pre-selects framework
- **Context & comparison**: Tables and descriptions help users choose
- **Customization**: Toggle options based on framework and needs
- **Preview**: Users see what they're downloading before generation
- **Progress feedback**: Long reports show real-time progress
- **Multiple download options**: Email, link, clipboard (developer-friendly)

---

## Part 4: Specific UX Improvements & Recommendations

### 4.1 Quick Wins (1-3 hours each)

#### QW1: Add Glossary & Contextual Help

**What**: Interactive glossary with hover tooltips and expandable definitions

**Where**:
- ESG onboarding (Step 3 fields)
- Dashboard metrics table
- Report framework descriptions

**How**:
```jsx
<label>
  GHG Scope 1 Emissions
  <HelpIcon onClick={() => showGlossary('GHG_SCOPE_1')} />
</label>

// Tooltip popup
"Greenhouse Gas emissions directly produced by
your organization's operations (e.g., fuel combustion,
natural gas for heating). Measured in tCO2e (metric tonnes
of CO2 equivalent). Learn more → [Link to full guide]"
```

**Benefits**:
- Reduces form abandonment
- Supports non-technical users
- Builds confidence in data entry
- Improves accessibility (keyboard + screen reader friendly)

**Effort**: 2-3 hours (React component + glossary data structure)

---

#### QW2: Add "Skip / Estimate Toggle" to ESG Data Entry

**What**: Confidence indicator (Actual vs. Estimated) for each metric

**Where**: Onboarding Step 3, Dashboard metrics upload

**How**:
```jsx
<div className="metric-input">
  <label>Annual Revenue (R)</label>
  <input type="number" placeholder="e.g., 5000000" />
  <div className="confidence-toggle">
    <radio value="actual">Actual (from records)</radio>
    <radio value="estimated" checked>Estimated (best guess)</radio>
  </div>
  <small>Estimates are fine! You can update later as data improves.</small>
</div>
```

**Benefits**:
- Users feel less anxious about missing/estimated data
- System can prioritize validation for "actual" vs. "estimated"
- Supports data maturity improvement over time

**Effort**: 1-2 hours

---

#### QW3: Enhance KPI Cards with Context

**What**: Add comparison and target information to KPI cards

**Before**:
```
Total GHG Emissions
1,245 tCO2e
-5% trend
```

**After**:
```
Total GHG Emissions
1,245 tCO2e
📉 Down 5% vs last year
📊 Below 2024 target (1,300 tCO2e)
→ View breakdown
```

**Effort**: 1-2 hours

---

#### QW4: Add Help Text & Examples to Forms

**What**: Inline help text with examples for every form field

**Where**: Onboarding, data upload forms

**How**:
```jsx
<div className="form-group">
  <label>Energy Consumption (MWh) *</label>
  <input
    type="number"
    placeholder="285.5"
    aria-describedby="energy-help"
  />
  <small id="energy-help">
    💡 Find this on your energy bill.
    Example: "Total consumption: 285.5 MWh"
    <a href="#learn-more">Learn more</a>
  </small>
</div>
```

**Benefits**:
- Reduces form errors and abandonment
- Supports first-time users
- Increases data quality

**Effort**: 2-3 hours (create help text + integrate)

---

#### QW5: Add "Data Missing" Alerts to Dashboard

**What**: Visual indicator of incomplete data

**Where**: Dashboard top section

**How**:
```jsx
<AlertBanner severity="warning">
  ⚠️ Missing data for March 2026
  <ul>
    <li>Water usage (Site B)</li>
    <li>Waste data (All sites)</li>
  </ul>
  <button>Add missing data</button>
</AlertBanner>
```

**Benefits**:
- Users know exactly what's missing
- Drives data completeness
- Reduces compliance risk

**Effort**: 1-2 hours

---

### 4.2 Medium Wins (4-8 hours each)

#### MW1: Build Interactive Metrics Drill-Down

**What**: Click metric row → see breakdown by scope/location/time

**Current**: Static table with 8 rows

**Improved**:
```jsx
// Click "GHG Scope 1 Emissions" row →
Modal / Drawer opens showing:
├─ 24-month history (mini chart)
├─ Breakdown by location/department
├─ Confidence level (Actual vs. Estimated)
├─ Data source & last updated
├─ Validation status (✓ Passed / ✗ Failed)
└─ "Edit" button to update data
```

**Benefits**:
- Users understand metric composition
- Supports troubleshooting (why is this metric high?)
- Enables drill-down analysis

**Effort**: 4-5 hours (modal + data aggregation logic)

---

#### MW2: Implement "Compare & Benchmark" Feature

**What**: Compare organization's metrics to targets, peers, industry

**Where**: Dashboard metrics section

**How**:
```jsx
<ComparisonView>
├─ "Compare to:" dropdown
│  ├─ Your 2025 results
│  ├─ Your targets
│  ├─ Industry average (if data available)
│  └─ Peer companies (if data available)
├─ Side-by-side comparison
└─ Gap analysis
```

**Benefits**:
- Provides context for performance
- Drives competitive motivation
- Supports goal setting

**Effort**: 6-8 hours (requires industry/target data model)

---

#### MW3: Build Report Template System

**What**: Save/load report generation presets

**Where**: Report generation page

**How**:
```jsx
<section className="report-templates">
  <div className="template">
    <h4>Monthly Investor Report</h4>
    <p>ISSB, Current Month, PDF + Email</p>
    <button onClick={() => loadTemplate('monthly-investor')}>
      Use Template
    </button>
    <button onClick={() => deleteTemplate('monthly-investor')}>
      Delete
    </button>
  </div>
</section>
```

**Benefits**:
- Users save time on recurring reports
- Ensures consistency
- Supports monthly/quarterly workflows

**Effort**: 5-6 hours

---

#### MW4: Add Data Upload Widget with Validation

**What**: Drag-drop CSV/Excel upload with real-time validation

**Where**: Dashboard "Upload Data" action

**How**:
```jsx
<div className="upload-widget">
  <DropZone
    accept=".csv, .xlsx, .xls"
    onDrop={handleFileUpload}
  />
  <div className="validation-feedback">
    ✓ File parsed successfully
    📊 Detected 12 records
    ⚠️ Missing: Water usage for Site B
    🔍 Review before confirming
  </div>
  <button onClick={submitData}>Confirm Upload</button>
</div>
```

**Benefits**:
- Faster data entry for medium/large orgs
- Real-time validation reduces errors
- Supports bulk updates

**Effort**: 6-8 hours (CSV parsing + validation logic)

---

#### MW5: Implement Audit Trail / Data History

**What**: Show who submitted data, when, and what changed

**Where**: "View History" action, metrics drill-down

**How**:
```jsx
<HistoryTimeline>
├─ Mar 12, 2026 - 2:45 PM
│  └─ Sarah Johnson updated GHG Scope 1: 450 → 455 tCO2e
│     Changed from: Estimated → Actual
│     Reason: Q4 audit completed
├─ Feb 28, 2026 - 4:22 PM
│  └─ Auto-generated estimate: 450 tCO2e
└─ Feb 15, 2026 - 9:10 AM
   └─ System calculated: 450 tCO2e (based on energy)
```

**Benefits**:
- Supports compliance and audits
- Builds confidence in data quality
- Enables error recovery

**Effort**: 5-7 hours

---

### 4.3 Major Wins (8+ hours, architectural changes)

#### Major1: Multi-Organization Support

**What**: Enable users to manage multiple organizations

**Current**: Single org per login

**Improved**:
- Organization selector in nav
- Dashboard/report view per org
- User role-based permissions
- Admin ability to manage orgs

**Effort**: 15-20 hours (requires backend schema changes, org context)

---

#### Major2: Role-Based Access Control (RBAC)

**What**: Support different user types: Data Entry, Reviewer, Admin, Viewer

**Current**: No role distinction

**Improved**:
- Role selector during invite
- Permission-based UI (hide/show buttons)
- Approval workflows (submit → review → approve)
- Audit logs per action

**Effort**: 12-16 hours

---

#### Major3: Real-Time Collaboration

**What**: Enable multiple users to work on data simultaneously

**Current**: Single user at a time

**Improved**:
- WebSocket-based live updates
- Conflict resolution (last write wins or merge)
- User presence indicator
- Comments on metrics

**Effort**: 20+ hours

---

#### Major4: Advanced Report Builder

**What**: Custom report creation (select metrics, date ranges, formats)

**Current**: Fixed report structure

**Improved**:
- Drag-drop report sections
- Metric selector (choose which KPIs to include)
- Custom calculations
- Branding customization
- Save as template

**Effort**: 16-20 hours

---

#### Major5: AI-Powered Insights

**What**: Auto-generate insights and recommendations

**Uses Claude API**:
- "Your GHG is up 3% due to increased production volume. Consider renewable energy investments to offset."
- "Your female leadership is below industry average (35% vs 42%). Here are peer strategies."
- Anomaly detection ("Water usage spike in July—check for leaks")

**Effort**: 10-15 hours (Claude API integration, prompt engineering)

---

## Part 5: User Stories with Acceptance Criteria

### Story 1: Glossary Integration
**As a** Small business owner registering for the first time
**I want to** understand what each ESG metric means
**So that** I can confidently enter my data and know what values to collect

**Acceptance Criteria**:
- [ ] Every metric field in onboarding has a help icon
- [ ] Clicking help icon shows definition popup with examples
- [ ] Definition popup includes unit information (e.g., "tCO2e")
- [ ] Popup has link to longer guide (external or modal)
- [ ] Glossary terms are consistent across all pages
- [ ] Mobile: Help popup is readable on small screens
- [ ] Accessibility: Help icon is keyboard-accessible
- [ ] First-time users complete onboarding 20% faster

---

### Story 2: Confidence Flags for Data
**As a** Data manager entering estimated metrics
**I want to** flag which data is estimated vs. actual
**So that** the system can prioritize improvements and we can track data maturity

**Acceptance Criteria**:
- [ ] Each numeric field in onboarding/upload has "Actual / Estimated" toggle
- [ ] Toggle defaults to "Estimated" (lower barrier)
- [ ] Dashboard shows summary: "4 Actual, 1 Estimated"
- [ ] Report can filter by confidence level
- [ ] API response includes confidence flag for each metric
- [ ] User can update confidence level later (no re-entry of value)
- [ ] Validation logic treats "Estimated" differently from "Actual"

---

### Story 3: KPI Context & Comparison
**As a** Sustainability manager checking monthly progress
**I want to** see my metrics compared to targets and last year
**So that** I can quickly assess whether we're on track

**Acceptance Criteria**:
- [ ] KPI cards show: value, trend %, last year comparison, target
- [ ] Trend % is color-coded (green if positive, red if negative)
- [ ] Card shows which metric is "On Track" or "At Risk"
- [ ] Clicking card shows detailed drill-down view
- [ ] Mobile: KPI cards stack vertically, all info visible without truncation
- [ ] Tooltips explain what each indicator means
- [ ] Benchmark data loads within 2 seconds

---

### Story 4: Data Upload Widget
**As a** Medium company with multiple sites
**I want to** upload ESG data via CSV/Excel
**So that** I don't have to manually fill forms for 20 locations

**Acceptance Criteria**:
- [ ] Drag-drop zone accepts .csv, .xlsx, .xls files
- [ ] System parses file and validates columns (metric name, value, unit)
- [ ] Real-time feedback: "✓ Parsed 12 records" or "✗ Missing column: unit"
- [ ] User can preview data before confirming
- [ ] Validation shows exactly which rows have errors
- [ ] On submit, creates data submission with "Pending Review" status
- [ ] Max file size: 10MB
- [ ] File upload completes within 5 seconds

---

### Story 5: Report Framework Guidance
**As a** First-time report generator
**I want to** understand the difference between ISSB, JSE, and GRI
**So that** I choose the right standard for my needs

**Acceptance Criteria**:
- [ ] Report generation page asks "What do you want to do?" first
- [ ] Based on answer, framework is pre-selected
- [ ] Framework card includes: name, description, coverage, page count, time to generate
- [ ] Comparison table shows ISSB vs JSE vs GRI side-by-side
- [ ] Each framework has "Learn more" link to external docs
- [ ] Info box explains selected framework in plain language
- [ ] Recommended badge appears on suggested framework
- [ ] User can still override recommendation

---

### Story 6: Report Preview
**As a** Sustainability officer before downloading a report
**I want to** see what the report will look like
**So that** I'm confident it's what stakeholders expect

**Acceptance Criteria**:
- [ ] Preview shows first 3 pages of PDF (cover, TOC, sample section)
- [ ] Preview includes 1 sample chart from actual data
- [ ] Preview loads within 3 seconds
- [ ] User can expand to full preview (loads actual PDF)
- [ ] Excel format: preview shows first 3 sheets with actual data
- [ ] JSON format: preview shows sample JSON structure
- [ ] Preview can be toggled on/off (for power users)
- [ ] "Go back and change options" button navigates to customization step

---

### Story 7: Missing Data Alerts
**As a** Data manager with multiple submission deadlines
**I want to** see which metrics are missing from my dashboard
**So that** I can complete submissions and meet deadlines

**Acceptance Criteria**:
- [ ] Dashboard shows missing data in prominent alert banner
- [ ] Missing data list shows: metric name, last submitted, days overdue
- [ ] Clicking "Add missing data" navigates to data entry form
- [ ] Alert disappears when data is submitted
- [ ] Alerts can be customized (hide/show by category)
- [ ] Mobile: Alert banner is readable and not cut off
- [ ] Deadline countdown shows "Due in X days" or "Overdue by X days"

---

## Part 6: Gherkin Scenarios for Critical Flows

### Scenario 1: SME Registration Flow
```gherkin
Feature: SME User Registration

Scenario: New SME registers and gets started
  Given I am a new small business owner
  And I navigate to the ESG Platform landing page
  When I select my brand (WCPG)
  And I click "Register with WCPG"
  Then I should see the onboarding wizard (Step 1 of 4)

  When I fill in Business Information:
    | Field                | Value                     |
    | Organization Name    | Stellenbosch Wine Estate  |
    | Registration Number  | CK2024001                 |
    | Industry Sector      | Agriculture               |
    | Number of Employees  | 1-10 employees            |
  And I click "Next"
  Then I should be on Step 2 (Contact Details)

  When I fill in Contact Information:
    | Field        | Value                    |
    | Contact Name | Sarah Johnson            |
    | Email        | sarah@winey.co.za        |
    | Phone        | +27 21 123 4567          |
  And I click "Next"
  Then I should be on Step 3 (ESG Data)
  And I should see context: "Why we ask this" + glossary links
  And each field should have an example (e.g., "285.5" for energy)

  When I fill in ESG Baseline Data:
    | Field            | Value       | Confidence |
    | Annual Revenue   | 5000000     | Actual     |
    | GHG Scope 1      | 85.4        | Estimated  |
    | Energy MWh       | 285.5       | Actual     |
    | Water m³         | 32500       | Estimated  |
    | Waste MT         | 42.1        | Estimated  |
  And I see: "Fields completed: 5/5" progress indicator
  And I click "Next"
  Then I should be on Step 4 (Review & Submit)
  And I should see summary of all data
  And I should see: "Confidence: 2 Actual, 3 Estimated"

  When I check "I agree to Terms of Service"
  And I click "Complete Registration"
  Then I should see success message: "Organization registered successfully!"
  And I should see button: "Go to Login" (not manual navigation)

  When I click "Go to Login"
  Then I should be redirected to /login
  And I should see prompt to log in with my email
```

---

### Scenario 2: Dashboard Data Entry & Monitoring
```gherkin
Feature: Monitor ESG Data Completeness

Scenario: Data manager sees missing data and completes submission
  Given I am logged in as a data manager
  When I navigate to the dashboard
  Then I should see alert banner: "⚠️ Missing data for March 2026"
  And banner should list: "Water usage (Site B), Waste data (All sites)"
  And banner should have button: "Add missing data"

  When I click "Add missing data"
  Then I should see data entry form with missing fields pre-selected
  And form should show: "Water usage (Site B)" and "Waste data"

  When I fill in the missing data:
    | Field                | Value  |
    | Water usage (Site B) | 5200   |
    | Waste data (Site A)  | 12.5   |
    | Waste data (Site B)  | 8.3    |
    | Waste data (Site C)  | 10.1   |
  And I click "Submit"
  Then I should see success message: "Data submitted successfully!"
  And I should return to dashboard
  And alert banner should show: "✅ March 2026 data complete (8/8 metrics)"
```

---

### Scenario 3: Report Generation with Framework Guidance
```gherkin
Feature: Generate Standards-Compliant Reports

Scenario: User generates report with framework guidance
  Given I am logged in as sustainability manager
  When I click "Generate Report" on dashboard
  Then I should see: "What do you want to do?"
  With options:
    - Submit to regulatory body → JSE
    - Share with investors → ISSB
    - Internal stakeholder report → GRI
    - Custom / Multi-framework → Choose

  When I select "Share with investors"
  Then framework should be pre-selected to ISSB
  And I should see description: "Focused on investor-relevant metrics..."

  When I proceed to Period Selection
  Then I should see:
    - Date pickers with labels "Reporting period start" and "end"
    - Preset buttons: "Fiscal Year 2026", "Calendar Year 2025", "Last 12 months"
    - Info: "Your fiscal year is set to Apr 2025 - Mar 2026"
    - Data availability: "✓ 12 data points collected"

  When I select "Fiscal Year 2026"
  Then date pickers should auto-fill: Apr 2025 - Mar 2026

  When I proceed to Format Selection
  Then I should see 4 format cards: PDF, Excel, JSON, API
  With info for each:
    - PDF: "Best for: Sharing with stakeholders, printing"
    - Excel: "Best for: Data analysis, further processing"
    - JSON: "Best for: API integration, automated processing"

  When I select PDF
  And I proceed to Customization
  Then I should see ISSB-specific toggles:
    - "Include Scope 3 emissions?" (if available)
    - "Include climate scenario analysis?"

  When I toggle "Include Scope 3"
  And I proceed to Report Preview
  Then I should see:
    - Mini preview of cover page
    - Sample metrics table with actual data
    - Sample chart with actual trend data
    - "View full preview (opens in new tab)"

  When I click "Generate & Download"
  Then I should see progress: "Generating your report..."
  With steps:
    - ✓ Validating data
    - ✓ Calculating metrics
    - ⏳ Generating charts
    - ⏳ Compiling report
    - ⏳ Finalizing

  When generation completes
  Then I should see: "✅ Your report is ready!"
  With buttons:
    - "📥 Download Now" (primary)
    - "📧 Send via Email"
    - "🔗 Get Share Link"
  And file should be named: "ESG-Report-ISSB-2026-Q1.pdf"
```

---

## Part 7: Implementation Priorities

### Phase 1: Foundation (Weeks 1-2) — Quick Wins + Foundations
**Goal**: Make current experience less confusing, set up for future features

**Tasks**:
- [ ] QW1: Add glossary & contextual help
- [ ] QW2: Add "Confidence flags" (Actual vs. Estimated)
- [ ] QW3: Enhance KPI cards with context
- [ ] QW4: Add help text & examples to forms
- [ ] QW5: Add "Data missing" alerts
- [ ] Refactor DashboardPage layout (prep for drill-down)
- [ ] Create user roles data model (prep for RBAC)

**Impact**:
- Reduce onboarding abandonment
- Improve data quality
- Build foundation for RBAC

---

### Phase 2: Usability (Weeks 3-4) — Medium Wins
**Goal**: Enable power users, improve data workflows

**Tasks**:
- [ ] MW1: Build interactive metrics drill-down
- [ ] MW2: Implement "Compare & Benchmark" feature
- [ ] MW3: Build report template system
- [ ] MW4: Add data upload widget with validation
- [ ] MW5: Implement audit trail / data history
- [ ] Add mobile optimizations (swipeable, responsive tables)

**Impact**:
- Medium/large companies can use platform efficiently
- Data quality improves (validation, audit trail)
- Time to report generation reduced 50%

---

### Phase 3: Advanced (Weeks 5-6+) — Major Wins
**Goal**: Enterprise-grade features, competitive differentiation

**Tasks**:
- [ ] Major1: Multi-organization support
- [ ] Major2: Role-based access control (RBAC)
- [ ] Major3: Advanced report builder
- [ ] Major4: AI-powered insights (Claude API)
- [ ] Stretch: Real-time collaboration

**Impact**:
- Platform scales to enterprise use cases
- Unique insights differentiate from competitors
- Support for distribution partner admin workflows

---

### Quick Reference: ROI by Feature
```
Feature                          | Effort | Impact | Priority
Data Upload Widget              | 6-8h   | HIGH   | P1
Drill-Down Metrics              | 4-5h   | MED    | P2
Glossary & Help                 | 2-3h   | HIGH   | P1
Data Missing Alerts             | 1-2h   | HIGH   | P1
Confidence Flags                | 1-2h   | HIGH   | P1
KPI Context                     | 1-2h   | HIGH   | P1
Report Preview                  | 8-10h  | HIGH   | P2
Framework Guidance              | 6-8h   | MED    | P2
Multi-Org Support              | 15-20h | HIGH   | P3
RBAC                           | 12-16h | HIGH   | P3
Advanced Report Builder        | 16-20h | MED    | P3
AI Insights                    | 10-15h | MED    | P3
Real-time Collaboration       | 20+ h  | LOW    | P4
```

---

## Part 8: Mobile Experience Optimization

### Current Mobile Issues

| Page | Issue | Impact |
|------|-------|--------|
| Onboarding | Form fields stack, no horizontal inputs | Slower data entry |
| Dashboard | Table not scrollable on small screens | Can't see metrics |
| Dashboard | KPI cards truncate on mobile | Numbers hard to read |
| Dashboard | Chart overlaps navigation | Confusion |
| Report | Radio buttons are small, hard to tap | Accessibility issue |
| Report | Format cards don't wrap correctly | Layout broken |

### Mobile-First Improvements

#### M1: Responsive Form Inputs
```jsx
// Mobile: Single column, large tap targets
// Tablet: 2 columns
// Desktop: 3 columns
<div className="form-group form-mobile">
  <label>GHG Scope 1 (tCO2e)</label>
  <input
    type="number"
    placeholder="85.4"
    // Mobile: min height 44px for tap target
    style={{ minHeight: '44px' }}
  />
  <small>From your operations</small>
</div>
```

#### M2: Collapsible Dashboard Sections
```jsx
// Mobile: Sections collapse by default
<Accordion defaultExpanded={window.innerWidth > 768}>
  <AccordionSummary>
    <h2>KPI Overview</h2>
  </AccordionSummary>
  <AccordionDetails>
    {/* KPI cards */}
  </AccordionDetails>
</Accordion>
```

#### M3: Swipeable Metrics Table
```jsx
// Horizontal scroll with visual indicators
<div className="table-container" style={{ overflowX: 'auto' }}>
  <div className="scroll-hint">Swipe left to see more →</div>
  <table className="metrics-table">{/* data */}</table>
</div>
```

#### M4: Touch-Friendly Buttons
```css
/* Mobile buttons: min 44x44px tap target */
button {
  min-height: 44px;
  min-width: 44px;
  padding: 12px 16px;
}

/* Radio buttons: larger hit zone */
label input[type="radio"] {
  width: 20px;
  height: 20px;
  margin-right: 8px;
}
```

---

## Part 9: Accessibility Beyond WCAG AA

### Current Compliance
- ✅ WCAG AA contrast ratios (4.5:1)
- ✅ Keyboard navigation (Tab, Enter, Escape)
- ✅ Screen reader support (semantic HTML)
- ✅ Form labels associated (label htmlFor)
- ✅ Error messages linked to inputs

### Beyond Compliance: Inclusive UX

#### A1: Color-Blind Friendly Indicators
```jsx
// Not just color, but also icon + text
<span className={`status-badge ${metric.status}`}>
  {metric.status === 'on-track'
    ? '✓ On Track'
    : '⚠ Off Track'}
</span>

// Trend indicators
<span className={`trend ${trend < 0 ? 'positive' : 'negative'}`}>
  {trend < 0 ? '📉' : '📈'} {Math.abs(trend)}%
</span>
```

#### A2: Dyslexia-Friendly Typography
```css
/* Dyslexia-friendly font */
body {
  font-family: 'Verdana', sans-serif; /* Sans-serif, not decorative */
  font-size: 16px; /* Larger base size */
  line-height: 1.5; /* More space between lines */
  letter-spacing: 0.12em; /* Increased letter spacing */
}

/* High contrast text */
h1, h2, h3 {
  color: #000000; /* Pure black on white, not gray */
  font-weight: bold;
}
```

#### A3: Multiple Input Methods
- ✅ Keyboard navigation (Tab, Enter)
- ✅ Mouse/trackpad (click, drag)
- ✅ Touch (tap, swipe, long-press)
- ✅ Voice (if available)
- ✅ Mobile: Auto-fill from device calendar

#### A4: Language & Tone
- Use simple, active language ("Upload data" not "Data submission process")
- Short sentences (10-15 words max)
- Define jargon with glossary
- Avoid idioms and cultural references

#### A5: Cognitive Load Reduction
- One task per page (don't mix multiple workflows)
- Progress indicators on all multi-step forms
- Ability to save and resume later
- Confirmation dialogs on destructive actions
- Undo functionality where possible

---

## Part 10: Success Metrics & Measurement

### Quantitative KPIs

| Metric | Current | Target | Measurement |
|--------|---------|--------|-------------|
| Onboarding Completion Rate | ? | 85% | Google Analytics |
| Time to Dashboard (after login) | ? | < 5 sec | Performance monitoring |
| Data Upload Success Rate | 70% | 95% | Backend logs |
| Report Generation Time | ? | < 30 sec | Performance monitoring |
| Error Rate (form validation) | ? | < 5% | Error tracking |
| Mobile conversion rate | ? | 80% of desktop | Analytics |
| Help/glossary usage | ? | > 40% of users | Event tracking |

### Qualitative Feedback

| Method | Frequency | Target |
|--------|-----------|--------|
| User interviews (5-10 users) | Monthly | Pain points, feature requests |
| NPS survey | Monthly | User satisfaction (target: 50+) |
| Usability testing (moderated) | Quarterly | Task success, time to complete |
| In-app feedback widget | Always | Continuous feedback |
| User support tickets | Always | Real-world issues |

### Accessibility Audits

| Audit Type | Frequency | Tool |
|------------|-----------|------|
| WCAG AA compliance | Quarterly | axe DevTools, WAVE |
| Color-blind simulation | Quarterly | Color Blindness Simulator |
| Keyboard navigation | Monthly | Manual testing |
| Screen reader testing | Quarterly | NVDA (Windows), JAWS |
| Mobile responsiveness | Weekly | BrowserStack, real devices |

---

## Summary: Next Steps

### Immediate (This Week)
1. Review this analysis with stakeholders
2. Prioritize features based on business impact
3. Identify quick wins (glossary, help text)
4. Plan Phase 1 development (1-2 weeks)

### Short-term (Weeks 1-4)
1. Implement Phase 1: Foundation quick wins
2. Conduct user testing on onboarding (5-10 SMEs)
3. Measure baseline metrics (completion rates, time to complete)
4. Start Phase 2: Usability improvements

### Medium-term (Weeks 5-12)
1. Roll out Phase 2: Medium wins (drill-down, templates, upload widget)
2. Gather feedback from medium/large company users
3. Plan Phase 3: Enterprise features
4. Begin Major1 (Multi-org support)

### Success Criteria
- Onboarding completion rate improves to 85%+ (currently unknown)
- Data upload success rate increases to 95%+ (currently 70%)
- Report generation takes < 30 seconds (currently unknown)
- User satisfaction (NPS) improves to 50+ (currently unknown)
- Mobile users represent 30%+ of traffic (currently unknown)
- No regressions on accessibility (WCAG AA maintained)

---

## Document Metadata

**Created**: March 12, 2026
**Status**: Complete & Ready for Implementation
**Version**: 1.0
**Stakeholders**: Product team, UX designers, developers, distribution partners
**Next Review**: After Phase 1 completion (2 weeks)

---

**End of UX Analysis Document**
