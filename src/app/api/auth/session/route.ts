import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'
import { handleError } from '@/lib/utils/api-helpers'

export async function GET() {
  try {
    const supabase = await createClient()
    const { data: { session }, error } = await supabase.auth.getSession()

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 })
    }

    return NextResponse.json({ session })
  } catch (error) {
    return handleError(error)
  }
}
