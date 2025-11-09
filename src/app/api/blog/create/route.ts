import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { requireAuth, handleError } from '@/lib/utils/api-helpers'
import { createBlogPostSchema } from '@/lib/utils/validation'
import { z } from 'zod'

export async function POST(request: NextRequest) {
  try {
    const user = await requireAuth()
    if (user instanceof NextResponse) return user

    const body = await request.json()
    const validatedData = createBlogPostSchema.parse(body)

    const supabase = await createClient()

    // Verify user has admin role for the tenant
    const { data: userProfile } = await supabase
      .from('users')
      .select('role, tenant_id')
      .eq('id', user.id)
      .single()

    if (!userProfile || userProfile.role !== 'admin' || userProfile.tenant_id !== validatedData.tenantId) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    // Check if slug already exists for this tenant
    const { data: existingPost } = await supabase
      .from('blog_posts')
      .select('id')
      .eq('tenant_id', validatedData.tenantId)
      .eq('slug', validatedData.slug)
      .single()

    if (existingPost) {
      return NextResponse.json({ error: 'A blog post with this slug already exists' }, { status: 409 })
    }

    // Create blog post
    const { data: blogPost, error } = await supabase
      .from('blog_posts')
      .insert({
        tenant_id: validatedData.tenantId,
        author_id: user.id,
        title: validatedData.title,
        slug: validatedData.slug,
        content: validatedData.content,
        excerpt: validatedData.excerpt,
        featured_image: validatedData.featuredImage,
        is_published: validatedData.isPublished,
        published_at: validatedData.isPublished ? new Date().toISOString() : null,
      })
      .select()
      .single()

    if (error) throw error

    return NextResponse.json({ data: blogPost }, { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: 'Validation failed', details: error.errors }, { status: 400 })
    }
    return handleError(error)
  }
}
