import { NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import { requireAdmin, handleError } from '@/lib/utils/api-helpers'


export async function POST(request: Request) {
  try {
    const authResult = await requireAdmin()
    if (authResult instanceof NextResponse) return authResult

    const { email, country = 'US' } = await request.json()

    const account = await stripe.accounts.create({
      type: 'express',
      email,
      country,
      capabilities: {
        card_payments: { requested: true },
        transfers: { requested: true },
      },
    })

    const accountLink = await stripe.accountLinks.create({
      account: account.id,
      refresh_url: `${process.env.NEXT_PUBLIC_SITE_URL}/admin/settings`,
      return_url: `${process.env.NEXT_PUBLIC_SITE_URL}/admin/settings`,
      type: 'account_onboarding',
    })

    return NextResponse.json({ accountId: account.id, url: accountLink.url })
  } catch (error) {
    return handleError(error)
  }
}
