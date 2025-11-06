import { NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import { createClient } from '@/lib/supabase/server'

export async function POST(request: Request) {
  const supabase = await createClient()

  try {
    const body = await request.json()
    const { items, customer } = body

    // Get authenticated user (optional for guest checkout)
    const {
      data: { user },
    } = await supabase.auth.getUser()

    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: items.map((item: any) => ({
        price_data: {
          currency: 'usd',
          product_data: {
            name: item.title,
            description: item.type,
          },
          unit_amount: item.price,
        },
        quantity: item.quantity,
      })),
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/checkout`,
      customer_email: customer.email,
      metadata: {
        user_id: user?.id || 'guest',
        customer_name: customer.name,
      },
    })

    // Create order in database
    if (user) {
      const { data: order } = await supabase
        .from('orders')
        .insert({
          user_id: user.id,
          tenant_id: 'default-tenant-id', // Replace with actual tenant ID
          total_amount: items.reduce(
            (sum: number, item: any) => sum + item.price * item.quantity,
            0
          ) / 100,
          status: 'pending',
          stripe_payment_intent_id: session.id,
        })
        .select()
        .single()

      // Create order items
      if (order) {
        await supabase.from('order_items').insert(
          items.map((item: any) => ({
            order_id: order.id,
            product_id: item.id,
            quantity: item.quantity,
            price: item.price / 100,
          }))
        )
      }
    }

    return NextResponse.json({ sessionId: session.id })
  } catch (error) {
    console.error('Checkout error:', error)
    return NextResponse.json(
      { error: 'Failed to create checkout session' },
      { status: 500 }
    )
  }
}
