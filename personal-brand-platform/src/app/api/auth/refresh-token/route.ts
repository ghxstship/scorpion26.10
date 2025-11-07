import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { handleError } from '@/lib/utils/api-helpers'

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient()
    
    // Get the refresh token from the request body
    const { refresh_token } = await request.json()

    if (!refresh_token) {
      return NextResponse.json({ error: 'Refresh token is required' }, { status: 400 })
    }

    // Refresh the session
    const { data, error } = await supabase.auth.refreshSession({ refresh_token })

    if (error) {
      return NextResponse.json({ error: 'Invalid or expired refresh token' }, { status: 401 })
    }

    return NextResponse.json({
      data: {
        access_token: data.session?.access_token,
        refresh_token: data.session?.refresh_token,
        expires_at: data.session?.expires_at,
        user: data.user
      }
    })
  } catch (error) {
    return handleError(error)
  }
}
