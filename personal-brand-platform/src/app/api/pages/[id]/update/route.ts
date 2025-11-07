import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { requireAdmin, handleError } from '@/lib/utils/api-helpers'
import { z } from 'zod'

const updatePageSchema = z.object({
  slug: z.string().min(1).optional(),
  title: z.string().min(1).optional(),
  content: z.record(z.string(), z.any()).optional(),
  seoTitle: z.string().optional(),
  seoDescription: z.string().optional(),
  isPublished: z.boolean().optional(),
})

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()
    const validatedData = updatePageSchema.parse(body)

    const supabase = await createClient()

    // Get existing page
    const { data: existingPage, error: fetchError } = await supabase
      .from('pages')
      .select('tenant_id, slug')
      .eq('id', id)
      .single()

    if (fetchError || !existingPage) {
      return NextResponse.json({ error: 'Page not found' }, { status: 404 })
    }

    const authResult = await requireAdmin(existingPage.tenant_id as string)
    if (authResult instanceof NextResponse) return authResult

    // Check slug uniqueness if slug is being changed
    if (validatedData.slug && validatedData.slug !== existingPage.slug) {
      const { data: slugExists } = await supabase
        .from('pages')
        .select('id')
        .eq('tenant_id', existingPage.tenant_id)
        .eq('slug', validatedData.slug)
        .neq('id', id)
        .single()

      if (slugExists) {
        return NextResponse.json({ error: 'A page with this slug already exists' }, { status: 409 })
      }
    }

    // Update page
    const updateData: Record<string, unknown> = {}
    if (validatedData.slug) updateData.slug = validatedData.slug
    if (validatedData.title) updateData.title = validatedData.title
    if (validatedData.content) updateData.content = validatedData.content
    if (validatedData.seoTitle !== undefined) updateData.seo_title = validatedData.seoTitle
    if (validatedData.seoDescription !== undefined) updateData.seo_description = validatedData.seoDescription
    if (validatedData.isPublished !== undefined) updateData.is_published = validatedData.isPublished

    const { data: updatedPage, error } = await supabase
      .from('pages')
      .update(updateData)
      .eq('id', id)
      .select()
      .single()

    if (error) throw error

    return NextResponse.json({ data: updatedPage })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: 'Validation failed', details: error.issues }, { status: 400 })
    }
    return handleError(error)
  }
}
