import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { requireAdmin, handleError } from '@/lib/utils/api-helpers'
import { typedInsert } from '@/lib/supabase/typed-client'
import { createPageSchema } from '@/lib/utils/validation'
import { z } from 'zod'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const validatedData = createPageSchema.parse(body)

    const authResult = await requireAdmin(validatedData.tenantId)
    if (authResult instanceof NextResponse) return authResult

    const supabase = await createClient()

    // Check if slug already exists for this tenant
    const { data: existingPage } = await supabase
      .from('pages')
      .select('id')
      .eq('tenant_id', validatedData.tenantId)
      .eq('slug', validatedData.slug)
      .single()

    if (existingPage) {
      return NextResponse.json({ error: 'A page with this slug already exists' }, { status: 409 })
    }

    // Create page
    const { data: page, error } = await typedInsert(supabase, 'pages', {
        tenant_id: validatedData.tenantId,
        slug: validatedData.slug,
        title: validatedData.title,
        content: validatedData.content,
        seo_title: validatedData.seoTitle,
        seo_description: validatedData.seoDescription,
        is_published: validatedData.isPublished,
      })
      .select()
      .single()

    if (error) throw error

    return NextResponse.json({ data: page }, { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: 'Validation failed', details: error.issues }, { status: 400 })
    }
    return handleError(error)
  }
}
