import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'
import { requireAdmin, handleError } from '@/lib/utils/api-helpers'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-10-29.clover',
})

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const authResult = await requireAdmin()
    if (authResult instanceof NextResponse) return authResult

    const supabase = await createClient()

    // Get order
    const { data: order, error: orderError } = await supabase
      .from('orders')
      .select('*')
      .eq('id', id)
      .single()

    if (orderError || !order) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 })
    }

    // Process refund with Stripe
    if (order && typeof order === 'object' && 'stripe_payment_intent_id' in order) {
      const paymentIntentId = String(order.stripe_payment_intent_id)
      if (paymentIntentId) {
        await stripe.refunds.create({
          payment_intent: paymentIntentId,
        })
      }
    }

    // Update order status
    const { data, error } = await supabase
      .from('orders')
      .update({ status: 'refunded' })
      .eq('id', id)
      .select()
      .single()

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 })
    }

    return NextResponse.json(data)
  } catch (error) {
    return handleError(error)
  }
}
