/**
 * Base Service Class
 * Provides common functionality for all services
 */

import { createClient } from '@/lib/supabase/server'
import type { SupabaseClient } from '@supabase/supabase-js'
import type { Database } from '@/types/database'
import { errorTracker } from '@/lib/monitoring/sentry'

export abstract class BaseService {
  protected supabase: SupabaseClient<Database> | null = null

  /**
   * Initialize Supabase client
   */
  protected async getClient(): Promise<SupabaseClient<Database>> {
    if (!this.supabase) {
      this.supabase = await createClient()
    }
    return this.supabase
  }

  /**
   * Get authenticated user
   */
  protected async getAuthenticatedUser() {
    const supabase = await this.getClient()
    const { data: { user }, error } = await supabase.auth.getUser()
    
    if (error || !user) {
      throw new Error('Unauthorized')
    }
    
    return user
  }

  /**
   * Handle service errors with tracking
   */
  protected handleError(error: unknown, context?: string): never {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    const errorObj = error instanceof Error ? error : new Error(errorMessage)
    
    errorTracker.captureError(errorObj, {
      tags: {
        service: this.constructor.name,
        context: context || 'unknown',
      },
    })
    
    throw errorObj
  }

  /**
   * Validate required fields
   */
  protected validateRequired<T extends Record<string, unknown>>(
    data: T,
    fields: (keyof T)[]
  ): void {
    const missing = fields.filter(field => !data[field])
    
    if (missing.length > 0) {
      throw new Error(`Missing required fields: ${missing.join(', ')}`)
    }
  }
}
