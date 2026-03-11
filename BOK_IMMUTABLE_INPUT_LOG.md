# BOK Immutable Input Log
## Generic-ESG-Platform SPACER

**Project**: Generic-ESG-Platform (White-labelled ESG Reporting for Distribution Partners)
**Started**: 2026-03-11
**Status**: Phase P Complete, Ready for Phase A

---

## Raw Inputs Captured

### 1. Client Brief & Requirements
**Source**: User verbal brief + structured questions
**Date Captured**: 2026-03-11
**Format**: Narrative
**Key Points Extracted**:
- Distribution partners: WCPG, JSE, City of Cape Town
- Target businesses: Small, Medium, Large organizations
- Onboarding model: Wizard (SME), API integration (Med/Large)
- Reporting standards: ISSB (IFRS S1/S2), JSE Sustainability Guidance
- White-labelling requirement: Easy logo/colour swap for multi-partner demos
- Key functionality: Onboarding, data collection, validation, reporting, aggregation
- **Stored In**: BRIEF.md

### 2. Process Flow Diagram
**Source**: Client-provided image (4-phase architecture diagram)
**Date Captured**: 2026-03-11
**Format**: Visual diagram
**Content**:
- Phase 1: Business Awareness & Onboarding (WCPG marketing channels → registration → tier selection)
- Phase 2: Data Loading & Refinement (HUGINN Platform - forms, files, API, validation, calculators)
- Phase 3: Business Outputs (Real-time dashboards, report generation, optional premium services)
- Phase 4: WCPG Aggregated View (Province-wide emissions, policy/investment data, FOI dashboard)
- **Stored In**: ARCHITECTURE.md (Section: 4-Phase Architecture)
- **Implications**: Multi-tenant design, aggregation layer for distribution partners, scalable data pipeline

### 3. JSE Sustainability Disclosure Guidance (PDF)
**Source**: JSE_Sustainability_Disclosure_Guidance_June_2022.pdf
**Date Captured**: 2026-03-11
**Pages Reviewed**: Full document (70 pages, ~2200 lines)
**Key Content Extracted**:

#### Materiality Framework
- **Double Materiality**: Impact + Financial perspectives
- **Impact Materiality**: Organization's significant impacts on society, environment, economy
- **Financial Materiality**: Issues affecting enterprise value and investor decisions
- **Dynamic Materiality**: Topics can move between categories as context changes

#### Core & Leadership Metrics

**Governance Metrics**:
- Board composition (total, independent, diversity by gender/race/age)
- Ethical behaviour (code of ethics, corruption incidents, compliance)
- Risk management (sustainability risk assessment, whistleblower protection)
- Tax transparency (tax paid, effective rate, transfer pricing)

**Social Metrics**:
- Labour standards (employee count, diversity, turnover, collective bargaining)
- Wages & working conditions (entry level, median, CEO ratio, living wage)
- Health & Safety (LTIFR, TRIR, work fatalities, training hours)
- Human rights (child labour, forced labour, community development)
- Customer responsibility (complaints, product safety, data breaches)
- Supply chain (supplier audits, standards compliance)

**Environmental Metrics**:
- Climate & Energy (GHG Scope 1/2/3, energy consumption, renewable %, intensity calculations)
- Water (consumption, recycling rate, stress assessment, intensity)
- Pollution & Waste (waste generated, hazardous, landfill %, recycling %, intensity)
- Biodiversity (protected areas, management plans, habitat restoration)
- Supply chain environmental (supplier audits, engagement)

**Climate Financial (IFRS S2)**:
- Climate risk identification (physical, transition, opportunities)
- Capital deployment (CapEx for resilience, clean tech)
- Internal carbon price
- Emission reduction targets (2030, 2050/net-zero)

#### Reporting Frameworks Alignment
- **IFRS S1/S2**: Investor-focused, single financial materiality
- **GRI Standards**: Multi-stakeholder, impact materiality
- **ESRS**: Double materiality (EU approach)
- **JSE Guidance**: Double materiality, South African context

**Stored In**: METRICS.md (comprehensive metrics table with JSE alignment)

### 4. Full Stack SPACER Methodology
**Source**: SPACER_Methodology_Checklist.txt (from Desktop/Downloads)
**Date Captured**: 2026-03-11
**Format**: Structured checklist with templates
**Key Sections**:
- **S - Scope & Source** (2-4 hrs): Capture brief, brand, problem statement
- **P - Prepare BOK** (2-4 hrs): Domain model, sample data, CLAUDE.md
- **A - Architect & Assemble** (4-6 hrs): Docker scaffold, health checks, auth wire-up
- **C - Code the Core** (8-12 hrs): Implement 3-5 hero features
- **E - Embellish with Brand** (4-6 hrs): Apply colours, logo, visual assets
- **R - Release & Record** (2-4 hrs): Deploy, screenshot, demo script, proposal

**Stored In**: CLAUDE.md (Development guide following SPACER structure)

---

## Processed Inputs by Phase

### ✅ Phase S: Scope & Source (COMPLETE)
- [x] Client brief documented (objectives, context, business model)
- [x] Distribution partners identified (WCPG, JSE, CoCT)
- [x] Problem statement clarified (need white-labelled ESG platform for rapid partner onboarding)
- [x] Brand assets identified (to be generated: logo, colours, visual assets)
- [x] Hero features defined (onboarding, dashboard, reporting, aggregation)
- **Artifacts**: BRIEF.md

### ✅ Phase P: Prepare BOK (COMPLETE)
- [x] Requirements structured and documented
- [x] 4-phase process flow understood and mapped to technical architecture
- [x] JSE standards and metrics extracted and catalogued
- [x] Tech stack selected (Flask + React + PostgreSQL + Docker)
- [x] Domain model defined (Tenants, Organizations, Users, Metrics, Data Submissions)
- [x] Sample data strategy outlined (3 tenants × 10 organizations with realistic metrics)
- [x] Demo script conceptualized (10-minute flow covering onboarding → dashboard → report → aggregation)
- [x] Brand palette defined (Blue primary, Green secondary, Amber accent)
- [x] Key commands documented (docker-compose, database, testing)
- **Artifacts**: CLAUDE.md, ARCHITECTURE.md, METRICS.md, BOK_IMMUTABLE_INPUT_LOG.md (this file)

### → Phase A: Architect & Assemble (READY TO START)
- [ ] docker-compose.yml scaffolding
- [ ] PostgreSQL schema from ARCHITECTURE.md
- [ ] Flask + Gunicorn setup
- [ ] Redis for session/cache
- [ ] Nginx reverse proxy configuration
- [ ] Health check endpoints
- [ ] Environment variable template
- [ ] Verify stack starts cleanly

### Phase C: Code the Core (PLANNED)
- [ ] Hero Feature 1: Branded login + landing (1-2 hrs)
- [ ] Hero Feature 2: SME onboarding wizard (3-4 hrs)
- [ ] Hero Feature 3: Dashboard with KPIs (3-4 hrs)
- [ ] Hero Feature 4: Report generation (2-3 hrs)
- [ ] Hero Feature 5: Partner aggregation view (1-2 hrs, stretch)

### Phase E: Embellish with Brand (PLANNED)
- [ ] Apply colour palette to UI
- [ ] Integrate logo into navigation
- [ ] Generate visual assets (nano-illustrate)
- [ ] Responsive design verification
- [ ] Favicon generation
- [ ] Screenshot all pages

### Phase R: Release & Record (PLANNED)
- [ ] Verify clean docker-compose up
- [ ] End-to-end demo walkthrough
- [ ] Screenshot capture for proposal
- [ ] Generate approach document (/fullstack-doc)
- [ ] Deploy to demo environment
- [ ] Prepare talking points

---

## Critical Decisions Made

### 1. Tech Stack Selection
**Decision**: Flask + React + PostgreSQL + Redis + Docker Compose
**Rationale**:
- Flask: Fast iteration, proven Full Stack pattern
- React: Rich UI for dashboards, forms, real-time updates
- PostgreSQL: Multi-tenancy support (RLS), JSONB for flexible config
- Redis: Session management, task queuing for async report generation
- Docker: Reproducible environments, easy demo deployment
- **Alternatives Considered**: FastAPI (would add 2-3 hrs learning), Node.js (less proven pattern)

### 2. Multi-Tenancy Approach
**Decision**: Single schema, tenant_id in all tables, PostgreSQL RLS for isolation
**Rationale**:
- Simplifies deployment (one database instance)
- Enables easy white-labelling per tenant
- Data isolation at SQL level (cannot access another tenant's data)
- Scales horizontally with API layer

### 3. Authentication
**Decision**: Simple Flask login for demo (no Azure AD)
**Rationale**:
- Azure AD configuration takes 2-4 hours
- JWT tokens sufficient for demo purposes
- Can be retrofitted during delivery phase
- Keeps scope focused on core features

### 4. Database Schema
**Decision**: Minimize to 6-8 core tables (tenants, orgs, users, metrics, submissions, records, calculated_metrics, audit_log)
**Rationale**:
- Focuses on the happy path (data collection → reporting)
- Avoids over-engineering (no complex hierarchies yet)
- Fast to generate sample data
- Can extend for delivery with supplier integration, hierarchies

### 5. Sample Data Strategy
**Decision**: 3 distribution partner tenants, 10 organizations per tenant, 12 months of realistic data per org
**Rationale**:
- Demonstrates multi-tenancy in action
- Provides enough data for compelling dashboards (trends visible)
- Realistic metrics from JSE guidance (GHG, energy, water, employees, etc.)
- Can be generated via SQL scripts in ~1 hour

### 6. Hero Features Scope
**Decision**: 5 features (login, onboarding wizard, dashboard, report generation, admin aggregation view)
**Rationale**:
- Feature 1 & 2: Demonstrate ease of use (SME focus)
- Feature 3: Visual impact (dashboards sell)
- Feature 4: Core value (reporting is why they exist)
- Feature 5: Stretch goal (distribution partner ROI story)
- Aligns with 8-12 hour coding window

### 7. Brand Application Timing
**Decision**: Apply colours/logo in Hour 1 of coding, not last
**Rationale**:
- A 50% complete prototype with brand > 100% complete prototype without brand
- Clients remember visual polish
- Reduces last-minute design scramble

---

## Quality Gates & Validation

### Pre-Phase A Checklist
- [x] BRIEF.md clearly articulates client problem and hero features
- [x] CLAUDE.md documents architecture, commands, demo script
- [x] METRICS.md aligns with JSE standards
- [x] ARCHITECTURE.md provides technical blueprint
- [x] Sample data strategy is realistic and feasible
- [x] Tech stack decisions are documented and rationale captured
- [x] Demo script is time-boxed (10 minutes)

### Pre-Launch Checklist (Before demo meeting)
- [ ] docker-compose up --build runs without errors
- [ ] All 5 hero features implemented and functional
- [ ] Dashboard shows realistic data with visible trends
- [ ] Report PDF generates cleanly with branding
- [ ] Sample organizations have 12 months of data each
- [ ] Responsive design verified on tablet
- [ ] Brand colours applied consistently throughout
- [ ] Demo script rehearsed and timed
- [ ] Proposal document generated with screenshots

---

## Risk Register

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|-----------|
| Database migrations fail at demo time | Medium | High | Test migrations on clean docker restart before meeting |
| Sample data is obviously fake | High | Medium | Use realistic company names, plausible metric values |
| Report generation slow | Medium | Medium | Pre-generate sample reports, cache calculators |
| React frontend doesn't load | Low | Critical | Test docker-compose up on fresh machine before meeting |
| Time runs out before all features done | Medium | Low | Prioritize dashboard (Feature 3) first, others are stretch |
| Client wants their actual data in demo | Low | High | Politely defer: "Let's load your real data during delivery" |

---

## Dependencies & Blockers

### External Dependencies
- ✅ JSE Sustainability Disclosure Guidance (captured)
- ✅ Full Stack SPACER Methodology (understood)
- ✅ Ground Control access (has /nano-illustrate, /fullstack-doc, etc.)
- ❓ Brand assets for actual distribution partners (WCPG, JSE logos) - can use generic ESG branding for demo

### Blockers
- None identified for MVP scope

---

## Change Log

| Date | Phase | Change | Rationale |
|------|-------|--------|-----------|
| 2026-03-11 | S | Created BRIEF.md with full requirements | Scope definition |
| 2026-03-11 | P | Created ARCHITECTURE.md with tech stack | Technical blueprint |
| 2026-03-11 | P | Created METRICS.md with JSE alignment | Reporting standards compliance |
| 2026-03-11 | P | Created CLAUDE.md with development guide | Developer onboarding |
| 2026-03-11 | P | This file: BOK_IMMUTABLE_INPUT_LOG.md | Immutable record of inputs |

---

## Next Action

**Phase A: Architect & Assemble** (4-6 hours)

1. Create `docker-compose.yml` with 5 services (Nginx, Flask, PostgreSQL, Redis, MinIO optional)
2. Create `database/init/schema.sql` with core 6 tables
3. Create `database/init/sample_data.sql` with 3 tenants × 10 orgs × 12 months of metrics
4. Create Flask scaffold with `/` and `/health` endpoints
5. Create React scaffold with login form (branded)
6. Verify `docker-compose up --build` starts cleanly
7. Verify health endpoints respond
8. Git commit with message: "feat: phase A complete - docker scaffold + health checks"

**Estimated Time**: 4-6 hours
**Owner**: Claude Code
**Priority**: 🔴 BLOCKING - Must complete before coding hero features

---

**Document Status**: IMMUTABLE - Changes logged above, not directly edited
**Last Updated**: 2026-03-11 13:45 UTC
**Generated by**: Full Stack Ground Control
**CONFIDENTIAL**
