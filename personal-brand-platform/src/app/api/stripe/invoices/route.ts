import { NextResponse } from 'next/server'
import { requireAuth, handleError } from '@/lib/utils/api-helpers'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-10-29.clover',
})

export async function GET() {
  try {
    const user = await requireAuth()
    if (user instanceof NextResponse) return user

    const invoices = await stripe.invoices.list({ limit: 100 })
    return NextResponse.json(invoices.data)
  } catch (error) {
    return handleError(error)
  }
}
