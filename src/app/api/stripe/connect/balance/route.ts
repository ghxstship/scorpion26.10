import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { getConnectAccountBalance } from '@/lib/stripe/connect'
import { requireAdmin } from '@/lib/utils/api-helpers'
import { typedFrom } from '@/lib/supabase/typed-client'

export async function GET() {
  // Verify admin access
  const authResult = await requireAdmin()
  if (authResult instanceof NextResponse) {
    return authResult
  }

  const { userProfile } = authResult as { user: unknown; userProfile: { tenant_id: string } }

  try {
    const supabase = await createClient()

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

    // Get balance from Stripe
    const balance = await getConnectAccountBalance(tenant.stripe_account_id)

    return NextResponse.json({
      balance: {
        available: balance.available,
        pending: balance.pending,
        currency: balance.available[0]?.currency || 'usd',
      },
    })
  } catch (error) {
    console.error('Stripe Connect balance fetch error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch balance' },
      { status: 500 }
    )
  }
}
