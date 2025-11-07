import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'
import { requireAdmin, handleError } from '@/lib/utils/api-helpers'
import { Resend } from 'resend'
import { sendCampaignSchema } from '@/lib/utils/validation-extended'
import { z } from 'zod'
import type { EmailSubscriber, EmailCampaignWithDetails, Updates } from '@/types/database'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: Request) {
  try {
    const authResult = await requireAdmin()
    if (authResult instanceof NextResponse) return authResult

    const body = await request.json()
    const { campaignId, tenantId } = sendCampaignSchema.parse(body)
    const supabase = await createClient()

    // Get campaign
    const { data: campaign, error: campaignError } = await supabase
      .from('email_campaigns')
      .select('*')
      .eq('id', campaignId)
      .single()

    if (campaignError || !campaign) {
      return NextResponse.json({ error: 'Campaign not found' }, { status: 404 })
    }

    // Get subscribers
    const { data: subscribers } = await supabase
      .from('email_subscribers')
      .select('email, first_name')
      .eq('tenant_id', tenantId)
      .eq('status', 'active')

    if (!subscribers || subscribers.length === 0) {
      return NextResponse.json({ error: 'No subscribers found' }, { status: 400 })
    }

    // Send emails (batch)
    const emails = subscribers.map((sub: EmailSubscriber) => ({
      from: 'noreply@yourdomain.com',
      to: sub.email,
      subject: campaign.subject,
      html: campaign.content,
    }))

    await resend.batch.send(emails)

    // Update campaign status
    await supabase
      .from('email_campaigns')
      .update({
        status: 'sent' as const,
        sent_at: new Date().toISOString(),
      } satisfies Updates<'email_campaigns'>)
      .eq('id', campaignId)

    return NextResponse.json({ success: true, sent: emails.length })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation failed', details: error.issues },
        { status: 400 }
      )
    }
    return handleError(error)
  }
}
