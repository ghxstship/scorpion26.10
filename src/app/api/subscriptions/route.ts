import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { requireAuth, requireAdmin, handleError } from '@/lib/utils/api-helpers'
import { z } from 'zod'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-10-29.clover',
})

const createSubscriptionSchema = z.object({
  priceId: z.string(),
  tenantId: z.string().uuid(),
})

// GET /api/subscriptions - List user's subscriptions
export async function GET(request: NextRequest) {
  try {
    const user = await requireAuth()
    if (user instanceof NextResponse) return user

    const supabase = await createClient()
    
    const { data: subscriptions, error } = await (supabase as any)
      .from('subscriptions')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })

    if (error) throw error

    return NextResponse.json({ data: subscriptions })
  } catch (error) {
    return handleError(error)
  }
}

// POST /api/subscriptions - Create new subscription
export async function POST(request: NextRequest) {
  try {
    const user = await requireAuth()
    if (user instanceof NextResponse) return user

    const body = await request.json()
    const validatedData = createSubscriptionSchema.parse(body)

    const supabase = await createClient()

    // Get or create Stripe customer
    let stripeCustomerId: string

    const { data: existingSubscription } = await (supabase as any)
      .from('subscriptions')
      .select('stripe_customer_id')
      .eq('user_id', user.id)
      .not('stripe_customer_id', 'is', null)
      .limit(1)
      .single()

    if (existingSubscription && typeof existingSubscription === 'object' && 'stripe_customer_id' in existingSubscription) {
      stripeCustomerId = String(existingSubscription.stripe_customer_id)
    } else {
      // Create new Stripe customer
      const customer = await stripe.customers.create({
        email: user.email,
        metadata: {
          user_id: user.id,
          tenant_id: validatedData.tenantId,
        },
      })
      stripeCustomerId = customer.id
    }

    // Create Stripe subscription
    const subscription = await stripe.subscriptions.create({
      customer: stripeCustomerId,
      items: [{ price: validatedData.priceId }],
      payment_behavior: 'default_incomplete',
      payment_settings: { save_default_payment_method: 'on_subscription' },
      expand: ['latest_invoice.payment_intent'],
    })

    // Save subscription to database
    const sub = subscription as any
    const { data: dbSubscription, error: dbError } = await (supabase as any)
      .from('subscriptions')
      .insert({
        user_id: user.id,
        tenant_id: validatedData.tenantId,
        stripe_subscription_id: sub.id,
        stripe_customer_id: stripeCustomerId,
        stripe_price_id: validatedData.priceId,
        status: sub.status,
        current_period_start: new Date(sub.current_period_start * 1000).toISOString(),
        current_period_end: new Date(sub.current_period_end * 1000).toISOString(),
        cancel_at_period_end: sub.cancel_at_period_end,
      })
      .select()
      .single()

    if (dbError) throw dbError

    // Get client secret for payment
    const invoice = (subscription as any).latest_invoice
    const paymentIntent = (invoice as any)?.payment_intent

    return NextResponse.json({
      data: dbSubscription,
      clientSecret: paymentIntent?.client_secret,
    }, { status: 201 })
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
