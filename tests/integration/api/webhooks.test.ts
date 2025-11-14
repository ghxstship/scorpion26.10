import { describe, it, expect, beforeEach } from 'vitest'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!
const supabase = createClient(supabaseUrl, supabaseKey)

describe('Webhook Integration Tests', () => {
  beforeEach(async () => {
    // Clean up test data
    await supabase.from('webhook_events').delete().neq('id', '00000000-0000-0000-0000-000000000000')
  })

  it('should store webhook event for idempotency', async () => {
    const eventId = 'evt_test_' + Date.now()
    
    const { data, error } = await supabase
      .from('webhook_events')
      .insert({
        event_id: eventId,
        event_type: 'payment_intent.succeeded',
        provider: 'stripe',
        payload: { test: true }
      })
      .select()
      .single()

    expect(error).toBeNull()
    expect(data?.event_id).toBe(eventId)
  })

  it('should prevent duplicate webhook processing', async () => {
    const eventId = 'evt_duplicate_' + Date.now()
    
    // First insert
    await supabase.from('webhook_events').insert({
      event_id: eventId,
      event_type: 'payment_intent.succeeded',
      provider: 'stripe'
    })

    // Second insert should fail (unique constraint)
    const { error } = await supabase.from('webhook_events').insert({
      event_id: eventId,
      event_type: 'payment_intent.succeeded',
      provider: 'stripe'
    })

    expect(error).not.toBeNull()
    expect(error?.code).toBe('23505') // Unique violation
  })

  it('should update order with paid_at timestamp', async () => {
    // Create test order
    const { data: order } = await supabase
      .from('orders')
      .insert({
        tenant_id: '00000000-0000-0000-0000-000000000000',
        user_id: '00000000-0000-0000-0000-000000000000',
        total_amount: 100,
        status: 'pending',
        stripe_payment_intent_id: 'pi_test_' + Date.now()
      })
      .select()
      .single()

    // Update with paid_at
    const paidAt = new Date().toISOString()
    const { error } = await supabase
      .from('orders')
      .update({
        status: 'completed',
        paid_at: paidAt
      })
      .eq('id', order!.id)

    expect(error).toBeNull()

    // Verify update
    const { data: updated } = await supabase
      .from('orders')
      .select('paid_at, status')
      .eq('id', order!.id)
      .single()

    expect(updated?.status).toBe('completed')
    expect(updated?.paid_at).toBeTruthy()
  })
})
