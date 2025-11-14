-- Migration: Add timestamp fields for webhook events
-- Date: 2025-11-13
-- Description: Add paid_at, refunded_at to orders and cancelled_at to subscriptions
-- Fixes: F004 - Missing Database Fields for Webhook Events

-- ============================================================================
-- Add timestamp fields to orders table
-- ============================================================================

ALTER TABLE orders ADD COLUMN IF NOT EXISTS paid_at TIMESTAMPTZ;
ALTER TABLE orders ADD COLUMN IF NOT EXISTS refunded_at TIMESTAMPTZ;

-- Add index for paid orders query performance
CREATE INDEX IF NOT EXISTS idx_orders_paid_at ON orders(paid_at) WHERE paid_at IS NOT NULL;

-- ============================================================================
-- Add timestamp field to subscriptions table
-- ============================================================================

ALTER TABLE subscriptions ADD COLUMN IF NOT EXISTS cancelled_at TIMESTAMPTZ;

-- Add index for cancelled subscriptions query performance
CREATE INDEX IF NOT EXISTS idx_subscriptions_cancelled_at ON subscriptions(cancelled_at) WHERE cancelled_at IS NOT NULL;

-- ============================================================================
-- Rollback Instructions
-- ============================================================================
-- To rollback this migration, run:
--
-- DROP INDEX IF EXISTS idx_orders_paid_at;
-- DROP INDEX IF EXISTS idx_subscriptions_cancelled_at;
-- ALTER TABLE orders DROP COLUMN IF EXISTS paid_at;
-- ALTER TABLE orders DROP COLUMN IF EXISTS refunded_at;
-- ALTER TABLE subscriptions DROP COLUMN IF EXISTS cancelled_at;
