import { NextResponse } from 'next/server'
import { handleError } from '@/lib/utils/api-helpers'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-11-20.acacia',
})

export async function GET() {
  try {
    const products = await stripe.products.list({
      active: true,
      expand: ['data.default_price'],
    })

    return NextResponse.json(products.data)
  } catch (error) {
    return handleError(error)
  }
}
