-- Migration: Add webhook events table for idempotency
-- Date: 2025-11-13
-- Description: Create table to track processed webhook events and prevent duplicate processing
-- Fixes: F005 - No Webhook Idempotency Handling

-- ============================================================================
-- Create webhook_events table
-- ============================================================================

CREATE TABLE IF NOT EXISTS webhook_events (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  event_id TEXT NOT NULL UNIQUE,
  event_type TEXT NOT NULL,
  provider TEXT NOT NULL DEFAULT 'stripe',
  processed_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  payload JSONB,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Add index for fast event_id lookups
CREATE INDEX IF NOT EXISTS idx_webhook_events_event_id ON webhook_events(event_id);

-- Add index for event type queries
CREATE INDEX IF NOT EXISTS idx_webhook_events_type ON webhook_events(event_type);

-- Add index for provider queries
CREATE INDEX IF NOT EXISTS idx_webhook_events_provider ON webhook_events(provider);

-- Add index for processed_at for cleanup queries
CREATE INDEX IF NOT EXISTS idx_webhook_events_processed_at ON webhook_events(processed_at);

-- ============================================================================
-- Row Level Security
-- ============================================================================

ALTER TABLE webhook_events ENABLE ROW LEVEL SECURITY;

-- Only allow system/admin access to webhook events
CREATE POLICY "Webhook events are system-only" ON webhook_events FOR ALL USING (false);

-- ============================================================================
-- Cleanup function for old webhook events
-- ============================================================================

-- Keep webhook events for 90 days for audit purposes
CREATE OR REPLACE FUNCTION cleanup_old_webhook_events()
RETURNS void AS $$
BEGIN
  DELETE FROM webhook_events 
  WHERE processed_at < NOW() - INTERVAL '90 days';
END;
$$ LANGUAGE plpgsql;

-- ============================================================================
-- Rollback Instructions
-- ============================================================================
-- To rollback this migration, run:
--
-- DROP FUNCTION IF EXISTS cleanup_old_webhook_events();
-- DROP TABLE IF EXISTS webhook_events CASCADE;
