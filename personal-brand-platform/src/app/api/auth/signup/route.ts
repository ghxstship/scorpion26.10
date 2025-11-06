import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'
import { z } from 'zod'
import type { Database } from '@/types/database'

const signupSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  fullName: z.string().min(2),
  tenantId: z.string().uuid().optional(),
})

export async function POST(request: Request) {
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

    const { error: profileError } = await supabase
      .from('users')
      .insert(userInsert as any)

    if (profileError) {
      return NextResponse.json({ error: profileError.message }, { status: 500 })
    }

    return NextResponse.json({
      user: authData.user,
      session: authData.session,
    })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.issues }, { status: 400 })
    }
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
