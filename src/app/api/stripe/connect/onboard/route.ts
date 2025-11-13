import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { createConnectAccount, createConnectAccountLink } from '@/lib/stripe/connect'
import { requireAdmin } from '@/lib/utils/api-helpers'
import { typedFrom, typedUpdate } from '@/lib/supabase/typed-client'

export async function POST(request: NextRequest) {
  // Verify admin access
  const authResult = await requireAdmin()
  if (authResult instanceof NextResponse) {
    return authResult
  }

  const { user, userProfile } = authResult as unknown as { user: { email?: string }; userProfile: { tenant_id: string } }

  try {
    const { email, country = 'US' } = await request.json()
    const supabase = await createClient()

    // Check if tenant already has a Stripe account
    const { data: tenant } = await typedFrom(supabase, 'tenants')
      .select('stripe_account_id')
      .eq('id', userProfile.tenant_id)
      .single()

    let accountId = tenant?.stripe_account_id

    // Create new Connect account if doesn't exist
    if (!accountId) {
      const account = await createConnectAccount(email || user.email!, country)
      accountId = account.id

      // Save to database
      await typedUpdate(supabase, 'tenants', { stripe_account_id: accountId })
        .eq('id', userProfile.tenant_id)
    }

    // Create account link for onboarding
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
    const refreshUrl = `${siteUrl}/admin/settings/payments?refresh=true`
    const returnUrl = `${siteUrl}/admin/settings/payments?success=true`

    const accountLinkUrl = await createConnectAccountLink(
      accountId,
      refreshUrl,
      returnUrl
    )

    return NextResponse.json({
      url: accountLinkUrl,
      accountId,
    })
  } catch (error) {
    console.error('Stripe Connect onboarding error:', error)
    return NextResponse.json(
      { error: 'Failed to create onboarding link' },
      { status: 500 }
    )
  }
}
