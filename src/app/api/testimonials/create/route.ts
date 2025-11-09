import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { handleError } from '@/lib/utils/api-helpers'
import { createTestimonialSchema } from '@/lib/utils/validation'
import { z } from 'zod'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const validatedData = createTestimonialSchema.parse(body)

    const supabase = await createClient()

    // Create testimonial (not approved by default)
    const { data: testimonial, error } = await supabase
      .from('testimonials')
      .insert({
        tenant_id: validatedData.tenantId,
        author_name: validatedData.authorName,
        author_title: validatedData.authorTitle,
        author_image: validatedData.authorImage,
        content: validatedData.content,
        rating: validatedData.rating,
        is_approved: false,
        is_featured: false,
      })
      .select()
      .single()

    if (error) throw error

    return NextResponse.json({ 
      data: testimonial,
      message: 'Testimonial submitted successfully. It will be reviewed before being published.'
    }, { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: 'Validation failed', details: error.issues }, { status: 400 })
    }
    return handleError(error)
  }
}
