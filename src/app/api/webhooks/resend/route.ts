import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { handleError } from '@/lib/utils/api-helpers'
import crypto from 'crypto'

const webhookSecret = process.env.RESEND_WEBHOOK_SECRET!

export async function POST(request: NextRequest) {
  try {
    const body = await request.text()
    const signature = request.headers.get('svix-signature')

    if (!signature) {
      return NextResponse.json(
        { error: 'Missing svix-signature header' },
        { status: 400 }
      )
    }

    // Verify webhook signature (Resend uses Svix for webhooks)
    const timestamp = request.headers.get('svix-timestamp')
    const id = request.headers.get('svix-id')

    if (!timestamp || !id) {
      return NextResponse.json(
        { error: 'Missing webhook headers' },
        { status: 400 }
      )
    }

    // Verify signature
    const signedContent = `${id}.${timestamp}.${body}`
    const expectedSignature = crypto
      .createHmac('sha256', webhookSecret)
      .update(signedContent)
      .digest('base64')

    const signatures = signature.split(' ')
    const isValid = signatures.some(sig => {
      const [, hash] = sig.split(',')
      return hash === expectedSignature
    })

    if (!isValid) {
      console.error('Webhook signature verification failed')
      return NextResponse.json(
        { error: 'Invalid signature' },
        { status: 400 }
      )
    }

    const event = JSON.parse(body)
    const supabase = await createClient()

    // Handle different event types
    switch (event.type) {
      case 'email.sent': {
        const emailData = event.data
        
        // Log email sent
        await (supabase as any)
          .from('email_logs')
          .insert({
            email_id: emailData.email_id,
            recipient: emailData.to,
            subject: emailData.subject,
            status: 'sent',
            sent_at: new Date().toISOString(),
          })
        break
      }

      case 'email.delivered': {
        const emailData = event.data
        
        // Update email status to delivered
        await (supabase as any)
          .from('email_logs')
          .update({
            status: 'delivered',
            delivered_at: new Date().toISOString(),
          })
          .eq('email_id', emailData.email_id)
        break
      }

      case 'email.delivery_delayed': {
        const emailData = event.data
        
        // Update email status to delayed
        await (supabase as any)
          .from('email_logs')
          .update({
            status: 'delayed',
            error_message: emailData.reason || 'Delivery delayed',
          })
          .eq('email_id', emailData.email_id)
        break
      }

      case 'email.bounced': {
        const emailData = event.data
        
        // Update email status to bounced
        await (supabase as any)
          .from('email_logs')
          .update({
            status: 'bounced',
            bounced_at: new Date().toISOString(),
            error_message: emailData.reason || 'Email bounced',
          })
          .eq('email_id', emailData.email_id)

        // Mark subscriber as bounced if exists
        await (supabase as any)
          .from('email_subscribers')
          .update({
            status: 'bounced',
            bounced_at: new Date().toISOString(),
          })
          .eq('email', emailData.to)
        break
      }

      case 'email.complained': {
        const emailData = event.data
        
        // Update email status to complained (spam)
        await (supabase as any)
          .from('email_logs')
          .update({
            status: 'complained',
            complained_at: new Date().toISOString(),
          })
          .eq('email_id', emailData.email_id)

        // Unsubscribe user who complained
        await (supabase as any)
          .from('email_subscribers')
          .update({
            status: 'unsubscribed',
            unsubscribed_at: new Date().toISOString(),
            unsubscribe_reason: 'spam_complaint',
          })
          .eq('email', emailData.to)
        break
      }

      case 'email.opened': {
        const emailData = event.data
        
        // Log email open
        await (supabase as any)
          .from('email_logs')
          .update({
            opened_at: new Date().toISOString(),
            open_count: supabase.rpc('increment', { row_id: emailData.email_id }),
          })
          .eq('email_id', emailData.email_id)
        break
      }

      case 'email.clicked': {
        const emailData = event.data
        
        // Log email click
        await (supabase as any)
          .from('email_logs')
          .update({
            clicked_at: new Date().toISOString(),
            click_count: supabase.rpc('increment', { row_id: emailData.email_id }),
          })
          .eq('email_id', emailData.email_id)
        break
      }

      default:
        console.log(`Unhandled event type: ${event.type}`)
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error('Webhook error:', error)
    return handleError(error)
  }
}
