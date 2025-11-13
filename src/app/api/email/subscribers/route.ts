import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'
import { requireAdmin, handleError } from '@/lib/utils/api-helpers'

export async function GET(request: Request) {
  try {
    const authResult = await requireAdmin()
    if (authResult instanceof NextResponse) return authResult

    const { searchParams } = new URL(request.url)
    const tenantId = searchParams.get('tenantId')

    if (!tenantId) {
      return NextResponse.json({ error: 'Tenant ID required' }, { status: 400 })
    }

    const supabase = await createClient()
    const { data, error } = await supabase
      .from('email_subscribers')
      .select('*')
      .eq('tenant_id', tenantId)
      .order('subscribed_at', { ascending: false })

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 })
    }

    return NextResponse.json(data)
  } catch (error) {
    return handleError(error)
  }
}
