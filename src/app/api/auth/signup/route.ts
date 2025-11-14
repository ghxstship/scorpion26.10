import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'
import { signupSchema } from '@/lib/utils/validation'
import { typedInsert } from '@/lib/supabase/typed-client'
import { withRateLimit } from '@/lib/security/rate-limit'
import type { Database } from '@/types/database'

async function signupHandler(request: Request) {
  try {
    const body = await request.json()
    const { email, password, fullName, tenantId } = signupSchema.parse(body)

    const supabase = await createClient()

    // Sign up the user
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
        },
      },
    })

    if (authError) {
      return NextResponse.json({ error: authError.message }, { status: 400 })
    }

    if (!authData.user) {
      return NextResponse.json({ error: 'Failed to create user' }, { status: 500 })
    }

    // Create user profile
    const userInsert: Database['public']['Tables']['users']['Insert'] = {
      id: authData.user.id,
      email,
      full_name: fullName,
      tenant_id: tenantId || null,
      role: 'customer',
    }

    const { error: profileError } = await typedInsert(supabase, 'users', userInsert)

    if (profileError) {
      return NextResponse.json({ error: profileError.message }, { status: 500 })
    }

    return NextResponse.json({
      user: authData.user,
      session: authData.session,
    })
  } catch (error) {
    if (error && typeof error === 'object' && 'issues' in error) {
      return NextResponse.json({ error: (error as { issues: unknown }).issues }, { status: 400 })
    }
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// Apply rate limiting: 5 signups per 15 minutes
export const POST = withRateLimit(signupHandler, 'auth')
