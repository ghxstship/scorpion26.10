import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'
import { requireAuth, handleError } from '@/lib/utils/api-helpers'

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const user = await requireAuth()
    if (user instanceof NextResponse) return user

    const body = await request.json()
    const supabase = await createClient()

    const updateData: Record<string, unknown> = {
      booking_date: body.newDate,
      status: 'pending',
    }

    const { data, error } = await supabase
      .from('bookings')
      .update(updateData)
      .eq('id', id)
      .eq('user_id', user.id)
      .select()
      .single()

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 })
    }

    return NextResponse.json(data)
  } catch (error) {
    return handleError(error)
  }
}
