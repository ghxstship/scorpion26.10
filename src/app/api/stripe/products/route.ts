import { NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import { handleError } from '@/lib/utils/api-helpers'


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
