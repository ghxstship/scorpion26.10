import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { createConnectLoginLink } from '@/lib/stripe/connect'
import { requireAdmin } from '@/lib/utils/api-helpers'
import { typedFrom } from '@/lib/supabase/typed-client'

export async function POST() {
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

    // Create login link for Stripe Express dashboard
    const dashboardUrl = await createConnectLoginLink(tenant.stripe_account_id)

    return NextResponse.json({ url: dashboardUrl })
  } catch (error) {
    console.error('Stripe Connect dashboard link error:', error)
    return NextResponse.json(
      { error: 'Failed to create dashboard link' },
      { status: 500 }
    )
  }
}
