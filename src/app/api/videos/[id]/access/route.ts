import { NextRequest, NextResponse } from 'next/server'
import { getAuthenticatedUser } from '@/lib/utils/api-helpers'
import { checkVideoAccess } from '@/lib/video/access-control'
import { handleError } from '@/lib/utils/api-helpers'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const user = await getAuthenticatedUser()
    const hasAccess = await checkVideoAccess(params.id, user?.id || null)

    return NextResponse.json({ hasAccess })
  } catch (error) {
    return handleError(error)
  }
}
