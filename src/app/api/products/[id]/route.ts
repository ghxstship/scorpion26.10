import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { requireAdmin, handleError } from '@/lib/utils/api-helpers'
import { typedUpdate } from '@/lib/supabase/typed-client'
import { updateProductSchema } from '@/lib/utils/validation'

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const supabase = await createClient()
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('id', id)
      .single()

    if (error) throw error

    if (!data) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 })
    }

    return NextResponse.json(data)
  } catch (error) {
    return handleError(error)
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()
    const validatedData = updateProductSchema.parse({ ...body, id })

    const authResult = await requireAdmin(validatedData.tenantId)
    if (authResult instanceof NextResponse) return authResult

    const supabase = await createClient()
    
    const updateData: Record<string, unknown> = {
      title: validatedData.title,
      description: validatedData.description,
      type: validatedData.type,
      price: validatedData.price,
      image_url: validatedData.imageUrl,
    }
    
    const { data, error } = await typedUpdate(supabase, 'products', updateData)
      .eq('id', id)
      .select()
      .single()

    if (error) throw error

    return NextResponse.json(data)
  } catch (error) {
    return handleError(error)
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const authResult = await requireAdmin()
    if (authResult instanceof NextResponse) return authResult

    const supabase = await createClient()
    const { error } = await supabase
      .from('products')
      .delete()
      .eq('id', id)

    if (error) throw error

    return NextResponse.json({ success: true })
  } catch (error) {
    return handleError(error)
  }
}
