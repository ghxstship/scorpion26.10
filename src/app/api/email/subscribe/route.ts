import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { typedFrom, typedInsert, typedUpdate } from '@/lib/supabase/typed-client'
import { Resend } from 'resend'

// Lazy-load Resend
function getResend() {
  if (!process.env.RESEND_API_KEY) {
    throw new Error('RESEND_API_KEY is not set')
  }
  return new Resend(process.env.RESEND_API_KEY)
}

export async function POST(request: Request) {
  const supabase = await createClient()

  try {
    const body = await request.json()
    const { email, first_name, tenant_id } = body

    // Validate email
    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      )
    }

    // Check if already subscribed
    const { data: existing } = await typedFrom(supabase, 'email_subscribers')
      .select('id, status')
      .eq('email', email)
      .eq('tenant_id', tenant_id)
      .single()

    if (existing) {
      if (existing.status === 'active') {
        return NextResponse.json(
          { error: 'Email already subscribed' },
          { status: 400 }
        )
      }

      // Reactivate subscription
      const { error } = await typedUpdate(supabase, 'email_subscribers', { status: 'active' })
        .eq('id', existing.id)

      if (error) throw error
    } else {
      // Create new subscription
      const { error } = await typedInsert(supabase, 'email_subscribers', {
        email,
        first_name,
        tenant_id,
        status: 'active',
      })

      if (error) throw error
    }

    // Send welcome email
    try {
      const resend = getResend()
      await resend.emails.send({
        from: 'welcome@yourdomain.com',
        to: email,
        subject: 'Welcome to our newsletter!',
        html: `
          <h1>Welcome${first_name ? `, ${first_name}` : ''}!</h1>
          <p>Thank you for subscribing to our newsletter. We're excited to have you on board!</p>
          <p>You'll receive updates, insights, and exclusive content directly to your inbox.</p>
          <p>If you ever want to unsubscribe, you can do so from any email we send.</p>
        `,
      })
    } catch (emailError) {
      console.error('Error sending welcome email:', emailError)
      // Don't fail the subscription if email fails
    }

    return NextResponse.json(
      { message: 'Successfully subscribed' },
      { status: 201 }
    )
  } catch (error) {
    console.error('Error subscribing email:', error)
    return NextResponse.json(
      { error: 'Failed to subscribe' },
      { status: 500 }
    )
  }
}
