import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { requireAdmin, handleError } from '@/lib/utils/api-helpers'

// POST /api/admin/users/[id]/restore - Restore soft-deleted user
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const admin = await requireAdmin()
    if (admin instanceof NextResponse) return admin

    const supabase = await createClient()

    const { data: user, error } = await (supabase as any)
      .from('users')
      .update({ deleted_at: null })
      .eq('id', id)
      .not('deleted_at', 'is', null)
      .select()
      .single()

    if (error) throw error

    if (!user) {
      return NextResponse.json(
        { error: 'User not found or not deleted' },
        { status: 404 }
      )
    }

    return NextResponse.json({ 
      data: user,
      message: 'User restored successfully' 
    })
  } catch (error) {
    return handleError(error)
  }
}
