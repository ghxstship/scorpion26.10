import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'
import { requireAdmin, handleError, getTenantFromRequest } from '@/lib/utils/api-helpers'
import { typedInsert } from '@/lib/supabase/typed-client'
import { createBlogPostSchema } from '@/lib/utils/validation'

export async function GET(request: Request) {
  try {
    const tenantId = await getTenantFromRequest(request)
    if (!tenantId) {
      return NextResponse.json({ error: 'Tenant not found' }, { status: 404 })
    }

    const supabase = await createClient()
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*, users(full_name, email)')
      .eq('tenant_id', tenantId)
      .eq('is_published', true)
      .order('published_at', { ascending: false })

    if (error) throw error

    return NextResponse.json(data)
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
    
    const insertData = {
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
    
    const { data: post, error } = await typedInsert(supabase, 'blog_posts', insertData)
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
