# Generic-ESG-Platform: Technical Architecture

## System Overview

The Generic-ESG-Platform is a white-labelled, multi-tenant ESG and sustainability reporting system designed to enable businesses to report against ISSB (IFRS S1/S2) and JSE standards. The platform supports businesses of all sizes through a tiered onboarding approach and provides distribution partners with aggregated provincial/regional reporting capabilities.

### 4-Phase Architecture

```
┌─────────────────────────────┬──────────────────────────┬──────────────────┬───────────────────────┐
│ Phase 1: Awareness &        │ Phase 2: Data Loading    │ Phase 3: Business │ Phase 4: WCPG/Partner  │
│ Onboarding                  │ & Refinement             │ Outputs           │ Aggregation            │
├─────────────────────────────┼──────────────────────────┼──────────────────┼───────────────────────┤
│ • Marketing Channels        │ • Form-Based Entry       │ • Dashboards      │ • Multi-tenant DB      │
│ • Business Registration     │ • File Uploads           │ • Report Gen      │ • Data Aggregation     │
│ • Tier Selection (SME/Med)  │ • API Integration        │ • Analytics       │ • Provincial Dashboard │
│ • Secure Login              │ • Data Validation        │ • Insights        │ • Policy/Strategy View │
└─────────────────────────────┴──────────────────────────┴──────────────────┴───────────────────────┘
```

## Technology Stack (Recommended)

### Frontend
- **Framework**: React 18+ or Vue 3 (Vue recommended for rapid prototyping)
- **UI Library**: TailwindCSS or Material-UI
- **State Management**: Pinia (Vue) or Redux (React)
- **Data Visualization**: Chart.js, D3.js, or Apache ECharts
- **Authentication**: NextAuth.js or similar SSO integration

### Backend
- **Runtime**: Node.js 18+ (Express.js) or Python (FastAPI/Django)
- **API**: RESTful with OpenAPI/Swagger documentation
- **Job Queues**: Bull/Redis for async processing (data ingestion, report generation)
- **File Processing**: Multer (Node) for Excel/CSV upload handling

### Database
- **Primary**: PostgreSQL 14+ (multi-tenancy support with row-level security)
- **Caching**: Redis for session management and data caching
- **Search**: PostgreSQL full-text search or Elasticsearch for advanced analytics

### Infrastructure
- **Containerization**: Docker
- **Orchestration**: Docker Compose (dev), Kubernetes (production)
- **Web Server**: Nginx
- **Deployment**: AWS, Azure, or DigitalOcean

### Integration Partners
- **Power BI**: Report and dashboard generation
- **12C.IO**: Advanced carbon/satellite data (optional premium)
- **SSO Providers**: Azure AD, Google Workspace, Okta

---

## Core Modules

### 1. Tenant Management & Multi-Tenancy
**Purpose**: Enable distribution partners to have isolated instances with white-labelled branding

**Key Features**:
- Tenant provisioning and de-provisioning
- Logo/branding configuration (easy swap for demo purposes)
- Tenant-level feature toggles (SME-only, full Enterprise, etc.)
- Isolated data storage with Row-Level Security (RLS)
- Custom domain support (optional)

**Database Design**:
```sql
tenants (
  id UUID PRIMARY KEY,
  name VARCHAR,
  logo_url VARCHAR,
  primary_color VARCHAR,
  secondary_color VARCHAR,
  domain VARCHAR UNIQUE,
  status ENUM ('active', 'paused', 'archived'),
  config JSONB,  -- flexible tenant settings
  created_at TIMESTAMP,
  updated_at TIMESTAMP
)
```

### 2. User & Authentication Module
**Purpose**: Secure access with role-based control and SSO

**Key Features**:
- User registration and profile management
- Multi-factor authentication (MFA)
- Single Sign-On (SSO) integration
- Role-based access control (RBAC)
- Organization hierarchy (parent/child relationships)

**Core Roles**:
- `tenant_admin`: Distribution partner administrator
- `organization_admin`: Business administrator
- `data_manager`: Can upload/modify data
- `reporter`: Can view reports only
- `analyst`: Can create custom analyses
- `viewer`: Read-only access to specific modules

**Implementation**:
- OAuth 2.0 / OpenID Connect for SSO
- JWT tokens with refresh token rotation
- Session management via Redis

### 3. Business Onboarding Module
**Purpose**: Streamlined registration based on organization size

#### SME Onboarding (Small Business)
- **Wizard Interface**: Step-by-step questionnaires
- **Data Collection**:
  - Basic company information
  - Utility bills (energy, water consumption)
  - Waste disposal receipts
  - Employee headcount & basic HR data
  - File uploads (CSV, PDF, images)
- **Validation**: Format checking, completeness validation
- **No API Integration**: Manual form completion only

#### Medium Business Onboarding
- **Multi-framework Support**: Select reporting frameworks (ISSB, JSE, GRI)
- **Data Integration Options**:
  - Form-based entry (fallback)
  - CSV/Excel uploads
  - API integration for system-to-system data
- **Advanced Options**: Supplier engagement, subsidiary management
- **Validation Workflows**: Multi-step QA process before data acceptance

#### Large Enterprise Onboarding
- **Full API Integration**: Direct system connections
- **IoT Sensor Support**: Automatic data ingestion from meters
- **Supplier Integration**: Invite suppliers to report (supply-chain mapping)
- **Complex Hierarchies**: Support for multi-divisional structures
- **Custom Workflows**: Tailored data validation and approval chains

**Database Design**:
```sql
organizations (
  id UUID PRIMARY KEY,
  tenant_id UUID REFERENCES tenants,
  name VARCHAR NOT NULL,
  registration_number VARCHAR,
  size_tier ENUM ('small', 'medium', 'large'),
  industry_sector VARCHAR,
  geographic_region VARCHAR,
  fiscal_year_start DATE,  -- support for fiscal year != calendar year
  reporting_frameworks JSONB,  -- array of selected standards
  status ENUM ('onboarding', 'active', 'inactive'),
  created_at TIMESTAMP,
  UNIQUE(tenant_id, registration_number)
)

organization_hierarchy (
  id UUID PRIMARY KEY,
  organization_id UUID REFERENCES organizations,
  parent_id UUID REFERENCES organization_hierarchy,
  name VARCHAR,  -- division/subsidiary name
  level INT,
  path LTREE,  -- PostgreSQL LTREE for hierarchical queries
  created_at TIMESTAMP
)
```

### 4. Data Ingestion Engine
**Purpose**: Accept data from multiple sources and validate integrity

**Data Input Methods**:

1. **Form-Based Entry**
   - Dynamic form generation based on selected metrics
   - Real-time validation
   - Draft saving capability

2. **File Upload (CSV/Excel)**
   - Template-based uploads
   - Batch processing via job queue
   - Error reporting and recovery

3. **API Integration**
   - Webhook support for real-time data
   - OAuth 2.0 authentication for partner systems
   - Rate limiting and quota management
   - Data transformation via mapping rules

4. **IoT/Sensor Data**
   - Time-series data ingestion
   - Automatic aggregation (hourly, daily, monthly)
   - Anomaly detection alerts

**Validation Pipeline**:
```
Raw Data → Format Validation → Business Rules → Data Quality → Approved Data
            ↓
          Error Logging & User Notification
```

**Database Design**:
```sql
data_submissions (
  id UUID PRIMARY KEY,
  organization_id UUID REFERENCES organizations,
  submission_period DATE,  -- reporting period
  status ENUM ('draft', 'submitted', 'validated', 'approved', 'rejected'),
  submission_method ENUM ('form', 'csv', 'api', 'sensor'),
  created_at TIMESTAMP,
  submitted_at TIMESTAMP,
  approved_at TIMESTAMP
)

data_records (
  id UUID PRIMARY KEY,
  submission_id UUID REFERENCES data_submissions,
  metric_id UUID REFERENCES metrics,
  value NUMERIC,
  unit VARCHAR,
  data_quality_flag ENUM ('valid', 'estimated', 'incomplete'),
  source VARCHAR,  -- which source/system provided this
  created_at TIMESTAMP
)
```

### 5. Data Refinement & Quality Assurance
**Purpose**: Ensure data integrity before reporting

**Workflows**:
- **Hierarchical Data Management**: Consolidate subsidiary data into parent entity views
- **Quality Assurance Checks**:
  - Completeness (all required metrics present)
  - Consistency (data within expected ranges)
  - Accuracy (cross-validation with historical data)
  - Comparability (standards compliance)
- **Approval Workflows**: Multi-step approvals for large transactions
- **Audit Trail**: Full change history with user attribution

**Features**:
- Exception flagging with auto-notification
- Data reconciliation tools
- Manual review interface
- Version control on data records

### 6. Metrics & Calculations Engine
**Purpose**: Pre-built calculators for standard ESG metrics

**Pre-Built Calculators**:
```
Energy Intensity = Total Energy Consumption / Revenue or FTE
Water Intensity = Total Water Consumption / Revenue or Production Output
Carbon Intensity = Total GHG Emissions / Revenue or FTE

GHG Scope 1: Direct emissions (owned facilities, company vehicles)
GHG Scope 2: Indirect emissions (purchased electricity)
GHG Scope 3: Value chain emissions (suppliers, logistics, waste)
```

**Extensibility**:
- SQL-based stored procedures for custom metrics
- Formula engine for user-defined calculations
- Industry-specific metric libraries
- Automatic recalculation on data changes

**Implementation**:
```sql
metrics (
  id UUID PRIMARY KEY,
  code VARCHAR UNIQUE,  -- e.g., GHG_SCOPE1, ENERGY_INTENSITY
  name VARCHAR,
  category ENUM ('environmental', 'social', 'governance'),
  unit VARCHAR,
  formula TEXT,  -- SQL formula or reference
  required BOOLEAN,
  applicable_to_tiers ENUM[] ('small', 'medium', 'large'),
  standards JSONB,  -- ['ISSB_IFRS_S1', 'JSE', 'GRI']
  created_at TIMESTAMP
)

calculated_metrics (
  id UUID PRIMARY KEY,
  organization_id UUID REFERENCES organizations,
  metric_id UUID REFERENCES metrics,
  period_date DATE,
  calculated_value NUMERIC,
  calculation_method VARCHAR,
  last_calculated_at TIMESTAMP
)
```

### 7. Analysis & Reporting Module
**Purpose**: Generate compliant ESG reports and dashboards

**Dashboard Capabilities**:
- **Real-time KPI Tracking**: Current-year metrics vs. historical trends
- **Customizable Dashboards**: User-configured widgets
- **Benchmark Comparisons**: Industry averages, peer performance
- **Trend Analysis**: Time-series visualizations
- **Drill-down Capability**: Navigate from summary to detail

**Report Generation**:
- **Multi-standard Reports**:
  - ISSB/IFRS S1 & S2 aligned
  - JSE Sustainability Disclosure Guidance compliant
  - GRI Standards format (optional)
- **Report Types**:
  - Executive summary (1-2 pages)
  - Full sustainability report (20-40 pages)
  - Technical appendices with detailed data
- **Export Formats**:
  - PDF (styled, print-ready)
  - Excel (detailed data)
  - JSON (machine-readable)
  - Power BI (interactive dashboards)

**Power BI Integration**:
- Direct data source connection
- Pre-built report templates
- Interactive dashboard library
- Distribution partner branding in reports

### 8. Distribution Partner Aggregation Module
**Purpose**: Provincial/regional level insights for distribution partners

**WCPG/JSE Aggregation Features**:
- **Province-wide Emissions Inventory**: Rolled-up GHG emissions by sector
- **Business Insights**: Map of participating businesses and their ESG performance
- **Regulatory Compliance**: Track JSE listing requirements compliance rates
- **Investment Attraction**: Data-driven evidence for sustainable investment
- **Policy Support**: Evidence for policy making and intervention strategies
- **FOI Dashboard**: Public-facing sustainability metrics

**Access Control**:
- Tenant-wide data aggregation
- Privacy-preserving reporting (individual business names optional)
- Role-based view access
- Audit logging of all data access

---

## Data Model

### Core Entities

```
Tenants (Distribution Partners)
├── Organizations (Businesses)
│   ├── Organization_Hierarchy (Divisions, Subsidiaries)
│   ├── Users (with RBAC)
│   ├── Data_Submissions
│   │   └── Data_Records (individual metric values)
│   ├── Calculated_Metrics
│   ├── Reports
│   └── Dashboards (user-configured views)
└── Audit_Logs
```

### Multi-Tenancy Design
- **Row-Level Security (RLS)**: PostgreSQL policies enforce tenant isolation
- **Schema Approach**: Single schema, tenant_id in all tables
- **Query Isolation**: All queries filtered by authenticated user's tenant_id
- **Data Encryption**: Sensitive data encrypted at rest

---

## API Architecture

### Core Endpoints

**Authentication**
```
POST   /auth/register
POST   /auth/login
POST   /auth/logout
POST   /auth/refresh
GET    /auth/profile
POST   /auth/mfa/setup
```

**Onboarding**
```
POST   /organizations/register
GET    /organizations/{id}
PUT    /organizations/{id}
GET    /organizations/{id}/onboarding-status
```

**Data Submission**
```
POST   /submissions/create
GET    /submissions/{id}
POST   /submissions/{id}/upload  -- File upload
POST   /submissions/{id}/validate
POST   /submissions/{id}/approve
GET    /submissions/list?period={YYYY-MM}
```

**Data Management**
```
GET    /data/metrics  -- Available metrics
POST   /data/records  -- Submit individual records
GET    /data/records?period={YYYY-MM}&metric={code}
PUT    /data/records/{id}
DELETE /data/records/{id}
POST   /data/bulk-import  -- CSV/Excel import
```

**Reporting**
```
GET    /reports/generate/{framework}  -- Generate report (ISSB, JSE, GRI)
GET    /reports/{id}  -- Get generated report
GET    /reports/{id}/download?format=pdf|xlsx|json
GET    /dashboards/summary  -- Summary dashboard
GET    /dashboards/custom/{id}  -- Custom dashboard
POST   /dashboards/create  -- Create new dashboard
```

**Administration**
```
GET    /admin/organizations  -- List all organizations in tenant
GET    /admin/users  -- List users
POST   /admin/users  -- Create user
PUT    /admin/users/{id}/roles  -- Modify user roles
GET    /admin/audit-log  -- Audit trail
```

**Distribution Partner Aggregation**
```
GET    /partner/aggregated-data?metric={code}&period={YYYY-MM}
GET    /partner/emissions-inventory
GET    /partner/business-map
GET    /partner/compliance-status
GET    /partner/dashboard
```

### API Standards
- RESTful with JSON payloads
- OpenAPI 3.0 documentation
- JWT bearer token authentication
- Rate limiting (100 req/min per user)
- Request/response compression (gzip)

---

## Security Architecture

### Authentication & Authorization
- **SSO Integration**: Azure AD, Google Workspace, Okta
- **MFA**: TOTP (authenticator apps) as minimum
- **Session Management**: Redis-based with 24-hour expiry
- **Token Security**: JWT with 15-minute expiry, 7-day refresh token rotation

### Data Security
- **Encryption**: TLS 1.3 for all transport, AES-256 at rest for sensitive data
- **Row-Level Security**: PostgreSQL RLS policies enforce tenant isolation
- **Database Access**: Only through authenticated API (no direct DB access)
- **Audit Logging**: All data changes logged with user/timestamp

### Compliance
- **GDPR**: Right to deletion, data portability, consent management
- **POPIA**: South African POPIA compliance
- **SOC2**: Audit trail and access controls
- **ISO27001**: Information security management

---

## Deployment Architecture

### Development
```
Docker Compose (local machine)
├── Frontend (React/Vue dev server)
├── Backend API (Node/Python)
├── PostgreSQL
├── Redis
└── Nginx
```

### Production
```
Kubernetes Cluster
├── Frontend Pod (React/Vue static + Nginx)
├── API Pods (replicated, load-balanced)
├── Worker Pods (async jobs)
├── PostgreSQL (managed, HA setup)
├── Redis (managed)
└── S3/Blob Storage (file storage)
```

### CI/CD Pipeline
- **VCS**: GitHub
- **CI**: GitHub Actions
- **Testing**: Jest (unit), Cypress (e2e), pytest (API)
- **Linting**: ESLint, Black, Flake8
- **Security**: SAST (Snyk), dependency scanning
- **Deployment**: Helm charts to Kubernetes

---

## Scalability Considerations

### Horizontal Scaling
- **Stateless API**: Multiple instances behind load balancer
- **Database**: Connection pooling (pgBouncer)
- **Cache**: Redis cluster for distributed caching
- **Jobs**: Bull queue for async task processing

### Vertical Scaling
- **Large File Processing**: Stream-based CSV/Excel parsing
- **Report Generation**: Async job queue with background workers
- **Data Aggregation**: Materialized views for complex queries

### Performance
- **Caching Strategy**: Redis cache for frequently accessed data (metrics, reports)
- **Query Optimization**: Indexes on tenant_id, organization_id, period_date
- **Database**: Partitioning by date for large data_records table
- **Frontend**: Code splitting, lazy loading, image optimization

---

## Integration Patterns

### Data Source Integration
1. **CSV/Excel**: Template-based, batch processing
2. **REST API**: Webhook receivers, polling for external systems
3. **IoT Sensors**: MQTT/HTTP ingest, time-series aggregation
4. **SSO Providers**: OAuth 2.0 federation

### Output Integration
1. **Power BI**: Direct SQL data connector or API data export
2. **Email Distribution**: Scheduled report delivery
3. **Webhook Events**: Publish events for external subscribers
4. **Data Export**: APIs for bulk data extraction

---

## Development Workflow

### Code Organization
```
generic-esg-platform/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── store/
│   │   └── api/
│   └── package.json
├── backend/
│   ├── src/
│   │   ├── routes/
│   │   ├── controllers/
│   │   ├── services/
│   │   ├── models/
│   │   └── middleware/
│   ├── migrations/
│   └── package.json
├── docker-compose.yml
├── BRIEF.md
├── ARCHITECTURE.md
└── README.md
```

### Key Decisions
1. **Monorepo Structure**: Single repo with frontend/backend folders
2. **Database Migrations**: Flyway or Alembic for version control
3. **Seed Data**: Sample tenants, organizations, metrics in dev environment
4. **Feature Flags**: LaunchDarkly or similar for A/B testing and rollouts

---

## Success Metrics
- **Onboarding Time**: <5 minutes for SME, <1 hour for Medium/Large
- **Report Generation**: <5 seconds for full report PDF
- **API Response Time**: <200ms for 95th percentile
- **System Uptime**: 99.9% availability
- **Data Accuracy**: 100% validation compliance
