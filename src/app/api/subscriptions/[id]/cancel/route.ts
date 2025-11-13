import { NextRequest, NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import { createClient } from '@/lib/supabase/server'
import { requireAuth, handleError } from '@/lib/utils/api-helpers'
import { typedFrom, typedUpdate } from '@/lib/supabase/typed-client'


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
      .single()

    if (fetchError || !subscription) {
      return NextResponse.json({ error: 'Subscription not found' }, { status: 404 })
    }

    // Verify ownership
    if (subscription.user_id !== user.id) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    // Cancel subscription in Stripe
    await stripe.subscriptions.update(
      subscription.stripe_subscription_id,
      { cancel_at_period_end: true }
    )

    // Update in database
    const { data: updatedSubscription, error } = await typedUpdate(supabase, 'subscriptions', {
        cancel_at_period_end: true,
        status: 'canceled'
      })
      .eq('id', id)
      .select()
      .single()

    if (error) throw error

    return NextResponse.json({
      data: updatedSubscription,
      message: 'Subscription will be canceled at the end of the billing period'
    })
  } catch (error) {
    return handleError(error)
  }
}
