import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { requireAuth, handleError } from '@/lib/utils/api-helpers'

export async function POST(
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
      .select('tenant_id, is_published, published_at')
      .eq('id', id)
      .single()

    if (fetchError || !existingPost) {
      return NextResponse.json({ error: 'Blog post not found' }, { status: 404 })
    }

    // Verify user has admin permission
    const { data: userProfile } = await supabase
      .from('users')
      .select('role, tenant_id')
      .eq('id', user.id)
      .single()

    if (!userProfile || userProfile.role !== 'admin' || userProfile.tenant_id !== existingPost.tenant_id) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    // Toggle publish status
    const newPublishStatus = !existingPost.is_published
    const updateData: Record<string, unknown> = {
      is_published: newPublishStatus,
    }

    // Set published_at if publishing for the first time
    if (newPublishStatus && !existingPost.published_at) {
      updateData.published_at = new Date().toISOString()
    }

    const { data: updatedPost, error } = await supabase
      .from('blog_posts')
      .update(updateData)
      .eq('id', id)
      .select()
      .single()

    if (error) throw error

    return NextResponse.json({ 
      data: updatedPost,
      message: newPublishStatus ? 'Blog post published successfully' : 'Blog post unpublished successfully'
    })
  } catch (error) {
    return handleError(error)
  }
}
