import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'
import { resetPasswordSchema } from '@/lib/utils/validation'
import { handleError } from '@/lib/utils/api-helpers'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { email } = resetPasswordSchema.parse(body)

    const supabase = await createClient()
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/reset-password`,
    })

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 })
    }

    return NextResponse.json({ message: 'Password reset email sent' })
  } catch (error) {
    return handleError(error)
  }
}
