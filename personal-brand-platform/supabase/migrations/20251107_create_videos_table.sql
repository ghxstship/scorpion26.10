-- Create videos table
CREATE TABLE IF NOT EXISTS videos (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  url TEXT NOT NULL,
  provider TEXT CHECK (provider IN ('youtube', 'vimeo', 'custom')) NOT NULL,
  is_premium BOOLEAN DEFAULT false,
  thumbnail_url TEXT,
  duration_seconds INTEGER,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_videos_tenant ON videos(tenant_id);
CREATE INDEX IF NOT EXISTS idx_videos_premium ON videos(is_premium);

-- Enable RLS
ALTER TABLE videos ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Videos are viewable by everyone" ON videos
  FOR SELECT USING (true);

CREATE POLICY "Admins can manage videos" ON videos
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE users.id = auth.uid() 
      AND users.tenant_id = videos.tenant_id 
      AND users.role = 'admin'
    )
  );

-- Trigger for updated_at
CREATE TRIGGER update_videos_updated_at 
  BEFORE UPDATE ON videos
  FOR EACH ROW 
  EXECUTE FUNCTION update_updated_at_column();

-- Comments
COMMENT ON TABLE videos IS 'Video content for tenants';
COMMENT ON COLUMN videos.provider IS 'Video hosting provider: youtube, vimeo, or custom';
COMMENT ON COLUMN videos.is_premium IS 'Whether video requires subscription/purchase to access';
