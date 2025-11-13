import { NextRequest, NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import { createClient } from '@/lib/supabase/server'
import { requireAuth, handleError } from '@/lib/utils/api-helpers'
import { typedFrom, typedUpdate } from '@/lib/supabase/typed-client'


// POST /api/subscriptions/[id]/resume - Resume a cancelled subscription
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const user = await requireAuth()
    if (user instanceof NextResponse) return user

    const supabase = await createClient()

    // Get subscription
    const { data: subscription, error: fetchError } = await typedFrom(supabase, 'subscriptions')
      .select('*')
      .eq('id', id)
      .eq('user_id', user.id)
      .single()

    if (fetchError) throw fetchError

    if (!subscription || typeof subscription !== 'object' || !('stripe_subscription_id' in subscription)) {
      return NextResponse.json({ error: 'Subscription not found' }, { status: 404 })
    }

    const stripeSubscriptionId = String(subscription.stripe_subscription_id)

    // Check if subscription is set to cancel
    if (typeof subscription === 'object' && 'cancel_at_period_end' in subscription && !subscription.cancel_at_period_end) {
      return NextResponse.json(
        { error: 'Subscription is not scheduled for cancellation' },
        { status: 400 }
      )
    }

    // Resume subscription in Stripe (remove cancellation)
    await stripe.subscriptions.update(stripeSubscriptionId, {
      cancel_at_period_end: false,
    })

    // Update in database
    const { data: updatedSubscription, error: updateError } = await typedUpdate(supabase, 'subscriptions', {
        cancel_at_period_end: false,
        status: 'active',
        updated_at: new Date().toISOString(),
      })
      .eq('id', id)
      .select()
      .single()

    if (updateError) throw updateError

    return NextResponse.json({
      data: updatedSubscription,
      message: 'Subscription resumed successfully'
    })
  } catch (error) {
    return handleError(error)
  }
}
