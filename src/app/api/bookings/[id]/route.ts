import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { requireAuth, handleError } from '@/lib/utils/api-helpers'
import { typedUpdate } from '@/lib/supabase/typed-client'

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const user = await requireAuth()
    if (user instanceof NextResponse) return user

    const body = await request.json()
    const supabase = await createClient()

    const updateData = {
      booking_date: body.bookingDate,
      status: body.status,
    }

    const { data, error } = await typedUpdate(supabase, 'bookings', updateData)
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

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const user = await requireAuth()
    if (user instanceof NextResponse) return user

    const supabase = await createClient()
    const { error } = await supabase
      .from('bookings')
      .delete()
      .eq('id', id)
      .eq('user_id', user.id)

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    return handleError(error)
  }
}
