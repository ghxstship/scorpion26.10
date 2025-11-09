import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { requireAdmin, handleError } from '@/lib/utils/api-helpers'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const supabase = await createClient()

    const { data: video, error } = await supabase
      .from('videos')
      .select('*')
      .eq('id', params.id)
      .single()

    if (error) throw error

    if (!video) {
      return NextResponse.json(
        { error: 'Video not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({ video })
  } catch (error) {
    return handleError(error)
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const authResult = await requireAdmin()
  if (authResult instanceof NextResponse) {
    return authResult
  }

  try {
    const supabase = await createClient()
    const body = await request.json()

    const { data: video, error } = await supabase
      .from('videos')
      .update({
        title: body.title,
        description: body.description,
        url: body.url,
        provider: body.provider,
        is_premium: body.is_premium,
        thumbnail_url: body.thumbnail_url,
        duration_seconds: body.duration_seconds,
      })
      .eq('id', params.id)
      .select()
      .single()

    if (error) throw error

    return NextResponse.json({ video })
  } catch (error) {
    return handleError(error)
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const authResult = await requireAdmin()
  if (authResult instanceof NextResponse) {
    return authResult
  }

  try {
    const supabase = await createClient()

    const { error } = await supabase
      .from('videos')
      .delete()
      .eq('id', params.id)

    if (error) throw error

    return NextResponse.json({ success: true })
  } catch (error) {
    return handleError(error)
  }
}
