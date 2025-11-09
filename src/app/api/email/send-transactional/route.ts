import { NextResponse } from 'next/server'
import { requireAuth, handleError } from '@/lib/utils/api-helpers'
import { Resend } from 'resend'

// Lazy-load Resend
function getResend() {
  if (!process.env.RESEND_API_KEY) {
    throw new Error('RESEND_API_KEY is not set')
  }
  return new Resend(process.env.RESEND_API_KEY)
}

export async function POST(request: Request) {
  try {
    const user = await requireAuth()
    if (user instanceof NextResponse) return user

    const { to, subject, html, templateType } = await request.json()

    const resend = getResend()
    const { data, error } = await resend.emails.send({
      from: 'noreply@yourdomain.com',
      to,
      subject,
      html,
    })

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 })
    }

    return NextResponse.json({ success: true, id: data?.id })
  } catch (error) {
    return handleError(error)
  }
}
