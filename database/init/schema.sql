-- Generic ESG Platform - Database Schema
-- PostgreSQL 14+ with Row-Level Security for multi-tenancy

CREATE EXTENSION IF NOT EXISTS pgcrypto;
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================================================
-- 1. TENANTS (Distribution Partners)
-- ============================================================================
CREATE TABLE IF NOT EXISTS tenants (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL UNIQUE,
    primary_color VARCHAR(7) DEFAULT '#1e40af',
    secondary_color VARCHAR(7) DEFAULT '#059669',
    accent_color VARCHAR(7) DEFAULT '#f59e0b',
    logo_url VARCHAR(512),
    domain VARCHAR(255) UNIQUE,
    status VARCHAR(50) DEFAULT 'active' CHECK (status IN ('active', 'paused', 'archived')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

COMMENT ON TABLE tenants IS 'Distribution partners: WCPG, JSE, City of Cape Town, etc.';
CREATE INDEX idx_tenants_domain ON tenants(domain);

-- ============================================================================
-- 2. ORGANIZATIONS (Businesses)
-- ============================================================================
CREATE TABLE IF NOT EXISTS organizations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    registration_number VARCHAR(50),
    size_tier VARCHAR(20) NOT NULL CHECK (size_tier IN ('small', 'medium', 'large')),
    industry_sector VARCHAR(100),
    geographic_region VARCHAR(100),
    fiscal_year_start DATE,
    reporting_frameworks JSONB DEFAULT '["ISSB", "JSE"]'::jsonb,
    status VARCHAR(50) DEFAULT 'onboarding' CHECK (status IN ('onboarding', 'active', 'inactive')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(tenant_id, registration_number)
);

COMMENT ON TABLE organizations IS 'Businesses registered with distribution partners';
CREATE INDEX idx_organizations_tenant ON organizations(tenant_id);
CREATE INDEX idx_organizations_size_tier ON organizations(size_tier);
CREATE INDEX idx_organizations_status ON organizations(status);

-- ============================================================================
-- 3. USERS
-- ============================================================================
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
    email VARCHAR(255) NOT NULL,
    password_hash VARCHAR(255),
    full_name VARCHAR(255),
    role VARCHAR(50) DEFAULT 'reporter' CHECK (role IN ('tenant_admin', 'organization_admin', 'data_manager', 'reporter', 'analyst', 'viewer')),
    organization_id UUID REFERENCES organizations(id) ON DELETE SET NULL,
    is_active BOOLEAN DEFAULT true,
    last_login TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(tenant_id, email)
);

COMMENT ON TABLE users IS 'Platform users with role-based access control';
CREATE INDEX idx_users_tenant ON users(tenant_id);
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_organization ON users(organization_id);

-- ============================================================================
-- 4. METRICS (ESG Metrics Definition)
-- ============================================================================
CREATE TABLE IF NOT EXISTS metrics (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    code VARCHAR(100) NOT NULL UNIQUE,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    category VARCHAR(50) NOT NULL CHECK (category IN ('governance', 'social', 'environmental')),
    unit VARCHAR(50),
    formula TEXT,
    required_for_tiers JSONB DEFAULT '["small", "medium", "large"]'::jsonb,
    standards JSONB DEFAULT '["ISSB", "JSE"]'::jsonb,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

COMMENT ON TABLE metrics IS 'JSE/ISSB-aligned ESG metrics catalogue';
CREATE INDEX idx_metrics_code ON metrics(code);
CREATE INDEX idx_metrics_category ON metrics(category);

-- ============================================================================
-- 5. DATA SUBMISSIONS (Period-based reporting)
-- ============================================================================
CREATE TABLE IF NOT EXISTS data_submissions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
    organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
    submission_period DATE NOT NULL,
    period_start DATE,
    period_end DATE,
    status VARCHAR(50) DEFAULT 'draft' CHECK (status IN ('draft', 'submitted', 'validated', 'approved', 'rejected')),
    submission_method VARCHAR(50) DEFAULT 'form' CHECK (submission_method IN ('form', 'csv', 'api', 'sensor')),
    created_by UUID REFERENCES users(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    submitted_at TIMESTAMP,
    validated_at TIMESTAMP,
    approved_at TIMESTAMP,
    rejection_reason TEXT
);

COMMENT ON TABLE data_submissions IS 'ESG data submissions grouped by fiscal period';
CREATE INDEX idx_submissions_org ON data_submissions(organization_id);
CREATE INDEX idx_submissions_tenant ON data_submissions(tenant_id);
CREATE INDEX idx_submissions_period ON data_submissions(submission_period);
CREATE INDEX idx_submissions_status ON data_submissions(status);

-- ============================================================================
-- 6. DATA RECORDS (Individual metric values)
-- ============================================================================
CREATE TABLE IF NOT EXISTS data_records (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    submission_id UUID NOT NULL REFERENCES data_submissions(id) ON DELETE CASCADE,
    metric_id UUID NOT NULL REFERENCES metrics(id) ON DELETE RESTRICT,
    organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
    value NUMERIC(18, 2),
    unit VARCHAR(50),
    data_quality_flag VARCHAR(50) DEFAULT 'valid' CHECK (data_quality_flag IN ('valid', 'estimated', 'incomplete', 'outlier')),
    source VARCHAR(255),
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

COMMENT ON TABLE data_records IS 'Individual ESG metric values for a submission';
CREATE INDEX idx_records_submission ON data_records(submission_id);
CREATE INDEX idx_records_metric ON data_records(metric_id);
CREATE INDEX idx_records_organization ON data_records(organization_id);
CREATE INDEX idx_records_quality_flag ON data_records(data_quality_flag);

-- ============================================================================
-- 7. CALCULATED METRICS (Pre-computed intensity calculations)
-- ============================================================================
CREATE TABLE IF NOT EXISTS calculated_metrics (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
    submission_id UUID REFERENCES data_submissions(id) ON DELETE SET NULL,
    metric_id UUID NOT NULL REFERENCES metrics(id) ON DELETE CASCADE,
    period_date DATE NOT NULL,
    calculated_value NUMERIC(18, 4),
    calculation_method VARCHAR(255),
    last_calculated_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

COMMENT ON TABLE calculated_metrics IS 'Pre-calculated intensity metrics (e.g., GHG per FTE)';
CREATE INDEX idx_calculated_org ON calculated_metrics(organization_id);
CREATE INDEX idx_calculated_metric ON calculated_metrics(metric_id);
CREATE INDEX idx_calculated_period ON calculated_metrics(period_date);

-- ============================================================================
-- 8. AUDIT LOG
-- ============================================================================
CREATE TABLE IF NOT EXISTS audit_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
    user_id UUID REFERENCES users(id) ON DELETE SET NULL,
    entity_type VARCHAR(100),
    entity_id VARCHAR(100),
    action VARCHAR(50) CHECK (action IN ('create', 'read', 'update', 'delete', 'approve', 'reject')),
    changes JSONB,
    ip_address VARCHAR(45),
    user_agent TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

COMMENT ON TABLE audit_logs IS 'Audit trail of all user actions';
CREATE INDEX idx_audit_tenant ON audit_logs(tenant_id);
CREATE INDEX idx_audit_user ON audit_logs(user_id);
CREATE INDEX idx_audit_entity ON audit_logs(entity_type, entity_id);
CREATE INDEX idx_audit_timestamp ON audit_logs(created_at);

-- ============================================================================
-- ROW-LEVEL SECURITY (Multi-tenancy enforcement)
-- ============================================================================

-- Enable RLS on all tables
ALTER TABLE tenants ENABLE ROW LEVEL SECURITY;
ALTER TABLE organizations ENABLE ROW LEVEL SECURITY;
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE data_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE data_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE calculated_metrics ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;

-- RLS Policy: Users can only see their own tenant's data
CREATE POLICY tenant_isolation ON organizations
    FOR ALL USING (tenant_id = current_setting('app.current_tenant_id')::uuid);

CREATE POLICY tenant_isolation_users ON users
    FOR ALL USING (tenant_id = current_setting('app.current_tenant_id')::uuid);

CREATE POLICY tenant_isolation_submissions ON data_submissions
    FOR ALL USING (tenant_id = current_setting('app.current_tenant_id')::uuid);

CREATE POLICY tenant_isolation_records ON data_records
    FOR ALL USING (
        organization_id IN (
            SELECT id FROM organizations
            WHERE tenant_id = current_setting('app.current_tenant_id')::uuid
        )
    );

CREATE POLICY tenant_isolation_calculated ON calculated_metrics
    FOR ALL USING (
        organization_id IN (
            SELECT id FROM organizations
            WHERE tenant_id = current_setting('app.current_tenant_id')::uuid
        )
    );

CREATE POLICY tenant_isolation_audit ON audit_logs
    FOR ALL USING (tenant_id = current_setting('app.current_tenant_id')::uuid);

-- ============================================================================
-- CORE ESG METRICS SEED DATA
-- ============================================================================

INSERT INTO metrics (code, name, description, category, unit, required_for_tiers, standards) VALUES
    -- GOVERNANCE
    ('BOARD_TOTAL_MEMBERS', 'Total Board Members', 'Number of board members', 'governance', 'count', '["small", "medium", "large"]', '["ISSB", "JSE"]'),
    ('BOARD_INDEPENDENT_PCT', 'Independent Board Members %', 'Percentage of independent board members', 'governance', '%', '["medium", "large"]', '["ISSB", "JSE"]'),
    ('BOARD_FEMALE_PCT', 'Female Board Representation', 'Percentage of female board members', 'governance', '%', '["medium", "large"]', '["JSE"]'),
    ('CORRUPTION_INCIDENTS', 'Corruption Incidents', 'Number of corruption incidents reported', 'governance', 'count', '["small", "medium", "large"]', '["ISSB", "JSE"]'),
    ('COMPLIANCE_BREACHES', 'Regulatory Compliance Breaches', 'Number of regulatory compliance breaches', 'governance', 'count', '["small", "medium", "large"]', '["ISSB", "JSE"]'),
    ('ETHICS_CODE_EXISTS', 'Code of Ethics Exists', 'Organization has established code of ethics', 'governance', 'boolean', '["small", "medium", "large"]', '["ISSB", "JSE"]'),

    -- SOCIAL
    ('EMPLOYEES_TOTAL', 'Total Employees', 'Total number of FTE employees', 'social', 'FTE', '["small", "medium", "large"]', '["ISSB", "JSE"]'),
    ('EMPLOYEES_FEMALE_PCT', 'Female Employee %', 'Percentage of female employees', 'social', '%', '["medium", "large"]', '["JSE"]'),
    ('EMPLOYEE_TURNOVER_PCT', 'Employee Turnover Rate', 'Annual employee turnover percentage', 'social', '%', '["medium", "large"]', '["ISSB", "JSE"]'),
    ('LTIFR', 'Lost Time Injury Frequency Rate', 'LTIFR per 1 million hours worked', 'social', 'rate/1M hrs', '["small", "medium", "large"]', '["ISSB", "JSE"]'),
    ('RECORDABLE_INJURIES', 'Recordable Injuries', 'Number of recordable workplace injuries', 'social', 'count', '["medium", "large"]', '["JSE"]'),
    ('WORK_FATALITIES', 'Work-Related Fatalities', 'Number of work-related fatalities', 'social', 'count', '["small", "medium", "large"]', '["ISSB", "JSE"]'),
    ('ENTRY_LEVEL_WAGE', 'Entry Level Wage', 'Entry-level wage for lowest employment category', 'social', 'currency', '["medium", "large"]', '["JSE"]'),
    ('HEALTH_SAFETY_TRAINING_HRS', 'Health & Safety Training Hours', 'Health and safety training hours per employee', 'social', 'hours', '["medium", "large"]', '["JSE"]'),

    -- ENVIRONMENTAL
    ('GHG_SCOPE_1', 'GHG Scope 1 Emissions', 'Scope 1 direct GHG emissions', 'environmental', 'tCO2e', '["small", "medium", "large"]', '["ISSB", "JSE"]'),
    ('GHG_SCOPE_2_LOCATION', 'GHG Scope 2 Emissions (Location-based)', 'Scope 2 indirect emissions - location-based', 'environmental', 'tCO2e', '["small", "medium", "large"]', '["ISSB", "JSE"]'),
    ('GHG_SCOPE_2_MARKET', 'GHG Scope 2 Emissions (Market-based)', 'Scope 2 indirect emissions - market-based', 'environmental', 'tCO2e', '["medium", "large"]', '["ISSB", "JSE"]'),
    ('GHG_SCOPE_3_TOTAL', 'GHG Scope 3 Emissions (Value Chain)', 'Scope 3 value chain emissions', 'environmental', 'tCO2e', '["medium", "large"]', '["ISSB", "JSE"]'),
    ('GHG_TOTAL_EMISSIONS', 'Total GHG Emissions', 'Total GHG (Scope 1 + 2 + 3)', 'environmental', 'tCO2e', '["medium", "large"]', '["ISSB", "JSE"]'),
    ('GHG_INTENSITY_REVENUE', 'GHG Intensity (per Revenue)', 'tCO2e per unit revenue', 'environmental', 'tCO2e/R', '["small", "medium", "large"]', '["ISSB", "JSE"]'),
    ('GHG_INTENSITY_FTE', 'GHG Intensity (per FTE)', 'tCO2e per employee', 'environmental', 'tCO2e/FTE', '["small", "medium", "large"]', '["ISSB", "JSE"]'),
    ('ENERGY_TOTAL_MWH', 'Total Energy Consumption', 'Total energy consumption in MWh', 'environmental', 'MWh', '["small", "medium", "large"]', '["ISSB", "JSE"]'),
    ('ENERGY_RENEWABLE_PCT', 'Renewable Energy %', 'Percentage of renewable energy used', 'environmental', '%', '["small", "medium", "large"]', '["ISSB", "JSE"]'),
    ('ENERGY_INTENSITY_REVENUE', 'Energy Intensity (per Revenue)', 'MWh per unit revenue', 'environmental', 'MWh/R', '["small", "medium", "large"]', '["ISSB", "JSE"]'),
    ('WATER_CONSUMPTION_M3', 'Total Water Consumption', 'Total water consumption in cubic meters', 'environmental', 'm³', '["small", "medium", "large"]', '["ISSB", "JSE"]'),
    ('WATER_RECYCLED_PCT', 'Water Recycled %', 'Percentage of water recycled/reused', 'environmental', '%', '["medium", "large"]', '["JSE"]'),
    ('WATER_INTENSITY_REVENUE', 'Water Intensity (per Revenue)', 'm³ per unit revenue', 'environmental', 'm³/R', '["small", "medium", "large"]', '["ISSB", "JSE"]'),
    ('WASTE_TOTAL_TONNES', 'Total Waste Generated', 'Total waste generated in tonnes', 'environmental', 'tonnes', '["small", "medium", "large"]', '["ISSB", "JSE"]'),
    ('WASTE_RECYCLED_PCT', 'Waste Recycled %', 'Percentage of waste recycled', 'environmental', '%', '["small", "medium", "large"]', '["ISSB", "JSE"]'),
    ('WASTE_HAZARDOUS_TONNES', 'Hazardous Waste', 'Hazardous waste in tonnes', 'environmental', 'tonnes', '["medium", "large"]', '["JSE"]'),
    ('WASTE_INTENSITY_REVENUE', 'Waste Intensity (per Revenue)', 'Tonnes per unit revenue', 'environmental', 'tonnes/R', '["small", "medium", "large"]', '["ISSB", "JSE"]'),
    ('BIODIVERSITY_ASSESSMENT_EXISTS', 'Biodiversity Assessment Conducted', 'Organization has conducted biodiversity assessment', 'environmental', 'boolean', '["large"]', '["JSE"]'),
    ('SUPPLIERS_AUDITED_COUNT', 'Suppliers Audited', 'Number of suppliers audited on standards', 'environmental', 'count', '["medium", "large"]', '["JSE"]')
ON CONFLICT (code) DO NOTHING;

COMMENT ON TABLE metrics IS 'Core ESG metrics aligned with ISSB, JSE, and GRI standards';

-- ============================================================================
-- CREATE FUNCTIONS FOR MAINTENANCE
-- ============================================================================

-- Function to set tenant context for RLS
CREATE OR REPLACE FUNCTION set_tenant_context(tenant_id uuid)
RETURNS void AS $$
BEGIN
    PERFORM set_config('app.current_tenant_id', tenant_id::text, false);
END;
$$ LANGUAGE plpgsql;

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Add triggers for updated_at
CREATE TRIGGER update_tenants_timestamp BEFORE UPDATE ON tenants
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_organizations_timestamp BEFORE UPDATE ON organizations
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_users_timestamp BEFORE UPDATE ON users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_data_records_timestamp BEFORE UPDATE ON data_records
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================================================
-- GRANT PERMISSIONS
-- ============================================================================

GRANT USAGE ON SCHEMA public TO esg_user;
GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public TO esg_user;
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO esg_user;
GRANT EXECUTE ON ALL FUNCTIONS IN SCHEMA public TO esg_user;
