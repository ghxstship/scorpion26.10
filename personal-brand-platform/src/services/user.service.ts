/**
 * User Service
 * Handles user-related business logic including GDPR compliance
 */

import { BaseService } from './base.service'
import type { Tables, Inserts, Updates } from '@/types/database'

export class UserService extends BaseService {
  /**
   * Get user profile
   */
  async getProfile(userId: string): Promise<Tables<'users'> | null> {
    try {
      const supabase = await this.getClient()
      
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', userId)
        .single()
      
      if (error) throw error
      
      return data
    } catch (error) {
      return this.handleError(error, 'getProfile')
    }
  }

  /**
   * Update user profile
   */
  async updateProfile(userId: string, updates: Updates<'users'>): Promise<Tables<'users'>> {
    try {
      const supabase = await this.getClient()
      
      const { data, error } = await supabase
        .from('users')
        .update(updates)
        .eq('id', userId)
        .select()
        .single()
      
      if (error) throw error
      
      return data
    } catch (error) {
      return this.handleError(error, 'updateProfile')
    }
  }

  /**
   * GDPR: Export all user data
   */
  async exportUserData(userId: string): Promise<Record<string, unknown>> {
    try {
      const supabase = await this.getClient()
      
      // Fetch all user-related data
      const [
        profile,
        orders,
        bookings,
        favorites,
        subscriptions,
        enrollments,
      ] = await Promise.all([
        supabase.from('users').select('*').eq('id', userId).single(),
        supabase.from('orders').select('*, order_items(*)').eq('user_id', userId),
        supabase.from('bookings').select('*').eq('user_id', userId),
        supabase.from('user_favorites').select('*').eq('user_id', userId),
        supabase.from('subscriptions').select('*').eq('user_id', userId),
        supabase.from('course_enrollments').select('*, course_progress(*)').eq('user_id', userId),
      ])
      
      return {
        profile: profile.data,
        orders: orders.data,
        bookings: bookings.data,
        favorites: favorites.data,
        subscriptions: subscriptions.data,
        enrollments: enrollments.data,
        exportedAt: new Date().toISOString(),
        dataRetentionPolicy: '90 days after account deletion',
      }
    } catch (error) {
      return this.handleError(error, 'exportUserData')
    }
  }

  /**
   * GDPR: Delete user account and all associated data
   */
  async deleteAccount(userId: string): Promise<{ success: boolean; message: string }> {
    try {
      const supabase = await this.getClient()
      
      // Delete in order (respecting foreign key constraints)
      await Promise.all([
        supabase.from('course_progress').delete().eq('enrollment_id', userId),
        supabase.from('user_favorites').delete().eq('user_id', userId),
        supabase.from('analytics_events').delete().eq('user_id', userId),
      ])
      
      await Promise.all([
        supabase.from('course_enrollments').delete().eq('user_id', userId),
        supabase.from('order_items').delete().in('order_id', 
          (await supabase.from('orders').select('id').eq('user_id', userId)).data?.map(o => o.id) || []
        ),
      ])
      
      await Promise.all([
        supabase.from('orders').delete().eq('user_id', userId),
        supabase.from('bookings').delete().eq('user_id', userId),
        supabase.from('subscriptions').delete().eq('user_id', userId),
        supabase.from('blog_posts').delete().eq('author_id', userId),
      ])
      
      // Finally delete user
      const { error } = await supabase.from('users').delete().eq('id', userId)
      
      if (error) throw error
      
      // Delete auth user
      await supabase.auth.admin.deleteUser(userId)
      
      return {
        success: true,
        message: 'Account and all associated data have been permanently deleted',
      }
    } catch (error) {
      return this.handleError(error, 'deleteAccount')
    }
  }

  /**
   * GDPR: Anonymize user data (alternative to deletion)
   */
  async anonymizeAccount(userId: string): Promise<{ success: boolean; message: string }> {
    try {
      const supabase = await this.getClient()
      
      const anonymousEmail = `deleted_${userId.slice(0, 8)}@anonymized.local`
      
      const { error } = await supabase
        .from('users')
        .update({
          email: anonymousEmail,
          full_name: 'Deleted User',
        })
        .eq('id', userId)
      
      if (error) throw error
      
      return {
        success: true,
        message: 'Account has been anonymized. Personal data removed.',
      }
    } catch (error) {
      return this.handleError(error, 'anonymizeAccount')
    }
  }
}

// Export singleton instance
export const userService = new UserService()
