import { NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import { requireAdmin, handleError } from '@/lib/utils/api-helpers'


export async function POST(request: Request) {
  try {
    const authResult = await requireAdmin()
    if (authResult instanceof NextResponse) return authResult

    const { paymentIntentId, amount } = await request.json()

    const refund = await stripe.refunds.create({
      payment_intent: paymentIntentId,
      amount: amount ? Math.round(amount * 100) : undefined,
    })

    return NextResponse.json(refund)
  } catch (error) {
    return handleError(error)
  }
}
