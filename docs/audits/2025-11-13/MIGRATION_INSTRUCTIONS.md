# Migration Instructions
**Date:** 2025-11-13  
**Project:** Scorpion26.10

---

## Critical Migrations to Apply

Two new migrations have been created to fix critical security issues:

1. `20251113_add_webhook_timestamp_fields.sql` - Adds timestamp tracking for payments
2. `20251113_add_webhook_idempotency.sql` - Prevents duplicate webhook processing

---

## Option 1: Apply via Supabase Dashboard (Recommended)

### Step 1: Access Supabase SQL Editor
1. Go to your Supabase project dashboard
2. Navigate to **SQL Editor** in the left sidebar
3. Click **New Query**

### Step 2: Apply First Migration
Copy and paste the contents of:
`/supabase/migrations/20251113_add_webhook_timestamp_fields.sql`

Click **Run** to execute.

### Step 3: Apply Second Migration
Copy and paste the contents of:
`/supabase/migrations/20251113_add_webhook_idempotency.sql`

Click **Run** to execute.

### Step 4: Verify Migrations
Run this query to verify:
```sql
-- Check new fields exist
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'orders' 
  AND column_name IN ('paid_at', 'refunded_at');

SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'subscriptions' 
  AND column_name = 'cancelled_at';

-- Check webhook_events table exists
SELECT table_name 
FROM information_schema.tables 
WHERE table_name = 'webhook_events';
```

---

## Option 2: Apply via Supabase CLI

If you have Supabase CLI configured:

```bash
# Link to your project (if not already linked)
npx supabase link --project-ref YOUR_PROJECT_REF

# Apply migrations
npx supabase db push

# Or apply specific migrations
npx supabase db execute --file supabase/migrations/20251113_add_webhook_timestamp_fields.sql
npx supabase db execute --file supabase/migrations/20251113_add_webhook_idempotency.sql
```

---

## Option 3: Direct SQL Connection

If you have direct database access:

```bash
# Using psql
psql "postgresql://postgres:[PASSWORD]@[HOST]:[PORT]/postgres" \
  -f supabase/migrations/20251113_add_webhook_timestamp_fields.sql

psql "postgresql://postgres:[PASSWORD]@[HOST]:[PORT]/postgres" \
  -f supabase/migrations/20251113_add_webhook_idempotency.sql
```

---

## After Migrations: Regenerate Types

### Option A: Using Supabase CLI (Recommended)
```bash
npx supabase gen types typescript --project-id YOUR_PROJECT_ID > src/types/database.ts
```

### Option B: Manual Type Updates
If CLI doesn't work, manually add these types to `src/types/database.ts`:

```typescript
// Add to orders table interface
export interface Orders {
  // ... existing fields
  paid_at: string | null
  refunded_at: string | null
}

// Add to subscriptions table interface
export interface Subscriptions {
  // ... existing fields
  cancelled_at: string | null
}

// Add new table
export interface WebhookEvents {
  id: string
  event_id: string
  event_type: string
  provider: string
  processed_at: string
  payload: Json | null
  created_at: string
}

// Add to Database interface
export interface Database {
  public: {
    Tables: {
      // ... existing tables
      webhook_events: {
        Row: WebhookEvents
        Insert: Omit<WebhookEvents, 'id' | 'created_at' | 'processed_at'>
        Update: Partial<Omit<WebhookEvents, 'id' | 'created_at'>>
      }
    }
  }
}
```

---

## Verification Steps

After applying migrations and regenerating types:

1. **Check TypeScript Compilation**
   ```bash
   npm run build
   ```
   Should complete without type errors in webhook handler.

2. **Test Webhook Endpoint**
   - Use Stripe CLI to send test webhooks
   - Verify idempotency (send same event twice)
   - Check webhook_events table populated

3. **Test Payment Flow**
   - Create test order
   - Complete payment
   - Verify `paid_at` timestamp set

4. **Test Refund Flow**
   - Refund test order
   - Verify `refunded_at` timestamp set

---

## Rollback (If Needed)

If issues occur, rollback using the documented procedures in each migration file:

```sql
-- Rollback webhook timestamp fields
DROP INDEX IF EXISTS idx_orders_paid_at;
DROP INDEX IF EXISTS idx_subscriptions_cancelled_at;
ALTER TABLE orders DROP COLUMN IF EXISTS paid_at;
ALTER TABLE orders DROP COLUMN IF EXISTS refunded_at;
ALTER TABLE subscriptions DROP COLUMN IF EXISTS cancelled_at;

-- Rollback webhook idempotency
DROP FUNCTION IF EXISTS cleanup_old_webhook_events();
DROP TABLE IF EXISTS webhook_events CASCADE;
```

---

## Next Steps After Migrations

1. ✅ Migrations applied
2. ✅ Types regenerated
3. ⏳ Test critical fixes
4. ⏳ Continue with Part 2 audit (Frontend & UI)
5. ⏳ Continue with Part 3 audit (Testing & DevOps)

---

**Note:** These migrations are safe to apply in production as they only ADD fields/tables and don't modify existing data.
