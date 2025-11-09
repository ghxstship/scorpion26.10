import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'
import { handleError } from '@/lib/utils/api-helpers'

export async function POST(request: Request) {
  try {
    const { email, tenantId } = await request.json()
    const supabase = await createClient()

    const { error } = await supabase
      .from('email_subscribers')
      .update({ status: 'unsubscribed' })
      .eq('email', email)
      .eq('tenant_id', tenantId)

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    return handleError(error)
  }
}
