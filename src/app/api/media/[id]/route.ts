import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { requireAdmin, handleError } from '@/lib/utils/api-helpers'
import { typedUpdate, typedFrom } from '@/lib/supabase/typed-client'

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const authResult = await requireAdmin()
    if (authResult instanceof NextResponse) return authResult

    const body = await request.json()
    const supabase = await createClient()

    const { data, error } = await typedUpdate(supabase, 'media_files', { file_name: body.fileName })
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

    // Get file info
    const { data: file } = await typedFrom(supabase, 'media_files')
      .select('file_url')
      .eq('id', id)
      .single()

    if (file && typeof file === 'object' && 'file_url' in file) {
      // Delete from storage
      const fileName = String(file.file_url).split('/').pop()
      if (fileName) {
        await supabase.storage.from('media').remove([fileName])
      }
    }

    // Delete from database
    const { error } = await supabase
      .from('media_files')
      .delete()
      .eq('id', id)

    if (error) throw error

    return NextResponse.json({ success: true })
  } catch (error) {
    return handleError(error)
  }
}
