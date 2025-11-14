import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'
import { loginSchema } from '@/lib/utils/validation'
import { handleError } from '@/lib/utils/api-helpers'
import { withRateLimit } from '@/lib/security/rate-limit'
import { isAccountLocked, recordLoginAttempt, clearLoginAttempts, getRemainingAttempts } from '@/lib/auth/account-lockout'

async function loginHandler(request: Request) {
  try {
    const body = await request.json()
    const { email, password } = loginSchema.parse(body)

    // Check if account is locked
    const lockStatus = await isAccountLocked(email)
    if (lockStatus.locked) {
      const remainingMinutes = Math.ceil((lockStatus.remainingTime || 0) / 60000)
      return NextResponse.json(
        { 
          error: 'Account temporarily locked due to multiple failed login attempts',
          remainingTime: remainingMinutes,
          message: `Please try again in ${remainingMinutes} minute(s)`
        },
        { status: 429 }
      )
    }

    const supabase = await createClient()
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0] || 'unknown'

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      // Record failed attempt
      await recordLoginAttempt(email, false, ip)
      const remaining = await getRemainingAttempts(email)
      
      return NextResponse.json(
        { 
          error: error.message,
          remainingAttempts: remaining,
          message: remaining > 0 
            ? `Invalid credentials. ${remaining} attempt(s) remaining before account lockout.`
            : 'Account will be locked after next failed attempt.'
        },
        { status: 400 }
      )
    }

    // Record successful attempt and clear lockout
    await recordLoginAttempt(email, true, ip)
    await clearLoginAttempts(email)

    return NextResponse.json({
      user: data.user,
      session: data.session,
    })
  } catch (error) {
    return handleError(error)
  }
}

// Apply rate limiting: 5 attempts per 15 minutes
export const POST = withRateLimit(loginHandler, 'auth')
