import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { requireAdmin, handleError } from '@/lib/utils/api-helpers'

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const supabase = await createClient()

    // Get existing page
    const { data: existingPage, error: fetchError } = await supabase
      .from('pages')
      .select('tenant_id, is_published')
      .eq('id', id)
      .single()

    if (fetchError || !existingPage) {
      return NextResponse.json({ error: 'Page not found' }, { status: 404 })
    }

    const authResult = await requireAdmin(existingPage.tenant_id as string)
    if (authResult instanceof NextResponse) return authResult

    // Toggle publish status
    const newPublishStatus = !existingPage.is_published

    const { data: updatedPage, error } = await supabase
      .from('pages')
      .update({ is_published: newPublishStatus })
      .eq('id', id)
      .select()
      .single()

    if (error) throw error

    return NextResponse.json({
      data: updatedPage,
      message: newPublishStatus ? 'Page published successfully' : 'Page unpublished successfully'
    })
  } catch (error) {
    return handleError(error)
  }
}
