-- 456AF Fitness Structure Migration
-- Adds support for fitness verticals and program tiers

-- ============================================================================
-- PART 1: Extend products table for fitness programs
-- ============================================================================

-- Add new columns to products table
ALTER TABLE products 
ADD COLUMN IF NOT EXISTS category TEXT CHECK (category IN ('vertical', 'program', 'certification', 'merchandise', 'other')),
ADD COLUMN IF NOT EXISTS tier TEXT CHECK (tier IN ('tier1', 'tier2', 'tier3', 'foundation', 'virtual', 'elite', 'ultimate')),
ADD COLUMN IF NOT EXISTS program_type TEXT CHECK (program_type IN ('community', 'virtual_group', 'private', 'residential', 'certification')),
ADD COLUMN IF NOT EXISTS capacity_max INTEGER,
ADD COLUMN IF NOT EXISTS capacity_current INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS duration_days INTEGER DEFAULT 30,
ADD COLUMN IF NOT EXISTS is_recurring BOOLEAN DEFAULT true,
ADD COLUMN IF NOT EXISTS launch_fee DECIMAL(10, 2),
ADD COLUMN IF NOT EXISTS session_price DECIMAL(10, 2),
ADD COLUMN IF NOT EXISTS features JSONB DEFAULT '[]',
ADD COLUMN IF NOT EXISTS prerequisites JSONB DEFAULT '[]';

-- Add index for category and tier filtering
CREATE INDEX IF NOT EXISTS idx_products_category ON products(category);
CREATE INDEX IF NOT EXISTS idx_products_tier ON products(tier);
CREATE INDEX IF NOT EXISTS idx_products_program_type ON products(program_type);

-- ============================================================================
-- PART 2: Create fitness_verticals table
-- ============================================================================

CREATE TABLE IF NOT EXISTS fitness_verticals (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  slug TEXT NOT NULL,
  tier TEXT CHECK (tier IN ('tier1', 'tier2', 'tier3')) NOT NULL,
  description TEXT,
  intensity_level TEXT CHECK (intensity_level IN ('moderate', 'advanced', 'professional')) NOT NULL,
  launch_fee DECIMAL(10, 2) NOT NULL,
  features JSONB DEFAULT '[]',
  image_url TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(tenant_id, slug)
);

-- Enable RLS
ALTER TABLE fitness_verticals ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Fitness verticals are viewable by everyone" ON fitness_verticals FOR SELECT USING (is_active = true);
CREATE POLICY "Admins can manage fitness verticals" ON fitness_verticals FOR ALL USING (
  EXISTS (
    SELECT 1 FROM users WHERE users.id = auth.uid() AND users.tenant_id = fitness_verticals.tenant_id AND users.role = 'admin'
  )
);

-- Index
CREATE INDEX IF NOT EXISTS idx_fitness_verticals_tenant ON fitness_verticals(tenant_id);
CREATE INDEX IF NOT EXISTS idx_fitness_verticals_tier ON fitness_verticals(tier);

-- ============================================================================
-- PART 3: Create user_program_enrollments table
-- ============================================================================

CREATE TABLE IF NOT EXISTS user_program_enrollments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  vertical_id UUID REFERENCES fitness_verticals(id) ON DELETE SET NULL,
  status TEXT CHECK (status IN ('active', 'paused', 'cancelled', 'completed')) DEFAULT 'active',
  enrolled_at TIMESTAMPTZ DEFAULT NOW(),
  expires_at TIMESTAMPTZ,
  sessions_remaining INTEGER,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, product_id)
);

-- Enable RLS
ALTER TABLE user_program_enrollments ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Users can view their own enrollments" ON user_program_enrollments FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create enrollments" ON user_program_enrollments FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Admins can view all enrollments" ON user_program_enrollments FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM users u JOIN products p ON p.tenant_id = u.tenant_id
    WHERE u.id = auth.uid() AND p.id = user_program_enrollments.product_id AND u.role = 'admin'
  )
);

-- Index
CREATE INDEX IF NOT EXISTS idx_user_program_enrollments_user ON user_program_enrollments(user_id);
CREATE INDEX IF NOT EXISTS idx_user_program_enrollments_product ON user_program_enrollments(product_id);
CREATE INDEX IF NOT EXISTS idx_user_program_enrollments_status ON user_program_enrollments(status);

-- Trigger for updated_at
CREATE TRIGGER update_user_program_enrollments_updated_at BEFORE UPDATE ON user_program_enrollments
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================================================
-- PART 4: Create training_sessions table
-- ============================================================================

CREATE TABLE IF NOT EXISTS training_sessions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  enrollment_id UUID NOT NULL REFERENCES user_program_enrollments(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  session_type TEXT CHECK (session_type IN ('virtual', 'in_person', 'group', 'assessment')) NOT NULL,
  scheduled_at TIMESTAMPTZ NOT NULL,
  duration_minutes INTEGER NOT NULL DEFAULT 60,
  status TEXT CHECK (status IN ('scheduled', 'completed', 'cancelled', 'no_show')) DEFAULT 'scheduled',
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE training_sessions ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Users can view their own sessions" ON training_sessions FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Admins can manage all sessions" ON training_sessions FOR ALL USING (
  EXISTS (
    SELECT 1 FROM users WHERE users.id = auth.uid() AND users.tenant_id = training_sessions.tenant_id AND users.role = 'admin'
  )
);

-- Index
CREATE INDEX IF NOT EXISTS idx_training_sessions_tenant ON training_sessions(tenant_id);
CREATE INDEX IF NOT EXISTS idx_training_sessions_user ON training_sessions(user_id);
CREATE INDEX IF NOT EXISTS idx_training_sessions_enrollment ON training_sessions(enrollment_id);
CREATE INDEX IF NOT EXISTS idx_training_sessions_scheduled ON training_sessions(scheduled_at);

-- Trigger for updated_at
CREATE TRIGGER update_training_sessions_updated_at BEFORE UPDATE ON training_sessions
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================================================
-- PART 5: Create waitlist table for capacity management
-- ============================================================================

CREATE TABLE IF NOT EXISTS program_waitlist (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  position INTEGER,
  status TEXT CHECK (status IN ('waiting', 'notified', 'enrolled', 'expired')) DEFAULT 'waiting',
  joined_at TIMESTAMPTZ DEFAULT NOW(),
  notified_at TIMESTAMPTZ,
  expires_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, product_id)
);

-- Enable RLS
ALTER TABLE program_waitlist ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Users can view their own waitlist entries" ON program_waitlist FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can join waitlist" ON program_waitlist FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Admins can manage waitlist" ON program_waitlist FOR ALL USING (
  EXISTS (
    SELECT 1 FROM users WHERE users.id = auth.uid() AND users.tenant_id = program_waitlist.tenant_id AND users.role = 'admin'
  )
);

-- Index
CREATE INDEX IF NOT EXISTS idx_program_waitlist_tenant ON program_waitlist(tenant_id);
CREATE INDEX IF NOT EXISTS idx_program_waitlist_product ON program_waitlist(product_id);
CREATE INDEX IF NOT EXISTS idx_program_waitlist_status ON program_waitlist(status);

-- ============================================================================
-- PART 6: Add comments for documentation
-- ============================================================================

COMMENT ON TABLE fitness_verticals IS '456AF fitness verticals: Lifestyle (Tier 1), Strength (Tier 2), Athlete (Tier 3)';
COMMENT ON TABLE user_program_enrollments IS 'User enrollments in training programs (Basic_AF, Strong_AF, Rare_AF, Elite_AF)';
COMMENT ON TABLE training_sessions IS 'Individual training sessions for enrolled users';
COMMENT ON TABLE program_waitlist IS 'Waitlist for programs at capacity (Rare_AF, Elite_AF)';

COMMENT ON COLUMN products.category IS 'Product category: vertical, program, certification, merchandise, other';
COMMENT ON COLUMN products.tier IS 'Program tier: tier1/tier2/tier3 for verticals, foundation/virtual/elite/ultimate for programs';
COMMENT ON COLUMN products.program_type IS 'Training program type: community, virtual_group, private, residential, certification';
COMMENT ON COLUMN products.capacity_max IS 'Maximum client capacity for the program';
COMMENT ON COLUMN products.capacity_current IS 'Current number of enrolled clients';
