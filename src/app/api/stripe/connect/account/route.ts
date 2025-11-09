import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { getConnectAccount } from '@/lib/stripe/connect'
import { requireAdmin } from '@/lib/utils/api-helpers'

export async function GET(request: NextRequest) {
  // Verify admin access
  const authResult = await requireAdmin()
  if (authResult instanceof NextResponse) {
    return authResult
  }

  const { userProfile } = authResult as any

  try {
    const supabase = await createClient()

    // Get tenant's Stripe account ID
    const { data: tenant } = await (supabase as any)
      .from('tenants')
      .select('stripe_account_id')
      .eq('id', userProfile.tenant_id)
      .single()

    if (!tenant?.stripe_account_id) {
      return NextResponse.json(
        { error: 'No Stripe account connected' },
        { status: 404 }
      )
    }

    // Get account details from Stripe
    const account = await getConnectAccount(tenant.stripe_account_id)

    return NextResponse.json({
      account: {
        id: account.id,
        email: account.email,
        country: account.country,
        charges_enabled: account.charges_enabled,
        payouts_enabled: account.payouts_enabled,
        details_submitted: account.details_submitted,
        type: account.type,
        created: account.created,
      },
    })
  } catch (error) {
    console.error('Stripe Connect account fetch error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch account details' },
      { status: 500 }
    )
  }
}
