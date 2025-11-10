import { NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import { requireAuth, handleError } from '@/lib/utils/api-helpers'


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
