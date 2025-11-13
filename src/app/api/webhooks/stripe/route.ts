import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { stripe } from '@/lib/stripe'
import { createClient } from '@/lib/supabase/server'
import { handleError } from '@/lib/utils/api-helpers'
import { typedUpdate } from '@/lib/supabase/typed-client'


const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!

export async function POST(request: NextRequest) {
  try {
    const body = await request.text()
    const signature = request.headers.get('stripe-signature')

    if (!signature) {
      return NextResponse.json(
        { error: 'Missing stripe-signature header' },
        { status: 400 }
      )
    }

    // Verify webhook signature
    let event: Stripe.Event
    try {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret)
    } catch (err) {
      console.error('Webhook signature verification failed:', err)
      return NextResponse.json(
        { error: 'Invalid signature' },
        { status: 400 }
      )
    }

    const supabase = await createClient()

    // Handle different event types
    switch (event.type) {
      case 'payment_intent.succeeded': {
        const paymentIntent = event.data.object as Stripe.PaymentIntent
        
        // Update order status to completed
        const { error } = await typedUpdate(supabase, 'orders', {
            status: 'completed',
            stripe_payment_intent_id: paymentIntent.id,
            paid_at: new Date().toISOString(),
          })
          .eq('stripe_payment_intent_id', paymentIntent.id)

        if (error) {
          console.error('Error updating order:', error)
        }
        break
      }

      case 'payment_intent.payment_failed': {
        const paymentIntent = event.data.object as Stripe.PaymentIntent
        
        // Update order status to failed
        const { error } = await typedUpdate(supabase, 'orders', {
            status: 'failed',
            stripe_payment_intent_id: paymentIntent.id,
          })
          .eq('stripe_payment_intent_id', paymentIntent.id)

        if (error) {
          console.error('Error updating order:', error)
        }
        break
      }

      case 'charge.refunded': {
        const charge = event.data.object as Stripe.Charge
        
        // Update order status to refunded
        const { error } = await typedUpdate(supabase, 'orders', {
            status: 'refunded',
            refunded_at: new Date().toISOString(),
          })
          .eq('stripe_payment_intent_id', charge.payment_intent as string)

        if (error) {
          console.error('Error updating order:', error)
        }
        break
      }

      case 'customer.subscription.created':
      case 'customer.subscription.updated': {
        const subscription = event.data.object as Stripe.Subscription
        const sub = subscription as unknown as {
          id: string
          customer: string | { id: string }
          status: string
          current_period_start: number
          current_period_end: number
          cancel_at_period_end: boolean
        }
        
        // Update subscription in database
        const { error } = await typedUpdate(supabase, 'subscriptions', {
            stripe_customer_id: typeof sub.customer === 'string' ? sub.customer : sub.customer.id,
            status: sub.status as 'active' | 'canceled' | 'past_due' | 'unpaid' | 'trialing',
            current_period_start: new Date(sub.current_period_start * 1000).toISOString(),
            current_period_end: new Date(sub.current_period_end * 1000).toISOString(),
            cancel_at_period_end: sub.cancel_at_period_end,
          })
          .eq('stripe_subscription_id', sub.id)

        if (error) {
          console.error('Error updating subscription:', error)
        }
        break
      }

      case 'customer.subscription.deleted': {
        const subscription = event.data.object as Stripe.Subscription
        
        // Mark subscription as cancelled
        const { error } = await typedUpdate(supabase, 'subscriptions', {
            status: 'canceled',
            cancelled_at: new Date().toISOString(),
          })
          .eq('stripe_subscription_id', subscription.id)

        if (error) {
          console.error('Error updating subscription:', error)
        }
        break
      }

      default:
        console.log(`Unhandled event type: ${event.type}`)
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error('Webhook error:', error)
    return handleError(error)
  }
}
