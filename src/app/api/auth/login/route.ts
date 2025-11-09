import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'
import { loginSchema } from '@/lib/utils/validation'
import { handleError } from '@/lib/utils/api-helpers'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { email, password } = loginSchema.parse(body)

    const supabase = await createClient()

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 })
    }

    return NextResponse.json({
      user: data.user,
      session: data.session,
    })
  } catch (error) {
    return handleError(error)
  }
}
