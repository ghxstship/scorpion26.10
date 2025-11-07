/**
 * File Upload Security Utilities
 * Implements comprehensive file validation and security checks
 */

// File type whitelist with magic bytes for validation
const ALLOWED_FILE_TYPES = {
  // Images
  'image/jpeg': { extensions: ['.jpg', '.jpeg'], magicBytes: ['ffd8ff'] },
  'image/png': { extensions: ['.png'], magicBytes: ['89504e47'] },
  'image/gif': { extensions: ['.gif'], magicBytes: ['474946383761', '474946383961'] },
  'image/webp': { extensions: ['.webp'], magicBytes: ['52494646'] },
  'image/svg+xml': { extensions: ['.svg'], magicBytes: [] }, // SVG requires special handling
  
  // Documents
  'application/pdf': { extensions: ['.pdf'], magicBytes: ['25504446'] },
  'application/msword': { extensions: ['.doc'], magicBytes: ['d0cf11e0a1b11ae1'] },
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document': { 
    extensions: ['.docx'], 
    magicBytes: ['504b0304'] 
  },
  
  // Videos
  'video/mp4': { extensions: ['.mp4'], magicBytes: ['66747970'] },
  'video/quicktime': { extensions: ['.mov'], magicBytes: ['66747970717420'] },
} as const

// File size limits (in bytes)
export const FILE_SIZE_LIMITS = {
  image: 5 * 1024 * 1024, // 5MB
  document: 10 * 1024 * 1024, // 10MB
  video: 100 * 1024 * 1024, // 100MB
  default: 5 * 1024 * 1024, // 5MB
} as const

export interface FileValidationResult {
  valid: boolean
  error?: string
  sanitizedFilename?: string
}

/**
 * Convert buffer to hex string for magic byte comparison
 */
function bufferToHex(buffer: ArrayBuffer, length = 8): string {
  const bytes = new Uint8Array(buffer.slice(0, length))
  return Array.from(bytes)
    .map(b => b.toString(16).padStart(2, '0'))
    .join('')
}

/**
 * Validate file type using magic bytes (file signature)
 */
async function validateMagicBytes(file: File): Promise<boolean> {
  const allowedType = ALLOWED_FILE_TYPES[file.type as keyof typeof ALLOWED_FILE_TYPES]
  
  if (!allowedType) {
    return false
  }

  // SVG files need special handling (XML-based)
  if (file.type === 'image/svg+xml') {
    return validateSVG(file)
  }

  // Skip magic byte check if no magic bytes defined
  if (allowedType.magicBytes.length === 0) {
    return true
  }

  try {
    const buffer = await file.slice(0, 16).arrayBuffer()
    const hex = bufferToHex(buffer)
    
    return allowedType.magicBytes.some(magic => hex.startsWith(magic))
  } catch {
    return false
  }
}

/**
 * Validate SVG file for malicious content
 */
async function validateSVG(file: File): Promise<boolean> {
  try {
    const text = await file.text()
    
    // Check for dangerous patterns in SVG
    const dangerousPatterns = [
      /<script/i,
      /javascript:/i,
      /on\w+\s*=/i, // Event handlers like onclick, onload
      /<iframe/i,
      /<embed/i,
      /<object/i,
      /xlink:href\s*=\s*["']?javascript:/i,
    ]
    
    return !dangerousPatterns.some(pattern => pattern.test(text))
  } catch {
    return false
  }
}

/**
 * Sanitize filename to prevent path traversal and other attacks
 */
export function sanitizeFilename(filename: string): string {
  // Remove path separators and special characters
  let sanitized = filename.replace(/[\/\\]/g, '')
  
  // Remove null bytes
  sanitized = sanitized.replace(/\0/g, '')
  
  // Remove leading dots (hidden files)
  sanitized = sanitized.replace(/^\.+/, '')
  
  // Replace spaces and special characters with underscores
  sanitized = sanitized.replace(/[^a-zA-Z0-9._-]/g, '_')
  
  // Limit filename length
  const maxLength = 255
  if (sanitized.length > maxLength) {
    const ext = sanitized.split('.').pop() || ''
    const nameWithoutExt = sanitized.substring(0, sanitized.lastIndexOf('.'))
    sanitized = nameWithoutExt.substring(0, maxLength - ext.length - 1) + '.' + ext
  }
  
  // Ensure filename is not empty
  if (!sanitized || sanitized === '.') {
    sanitized = 'unnamed_file'
  }
  
  return sanitized
}

/**
 * Get file size limit based on file type
 */
function getFileSizeLimit(mimeType: string): number {
  if (mimeType.startsWith('image/')) return FILE_SIZE_LIMITS.image
  if (mimeType.startsWith('video/')) return FILE_SIZE_LIMITS.video
  if (mimeType.includes('pdf') || mimeType.includes('document')) return FILE_SIZE_LIMITS.document
  return FILE_SIZE_LIMITS.default
}

/**
 * Comprehensive file validation
 */
export async function validateFile(file: File): Promise<FileValidationResult> {
  // Check if file exists
  if (!file) {
    return { valid: false, error: 'No file provided' }
  }

  // Validate file size
  const sizeLimit = getFileSizeLimit(file.type)
  if (file.size > sizeLimit) {
    const sizeMB = (sizeLimit / (1024 * 1024)).toFixed(0)
    return { 
      valid: false, 
      error: `File size exceeds ${sizeMB}MB limit` 
    }
  }

  // Check if file size is suspiciously small (potential bomb)
  if (file.size < 10) {
    return { valid: false, error: 'File is too small to be valid' }
  }

  // Validate file type is in whitelist
  if (!(file.type in ALLOWED_FILE_TYPES)) {
    return { 
      valid: false, 
      error: `File type ${file.type} is not allowed` 
    }
  }

  // Validate file extension matches MIME type
  const allowedType = ALLOWED_FILE_TYPES[file.type as keyof typeof ALLOWED_FILE_TYPES]
  const fileExtension = '.' + (file.name.split('.').pop()?.toLowerCase() || '')
  
  if (!allowedType.extensions.some(ext => ext === fileExtension)) {
    return { 
      valid: false, 
      error: 'File extension does not match file type' 
    }
  }

  // Validate magic bytes (file signature)
  const magicBytesValid = await validateMagicBytes(file)
  if (!magicBytesValid) {
    return { 
      valid: false, 
      error: 'File content does not match declared type (possible malware)' 
    }
  }

  // Sanitize filename
  const sanitizedFilename = sanitizeFilename(file.name)

  return { 
    valid: true, 
    sanitizedFilename 
  }
}

/**
 * Validate multiple files
 */
export async function validateFiles(files: File[]): Promise<{
  valid: boolean
  results: FileValidationResult[]
  errors: string[]
}> {
  const results = await Promise.all(files.map(file => validateFile(file)))
  const errors = results
    .filter(r => !r.valid)
    .map(r => r.error!)
  
  return {
    valid: results.every(r => r.valid),
    results,
    errors
  }
}

/**
 * Generate secure random filename
 */
export function generateSecureFilename(originalFilename: string): string {
  const extension = originalFilename.split('.').pop()?.toLowerCase() || 'bin'
  const timestamp = Date.now()
  const randomString = Math.random().toString(36).substring(2, 15)
  return `${timestamp}_${randomString}.${extension}`
}

/**
 * Check if file type is allowed
 */
export function isFileTypeAllowed(mimeType: string): boolean {
  return mimeType in ALLOWED_FILE_TYPES
}

/**
 * Get allowed file extensions for display
 */
export function getAllowedExtensions(): string[] {
  return Object.values(ALLOWED_FILE_TYPES)
    .flatMap(type => type.extensions)
}

/**
 * Format file size for display
 */
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes'
  
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  
  return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i]
}
