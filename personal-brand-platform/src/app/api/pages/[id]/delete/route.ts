import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { requireAdmin, handleError } from '@/lib/utils/api-helpers'

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const supabase = await createClient()

    // Get existing page
    const { data: existingPage, error: fetchError } = await supabase
      .from('pages')
      .select('tenant_id')
      .eq('id', id)
      .single()

    if (fetchError || !existingPage) {
      return NextResponse.json({ error: 'Page not found' }, { status: 404 })
    }

    const authResult = await requireAdmin(existingPage.tenant_id as string)
    if (authResult instanceof NextResponse) return authResult

    // Delete page
    const { error } = await supabase
      .from('pages')
      .delete()
      .eq('id', id)

    if (error) throw error

    return NextResponse.json({ message: 'Page deleted successfully' })
  } catch (error) {
    return handleError(error)
  }
}
