-- Migration: Add soft delete, audit logs, and missing updated_at columns
-- Date: 2025-11-06
-- Description: Enterprise-grade data integrity enhancements

-- ============================================================================
-- PART 1: Add deleted_at columns for soft delete functionality
-- ============================================================================

ALTER TABLE tenants ADD COLUMN IF NOT EXISTS deleted_at TIMESTAMPTZ;
ALTER TABLE users ADD COLUMN IF NOT EXISTS deleted_at TIMESTAMPTZ;
ALTER TABLE products ADD COLUMN IF NOT EXISTS deleted_at TIMESTAMPTZ;
ALTER TABLE product_variants ADD COLUMN IF NOT EXISTS deleted_at TIMESTAMPTZ;
ALTER TABLE orders ADD COLUMN IF NOT EXISTS deleted_at TIMESTAMPTZ;
ALTER TABLE order_items ADD COLUMN IF NOT EXISTS deleted_at TIMESTAMPTZ;
ALTER TABLE subscriptions ADD COLUMN IF NOT EXISTS deleted_at TIMESTAMPTZ;
ALTER TABLE pages ADD COLUMN IF NOT EXISTS deleted_at TIMESTAMPTZ;
ALTER TABLE blog_posts ADD COLUMN IF NOT EXISTS deleted_at TIMESTAMPTZ;
ALTER TABLE bookings ADD COLUMN IF NOT EXISTS deleted_at TIMESTAMPTZ;
ALTER TABLE booking_availability ADD COLUMN IF NOT EXISTS deleted_at TIMESTAMPTZ;
ALTER TABLE testimonials ADD COLUMN IF NOT EXISTS deleted_at TIMESTAMPTZ;
ALTER TABLE email_subscribers ADD COLUMN IF NOT EXISTS deleted_at TIMESTAMPTZ;
ALTER TABLE email_campaigns ADD COLUMN IF NOT EXISTS deleted_at TIMESTAMPTZ;
ALTER TABLE email_templates ADD COLUMN IF NOT EXISTS deleted_at TIMESTAMPTZ;
ALTER TABLE media_files ADD COLUMN IF NOT EXISTS deleted_at TIMESTAMPTZ;
ALTER TABLE navigation_items ADD COLUMN IF NOT EXISTS deleted_at TIMESTAMPTZ;
ALTER TABLE user_favorites ADD COLUMN IF NOT EXISTS deleted_at TIMESTAMPTZ;
ALTER TABLE course_enrollments ADD COLUMN IF NOT EXISTS deleted_at TIMESTAMPTZ;
ALTER TABLE course_progress ADD COLUMN IF NOT EXISTS deleted_at TIMESTAMPTZ;

-- Add indexes on deleted_at for query performance
CREATE INDEX IF NOT EXISTS idx_tenants_deleted_at ON tenants(deleted_at) WHERE deleted_at IS NULL;
CREATE INDEX IF NOT EXISTS idx_users_deleted_at ON users(deleted_at) WHERE deleted_at IS NULL;
CREATE INDEX IF NOT EXISTS idx_products_deleted_at ON products(deleted_at) WHERE deleted_at IS NULL;
CREATE INDEX IF NOT EXISTS idx_orders_deleted_at ON orders(deleted_at) WHERE deleted_at IS NULL;
CREATE INDEX IF NOT EXISTS idx_blog_posts_deleted_at ON blog_posts(deleted_at) WHERE deleted_at IS NULL;
CREATE INDEX IF NOT EXISTS idx_pages_deleted_at ON pages(deleted_at) WHERE deleted_at IS NULL;

-- ============================================================================
-- PART 2: Add updated_at columns to all tables that don't have them
-- ============================================================================

ALTER TABLE users ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ DEFAULT NOW();
ALTER TABLE products ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ DEFAULT NOW();
ALTER TABLE product_variants ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ DEFAULT NOW();
ALTER TABLE orders ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ DEFAULT NOW();
ALTER TABLE order_items ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ DEFAULT NOW();
ALTER TABLE pages ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ DEFAULT NOW();
ALTER TABLE blog_posts ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ DEFAULT NOW();
ALTER TABLE bookings ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ DEFAULT NOW();
ALTER TABLE booking_availability ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ DEFAULT NOW();
ALTER TABLE testimonials ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ DEFAULT NOW();
ALTER TABLE email_subscribers ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ DEFAULT NOW();
ALTER TABLE email_campaigns ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ DEFAULT NOW();
ALTER TABLE email_templates ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ DEFAULT NOW();
ALTER TABLE media_files ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ DEFAULT NOW();
ALTER TABLE navigation_items ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ DEFAULT NOW();
ALTER TABLE user_favorites ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ DEFAULT NOW();
ALTER TABLE course_enrollments ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ DEFAULT NOW();
ALTER TABLE course_progress ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ DEFAULT NOW();
ALTER TABLE analytics_events ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ DEFAULT NOW();

-- ============================================================================
-- PART 3: Create triggers for automatic updated_at timestamp updates
-- ============================================================================

-- Drop existing triggers if they exist
DROP TRIGGER IF EXISTS update_users_updated_at ON users;
DROP TRIGGER IF EXISTS update_products_updated_at ON products;
DROP TRIGGER IF EXISTS update_product_variants_updated_at ON product_variants;
DROP TRIGGER IF EXISTS update_orders_updated_at ON orders;
DROP TRIGGER IF EXISTS update_order_items_updated_at ON order_items;
DROP TRIGGER IF EXISTS update_pages_updated_at ON pages;
DROP TRIGGER IF EXISTS update_blog_posts_updated_at ON blog_posts;
DROP TRIGGER IF EXISTS update_bookings_updated_at ON bookings;
DROP TRIGGER IF EXISTS update_booking_availability_updated_at ON booking_availability;
DROP TRIGGER IF EXISTS update_testimonials_updated_at ON testimonials;
DROP TRIGGER IF EXISTS update_email_subscribers_updated_at ON email_subscribers;
DROP TRIGGER IF EXISTS update_email_campaigns_updated_at ON email_campaigns;
DROP TRIGGER IF EXISTS update_email_templates_updated_at ON email_templates;
DROP TRIGGER IF EXISTS update_media_files_updated_at ON media_files;
DROP TRIGGER IF EXISTS update_navigation_items_updated_at ON navigation_items;
DROP TRIGGER IF EXISTS update_user_favorites_updated_at ON user_favorites;
DROP TRIGGER IF EXISTS update_course_enrollments_updated_at ON course_enrollments;
DROP TRIGGER IF EXISTS update_course_progress_updated_at ON course_progress;
DROP TRIGGER IF EXISTS update_analytics_events_updated_at ON analytics_events;

-- Create triggers
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_products_updated_at BEFORE UPDATE ON products
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_product_variants_updated_at BEFORE UPDATE ON product_variants
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_orders_updated_at BEFORE UPDATE ON orders
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_order_items_updated_at BEFORE UPDATE ON order_items
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_pages_updated_at BEFORE UPDATE ON pages
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_blog_posts_updated_at BEFORE UPDATE ON blog_posts
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_bookings_updated_at BEFORE UPDATE ON bookings
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_booking_availability_updated_at BEFORE UPDATE ON booking_availability
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_testimonials_updated_at BEFORE UPDATE ON testimonials
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_email_subscribers_updated_at BEFORE UPDATE ON email_subscribers
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_email_campaigns_updated_at BEFORE UPDATE ON email_campaigns
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_email_templates_updated_at BEFORE UPDATE ON email_templates
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_media_files_updated_at BEFORE UPDATE ON media_files
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_navigation_items_updated_at BEFORE UPDATE ON navigation_items
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_user_favorites_updated_at BEFORE UPDATE ON user_favorites
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_course_enrollments_updated_at BEFORE UPDATE ON course_enrollments
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_course_progress_updated_at BEFORE UPDATE ON course_progress
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_analytics_events_updated_at BEFORE UPDATE ON analytics_events
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================================================
-- PART 4: Create comprehensive audit logs table
-- ============================================================================

CREATE TABLE IF NOT EXISTS audit_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  tenant_id UUID REFERENCES tenants(id) ON DELETE SET NULL,
  user_id UUID REFERENCES users(id) ON DELETE SET NULL,
  
  -- Action details
  action TEXT NOT NULL CHECK (action IN ('CREATE', 'UPDATE', 'DELETE', 'LOGIN', 'LOGOUT', 'PERMISSION_CHANGE', 'STATUS_CHANGE', 'EXPORT', 'IMPORT')),
  entity_type TEXT NOT NULL,
  entity_id UUID,
  
  -- Change tracking
  old_values JSONB,
  new_values JSONB,
  changed_fields TEXT[],
  
  -- Request metadata
  ip_address INET,
  user_agent TEXT,
  request_method TEXT,
  request_path TEXT,
  
  -- Additional context
  description TEXT,
  metadata JSONB DEFAULT '{}',
  
  -- Timestamp
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for audit log queries
CREATE INDEX IF NOT EXISTS idx_audit_logs_tenant ON audit_logs(tenant_id);
CREATE INDEX IF NOT EXISTS idx_audit_logs_user ON audit_logs(user_id);
CREATE INDEX IF NOT EXISTS idx_audit_logs_entity ON audit_logs(entity_type, entity_id);
CREATE INDEX IF NOT EXISTS idx_audit_logs_action ON audit_logs(action);
CREATE INDEX IF NOT EXISTS idx_audit_logs_created_at ON audit_logs(created_at DESC);

-- Enable RLS on audit logs
ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;

-- Audit logs policies
CREATE POLICY "Admins can view audit logs in their tenant" ON audit_logs FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM users WHERE users.id = auth.uid() AND users.tenant_id = audit_logs.tenant_id AND users.role = 'admin'
  )
);

CREATE POLICY "System can insert audit logs" ON audit_logs FOR INSERT WITH CHECK (true);

-- ============================================================================
-- PART 5: Create audit log trigger function
-- ============================================================================

CREATE OR REPLACE FUNCTION create_audit_log()
RETURNS TRIGGER AS $$
DECLARE
  old_data JSONB;
  new_data JSONB;
  changed_fields TEXT[];
  action_type TEXT;
BEGIN
  -- Determine action type
  IF (TG_OP = 'INSERT') THEN
    action_type := 'CREATE';
    new_data := to_jsonb(NEW);
    old_data := NULL;
    changed_fields := NULL;
  ELSIF (TG_OP = 'UPDATE') THEN
    action_type := 'UPDATE';
    old_data := to_jsonb(OLD);
    new_data := to_jsonb(NEW);
    
    -- Identify changed fields
    SELECT array_agg(key) INTO changed_fields
    FROM jsonb_each(new_data)
    WHERE new_data->key IS DISTINCT FROM old_data->key;
  ELSIF (TG_OP = 'DELETE') THEN
    action_type := 'DELETE';
    old_data := to_jsonb(OLD);
    new_data := NULL;
    changed_fields := NULL;
  END IF;

  -- Insert audit log (only if not a soft delete field update)
  IF NOT (TG_OP = 'UPDATE' AND changed_fields = ARRAY['deleted_at', 'updated_at']) THEN
    INSERT INTO audit_logs (
      tenant_id,
      user_id,
      action,
      entity_type,
      entity_id,
      old_values,
      new_values,
      changed_fields
    ) VALUES (
      COALESCE(NEW.tenant_id, OLD.tenant_id),
      auth.uid(),
      action_type,
      TG_TABLE_NAME,
      COALESCE(NEW.id, OLD.id),
      old_data,
      new_data,
      changed_fields
    );
  END IF;

  RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ============================================================================
-- PART 6: Add audit triggers to critical tables
-- ============================================================================

-- Tenants
CREATE TRIGGER audit_tenants_changes
  AFTER INSERT OR UPDATE OR DELETE ON tenants
  FOR EACH ROW EXECUTE FUNCTION create_audit_log();

-- Users
CREATE TRIGGER audit_users_changes
  AFTER INSERT OR UPDATE OR DELETE ON users
  FOR EACH ROW EXECUTE FUNCTION create_audit_log();

-- Products
CREATE TRIGGER audit_products_changes
  AFTER INSERT OR UPDATE OR DELETE ON products
  FOR EACH ROW EXECUTE FUNCTION create_audit_log();

-- Orders
CREATE TRIGGER audit_orders_changes
  AFTER INSERT OR UPDATE OR DELETE ON orders
  FOR EACH ROW EXECUTE FUNCTION create_audit_log();

-- Subscriptions
CREATE TRIGGER audit_subscriptions_changes
  AFTER INSERT OR UPDATE OR DELETE ON subscriptions
  FOR EACH ROW EXECUTE FUNCTION create_audit_log();

-- Blog posts
CREATE TRIGGER audit_blog_posts_changes
  AFTER INSERT OR UPDATE OR DELETE ON blog_posts
  FOR EACH ROW EXECUTE FUNCTION create_audit_log();

-- Pages
CREATE TRIGGER audit_pages_changes
  AFTER INSERT OR UPDATE OR DELETE ON pages
  FOR EACH ROW EXECUTE FUNCTION create_audit_log();

-- Bookings
CREATE TRIGGER audit_bookings_changes
  AFTER INSERT OR UPDATE OR DELETE ON bookings
  FOR EACH ROW EXECUTE FUNCTION create_audit_log();

-- ============================================================================
-- PART 7: Create data validation functions
-- ============================================================================

-- Validate email format
CREATE OR REPLACE FUNCTION is_valid_email(email TEXT)
RETURNS BOOLEAN AS $$
BEGIN
  RETURN email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$';
END;
$$ LANGUAGE plpgsql IMMUTABLE;

-- Validate URL format
CREATE OR REPLACE FUNCTION is_valid_url(url TEXT)
RETURNS BOOLEAN AS $$
BEGIN
  RETURN url ~* '^https?://[^\s/$.?#].[^\s]*$';
END;
$$ LANGUAGE plpgsql IMMUTABLE;

-- Validate slug format (lowercase alphanumeric with hyphens)
CREATE OR REPLACE FUNCTION is_valid_slug(slug TEXT)
RETURNS BOOLEAN AS $$
BEGIN
  RETURN slug ~* '^[a-z0-9]+(?:-[a-z0-9]+)*$';
END;
$$ LANGUAGE plpgsql IMMUTABLE;

-- Validate phone number (basic international format)
CREATE OR REPLACE FUNCTION is_valid_phone(phone TEXT)
RETURNS BOOLEAN AS $$
BEGIN
  RETURN phone ~* '^\+?[1-9]\d{1,14}$';
END;
$$ LANGUAGE plpgsql IMMUTABLE;

-- Validate price (positive decimal)
CREATE OR REPLACE FUNCTION is_valid_price(price DECIMAL)
RETURNS BOOLEAN AS $$
BEGIN
  RETURN price >= 0;
END;
$$ LANGUAGE plpgsql IMMUTABLE;

-- Validate date range (start before end)
CREATE OR REPLACE FUNCTION is_valid_date_range(start_date TIMESTAMPTZ, end_date TIMESTAMPTZ)
RETURNS BOOLEAN AS $$
BEGIN
  RETURN start_date < end_date;
END;
$$ LANGUAGE plpgsql IMMUTABLE;

-- ============================================================================
-- PART 8: Add validation constraints
-- ============================================================================

-- Email validation on users
ALTER TABLE users ADD CONSTRAINT users_email_format_check 
  CHECK (is_valid_email(email));

-- Email validation on email_subscribers
ALTER TABLE email_subscribers ADD CONSTRAINT email_subscribers_email_format_check 
  CHECK (is_valid_email(email));

-- Slug validation on tenants
ALTER TABLE tenants ADD CONSTRAINT tenants_slug_format_check 
  CHECK (is_valid_slug(slug));

-- Slug validation on pages
ALTER TABLE pages ADD CONSTRAINT pages_slug_format_check 
  CHECK (is_valid_slug(slug));

-- Slug validation on blog_posts
ALTER TABLE blog_posts ADD CONSTRAINT blog_posts_slug_format_check 
  CHECK (is_valid_slug(slug));

-- Price validation on products
ALTER TABLE products ADD CONSTRAINT products_price_check 
  CHECK (is_valid_price(price));

-- Price validation on product_variants
ALTER TABLE product_variants ADD CONSTRAINT product_variants_price_check 
  CHECK (is_valid_price(price));

-- URL validation on custom domains
ALTER TABLE tenants ADD CONSTRAINT tenants_custom_domain_format_check 
  CHECK (custom_domain IS NULL OR is_valid_url('https://' || custom_domain));

-- ============================================================================
-- PART 9: Create helper functions for soft delete
-- ============================================================================

-- Function to soft delete a record
CREATE OR REPLACE FUNCTION soft_delete(table_name TEXT, record_id UUID)
RETURNS BOOLEAN AS $$
DECLARE
  query TEXT;
BEGIN
  query := format('UPDATE %I SET deleted_at = NOW() WHERE id = $1 AND deleted_at IS NULL', table_name);
  EXECUTE query USING record_id;
  RETURN FOUND;
END;
$$ LANGUAGE plpgsql;

-- Function to restore a soft deleted record
CREATE OR REPLACE FUNCTION restore_deleted(table_name TEXT, record_id UUID)
RETURNS BOOLEAN AS $$
DECLARE
  query TEXT;
BEGIN
  query := format('UPDATE %I SET deleted_at = NULL WHERE id = $1 AND deleted_at IS NOT NULL', table_name);
  EXECUTE query USING record_id;
  RETURN FOUND;
END;
$$ LANGUAGE plpgsql;

-- Function to permanently delete soft deleted records older than specified days
CREATE OR REPLACE FUNCTION purge_deleted_records(table_name TEXT, days_old INTEGER DEFAULT 30)
RETURNS INTEGER AS $$
DECLARE
  query TEXT;
  deleted_count INTEGER;
BEGIN
  query := format('DELETE FROM %I WHERE deleted_at < NOW() - INTERVAL ''%s days''', table_name, days_old);
  EXECUTE query;
  GET DIAGNOSTICS deleted_count = ROW_COUNT;
  RETURN deleted_count;
END;
$$ LANGUAGE plpgsql;

-- ============================================================================
-- PART 10: Update RLS policies to respect soft deletes
-- ============================================================================

-- Drop and recreate policies to include deleted_at checks
-- This ensures soft deleted records are not visible in queries

-- Products policies (updated)
DROP POLICY IF EXISTS "Products are viewable by everyone" ON products;
CREATE POLICY "Products are viewable by everyone" ON products FOR SELECT 
  USING (is_active = true AND deleted_at IS NULL);

DROP POLICY IF EXISTS "Admins can manage products" ON products;
CREATE POLICY "Admins can manage products" ON products FOR ALL USING (
  deleted_at IS NULL AND EXISTS (
    SELECT 1 FROM users WHERE users.id = auth.uid() AND users.tenant_id = products.tenant_id AND users.role = 'admin'
  )
);

-- Blog posts policies (updated)
DROP POLICY IF EXISTS "Published blog posts are viewable by everyone" ON blog_posts;
CREATE POLICY "Published blog posts are viewable by everyone" ON blog_posts FOR SELECT 
  USING (is_published = true AND deleted_at IS NULL);

DROP POLICY IF EXISTS "Admins can manage blog posts" ON blog_posts;
CREATE POLICY "Admins can manage blog posts" ON blog_posts FOR ALL USING (
  deleted_at IS NULL AND EXISTS (
    SELECT 1 FROM users WHERE users.id = auth.uid() AND users.tenant_id = blog_posts.tenant_id AND users.role = 'admin'
  )
);

-- Pages policies (updated)
DROP POLICY IF EXISTS "Published pages are viewable by everyone" ON pages;
CREATE POLICY "Published pages are viewable by everyone" ON pages FOR SELECT 
  USING (is_published = true AND deleted_at IS NULL);

DROP POLICY IF EXISTS "Admins can manage pages" ON pages;
CREATE POLICY "Admins can manage pages" ON pages FOR ALL USING (
  deleted_at IS NULL AND EXISTS (
    SELECT 1 FROM users WHERE users.id = auth.uid() AND users.tenant_id = pages.tenant_id AND users.role = 'admin'
  )
);

-- ============================================================================
-- Migration Complete
-- ============================================================================

COMMENT ON TABLE audit_logs IS 'Comprehensive audit trail for all critical data changes';
COMMENT ON FUNCTION create_audit_log() IS 'Automatically creates audit log entries for tracked tables';
COMMENT ON FUNCTION soft_delete(TEXT, UUID) IS 'Soft deletes a record by setting deleted_at timestamp';
COMMENT ON FUNCTION restore_deleted(TEXT, UUID) IS 'Restores a soft deleted record';
COMMENT ON FUNCTION purge_deleted_records(TEXT, INTEGER) IS 'Permanently deletes soft deleted records older than specified days';
