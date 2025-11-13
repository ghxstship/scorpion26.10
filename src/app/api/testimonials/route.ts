import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'
import { handleError, getTenantFromRequest } from '@/lib/utils/api-helpers'
import { typedInsert } from '@/lib/supabase/typed-client'
import { createTestimonialSchema } from '@/lib/utils/validation'

export async function GET(request: Request) {
  try {
    const tenantId = await getTenantFromRequest(request)
    if (!tenantId) {
      throw new Error('Tenant not found')
    }

    const supabase = await createClient()
    const { data, error } = await supabase
      .from('testimonials')
      .select('*')
      .eq('tenant_id', tenantId)
      .eq('is_approved', true)
      .order('created_at', { ascending: false })

    if (error) throw error

    return NextResponse.json(data)
  } catch (error) {
    return handleError(error)
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const validatedData = createTestimonialSchema.parse(body)

    const supabase = await createClient()
    const { data: testimonial, error } = await typedInsert(supabase, 'testimonials', {
        tenant_id: validatedData.tenantId,
        author_name: validatedData.authorName,
        author_title: validatedData.authorTitle,
        author_image: validatedData.authorImage,
        content: validatedData.content,
        rating: validatedData.rating,
        is_approved: false,
      })
      .select()
      .single()

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 })
    }

    return NextResponse.json(testimonial)
  } catch (error) {
    return handleError(error)
  }
}
