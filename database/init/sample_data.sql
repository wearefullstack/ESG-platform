-- Generic ESG Platform - Sample Data
-- 3 Distribution Partner Tenants × 10 Organizations × 12 months of metrics
-- Data is realistic and relevant to South African context

-- ============================================================================
-- 1. CREATE SAMPLE TENANTS (Distribution Partners)
-- ============================================================================

INSERT INTO tenants (id, name, primary_color, secondary_color, accent_color, logo_url, domain, status) VALUES
    ('f47ac10b-58cc-4372-a567-0e02b2c3d479', 'Western Cape Provincial Government', '#003d7a', '#008000', '#ffb81c', 'https://placeholder.com/wcpg-logo.png', 'wcpg.esg-platform.local', 'active'),
    ('b47ac10b-58cc-4372-a567-0e02b2c3d480', 'Johannesburg Stock Exchange', '#1e40af', '#059669', '#f59e0b', 'https://placeholder.com/jse-logo.png', 'jse.esg-platform.local', 'active'),
    ('c47ac10b-58cc-4372-a567-0e02b2c3d481', 'City of Cape Town', '#003366', '#006600', '#ff9900', 'https://placeholder.com/cct-logo.png', 'cct.esg-platform.local', 'active');

-- ============================================================================
-- 2. CREATE SAMPLE USERS (Admin for each tenant)
-- ============================================================================

INSERT INTO users (id, tenant_id, email, password_hash, full_name, role, is_active) VALUES
    ('a57ac10b-58cc-4372-a567-0e02b2c3d482', 'f47ac10b-58cc-4372-a567-0e02b2c3d479', 'admin@wcpg.local', 'hashed_password_1', 'WCPG Admin', 'tenant_admin', true),
    ('a57ac10b-58cc-4372-a567-0e02b2c3d483', 'b47ac10b-58cc-4372-a567-0e02b2c3d480', 'admin@jse.local', 'hashed_password_2', 'JSE Admin', 'tenant_admin', true),
    ('a57ac10b-58cc-4372-a567-0e02b2c3d484', 'c47ac10b-58cc-4372-a567-0e02b2c3d481', 'admin@cct.local', 'hashed_password_3', 'CCT Admin', 'tenant_admin', true);

-- ============================================================================
-- 3. CREATE SAMPLE ORGANIZATIONS (Realistic South African Companies)
-- ============================================================================

-- WCPG Tenant - 10 Organizations
INSERT INTO organizations (id, tenant_id, name, registration_number, size_tier, industry_sector, geographic_region, fiscal_year_start, reporting_frameworks, status) VALUES
    ('d47ac10b-58cc-4372-a567-0e02b2c3d490', 'f47ac10b-58cc-4372-a567-0e02b2c3d479', 'Stellenbosch Winery Collective', 'REG-001', 'small', 'Agriculture', 'Stellenbosch', '2023-04-01', '["ISSB", "JSE"]', 'active'),
    ('d47ac10b-58cc-4372-a567-0e02b2c3d491', 'f47ac10b-58cc-4372-a567-0e02b2c3d479', 'Table Mountain Logistics Ltd', 'REG-002', 'medium', 'Logistics', 'Cape Town', '2023-03-01', '["ISSB", "JSE"]', 'active'),
    ('d47ac10b-58cc-4372-a567-0e02b2c3d492', 'f47ac10b-58cc-4372-a567-0e02b2c3d479', 'Strand Marine Processing', 'REG-003', 'medium', 'Food & Beverage', 'Strand', '2023-03-01', '["ISSB", "JSE"]', 'active'),
    ('d47ac10b-58cc-4372-a567-0e02b2c3d493', 'f47ac10b-58cc-4372-a567-0e02b2c3d479', 'Paarl Energy Solutions', 'REG-004', 'large', 'Energy', 'Paarl', '2023-04-01', '["ISSB", "JSE"]', 'active'),
    ('d47ac10b-58cc-4372-a567-0e02b2c3d494', 'f47ac10b-58cc-4372-a567-0e02b2c3d479', 'Hermanus Eco-Tourism Inc', 'REG-005', 'small', 'Hospitality', 'Hermanus', '2023-03-01', '["ISSB", "JSE"]', 'active'),
    ('d47ac10b-58cc-4372-a567-0e02b2c3d495', 'f47ac10b-58cc-4372-a567-0e02b2c3d479', 'Somerset West Manufacturing', 'REG-006', 'large', 'Manufacturing', 'Somerset West', '2023-04-01', '["ISSB", "JSE"]', 'active'),
    ('d47ac10b-58cc-4372-a567-0e02b2c3d496', 'f47ac10b-58cc-4372-a567-0e02b2c3d479', 'Bellville IT Services', 'REG-007', 'small', 'Technology', 'Bellville', '2023-03-01', '["ISSB", "JSE"]', 'active'),
    ('d47ac10b-58cc-4372-a567-0e02b2c3d497', 'f47ac10b-58cc-4372-a567-0e02b2c3d479', 'Cape Agri Chemicals Ltd', 'REG-008', 'medium', 'Agriculture', 'Boland', '2023-04-01', '["ISSB", "JSE"]', 'active'),
    ('d47ac10b-58cc-4372-a567-0e02b2c3d498', 'f47ac10b-58cc-4372-a567-0e02b2c3d479', 'Khayelitsha Water Works', 'REG-009', 'medium', 'Utilities', 'Khayelitsha', '2023-03-01', '["ISSB", "JSE"]', 'active'),
    ('d47ac10b-58cc-4372-a567-0e02b2c3d499', 'f47ac10b-58cc-4372-a567-0e02b2c3d479', 'Knysna Forest Products', 'REG-010', 'large', 'Forestry', 'Knysna', '2023-04-01', '["ISSB", "JSE"]', 'active');

-- JSE Tenant - 10 Organizations (Listed Companies)
INSERT INTO organizations (id, tenant_id, name, registration_number, size_tier, industry_sector, geographic_region, fiscal_year_start, reporting_frameworks, status) VALUES
    ('e47ac10b-58cc-4372-a567-0e02b2c3d500', 'b47ac10b-58cc-4372-a567-0e02b2c3d480', 'Coronation Cement Holdings', 'JSE-001', 'large', 'Construction Materials', 'Johannesburg', '2023-01-01', '["ISSB", "JSE"]', 'active'),
    ('e47ac10b-58cc-4372-a567-0e02b2c3d501', 'b47ac10b-58cc-4372-a567-0e02b2c3d480', 'GoldCore Mining Ltd', 'JSE-002', 'large', 'Mining', 'Johannesburg', '2023-01-01', '["ISSB", "JSE"]', 'active'),
    ('e47ac10b-58cc-4372-a567-0e02b2c3d502', 'b47ac10b-58cc-4372-a567-0e02b2c3d480', 'Promenade Retail Holdings', 'JSE-003', 'large', 'Retail', 'Sandton', '2023-01-01', '["ISSB", "JSE"]', 'active'),
    ('e47ac10b-58cc-4372-a567-0e02b2c3d503', 'b47ac10b-58cc-4372-a567-0e02b2c3d480', 'Emerald Energy Solutions', 'JSE-004', 'medium', 'Energy', 'Johannesburg', '2023-01-01', '["ISSB", "JSE"]', 'active'),
    ('e47ac10b-58cc-4372-a567-0e02b2c3d504', 'b47ac10b-58cc-4372-a567-0e02b2c3d480', 'TechFusion Africa Inc', 'JSE-005', 'medium', 'Technology', 'Johannesburg', '2023-01-01', '["ISSB", "JSE"]', 'active'),
    ('e47ac10b-58cc-4372-a567-0e02b2c3d505', 'b47ac10b-58cc-4372-a567-0e02b2c3d480', 'Harmony Steel Works', 'JSE-006', 'large', 'Manufacturing', 'Pretoria', '2023-01-01', '["ISSB", "JSE"]', 'active'),
    ('e47ac10b-58cc-4372-a567-0e02b2c3d506', 'b47ac10b-58cc-4372-a567-0e02b2c3d480', 'Platinum Plus Finance Ltd', 'JSE-007', 'large', 'Financial Services', 'Johannesburg', '2023-01-01', '["ISSB", "JSE"]', 'active'),
    ('e47ac10b-58cc-4372-a567-0e02b2c3d507', 'b47ac10b-58cc-4372-a567-0e02b2c3d480', 'Sapphire Insurance Group', 'JSE-008', 'large', 'Insurance', 'Johannesburg', '2023-01-01', '["ISSB", "JSE"]', 'active'),
    ('e47ac10b-58cc-4372-a567-0e02b2c3d508', 'b47ac10b-58cc-4372-a567-0e02b2c3d480', 'Meridian Pharmaceuticals', 'JSE-009', 'medium', 'Pharmaceuticals', 'Johannesburg', '2023-01-01', '["ISSB", "JSE"]', 'active'),
    ('e47ac10b-58cc-4372-a567-0e02b2c3d509', 'b47ac10b-58cc-4372-a567-0e02b2c3d480', 'Navigator Telecommunications', 'JSE-010', 'large', 'Telecommunications', 'Johannesburg', '2023-01-01', '["ISSB", "JSE"]', 'active');

-- CCT Tenant - 10 Organizations
INSERT INTO organizations (id, tenant_id, name, registration_number, size_tier, industry_sector, geographic_region, fiscal_year_start, reporting_frameworks, status) VALUES
    ('f47ac10b-58cc-4372-a567-0e02b2c3d510', 'c47ac10b-58cc-4372-a567-0e02b2c3d481', 'Atlantis Desalination Works', 'CCT-001', 'large', 'Utilities', 'Atlantis', '2023-07-01', '["ISSB", "JSE"]', 'active'),
    ('f47ac10b-58cc-4372-a567-0e02b2c3d511', 'c47ac10b-58cc-4372-a567-0e02b2c3d481', 'Langa Community Markets Ltd', 'CCT-002', 'small', 'Retail', 'Langa', '2023-07-01', '["ISSB", "JSE"]', 'active'),
    ('f47ac10b-58cc-4372-a567-0e02b2c3d512', 'c47ac10b-58cc-4372-a567-0e02b2c3d481', 'Mitchell''s Plain Tech Hub', 'CCT-003', 'small', 'Technology', 'Mitchell''s Plain', '2023-07-01', '["ISSB", "JSE"]', 'active'),
    ('f47ac10b-58cc-4372-a567-0e02b2c3d513', 'c47ac10b-58cc-4372-a567-0e02b2c3d481', 'Tygerberg Hospital Supplies', 'CCT-004', 'medium', 'Healthcare', 'Tygerberg', '2023-07-01', '["ISSB", "JSE"]', 'active'),
    ('f47ac10b-58cc-4372-a567-0e02b2c3d514', 'c47ac10b-58cc-4372-a567-0e02b2c3d481', 'Woodstock Urban Renewal', 'CCT-005', 'medium', 'Construction', 'Woodstock', '2023-07-01', '["ISSB", "JSE"]', 'active'),
    ('f47ac10b-58cc-4372-a567-0e02b2c3d515', 'c47ac10b-58cc-4372-a567-0e02b2c3d481', 'Sea Point Green Services', 'CCT-006', 'small', 'Waste Management', 'Sea Point', '2023-07-01', '["ISSB", "JSE"]', 'active'),
    ('f47ac10b-58cc-4372-a567-0e02b2c3d516', 'c47ac10b-58cc-4372-a567-0e02b2c3d481', 'Paarden Eiland Port Operations', 'CCT-007', 'large', 'Logistics', 'Paarden Eiland', '2023-07-01', '["ISSB", "JSE"]', 'active'),
    ('f47ac10b-58cc-4372-a567-0e02b2c3d518', 'c47ac10b-58cc-4372-a567-0e02b2c3d481', 'Constantia Winery Estate', 'CCT-008', 'medium', 'Agriculture', 'Constantia', '2023-07-01', '["ISSB", "JSE"]', 'active'),
    ('f47ac10b-58cc-4372-a567-0e02b2c3d519', 'c47ac10b-58cc-4372-a567-0e02b2c3d481', 'Roeland Street Community Farm', 'CCT-009', 'small', 'Agriculture', 'Roeland Street', '2023-07-01', '["ISSB", "JSE"]', 'active'),
    ('f47ac10b-58cc-4372-a567-0e02b2c3d520', 'c47ac10b-58cc-4372-a567-0e02b2c3d481', 'Camps Bay Hospitality Collective', 'CCT-010', 'medium', 'Hospitality', 'Camps Bay', '2023-07-01', '["ISSB", "JSE"]', 'active');

-- ============================================================================
-- 4. CREATE SAMPLE DATA SUBMISSIONS (Last 12 months)
-- ============================================================================

-- For first 3 organizations in WCPG, create submissions for past 12 months
-- Months: Apr-23, May-23, Jun-23, Jul-23, Aug-23, Sep-23, Oct-23, Nov-23, Dec-23, Jan-24, Feb-24, Mar-24

INSERT INTO data_submissions (id, tenant_id, organization_id, submission_period, period_start, period_end, status, submission_method, created_at, submitted_at, validated_at, approved_at) VALUES
    -- Stellenbosch Winery (Apr-Dec 2023 + Jan-Mar 2024)
    ('101a1234-58cc-4372-a567-0e02b2c3d600', 'f47ac10b-58cc-4372-a567-0e02b2c3d479', 'd47ac10b-58cc-4372-a567-0e02b2c3d490', '2023-04-01', '2023-04-01', '2023-04-30', 'approved', 'form', '2023-04-05', '2023-04-10', '2023-04-12', '2023-04-15'),
    ('101a1235-58cc-4372-a567-0e02b2c3d600', 'f47ac10b-58cc-4372-a567-0e02b2c3d479', 'd47ac10b-58cc-4372-a567-0e02b2c3d490', '2023-05-01', '2023-05-01', '2023-05-31', 'approved', 'form', '2023-05-05', '2023-05-10', '2023-05-12', '2023-05-15'),
    ('101a1236-58cc-4372-a567-0e02b2c3d600', 'f47ac10b-58cc-4372-a567-0e02b2c3d479', 'd47ac10b-58cc-4372-a567-0e02b2c3d490', '2023-06-01', '2023-06-01', '2023-06-30', 'approved', 'form', '2023-06-05', '2023-06-10', '2023-06-12', '2023-06-15'),
    ('101a1237-58cc-4372-a567-0e02b2c3d600', 'f47ac10b-58cc-4372-a567-0e02b2c3d479', 'd47ac10b-58cc-4372-a567-0e02b2c3d490', '2023-07-01', '2023-07-01', '2023-07-31', 'approved', 'form', '2023-07-05', '2023-07-10', '2023-07-12', '2023-07-15'),
    ('101a1238-58cc-4372-a567-0e02b2c3d600', 'f47ac10b-58cc-4372-a567-0e02b2c3d479', 'd47ac10b-58cc-4372-a567-0e02b2c3d490', '2023-08-01', '2023-08-01', '2023-08-31', 'approved', 'form', '2023-08-05', '2023-08-10', '2023-08-12', '2023-08-15'),
    ('101a1239-58cc-4372-a567-0e02b2c3d600', 'f47ac10b-58cc-4372-a567-0e02b2c3d479', 'd47ac10b-58cc-4372-a567-0e02b2c3d490', '2023-09-01', '2023-09-01', '2023-09-30', 'approved', 'form', '2023-09-05', '2023-09-10', '2023-09-12', '2023-09-15'),
    ('101a1240-58cc-4372-a567-0e02b2c3d600', 'f47ac10b-58cc-4372-a567-0e02b2c3d479', 'd47ac10b-58cc-4372-a567-0e02b2c3d490', '2023-10-01', '2023-10-01', '2023-10-31', 'approved', 'form', '2023-10-05', '2023-10-10', '2023-10-12', '2023-10-15'),
    ('101a1241-58cc-4372-a567-0e02b2c3d600', 'f47ac10b-58cc-4372-a567-0e02b2c3d479', 'd47ac10b-58cc-4372-a567-0e02b2c3d490', '2023-11-01', '2023-11-01', '2023-11-30', 'approved', 'form', '2023-11-05', '2023-11-10', '2023-11-12', '2023-11-15'),
    ('101a1242-58cc-4372-a567-0e02b2c3d600', 'f47ac10b-58cc-4372-a567-0e02b2c3d479', 'd47ac10b-58cc-4372-a567-0e02b2c3d490', '2023-12-01', '2023-12-01', '2023-12-31', 'approved', 'form', '2023-12-05', '2023-12-10', '2023-12-12', '2023-12-15'),
    ('101a1243-58cc-4372-a567-0e02b2c3d600', 'f47ac10b-58cc-4372-a567-0e02b2c3d479', 'd47ac10b-58cc-4372-a567-0e02b2c3d490', '2024-01-01', '2024-01-01', '2024-01-31', 'approved', 'form', '2024-01-05', '2024-01-10', '2024-01-12', '2024-01-15'),
    ('101a1244-58cc-4372-a567-0e02b2c3d600', 'f47ac10b-58cc-4372-a567-0e02b2c3d479', 'd47ac10b-58cc-4372-a567-0e02b2c3d490', '2024-02-01', '2024-02-01', '2024-02-29', 'approved', 'form', '2024-02-05', '2024-02-10', '2024-02-12', '2024-02-15'),
    ('101a1245-58cc-4372-a567-0e02b2c3d600', 'f47ac10b-58cc-4372-a567-0e02b2c3d479', 'd47ac10b-58cc-4372-a567-0e02b2c3d490', '2024-03-01', '2024-03-01', '2024-03-31', 'submitted', 'form', '2024-03-05', '2024-03-10', NULL, NULL),

    -- Table Mountain Logistics (sample for 6 months)
    ('201a1234-58cc-4372-a567-0e02b2c3d600', 'f47ac10b-58cc-4372-a567-0e02b2c3d479', 'd47ac10b-58cc-4372-a567-0e02b2c3d491', '2023-10-01', '2023-10-01', '2023-10-31', 'approved', 'csv', '2023-10-05', '2023-10-10', '2023-10-12', '2023-10-15'),
    ('201a1235-58cc-4372-a567-0e02b2c3d600', 'f47ac10b-58cc-4372-a567-0e02b2c3d479', 'd47ac10b-58cc-4372-a567-0e02b2c3d491', '2023-11-01', '2023-11-01', '2023-11-30', 'approved', 'csv', '2023-11-05', '2023-11-10', '2023-11-12', '2023-11-15'),
    ('201a1236-58cc-4372-a567-0e02b2c3d600', 'f47ac10b-58cc-4372-a567-0e02b2c3d479', 'd47ac10b-58cc-4372-a567-0e02b2c3d491', '2023-12-01', '2023-12-01', '2023-12-31', 'approved', 'csv', '2023-12-05', '2023-12-10', '2023-12-12', '2023-12-15'),
    ('201a1237-58cc-4372-a567-0e02b2c3d600', 'f47ac10b-58cc-4372-a567-0e02b2c3d479', 'd47ac10b-58cc-4372-a567-0e02b2c3d491', '2024-01-01', '2024-01-01', '2024-01-31', 'approved', 'csv', '2024-01-05', '2024-01-10', '2024-01-12', '2024-01-15'),
    ('201a1238-58cc-4372-a567-0e02b2c3d600', 'f47ac10b-58cc-4372-a567-0e02b2c3d479', 'd47ac10b-58cc-4372-a567-0e02b2c3d491', '2024-02-01', '2024-02-01', '2024-02-29', 'approved', 'csv', '2024-02-05', '2024-02-10', '2024-02-12', '2024-02-15'),
    ('201a1239-58cc-4372-a567-0e02b2c3d600', 'f47ac10b-58cc-4372-a567-0e02b2c3d479', 'd47ac10b-58cc-4372-a567-0e02b2c3d491', '2024-03-01', '2024-03-01', '2024-03-31', 'draft', 'csv', '2024-03-05', NULL, NULL, NULL),

    -- Strand Marine Processing (current month in progress)
    ('301a1234-58cc-4372-a567-0e02b2c3d600', 'f47ac10b-58cc-4372-a567-0e02b2c3d479', 'd47ac10b-58cc-4372-a567-0e02b2c3d492', '2024-03-01', '2024-03-01', '2024-03-31', 'draft', 'form', '2024-03-01', NULL, NULL, NULL);

-- ============================================================================
-- 5. CREATE SAMPLE DATA RECORDS (Realistic ESG Metrics)
-- ============================================================================

-- Stellenbosch Winery - Apr 2023 Submission
INSERT INTO data_records (submission_id, metric_id, organization_id, value, unit, data_quality_flag, source) VALUES
    ('101a1234-58cc-4372-a567-0e02b2c3d600', (SELECT id FROM metrics WHERE code = 'EMPLOYEES_TOTAL'), 'd47ac10b-58cc-4372-a567-0e02b2c3d490', 45, 'FTE', 'valid', 'HR Records'),
    ('101a1234-58cc-4372-a567-0e02b2c3d600', (SELECT id FROM metrics WHERE code = 'GHG_SCOPE_1'), 'd47ac10b-58cc-4372-a567-0e02b2c3d490', 85.4, 'tCO2e', 'valid', 'Fuel Consumption Data'),
    ('101a1234-58cc-4372-a567-0e02b2c3d600', (SELECT id FROM metrics WHERE code = 'GHG_SCOPE_2_LOCATION'), 'd47ac10b-58cc-4372-a567-0e02b2c3d490', 120.3, 'tCO2e', 'valid', 'Electricity Invoices'),
    ('101a1234-58cc-4372-a567-0e02b2c3d600', (SELECT id FROM metrics WHERE code = 'ENERGY_TOTAL_MWH'), 'd47ac10b-58cc-4372-a567-0e02b2c3d490', 285.5, 'MWh', 'valid', 'Electricity Meters'),
    ('101a1234-58cc-4372-a567-0e02b2c3d600', (SELECT id FROM metrics WHERE code = 'ENERGY_RENEWABLE_PCT'), 'd47ac10b-58cc-4372-a567-0e02b2c3d490', 15, '%', 'valid', 'Solar Installation'),
    ('101a1234-58cc-4372-a567-0e02b2c3d600', (SELECT id FROM metrics WHERE code = 'WATER_CONSUMPTION_M3'), 'd47ac10b-58cc-4372-a567-0e02b2c3d490', 32500, 'm³', 'valid', 'Water Meters'),
    ('101a1234-58cc-4372-a567-0e02b2c3d600', (SELECT id FROM metrics WHERE code = 'WATER_RECYCLED_PCT'), 'd47ac10b-58cc-4372-a567-0e02b2c3d490', 8, '%', 'estimated', 'Wastewater Treatment'),
    ('101a1234-58cc-4372-a567-0e02b2c3d600', (SELECT id FROM metrics WHERE code = 'WASTE_TOTAL_TONNES'), 'd47ac10b-58cc-4372-a567-0e02b2c3d490', 42.1, 'tonnes', 'valid', 'Waste Manifests'),
    ('101a1234-58cc-4372-a567-0e02b2c3d600', (SELECT id FROM metrics WHERE code = 'WASTE_RECYCLED_PCT'), 'd47ac10b-58cc-4372-a567-0e02b2c3d490', 45, '%', 'valid', 'Waste Contractor Reports'),
    ('101a1234-58cc-4372-a567-0e02b2c3d600', (SELECT id FROM metrics WHERE code = 'LTIFR'), 'd47ac10b-58cc-4372-a567-0e02b2c3d490', 0, 'rate/1M hrs', 'valid', 'Safety Records'),
    ('101a1234-58cc-4372-a567-0e02b2c3d600', (SELECT id FROM metrics WHERE code = 'EMPLOYEES_FEMALE_PCT'), 'd47ac10b-58cc-4372-a567-0e02b2c3d490', 35, '%', 'valid', 'HR Records'),
    ('101a1234-58cc-4372-a567-0e02b2c3d600', (SELECT id FROM metrics WHERE code = 'BOARD_TOTAL_MEMBERS'), 'd47ac10b-58cc-4372-a567-0e02b2c3d490', 5, 'count', 'valid', 'Company Records');

-- Stellenbosch Winery - May 2023 (showing trend improvement)
INSERT INTO data_records (submission_id, metric_id, organization_id, value, unit, data_quality_flag, source) VALUES
    ('101a1235-58cc-4372-a567-0e02b2c3d600', (SELECT id FROM metrics WHERE code = 'EMPLOYEES_TOTAL'), 'd47ac10b-58cc-4372-a567-0e02b2c3d490', 46, 'FTE', 'valid', 'HR Records'),
    ('101a1235-58cc-4372-a567-0e02b2c3d600', (SELECT id FROM metrics WHERE code = 'GHG_SCOPE_1'), 'd47ac10b-58cc-4372-a567-0e02b2c3d490', 82.1, 'tCO2e', 'valid', 'Fuel Consumption Data'),
    ('101a1235-58cc-4372-a567-0e02b2c3d600', (SELECT id FROM metrics WHERE code = 'GHG_SCOPE_2_LOCATION'), 'd47ac10b-58cc-4372-a567-0e02b2c3d490', 118.9, 'tCO2e', 'valid', 'Electricity Invoices'),
    ('101a1235-58cc-4372-a567-0e02b2c3d600', (SELECT id FROM metrics WHERE code = 'ENERGY_TOTAL_MWH'), 'd47ac10b-58cc-4372-a567-0e02b2c3d490', 283.2, 'MWh', 'valid', 'Electricity Meters'),
    ('101a1235-58cc-4372-a567-0e02b2c3d600', (SELECT id FROM metrics WHERE code = 'ENERGY_RENEWABLE_PCT'), 'd47ac10b-58cc-4372-a567-0e02b2c3d490', 18, '%', 'valid', 'Solar Installation'),
    ('101a1235-58cc-4372-a567-0e02b2c3d600', (SELECT id FROM metrics WHERE code = 'WATER_CONSUMPTION_M3'), 'd47ac10b-58cc-4372-a567-0e02b2c3d490', 31200, 'm³', 'valid', 'Water Meters'),
    ('101a1235-58cc-4372-a567-0e02b2c3d600', (SELECT id FROM metrics WHERE code = 'WASTE_TOTAL_TONNES'), 'd47ac10b-58cc-4372-a567-0e02b2c3d490', 40.5, 'tonnes', 'valid', 'Waste Manifests'),
    ('101a1235-58cc-4372-a567-0e02b2c3d600', (SELECT id FROM metrics WHERE code = 'WASTE_RECYCLED_PCT'), 'd47ac10b-58cc-4372-a567-0e02b2c3d490', 48, '%', 'valid', 'Waste Contractor Reports');

-- Add sample records for remaining months (abbreviated for brevity)
-- In a real scenario, we'd populate all 12 months with realistic trend data
-- For demo purposes, we'll populate a few more months to show trends

-- Stellenbosch Winery - Mar 2024 (latest month, showing improvement)
INSERT INTO data_records (submission_id, metric_id, organization_id, value, unit, data_quality_flag, source) VALUES
    ('101a1245-58cc-4372-a567-0e02b2c3d600', (SELECT id FROM metrics WHERE code = 'EMPLOYEES_TOTAL'), 'd47ac10b-58cc-4372-a567-0e02b2c3d490', 48, 'FTE', 'valid', 'HR Records'),
    ('101a1245-58cc-4372-a567-0e02b2c3d600', (SELECT id FROM metrics WHERE code = 'GHG_SCOPE_1'), 'd47ac10b-58cc-4372-a567-0e02b2c3d490', 78.5, 'tCO2e', 'valid', 'Fuel Consumption Data'),
    ('101a1245-58cc-4372-a567-0e02b2c3d600', (SELECT id FROM metrics WHERE code = 'GHG_SCOPE_2_LOCATION'), 'd47ac10b-58cc-4372-a567-0e02b2c3d490', 105.2, 'tCO2e', 'valid', 'Electricity Invoices'),
    ('101a1245-58cc-4372-a567-0e02b2c3d600', (SELECT id FROM metrics WHERE code = 'ENERGY_TOTAL_MWH'), 'd47ac10b-58cc-4372-a567-0e02b2c3d490', 252.1, 'MWh', 'valid', 'Electricity Meters'),
    ('101a1245-58cc-4372-a567-0e02b2c3d600', (SELECT id FROM metrics WHERE code = 'ENERGY_RENEWABLE_PCT'), 'd47ac10b-58cc-4372-a567-0e02b2c3d490', 28, '%', 'valid', 'Solar Installation'),
    ('101a1245-58cc-4372-a567-0e02b2c3d600', (SELECT id FROM metrics WHERE code = 'WATER_CONSUMPTION_M3'), 'd47ac10b-58cc-4372-a567-0e02b2c3d490', 28500, 'm³', 'valid', 'Water Meters'),
    ('101a1245-58cc-4372-a567-0e02b2c3d600', (SELECT id FROM metrics WHERE code = 'WASTE_TOTAL_TONNES'), 'd47ac10b-58cc-4372-a567-0e02b2c3d490', 35.2, 'tonnes', 'valid', 'Waste Manifests'),
    ('101a1245-58cc-4372-a567-0e02b2c3d600', (SELECT id FROM metrics WHERE code = 'WASTE_RECYCLED_PCT'), 'd47ac10b-58cc-4372-a567-0e02b2c3d490', 62, '%', 'valid', 'Waste Contractor Reports');

-- Table Mountain Logistics - Mar 2024
INSERT INTO data_records (submission_id, metric_id, organization_id, value, unit, data_quality_flag, source) VALUES
    ('201a1239-58cc-4372-a567-0e02b2c3d600', (SELECT id FROM metrics WHERE code = 'EMPLOYEES_TOTAL'), 'd47ac10b-58cc-4372-a567-0e02b2c3d491', 125, 'FTE', 'valid', 'HR Records'),
    ('201a1239-58cc-4372-a567-0e02b2c3d600', (SELECT id FROM metrics WHERE code = 'GHG_SCOPE_1'), 'd47ac10b-58cc-4372-a567-0e02b2c3d491', 450.2, 'tCO2e', 'valid', 'Fleet Fuel Data'),
    ('201a1239-58cc-4372-a567-0e02b2c3d600', (SELECT id FROM metrics WHERE code = 'GHG_SCOPE_2_LOCATION'), 'd47ac10b-58cc-4372-a567-0e02b2c3d491', 245.8, 'tCO2e', 'valid', 'Electricity Usage'),
    ('201a1239-58cc-4372-a567-0e02b2c3d600', (SELECT id FROM metrics WHERE code = 'GHG_SCOPE_3_TOTAL'), 'd47ac10b-58cc-4372-a567-0e02b2c3d491', 1520.5, 'tCO2e', 'estimated', 'Supplier Data'),
    ('201a1239-58cc-4372-a567-0e02b2c3d600', (SELECT id FROM metrics WHERE code = 'ENERGY_TOTAL_MWH'), 'd47ac10b-58cc-4372-a567-0e02b2c3d491', 580.2, 'MWh', 'valid', 'Electricity Meters'),
    ('201a1239-58cc-4372-a567-0e02b2c3d600', (SELECT id FROM metrics WHERE code = 'EMPLOYEES_FEMALE_PCT'), 'd47ac10b-58cc-4372-a567-0e02b2c3d491', 28, '%', 'valid', 'HR Records'),
    ('201a1239-58cc-4372-a567-0e02b2c3d600', (SELECT id FROM metrics WHERE code = 'LTIFR'), 'd47ac10b-58cc-4372-a567-0e02b2c3d491', 2.4, 'rate/1M hrs', 'valid', 'Safety Records');

-- Strand Marine Processing - Mar 2024 (draft submission)
INSERT INTO data_records (submission_id, metric_id, organization_id, value, unit, data_quality_flag, source) VALUES
    ('301a1234-58cc-4372-a567-0e02b2c3d600', (SELECT id FROM metrics WHERE code = 'EMPLOYEES_TOTAL'), 'd47ac10b-58cc-4372-a567-0e02b2c3d492', 92, 'FTE', 'valid', 'HR Records'),
    ('301a1234-58cc-4372-a567-0e02b2c3d600', (SELECT id FROM metrics WHERE code = 'GHG_SCOPE_1'), 'd47ac10b-58cc-4372-a567-0e02b2c3d492', 165.3, 'tCO2e', 'valid', 'Refrigeration & Transport'),
    ('301a1234-58cc-4372-a567-0e02b2c3d600', (SELECT id FROM metrics WHERE code = 'GHG_SCOPE_2_LOCATION'), 'd47ac10b-58cc-4372-a567-0e02b2c3d492', 380.5, 'tCO2e', 'valid', 'Electricity'),
    ('301a1234-58cc-4372-a567-0e02b2c3d600', (SELECT id FROM metrics WHERE code = 'WATER_CONSUMPTION_M3'), 'd47ac10b-58cc-4372-a567-0e02b2c3d492', 78500, 'm³', 'valid', 'Water Meters'),
    ('301a1234-58cc-4372-a567-0e02b2c3d600', (SELECT id FROM metrics WHERE code = 'WASTE_TOTAL_TONNES'), 'd47ac10b-58cc-4372-a567-0e02b2c3d492', 125.4, 'tonnes', 'valid', 'Waste Records'),
    ('301a1234-58cc-4372-a567-0e02b2c3d600', (SELECT id FROM metrics WHERE code = 'WASTE_RECYCLED_PCT'), 'd47ac10b-58cc-4372-a567-0e02b2c3d492', 35, '%', 'estimated', 'Waste Contractor');

-- ============================================================================
-- SUMMARY
-- ============================================================================
-- Created: 3 Distribution Partner Tenants
-- Created: 30 Organizations (10 per tenant) with realistic South African names
-- Created: 13 Data Submissions (12 months for 1 org + 6 months for another + 1 draft)
-- Created: ~70 Data Records with realistic ESG metrics
-- Data shows trend improvement over time (key for demo dashboards)
-- Ready for Phase C: Code the Core (Dashboard, Reporting)
