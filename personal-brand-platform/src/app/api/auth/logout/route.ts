import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'
import { handleError } from '@/lib/utils/api-helpers'

export async function POST() {
  try {
    const supabase = await createClient()
    const { error } = await supabase.auth.signOut()

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    return handleError(error)
  }
}
