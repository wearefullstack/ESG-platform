# Generic-ESG-Platform - Setup & User Guide

## Quick Start (5 minutes)

### Prerequisites
- ✅ Docker Desktop installed (download from [docker.com](https://www.docker.com/products/docker-desktop))
- ✅ Git installed
- ✅ 4GB+ available disk space
- ✅ Port 80 available (or modify docker-compose.yml)

### Clone the Repository

```bash
git clone https://github.com/wearefullstack/Generic-ESG-platform.git
cd Generic-ESG-platform
```

### Start the Application

```bash
docker-compose up --build
```

**First run takes 3-5 minutes.** Wait for all services to show "Up" status.

### Open in Browser

```
http://localhost/
```

### Login with Demo Credentials

- **Email**: `admin@wcpg.local`
- **Password**: `any`

---

## What You'll See

After login, you'll see:

### Dashboard
- **4 KPI Cards**:
  - Total GHG Emissions: 1,145 tCO2e
  - Energy Intensity: 2.3 MWh/FTE (down 8%)
  - Water Usage: 45,000 m³ (up 2%)
  - Employee Diversity: 35% female (up 3%)

- **12-Month Trend Chart**: Line graphs showing GHG and energy trends over time

- **Action Buttons**: Generate Report, Upload Data, View History (placeholders for Phase C)

---

## Project Structure

```
Generic-ESG-platform/
├── backend/                  # Flask API (Python)
│   ├── app/
│   │   ├── routes/          # API endpoints
│   │   └── __init__.py
│   ├── requirements.txt
│   ├── wsgi.py
│   └── Dockerfile
├── frontend/                 # React App
│   ├── src/
│   │   ├── pages/           # Login, Dashboard
│   │   ├── styles/          # CSS files
│   │   └── App.jsx
│   ├── package.json
│   ├── vite.config.js
│   └── Dockerfile
├── database/
│   └── init/
│       ├── schema.sql       # 8 tables + RLS + metrics
│       └── sample_data.sql  # 3 tenants, 30 orgs, 12 months data
├── nginx/
│   ├── nginx.conf
│   └── Dockerfile
├── docker-compose.yml
├── README.md
├── BRIEF.md
├── CLAUDE.md
├── ARCHITECTURE.md
├── METRICS.md
└── SETUP_WIKI.md (this file)
```

---

## Docker Services

### Services Running

| Service | Purpose | Port | Status |
|---------|---------|------|--------|
| **nginx** | Reverse proxy | 80 (public) | `esg-nginx` |
| **backend** | Flask API | 5000 (internal) | `esg-backend` |
| **frontend** | React app | 5173 (internal) | `esg-frontend` |
| **postgres** | Database | 5432 (internal) | `esg-postgres` |
| **redis** | Cache | 6379 (internal) | `esg-redis` |

### Check Status

```bash
docker-compose ps
```

All 5 should show **Up** and **healthy**.

---

## Common Commands

### Start Application
```bash
docker-compose up
```

### Start in Background
```bash
docker-compose up -d
```

### Stop Application
```bash
docker-compose down
```

### Clean (delete all data)
```bash
docker-compose down -v
```

### View Logs
```bash
# All services
docker-compose logs -f

# Specific service
docker-compose logs -f backend
docker-compose logs -f frontend
docker-compose logs -f nginx
```

### Restart a Service
```bash
docker-compose restart backend
```

### Access Database Shell
```bash
docker-compose exec postgres psql -U esg_user -d esg_platform
```

### Access Backend Shell
```bash
docker-compose exec backend flask shell
```

---

## Sample Data

### Organizations Included

**Western Cape Provincial Government (WCPG) Tenant:**
1. Stellenbosch Winery Collective (Small)
2. Table Mountain Logistics Ltd (Medium)
3. Strand Marine Processing (Medium)
4. Paarl Energy Solutions (Large)
5. Hermanus Eco-Tourism Inc (Small)
6. Somerset West Manufacturing (Large)
7. Bellville IT Services (Small)
8. Cape Agri Chemicals Ltd (Medium)
9. Khayelitsha Water Works (Medium)
10. Knysna Forest Products (Large)

**Johannesburg Stock Exchange (JSE) Tenant:**
- Coronation Cement Holdings
- GoldCore Mining Ltd
- Promenade Retail Holdings
- Emerald Energy Solutions
- TechFusion Africa Inc
- Harmony Steel Works
- Platinum Plus Finance Ltd
- Sapphire Insurance Group
- Meridian Pharmaceuticals
- Navigator Telecommunications

**City of Cape Town (CCT) Tenant:**
- Atlantis Desalination Works
- Langa Community Markets Ltd
- Mitchell's Plain Tech Hub
- Tygerberg Hospital Supplies
- Woodstock Urban Renewal
- Sea Point Green Services
- Paarden Eiland Port Operations
- Constantia Winery Estate
- Roeland Street Community Farm
- Camps Bay Hospitality Collective

### Access Different Tenants

Change the login email to match the tenant:
- **WCPG**: `admin@wcpg.local`
- **JSE**: `admin@jse.local`
- **CCT**: `admin@cct.local`

Each tenant has its own branded dashboard with its own colour scheme!

---

## ESG Metrics Included

The platform tracks **50+ standardized metrics** across:

### Environmental
- GHG Emissions (Scope 1, 2, 3)
- Energy Consumption & Renewable %
- Water Usage & Recycling Rate
- Waste Generated & Recycling %
- Biodiversity Assessments

### Social
- Total Employees & Diversity
- Employee Turnover
- Lost Time Injury Frequency Rate (LTIFR)
- Wages & Compensation
- Human Rights Assessments
- Health & Safety Training

### Governance
- Board Composition & Independence
- Corruption Incidents
- Compliance Breaches
- Risk Management
- Tax Transparency

All metrics are **ISSB (IFRS S1/S2) and JSE Sustainability Guidance aligned**.

---

## Troubleshooting

### Port 80 Already in Use

If you get `bind: address already in use`:

1. Edit `docker-compose.yml`
2. Change `80:80` to `8080:80`
3. Access: `http://localhost:8080/`

### Build Fails

```bash
docker-compose down -v
docker-compose up --build
```

This cleans everything and rebuilds from scratch.

### Frontend Not Loading

Check logs:
```bash
docker-compose logs -f frontend
docker-compose logs -f nginx
```

### Database Connection Error

```bash
docker-compose logs -f postgres
```

Ensure postgres is healthy:
```bash
docker-compose ps
```

Should show `postgres` with status `Up X minutes (healthy)`

### Slow Performance

Restart containers:
```bash
docker-compose restart
```

Or clean and rebuild:
```bash
docker-compose down -v
docker-compose up --build
```

---

## Environment Variables

The project uses a `.env` file for configuration. Copy the template:

```bash
cp .env.example .env
```

### Important Variables

```bash
# Database
DATABASE_URL=postgresql://esg_user:esg_password@postgres:5432/esg_platform

# API
API_HOST=0.0.0.0
API_PORT=5000

# Frontend
VITE_API_URL=http://localhost/api

# Security
SECRET_KEY=dev-secret-key-change-in-production
JWT_SECRET_KEY=dev-jwt-key-change-in-production
```

**For production**, update these with real values!

---

## File Locations

### Database
- Schema: `database/init/schema.sql`
- Sample Data: `database/init/sample_data.sql`
- Persistent Data: `database/data/` (git-ignored)

### Backend Code
- API Routes: `backend/app/routes/`
- Models: `backend/app/models/` (to be created)
- Tests: `backend/tests/` (to be created)

### Frontend Code
- Pages: `frontend/src/pages/`
- Components: `frontend/src/components/` (to be created)
- Styles: `frontend/src/styles/`
- Store: `frontend/src/store/` (to be created)

### Configuration
- Docker: `docker-compose.yml`
- Nginx: `nginx/nginx.conf`
- Python: `backend/requirements.txt`
- Node: `frontend/package.json`

---

## API Endpoints (Available Now)

### Authentication
```
POST   /api/auth/login         - Login with email/password
POST   /api/auth/logout        - Logout (requires JWT)
GET    /api/auth/profile       - Get current user (requires JWT)
```

### Organizations
```
GET    /api/organizations      - List organizations
GET    /api/organizations/<id> - Get organization details
POST   /api/organizations      - Create organization
```

### Data Management
```
GET    /api/data/submissions   - List data submissions
POST   /api/data/submissions   - Create submission
POST   /api/data/records       - Upload data records
GET    /api/data/metrics       - List available metrics
```

### Reporting
```
GET    /api/reporting/dashboard        - Get dashboard KPIs & trends
POST   /api/reporting/generate/<framework> - Generate report (ISSB/JSE/GRI)
GET    /api/reporting/reports/<id>/download - Download report
GET    /api/reporting/aggregated       - Get aggregated partner data
```

### Health
```
GET    /health                 - Service health check
```

All endpoints return JSON. Protected endpoints require JWT token in header:
```
Authorization: Bearer <token>
```

---

## Next Steps (Phase C Features)

The following features are planned for Phase C (currently stubbed out):

- [ ] SME Onboarding Wizard (multi-step form)
- [ ] Enhanced Dashboard (real database queries)
- [ ] Report Generation (PDF, Excel, JSON)
- [ ] Data Upload (CSV, Excel)
- [ ] Distribution Partner Aggregation View
- [ ] Power BI Integration
- [ ] User Management & Roles
- [ ] Audit Logging

---

## Git Workflow

### Clone
```bash
git clone https://github.com/wearefullstack/Generic-ESG-platform.git
```

### Create Feature Branch
```bash
git checkout -b feature/dashboard-improvements
```

### Commit Changes
```bash
git add .
git commit -m "feat: improve dashboard responsiveness"
git push origin feature/dashboard-improvements
```

### Create Pull Request
Use GitHub UI to create PR, request reviews.

---

## Production Deployment

### Before Going Live

1. **Update environment variables** in `.env`:
   - Change `SECRET_KEY` and `JWT_SECRET_KEY`
   - Use managed PostgreSQL database
   - Set `FLASK_ENV=production`

2. **Database backup**:
   ```bash
   docker-compose exec postgres pg_dump -U esg_user esg_platform > backup.sql
   ```

3. **Docker image optimization**:
   - Use `docker-compose.prod.yml` (to be created)
   - Enable read-only filesystems where possible

4. **SSL/TLS certificates**:
   - Generate with Let's Encrypt
   - Store in `nginx/ssl/`

5. **Monitoring**:
   - Set up application monitoring
   - Configure log aggregation

---

## Support & Documentation

### Key Documents
- **BRIEF.md** - Project requirements & objectives
- **ARCHITECTURE.md** - Technical design & decisions
- **CLAUDE.md** - Development guide with tech stack details
- **METRICS.md** - Complete ESG metrics reference (50+ metrics)
- **README.md** - Quick reference
- **BOK_IMMUTABLE_INPUT_LOG.md** - Input tracking & design decisions

### Questions?
1. Check the documentation files above
2. Review Docker logs: `docker-compose logs -f`
3. Check database: `docker-compose exec postgres psql -U esg_user -d esg_platform`

---

## Project Status

✅ **Phase A: Architect & Assemble** - COMPLETE
- Docker stack scaffolding
- Database schema with multi-tenancy
- API scaffold with health checks
- Frontend login & dashboard
- Sample data for 3 tenants, 30 organizations

→ **Phase C: Code the Core** - IN PROGRESS
- Onboarding wizard
- Enhanced dashboard
- Report generation
- Data upload
- Aggregation views

---

## Team

**Project**: Generic-ESG-Platform SPACER
**Created by**: Full Stack Ground Control
**For**: Distribution Partners (WCPG, JSE, City of Cape Town)
**Timeline**: 2-3 day rapid prototype build

---

**Last Updated**: 2026-03-11
**Status**: Ready for use
**Version**: 0.1.0 (Phase A Complete)
