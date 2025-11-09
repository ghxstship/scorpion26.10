import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { requireAdmin, handleError } from '@/lib/utils/api-helpers'
import { z } from 'zod'

const updateUserSchema = z.object({
  fullName: z.string().min(2).optional(),
  role: z.enum(['user', 'admin']).optional(),
  tenantId: z.string().uuid().optional(),
})

// GET /api/admin/users/[id] - Get user details
export async function GET(
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
      .select('*')
      .eq('id', id)
      .is('deleted_at', null)
      .single()

    if (error) throw error

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({ data: user })
  } catch (error) {
    return handleError(error)
  }
}

// PUT /api/admin/users/[id] - Update user
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const admin = await requireAdmin()
    if (admin instanceof NextResponse) return admin

    const body = await request.json()
    const validatedData = updateUserSchema.parse(body)

    const supabase = await createClient()

    const updateData: Record<string, unknown> = {}
    if (validatedData.fullName) updateData.full_name = validatedData.fullName
    if (validatedData.role) updateData.role = validatedData.role
    if (validatedData.tenantId) updateData.tenant_id = validatedData.tenantId

    const { data: user, error } = await (supabase as any)
      .from('users')
      .update(updateData)
      .eq('id', id)
      .is('deleted_at', null)
      .select()
      .single()

    if (error) throw error

    return NextResponse.json({ data: user })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation failed', details: error.issues },
        { status: 400 }
      )
    }
    return handleError(error)
  }
}

// DELETE /api/admin/users/[id] - Soft delete user
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const admin = await requireAdmin()
    if (admin instanceof NextResponse) return admin

    const supabase = await createClient()

    // Prevent self-deletion
    const adminUser = await supabase.auth.getUser()
    if (adminUser.data.user?.id === id) {
      return NextResponse.json(
        { error: 'Cannot delete your own account' },
        { status: 400 }
      )
    }

    const { error } = await (supabase as any)
      .from('users')
      .update({ deleted_at: new Date().toISOString() })
      .eq('id', id)
      .is('deleted_at', null)

    if (error) throw error

    return NextResponse.json({ message: 'User deleted successfully' })
  } catch (error) {
    return handleError(error)
  }
}
