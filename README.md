# Generic-ESG-Platform

A white-labelled ESG and sustainability reporting platform for distribution partners (WCPG, JSE, City of Cape Town).

## Quick Start

### Prerequisites
- Docker and Docker Compose installed
- Git configured

### Setup

1. **Clone the repository** (already done):
```bash
cd Generic-ESG-platform
```

2. **Copy environment file**:
```bash
cp .env.example .env
```

3. **Build and start the stack**:
```bash
docker-compose up --build
```

This will start:
- **Nginx** (reverse proxy) on `http://localhost:80`
- **Flask API** on `http://localhost:5000` (via Nginx)
- **React Frontend** on `http://localhost:5173` (via Nginx)
- **PostgreSQL** database
- **Redis** cache

### Access the Application

- **Frontend**: http://localhost/
- **API Health**: http://localhost/health
- **API Docs**: http://localhost/api/ (endpoints available)

### Demo Login

The application comes with sample data pre-loaded. Use any email/password to login (demo mode):
- Email: `admin@wcpg.local`
- Password: `any`

### Stop the Application

```bash
docker-compose down
```

To also delete data volumes:
```bash
docker-compose down -v
```

## Project Structure

```
Generic-ESG-platform/
├── backend/                    # Flask API (Python)
│   ├── app/
│   │   ├── routes/           # API endpoints
│   │   └── __init__.py       # Flask app factory
│   ├── requirements.txt       # Python dependencies
│   ├── wsgi.py              # WSGI entry point
│   └── Dockerfile
├── frontend/                   # React App
│   ├── src/
│   │   ├── pages/           # Page components
│   │   ├── styles/          # CSS styles
│   │   └── App.jsx
│   ├── package.json
│   ├── vite.config.js
│   └── Dockerfile
├── database/
│   └── init/
│       ├── schema.sql       # PostgreSQL schema
│       └── sample_data.sql  # Sample ESG data
├── nginx/
│   ├── nginx.conf           # Reverse proxy config
│   └── Dockerfile
├── docker-compose.yml       # Service orchestration
├── BRIEF.md                 # Project requirements
├── ARCHITECTURE.md          # Technical design
├── CLAUDE.md                # Developer guide
├── METRICS.md               # ESG metrics reference
└── BOK_IMMUTABLE_INPUT_LOG.md  # Input tracking
```

## Architecture

### 4-Phase Process Flow
1. **Business Awareness & Onboarding**: Organizations register based on size tier
2. **Data Loading & Refinement**: Data collection and validation via forms/CSV/API
3. **Business Outputs**: Dashboard, reports, insights
4. **WCPG Aggregated View**: Province-wide emissions, policy data, compliance

### Tech Stack
- **Frontend**: React 18 + Vite + Chart.js
- **Backend**: Flask + Gunicorn + PostgreSQL
- **Infrastructure**: Docker Compose + Nginx
- **Database**: PostgreSQL 14+ with Row-Level Security
- **Cache**: Redis

## Sample Data

The database comes with realistic ESG data:
- **3 Distribution Partners** (Tenants): WCPG, JSE, City of Cape Town
- **30 Organizations** (10 per tenant): Realistic South African business names
- **12 months of data**: Apr 2023 - Mar 2024
- **~100+ Data Records**: Real ESG metrics (GHG, energy, water, waste, employees, safety, etc.)

## Key Features (MVP)

✅ **Multi-Tenant Architecture**: Organizations isolated by tenant_id using PostgreSQL RLS
✅ **White-Labelling**: Logo and colour customization per tenant
✅ **Role-Based Access Control**: Tenant admin, data manager, reporter, analyst, viewer
✅ **Dashboard**: Real-time KPI cards and 12-month trend charts
✅ **ESG Metrics**: ISSB/JSE-aligned metrics (50+ standard metrics)
✅ **Sample Organizations**: 30 organizations with realistic 12-month data
✅ **API-Ready**: RESTful API for future integrations

## Development

### Running Flask Tests
```bash
docker-compose exec backend pytest tests/ -v
```

### Running Frontend Tests
```bash
docker-compose exec frontend npm test
```

### Database Shell
```bash
docker-compose exec postgres psql -U esg_user -d esg_platform
```

### Backend Shell
```bash
docker-compose exec backend flask shell
```

## Customization

### Change Tenant Branding
Edit `database/init/sample_data.sql` to update:
- `tenants.primary_color`, `secondary_color`, `accent_color`
- `tenants.logo_url`
- `tenants.name` (distribution partner name)

### Add More Sample Data
Edit `database/init/sample_data.sql` to:
- Insert more organizations
- Add data submissions for additional months
- Add data records with different metrics

### Deploy to Production
Update `.env` file with:
- Real database credentials
- Real JWT secret keys
- Production database URL (managed PostgreSQL)
- Proper CORS origins

Then deploy:
```bash
docker-compose -f docker-compose.prod.yml up -d
```

## Documentation

- **BRIEF.md** - Project objectives and requirements
- **ARCHITECTURE.md** - Technical architecture and design decisions
- **CLAUDE.md** - Development guide with tech stack details
- **METRICS.md** - Complete ESG metrics reference (JSE/ISSB aligned)
- **BOK_IMMUTABLE_INPUT_LOG.md** - Record of all inputs and design decisions

## Support

For questions or issues:
1. Check the documentation files above
2. Review the API endpoints in `backend/app/routes/`
3. Check Docker logs: `docker-compose logs -f [service]`
4. Verify database: `docker-compose exec postgres psql -U esg_user -d esg_platform`

## Status: Phase A Complete ✅

- [x] Docker Compose configuration
- [x] PostgreSQL schema with multi-tenancy
- [x] Sample data (3 tenants, 30 orgs, 12 months metrics)
- [x] Flask API scaffold with health checks
- [x] React frontend with login and dashboard
- [x] Nginx reverse proxy configuration
- [x] Environment configuration

**Next**: Phase C - Code the Core Features
- Implement onboarding wizard
- Build dashboard with real data
- Create report generation
- Add aggregation views

---

**SPACER Status**: Phase A: Architect & Assemble ✅ COMPLETE
**Generated by**: Full Stack Ground Control
**For**: Distribution Partners (WCPG, JSE, City of Cape Town)
