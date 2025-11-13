import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'
import { requireAuth, handleError } from '@/lib/utils/api-helpers'
import { typedInsert } from '@/lib/supabase/typed-client'
import { validateFile, generateSecureFilename, formatFileSize } from '@/lib/utils/file-security'

export async function POST(request: Request) {
  try {
    const user = await requireAuth()
    if (user instanceof NextResponse) return user

    const formData = await request.formData()
    const file = formData.get('file') as File
    const tenantId = formData.get('tenantId') as string

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 })
    }

    // Validate file security
    const validation = await validateFile(file)
    if (!validation.valid) {
      return NextResponse.json({ 
        error: validation.error,
        details: `File: ${file.name}, Size: ${formatFileSize(file.size)}, Type: ${file.type}`
      }, { status: 400 })
    }

    const supabase = await createClient()
    
    // Upload to Supabase Storage with secure filename
    const fileName = generateSecureFilename(validation.sanitizedFilename || file.name)
    const { error: uploadError } = await supabase.storage
      .from('media')
      .upload(fileName, file)

    if (uploadError) {
      return NextResponse.json({ error: uploadError.message }, { status: 400 })
    }

    // Get public URL
    const { data: { publicUrl } } = supabase.storage
      .from('media')
      .getPublicUrl(fileName)

    // Save to database
    const { data, error } = await typedInsert(supabase, 'media_files', {
        tenant_id: tenantId,
        file_name: file.name,
        file_url: publicUrl,
        file_type: file.type,
        file_size: file.size,
        uploaded_by: user.id,
      })
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
