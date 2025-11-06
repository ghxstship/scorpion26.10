import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'
import { requireAdmin, handleError } from '@/lib/utils/api-helpers'

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const authResult = await requireAdmin()
    if (authResult instanceof NextResponse) return authResult

    const body = await request.json()
    const supabase = await createClient()

    const { data, error } = await supabase
      .from('media_files')
      .update({ file_name: body.fileName } as any)
      .eq('id', params.id)
      .select()
      .single()

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 })
    }

    return NextResponse.json(data)
  } catch (error) {
    return handleError(error)
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const authResult = await requireAdmin()
    if (authResult instanceof NextResponse) return authResult

    const supabase = await createClient()

    // Get file info
    const { data: file } = await supabase
      .from('media_files')
      .select('file_url')
      .eq('id', params.id)
      .single()

    if (file) {
      // Delete from storage
      const fileName = (file as any).file_url.split('/').pop()
      await supabase.storage.from('media').remove([fileName])
    }

    // Delete from database
    const { error } = await supabase
      .from('media_files')
      .delete()
      .eq('id', params.id)

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    return handleError(error)
  }
}
