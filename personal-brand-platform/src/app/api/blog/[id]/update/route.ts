import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { requireAuth, handleError } from '@/lib/utils/api-helpers'
import { updateBlogPostSchema } from '@/lib/utils/validation'
import { z } from 'zod'

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const user = await requireAuth()
    if (user instanceof NextResponse) return user

    const body = await request.json()
    const validatedData = updateBlogPostSchema.parse({ ...body, id })

    const supabase = await createClient()

    // Get existing blog post
    const { data: existingPost, error: fetchError } = await supabase
      .from('blog_posts')
      .select('*, users!inner(role, tenant_id)')
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

    // Check slug uniqueness if slug is being changed
    if (validatedData.slug && validatedData.slug !== existingPost.slug) {
      const { data: slugExists } = await supabase
        .from('blog_posts')
        .select('id')
        .eq('tenant_id', existingPost.tenant_id)
        .eq('slug', validatedData.slug)
        .neq('id', id)
        .single()

      if (slugExists) {
        return NextResponse.json({ error: 'A blog post with this slug already exists' }, { status: 409 })
      }
    }

    // Update blog post
    const updateData: Record<string, unknown> = {}
    if (validatedData.title) updateData.title = validatedData.title
    if (validatedData.slug) updateData.slug = validatedData.slug
    if (validatedData.content) updateData.content = validatedData.content
    if (validatedData.excerpt !== undefined) updateData.excerpt = validatedData.excerpt
    if (validatedData.featuredImage !== undefined) updateData.featured_image = validatedData.featuredImage
    if (validatedData.isPublished !== undefined) {
      updateData.is_published = validatedData.isPublished
      if (validatedData.isPublished && !existingPost.published_at) {
        updateData.published_at = new Date().toISOString()
      }
    }

    const { data: updatedPost, error } = await supabase
      .from('blog_posts')
      .update(updateData)
      .eq('id', id)
      .select()
      .single()

    if (error) throw error

    return NextResponse.json({ data: updatedPost })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: 'Validation failed', details: error.errors }, { status: 400 })
    }
    return handleError(error)
  }
}
