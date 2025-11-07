import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { requireAuth, handleError } from '@/lib/utils/api-helpers'

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const user = await requireAuth()
    if (user instanceof NextResponse) return user

    const supabase = await createClient()

    // Get existing blog post
    const { data: existingPost, error: fetchError } = await supabase
      .from('blog_posts')
      .select('tenant_id, author_id')
      .eq('id', id)
      .single()

    if (fetchError || !existingPost) {
      return NextResponse.json({ error: 'Blog post not found' }, { status: 404 })
    }

    // Verify user has permission (admin of same tenant or author)
    const { data: userProfile } = await supabase
      .from('users')
      .select('role, tenant_id')
      .eq('id', user.id)
      .single()

    const isAdmin = userProfile?.role === 'admin' && userProfile?.tenant_id === existingPost.tenant_id
    const isAuthor = existingPost.author_id === user.id

    if (!isAdmin && !isAuthor) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    // Soft delete by setting deleted_at (if migration applied) or hard delete
    const { error } = await supabase
      .from('blog_posts')
      .delete()
      .eq('id', id)

    if (error) throw error

    return NextResponse.json({ message: 'Blog post deleted successfully' }, { status: 200 })
  } catch (error) {
    return handleError(error)
  }
}
