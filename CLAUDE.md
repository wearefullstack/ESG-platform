# ESG-Platform SPACER

## Project Type
SPACER - Sales prototype for distribution partners (WCPG, JSE), 2-3 day build

## Tech Stack

### Backend
- **Runtime**: Python 3.11+ with Flask + Gunicorn
- **Database**: PostgreSQL 14+ with multi-tenancy support (Row-Level Security)
- **Cache/Queue**: Redis 7+ (session management, task queuing)
- **Task Queue**: Celery with Redis broker (async report generation)
- **API**: Flask-RESTful with JSON payloads
- **Auth**: Flask-JWT-Extended for JWT tokens, Flask-OAuthlib for SSO integration

### Frontend
- **Framework**: React 18+ with Vite (fast HMR)
- **State Management**: Redux Toolkit
- **UI Components**: Material-UI or TailwindCSS + Headless UI
- **Charts**: Chart.js with react-chartjs-2
- **Forms**: React Hook Form + Zod validation
- **HTTP**: Axios

### Infrastructure
- **Container**: Docker Compose with 5 services
- **Reverse Proxy**: Nginx with SSL termination
- **File Storage**: MinIO (optional, for document uploads)
- **Deployment**: Docker on local machine, FSDocker for shared demo

### Optional Integrations
- **AI Features**: Anthropic Claude API for insights generation
- **Reporting**: ReportLab for PDF generation
- **Data Viz**: Power BI embedded (stretch goal)

## Brand Rules

### Colour Palette
- **Primary**: #1e40af (Deep Blue - trust, sustainability)
- **Secondary**: #059669 (Emerald Green - environmental commitment)
- **Accent**: #f59e0b (Amber - highlights, CTAs)
- **Neutral Dark**: #1f2937 (Dark Gray - text, backgrounds)
- **Neutral Light**: #f9fafb (Off White - surfaces)
- **Success**: #10b981 (Green)
- **Warning**: #f59e0b (Amber)
- **Error**: #ef4444 (Red)

### Typography
- **Family**: Inter (system font) or Poppins (branding)
- **Headings**: Bold (700), Poppins
- **Body**: Regular (400), Inter
- **Sizes**: H1: 32px, H2: 24px, Body: 14-16px

### Brand Assets
- **Logo**: ESG Platform logo (to be generated with nano-illustrate)
- **Favicon**: Green/Blue letter "E" on sustainable background
- **Hero Image**: Shows businesses reporting ESG data, green/blue theme
- **Pattern**: Subtle sustainability icons (leaf, water drop, factory) as background accent

### Tone of Voice
- Professional yet accessible
- Emphasize transparency, accountability, impact
- Avoid jargon (ESG explained in simple terms)
- Action-oriented ("Let's make your sustainability data work")

## Key Commands

```bash
# Development
docker-compose up --build           # Start everything with fresh build
docker-compose up                   # Start everything (reuse images)
docker-compose logs -f              # Watch logs
docker-compose down -v              # Clean shutdown (delete volumes)

# Individual services
docker-compose restart backend      # Restart just the Flask API
docker-compose exec postgres psql -U esg_user -d esg_platform  # Access DB shell

# Database migrations
docker-compose exec backend flask db migrate
docker-compose exec backend flask db upgrade

# Testing
docker-compose exec backend pytest tests/ -v
npm test                            # Frontend tests (from frontend/ directory)

# Cleanup
docker-compose down -v              # Remove containers, volumes, networks
rm -rf database/data/               # Delete persistent database
```

## Project Structure

```
ESG-platform/
├── backend/                        # Flask API
│   ├── app/
│   │   ├── __init__.py
│   │   ├── models/                # SQLAlchemy models
│   │   │   ├── tenant.py
│   │   │   ├── organization.py
│   │   │   ├── user.py
│   │   │   └── metrics.py
│   │   ├── routes/                # API endpoints
│   │   │   ├── auth.py
│   │   │   ├── onboarding.py
│   │   │   ├── data.py
│   │   │   └── reporting.py
│   │   ├── services/              # Business logic
│   │   └── middleware/            # Auth, CORS, error handling
│   ├── migrations/                # Alembic database migrations
│   ├── tests/
│   ├── Dockerfile
│   ├── requirements.txt
│   └── wsgi.py
├── frontend/                       # React app
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── store/                 # Redux state
│   │   ├── api/                   # Axios clients
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── public/
│   ├── Dockerfile
│   ├── package.json
│   └── vite.config.js
├── database/
│   ├── init/
│   │   ├── schema.sql             # PostgreSQL schema (tenants, orgs, metrics, etc.)
│   │   └── sample_data.sql        # 3 sample tenants + 10 organizations + realistic data
│   └── data/                      # Persistent volume (git-ignored)
├── nginx/
│   ├── nginx.conf                 # Reverse proxy config
│   ├── Dockerfile
│   └── ssl/                       # SSL certs (for HTTPS)
├── docker-compose.yml             # Full stack orchestration
├── .env.example                   # Environment template
├── .gitignore
├── BRIEF.md                       # Project objectives & requirements
├── ARCHITECTURE.md                # Technical architecture & design
├── CLAUDE.md                      # This file - dev guide
├── METRICS.md                     # ESG metrics & standards
├── BOK_IMMUTABLE_INPUT_LOG.md     # Record of all inputs
└── README.md                      # Setup & demo instructions
```

## Domain Context: ESG Reporting Platform

### Key Business Terms

**Tenant**: Distribution partner (WCPG, JSE, City of Cape Town) - owns their own branded instance

**Organization**: A business registered with a distribution partner, reports ESG data

**Size Tier**:
- **Small (SME)**: Micro-business, <50 employees, simple form-based reporting
- **Medium**: 50-500 employees, multiple data sources, some API integration
- **Large**: 500+ employees, complex hierarchies, full API integration, subsidiaries

**Reporting Period**: Organization's fiscal year (not calendar), e.g., April 2023 - March 2024

**Metrics**: Standardized ESG measurements (GHG Scope 1/2/3, energy intensity, water usage, employee diversity, etc.)

**Data Submission**: Bundle of metrics for a given period, goes through validation → approval workflow

**Reporting Standards**:
- **ISSB (IFRS S1/S2)**: International Sustainability Standards Board - investor-focused
- **JSE**: Johannesburg Stock Exchange guidance - South Africa specific
- **GRI**: Global Reporting Initiative - stakeholder accountability

**Multi-Tenancy**: All organizations' data isolated by tenant_id using PostgreSQL RLS

**White-Labelling**: Logo, colours, domain name swappable per tenant (critical for demo to multiple partners)

### Key Workflows

1. **Onboarding**: Business registers → tier selection → setup (SME: simple form, Medium/Large: API config)
2. **Data Collection**: Uploads via form/CSV/API over the fiscal year
3. **Validation**: System checks completeness, consistency, business rules
4. **Approval**: QA team or automated review marks data as approved
5. **Reporting**: Generate standards-compliant report (PDF, Excel, JSON)
6. **Aggregation**: Distribution partner sees province-wide emissions roll-up

## Data Model (Hero Prototype)

### Core Tables
```sql
-- Tenants (Distribution Partners)
tenants (id, name, primary_color, secondary_color, logo_url, domain, created_at)

-- Organizations (Businesses)
organizations (id, tenant_id, name, size_tier, fiscal_year_start, status, created_at)

-- Users
users (id, tenant_id, email, password_hash, role, organization_id, created_at)

-- Metrics (ESG metrics)
metrics (id, code, name, category, unit, required_for_tiers, standards, formula)

-- Data Submissions (Period-based reporting)
data_submissions (id, organization_id, period_start, period_end, status, created_at)

-- Data Records (Individual metric values)
data_records (id, submission_id, metric_id, value, unit, source, created_at)

-- Calculated Metrics (Intensity calculations)
calculated_metrics (id, organization_id, metric_id, period_date, value)
```

## Hero Features (3-5 for MVP)

### Hero Feature 1: Branded Landing & Login (Day 1, 1-2 hours)
- Welcome page with tenant logo/colours
- Simple email/password login (no Azure AD for demo)
- Dashboard redirect on auth
- **Visual Impact**: High (first impression)

### Hero Feature 2: SME Onboarding Wizard (Day 1-2, 3-4 hours)
- Step-by-step questionnaire (5-7 screens)
- Data fields for energy, water, employees, GHG
- CSV upload capability
- Progress bar, friendly UX
- **Technical Depth**: Medium (form validation, workflow state)

### Hero Feature 3: Real-time Dashboard (Day 2, 3-4 hours)
- 4 KPI cards: Total GHG, Energy Intensity, Water Usage, Employee Diversity
- 12-month trend line chart (Chart.js)
- Data table with search/sort
- Responsive design (demo on laptop + tablet)
- Pull data from sample data
- **Visual Impact**: Very high (most impressive screen)

### Hero Feature 4: ESG Report Generation (Day 2, 2-3 hours)
- Generate ISSB-compliant PDF report
- Includes: executive summary, metrics table, intensity calculations, graphs
- Export as PDF, Excel, JSON
- Use ReportLab for PDF
- **Domain-Specific**: High (core value prop)

### Hero Feature 5: Distribution Partner Aggregation View (Day 2-3, 1-2 hours)
- Admin view showing roll-up of all organizations in tenant
- Province-wide GHG emissions by sector
- Business count, data completeness %
- **Stretch Goal**: If time allows

## Demo Script (10 minutes)

### Setup (30 seconds)
- Browser open to tenant's branded login page
- Point out logo/colours (customizable per partner)
- Mention: "Same platform, different branding for each distribution partner"

### Act 1: Onboarding Flow (2 minutes)
1. Register new organization (5 orgs already exist)
2. Walk through SME questionnaire (quick, 3 screens)
3. Show data validation in action
4. Save and confirm: "Data ready for reporting"

### Act 2: Dashboard (2 minutes)
1. Login as existing business
2. Show dashboard KPIs
3. Point to trend chart: "See 12 months of data"
4. Highlight that this is real, realistic data (not fake)

### Act 3: Report Generation (2 minutes)
1. Click "Generate Report"
2. Show PDF download: professional, branded, ISSB-aligned
3. Open PDF in browser, flip through pages
4. Emphasize: "Compliant with IFRS S1/S2 and JSE guidance"

### Act 4: Partner View (2 minutes)
1. Switch to admin/distribution partner view
2. Show province-wide emissions roll-up
3. Show business map/metrics by sector
4. "This is what the provincial government sees - proof of progress"

### Close (1 minute)
- Recap: "In 2-3 days, we built a multi-tenant, white-labelled, standards-compliant platform"
- Next: "Let's talk about how we'd customize this for your specific needs"

## Development Conventions

### Code Style
- **Backend**: PEP 8 (Black formatter)
- **Frontend**: ESLint + Prettier
- **Git**: Conventional commits (feat:, fix:, refactor:, docs:, style:)

### Database
- All DDL via migrations (Alembic)
- Row-level security for multi-tenancy
- Timestamps on all tables (created_at, updated_at)

### API Responses
```json
{
  "success": true,
  "data": { ... },
  "message": "Operation completed"
}
```

### Error Handling
- Try to avoid 500s in demo (use sensible defaults)
- Log errors server-side, show user-friendly messages
- Example: Missing metric → "We'll skip this one for now"

### Testing
- Unit tests for business logic (calculations, validations)
- Integration tests for API endpoints
- Run before committing: `pytest` and `npm test`

## Important Notes for SPACER

1. **Focus on the demo path**: Not every edge case needs handling. Build the happy path beautifully.
2. **Realistic data**: The 50-100 sample records matter more than production-grade error handling.
3. **Branded from hour 1**: Apply colours and logo early, not at the end.
4. **No fancy auth**: Simple login is fine for a demo. Save Azure AD integration for delivery.
5. **Docker matters**: Test `docker-compose down -v && docker-compose up --build` before the meeting.
6. **Restart before demo**: Fresh containers prevent cached data artifacts.

## Metrics Reporting Summary (Reference)

For detailed metrics and calculation formulas, see METRICS.md

**Core Metrics by Tier**:
- **SME**: GHG (Scope 1+2), Energy, Water, Waste, Employees, H&S incidents, Compliance breaches
- **Medium**: All SME metrics + Scope 3 breakdown, Employee diversity, Board composition
- **Large**: All metrics + Climate risk assessment, Supply chain audits, Biodiversity

## Next Steps

1. ✅ Phase S: Scope & Source - DONE (BRIEF.md)
2. ✅ Phase P: Prepare BOK - DONE (this file + ARCHITECTURE.md + METRICS.md)
3. → Phase A: Architect and Assemble - START HERE
   - Create docker-compose.yml
   - Create Flask + PostgreSQL scaffold
   - Verify stack starts cleanly
4. Phase C: Code the Core
   - Implement Hero Features 1-5
5. Phase E: Embellish with Brand
   - Apply colours, logo, brand assets
6. Phase R: Release and Record
   - Deploy, screenshot, demo script, proposal doc

---

**Project Owner**: Full Stack
**Spacer Type**: ESG/Sustainability Reporting
**Distribution Partners**: WCPG, JSE, (City of Cape Town)
**Estimated Delivery**: 2-3 days focused development
**Current Phase**: Phase P - BOK Preparation (ACTIVE)
