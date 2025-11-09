import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { requireAuth, handleError } from '@/lib/utils/api-helpers'
import { z } from 'zod'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-10-29.clover',
})

const updateSubscriptionSchema = z.object({
  priceId: z.string().optional(),
})

// GET /api/subscriptions/[id] - Get subscription details
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const user = await requireAuth()
    if (user instanceof NextResponse) return user

    const supabase = await createClient()
    
    const { data: subscription, error } = await (supabase as any)
      .from('subscriptions')
      .select('*')
      .eq('id', id)
      .eq('user_id', user.id)
      .single()

    if (error) throw error

    if (!subscription) {
      return NextResponse.json(
        { error: 'Subscription not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({ data: subscription })
  } catch (error) {
    return handleError(error)
  }
}

// PUT /api/subscriptions/[id] - Update subscription (change plan)
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const user = await requireAuth()
    if (user instanceof NextResponse) return user

    const body = await request.json()
    const validatedData = updateSubscriptionSchema.parse(body)

    const supabase = await createClient()

    // Get subscription
    const { data: subscription, error: fetchError } = await (supabase as any)
      .from('subscriptions')
      .select('*')
      .eq('id', id)
      .eq('user_id', user.id)
      .single()

    if (fetchError) throw fetchError

    if (!subscription || typeof subscription !== 'object' || !('stripe_subscription_id' in subscription)) {
      return NextResponse.json(
        { error: 'Subscription not found' },
        { status: 404 }
      )
    }

    const stripeSubscriptionId = String(subscription.stripe_subscription_id)

    // Update Stripe subscription if price changed
    if (validatedData.priceId) {
      const stripeSubscription = await stripe.subscriptions.retrieve(stripeSubscriptionId)
      
      await stripe.subscriptions.update(stripeSubscriptionId, {
        items: [{
          id: stripeSubscription.items.data[0].id,
          price: validatedData.priceId,
        }],
        proration_behavior: 'create_prorations',
      })

      // Update database
      const { data: updatedSubscription, error: updateError } = await (supabase as any)
        .from('subscriptions')
        .update({
          stripe_price_id: validatedData.priceId,
          updated_at: new Date().toISOString(),
        })
        .eq('id', id)
        .select()
        .single()

      if (updateError) throw updateError

      return NextResponse.json({ data: updatedSubscription })
    }

    return NextResponse.json({ data: subscription })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation failed', details: error.issues },
        { status: 400 }
      )
    }
    return handleError(error)
  }
}

// DELETE /api/subscriptions/[id] - Cancel subscription immediately
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const user = await requireAuth()
    if (user instanceof NextResponse) return user

    const supabase = await createClient()

    // Get subscription
    const { data: subscription, error: fetchError } = await (supabase as any)
      .from('subscriptions')
      .select('*')
      .eq('id', id)
      .eq('user_id', user.id)
      .single()

    if (fetchError) throw fetchError

    if (!subscription || typeof subscription !== 'object' || !('stripe_subscription_id' in subscription)) {
      return NextResponse.json(
        { error: 'Subscription not found' },
        { status: 404 }
      )
    }

    const stripeSubscriptionId = String(subscription.stripe_subscription_id)

    // Cancel in Stripe immediately
    await stripe.subscriptions.cancel(stripeSubscriptionId)

    // Update database
    const { error: updateError } = await (supabase as any)
      .from('subscriptions')
      .update({
        status: 'cancelled',
        cancelled_at: new Date().toISOString(),
      })
      .eq('id', id)

    if (updateError) throw updateError

    return NextResponse.json({ 
      message: 'Subscription cancelled successfully' 
    })
  } catch (error) {
    return handleError(error)
  }
}
