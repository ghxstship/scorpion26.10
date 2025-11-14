-- 456AF Seed Data
-- Brand: 456 Athletics & Fitness (@456af)
-- Date: November 2025

-- ============================================================================
-- PART 1: Create 456AF tenant
-- ============================================================================

INSERT INTO tenants (id, name, slug, logo_url, primary_color, secondary_color, created_at, updated_at)
VALUES (
  '456af000-0000-0000-0000-000000000001',
  '456AF',
  '456af',
  '/images/456af-logo.png',
  '#DC2626', -- Red 600
  '#CA8A04', -- Gold 600
  NOW(),
  NOW()
) ON CONFLICT (id) DO NOTHING;

-- ============================================================================
-- PART 2: Fitness Verticals (Entry Level Selection)
-- ============================================================================

INSERT INTO fitness_verticals (id, tenant_id, name, slug, tier, description, intensity_level, launch_fee, features, image_url, is_active)
VALUES
  (
    '456af001-0000-0000-0000-000000000001',
    '456af000-0000-0000-0000-000000000001',
    '456 Lifestyle',
    '456-lifestyle',
    'tier1',
    'Moderate intensity training for everyday athletes. Build sustainable fitness habits and transform your lifestyle.',
    'moderate',
    150.00,
    '["Fitness assessment", "Goal setting session", "Custom vertical programming", "Movement library access"]',
    '/images/verticals/lifestyle.jpg',
    true
  ),
  (
    '456af001-0000-0000-0000-000000000002',
    '456af000-0000-0000-0000-000000000001',
    '456 Strength',
    '456-strength',
    'tier2',
    'Advanced training for serious lifters. Build real strength and power with periodized programming.',
    'advanced',
    250.00,
    '["Advanced fitness assessment", "Strength testing", "Periodized programming", "Technique video analysis", "Nutrition consultation"]',
    '/images/verticals/strength.jpg',
    true
  ),
  (
    '456af001-0000-0000-0000-000000000003',
    '456af000-0000-0000-0000-000000000001',
    '456 Athlete',
    '456-athlete',
    'tier3',
    'Professional-level training for elite performers. Sport-specific programming and comprehensive performance optimization.',
    'professional',
    500.00,
    '["Comprehensive performance assessment", "VO2 max testing", "Body composition analysis", "Sport-specific programming", "Nutrition + supplement protocol", "Recovery optimization plan"]',
    '/images/verticals/athlete.jpg',
    true
  )
ON CONFLICT (id) DO NOTHING;

-- ============================================================================
-- PART 3: Training Programs (Available Across All Verticals)
-- ============================================================================

INSERT INTO products (
  id, 
  tenant_id, 
  title, 
  description, 
  type, 
  category,
  tier,
  program_type,
  price, 
  capacity_max,
  capacity_current,
  duration_days,
  is_recurring,
  session_price,
  features,
  image_url, 
  is_active
)
VALUES
  -- Basic_AF - Community Access Only
  (
    '456af002-0000-0000-0000-000000000001',
    '456af000-0000-0000-0000-000000000001',
    'Basic_AF',
    'Stop lurking. Community access is literally $30. What''s your excuse? Join Club456 and get access to group workouts, basic programming, and a community that actually shows up.',
    'subscription',
    'program',
    'foundation',
    'community',
    30.00,
    NULL, -- Unlimited capacity
    0,
    30,
    true,
    NULL,
    '["Club456 community access", "Group workouts", "Basic programming", "Community support", "Monthly challenges", "Workout library"]',
    '/images/programs/basicaf.jpg',
    true
  ),
  
  -- Strong_AF - Virtual Group Training
  (
    '456af002-0000-0000-0000-000000000002',
    '456af000-0000-0000-0000-000000000001',
    'Strong_AF',
    'Virtual training that doesn''t suck. 3 live group sessions per week, actual programming (not random workouts), and monthly check-ins. Plus in-person sessions when you need that extra push.',
    'subscription',
    'program',
    'virtual',
    'virtual_group',
    350.00,
    60, -- Max 60 clients (3 groups of 20)
    0,
    30,
    true,
    200.00, -- In-person session price
    '["3 live virtual sessions/week", "Personalized programming", "Monthly video check-ins", "Progress tracking", "Private Slack community", "Optional in-person sessions ($200/session)"]',
    '/images/programs/strongaf.jpg',
    true
  ),
  
  -- Rare_AF - Private Personal Training
  (
    '456af002-0000-0000-0000-000000000003',
    '456af000-0000-0000-0000-000000000001',
    'Rare_AF',
    'Elite 1-on-1 coaching. Only 6 slots available. Custom programming, weekly video analysis, and direct access to your coach. This isn''t for everyone. That''s the point.',
    'subscription',
    'program',
    'elite',
    'private',
    800.00,
    6, -- Max 6 clients
    0,
    30,
    true,
    300.00, -- In-person session price
    '["2 private sessions/week", "100% custom programming", "Weekly video analysis", "Direct coach access (text/call)", "Nutrition guidance", "In-person sessions available ($300/session)"]',
    '/images/programs/rareaf.jpg',
    true
  ),
  
  -- Far_AF - Residential/Destination Program
  (
    '456af002-0000-0000-0000-000000000004',
    '456af000-0000-0000-0000-000000000001',
    'Far_AF',
    'The ultimate immersive experience. 3 clients per year. That''s it. Live-in training at our Orlando facility or exclusive destination locations. Full lifestyle transformation. VIP everything. If you have to ask about price, this isn''t for you.',
    'subscription',
    'program',
    'ultimate',
    'residential',
    50000.00,
    3, -- Max 3 clients per year
    0,
    30,
    true,
    NULL,
    '["Exclusive residency (Orlando or destination)", "24/7 trainer access", "Private chef & nutrition", "Luxury accommodations", "Full lifestyle management", "Recovery & wellness suite", "Only 3 clients per year"]',
    '/images/programs/faraf.jpg',
    true
  )
ON CONFLICT (id) DO NOTHING;

-- ============================================================================
-- PART 4: 456AFU - Trainer Certification Academy
-- ============================================================================

INSERT INTO products (
  id,
  tenant_id,
  title,
  description,
  type,
  category,
  tier,
  program_type,
  price,
  capacity_max,
  capacity_current,
  duration_days,
  is_recurring,
  features,
  image_url,
  is_active
)
VALUES
  -- 456AFU Tier 1 - Certification Only
  (
    '456af003-0000-0000-0000-000000000001',
    '456af000-0000-0000-0000-000000000001',
    '456AFU - Certification',
    'Get certified. Learn the 456AF methodology. 30-day intensive course. 3 cohorts per year. Limited to 10 students per cohort.',
    'digital',
    'certification',
    'foundation',
    'certification',
    8000.00,
    10,
    0,
    30,
    false,
    '["30-day intensive training", "456AF methodology certification", "Programming fundamentals", "Client assessment protocols", "3 cohorts per year", "Certificate upon completion"]',
    '/images/456prou/certification.jpg',
    true
  ),
  
  -- 456AFU Tier 2 - Certification + Business
  (
    '456af003-0000-0000-0000-000000000002',
    '456af000-0000-0000-0000-000000000001',
    '456AFU - Business',
    'Certification + business mentorship. Learn to train AND how to build a profitable fitness business. Marketing, sales, systems. The whole package.',
    'digital',
    'certification',
    'virtual',
    'certification',
    15000.00,
    10,
    0,
    30,
    false,
    '["Everything in Certification tier", "Business mentorship program", "Marketing & sales training", "Client acquisition systems", "Pricing & packaging strategies", "6 months post-course support"]',
    '/images/456prou/business.jpg',
    true
  ),
  
  -- 456AFU Tier 3 - Certification + Business + Franchise
  (
    '456af003-0000-0000-0000-000000000003',
    '456af000-0000-0000-0000-000000000001',
    '456AFU - Elite',
    'The full package. Certification, business training, and franchise opportunity. Build your own 456AF affiliate. Limited to 3 students per year.',
    'digital',
    'certification',
    'elite',
    'certification',
    25000.00,
    3,
    0,
    30,
    false,
    '["Everything in Business tier", "456AF franchise license", "Branding & marketing materials", "Ongoing business support", "Revenue share opportunity", "Only 3 spots per year"]',
    '/images/456prou/elite.jpg',
    true
  )
ON CONFLICT (id) DO NOTHING;

-- ============================================================================
-- PART 5: Navigation Items for 456AF
-- ============================================================================

INSERT INTO navigation_items (tenant_id, label, url, parent_id, position, is_active)
VALUES
  ('456af000-0000-0000-0000-000000000001', 'Home', '/', NULL, 1, true),
  ('456af000-0000-0000-0000-000000000001', 'Programs', '/programs', NULL, 2, true),
  ('456af000-0000-0000-0000-000000000001', 'Pricing', '/pricing', NULL, 3, true),
  ('456af000-0000-0000-0000-000000000001', 'Club456', '/club456', NULL, 4, true),
  ('456af000-0000-0000-0000-000000000001', '456AFU', '/456prou', NULL, 5, true),
  ('456af000-0000-0000-0000-000000000001', 'Contact', '/contact', NULL, 6, true)
ON CONFLICT DO NOTHING;

-- ============================================================================
-- PART 6: Testimonials for 456AF
-- ============================================================================

INSERT INTO testimonials (tenant_id, author_name, author_title, author_image, content, rating, is_approved, is_featured)
VALUES
  (
    '456af000-0000-0000-0000-000000000001',
    'Marcus Rodriguez',
    'Rare_AF Client',
    '/images/testimonials/marcus.jpg',
    'Six months in Rare_AF and I''m in the best shape of my life. No BS, just results. Worth every penny.',
    5,
    true,
    true
  ),
  (
    '456af000-0000-0000-0000-000000000001',
    'Sarah Chen',
    'Strong_AF Member',
    '/images/testimonials/sarah.jpg',
    'Virtual training that actually works. The programming is legit and the community keeps me accountable. Finally found something that fits my schedule.',
    5,
    true,
    true
  ),
  (
    '456af000-0000-0000-0000-000000000001',
    'James Thompson',
    'Far_AF Alumni',
    '/images/testimonials/james.jpg',
    'The Far_AF experience changed my life. 90 days of complete immersion. Lost 45 lbs, gained muscle, and learned how to maintain it. Best investment I''ve ever made.',
    5,
    true,
    true
  ),
  (
    '456af000-0000-0000-0000-000000000001',
    'Alex Rivera',
    '456AFU Graduate',
    '/images/testimonials/alex.jpg',
    'Went from working a 9-5 to running my own training business in 6 months. 456AFU gave me the certification AND the business skills to actually make it work.',
    5,
    true,
    false
  )
ON CONFLICT DO NOTHING;

-- ============================================================================
-- Verification
-- ============================================================================

DO $$
DECLARE
  vertical_count INTEGER;
  program_count INTEGER;
  cert_count INTEGER;
BEGIN
  SELECT COUNT(*) INTO vertical_count FROM fitness_verticals WHERE tenant_id = '456af000-0000-0000-0000-000000000001';
  SELECT COUNT(*) INTO program_count FROM products WHERE tenant_id = '456af000-0000-0000-0000-000000000001' AND category = 'program';
  SELECT COUNT(*) INTO cert_count FROM products WHERE tenant_id = '456af000-0000-0000-0000-000000000001' AND category = 'certification';
  
  RAISE NOTICE '456AF seed data loaded:';
  RAISE NOTICE '  Fitness Verticals: %', vertical_count;
  RAISE NOTICE '  Training Programs: %', program_count;
  RAISE NOTICE '  Certification Courses: %', cert_count;
END $$;
