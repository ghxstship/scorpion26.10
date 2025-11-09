import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'
import { requireAdmin, handleError, getTenantFromRequest } from '@/lib/utils/api-helpers'
import { createBlogPostSchema } from '@/lib/utils/validation'

export async function GET(request: Request) {
  try {
    const tenantId = await getTenantFromRequest(request)
    if (!tenantId) {
      return NextResponse.json({ error: 'Tenant not found' }, { status: 404 })
    }

    const supabase = await createClient()
    const { data: posts, error } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('tenant_id', tenantId)
      .eq('is_published', true)
      .order('published_at', { ascending: false })

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 })
    }

    return NextResponse.json(posts)
  } catch (error) {
    return handleError(error)
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const validatedData = createBlogPostSchema.parse(body)

    const authResult = await requireAdmin(validatedData.tenantId)
    if (authResult instanceof NextResponse) return authResult

    const supabase = await createClient()
    
    const insertData: Record<string, unknown> = {
      tenant_id: validatedData.tenantId,
      author_id: authResult.user.id,
      title: validatedData.title,
      slug: validatedData.slug,
      content: validatedData.content,
      excerpt: validatedData.excerpt,
      featured_image: validatedData.featuredImage,
      is_published: validatedData.isPublished,
      published_at: validatedData.isPublished ? new Date().toISOString() : null,
    }
    
    const { data: post, error } = await supabase
      .from('blog_posts')
      .insert(insertData)
      .select()
      .single()

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 })
    }

    return NextResponse.json(post)
  } catch (error) {
    return handleError(error)
  }
}
