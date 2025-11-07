import { NextRequest, NextResponse } from 'next/server'
import { resolveTenant } from '@/lib/tenant/resolver'

export async function GET(request: NextRequest) {
  try {
    const hostname = request.headers.get('host') || ''
    
    const tenant = await resolveTenant(hostname)
    
    if (!tenant) {
      return NextResponse.json(
        { error: 'Tenant not found' },
        { status: 404 }
      )
    }
    
    return NextResponse.json({ tenant })
  } catch (error) {
    console.error('Error fetching tenant:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
