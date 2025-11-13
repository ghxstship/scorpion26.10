import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { listConnectPayouts } from '@/lib/stripe/connect'
import { requireAdmin } from '@/lib/utils/api-helpers'
import { typedFrom } from '@/lib/supabase/typed-client'

export async function GET(request: NextRequest) {
  // Verify admin access
  const authResult = await requireAdmin()
  if (authResult instanceof NextResponse) {
    return authResult
  }

  const { userProfile } = authResult as { user: unknown; userProfile: { tenant_id: string } }

  try {
    const supabase = await createClient()
    const { searchParams } = new URL(request.url)
    const limit = parseInt(searchParams.get('limit') || '10')

    // Get tenant's Stripe account ID
    const { data: tenant } = await typedFrom(supabase, 'tenants')
      .select('stripe_account_id')
      .eq('id', userProfile.tenant_id)
      .single()

    if (!tenant?.stripe_account_id) {
      return NextResponse.json(
        { error: 'No Stripe account connected' },
        { status: 404 }
      )
    }

    // Get payouts from Stripe
    const payouts = await listConnectPayouts(tenant.stripe_account_id, limit)

    return NextResponse.json({
      payouts: payouts.data.map(payout => ({
        id: payout.id,
        amount: payout.amount,
        currency: payout.currency,
        arrival_date: payout.arrival_date,
        status: payout.status,
        created: payout.created,
        description: payout.description,
      })),
      has_more: payouts.has_more,
    })
  } catch (error) {
    console.error('Stripe Connect payouts fetch error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch payouts' },
      { status: 500 }
    )
  }
}
