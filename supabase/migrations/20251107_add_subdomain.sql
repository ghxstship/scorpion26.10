-- Add subdomain column to tenants table
ALTER TABLE tenants ADD COLUMN IF NOT EXISTS subdomain TEXT UNIQUE;

-- Populate subdomain from slug for existing tenants
UPDATE tenants SET subdomain = slug WHERE subdomain IS NULL;

-- Make subdomain required for new tenants
ALTER TABLE tenants ALTER COLUMN subdomain SET NOT NULL;

-- Create index for faster subdomain lookups
CREATE INDEX IF NOT EXISTS idx_tenants_subdomain ON tenants(subdomain);
CREATE INDEX IF NOT EXISTS idx_tenants_custom_domain ON tenants(custom_domain);

-- Add comment for documentation
COMMENT ON COLUMN tenants.subdomain IS 'Subdomain for tenant (e.g., "tenant1" for tenant1.platform.com)';
COMMENT ON COLUMN tenants.custom_domain IS 'Custom domain for tenant (e.g., "www.customdomain.com")';
