export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      tenants: {
        Row: {
          id: string
          name: string
          slug: string
          custom_domain: string | null
          logo_url: string | null
          primary_color: string
          secondary_color: string
          stripe_account_id: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          slug: string
          custom_domain?: string | null
          logo_url?: string | null
          primary_color?: string
          secondary_color?: string
          stripe_account_id?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          slug?: string
          custom_domain?: string | null
          logo_url?: string | null
          primary_color?: string
          secondary_color?: string
          stripe_account_id?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      users: {
        Row: {
          id: string
          tenant_id: string | null
          email: string
          full_name: string | null
          role: 'admin' | 'customer'
          created_at: string
          deleted_at: string | null
        }
        Insert: {
          id: string
          tenant_id?: string | null
          email: string
          full_name?: string | null
          role?: 'admin' | 'customer'
          created_at?: string
        }
        Update: {
          id?: string
          tenant_id?: string | null
          email?: string
          full_name?: string | null
          role?: 'admin' | 'customer'
          created_at?: string
          deleted_at?: string | null
        }
      }
      products: {
        Row: {
          id: string
          tenant_id: string
          title: string
          description: string | null
          type: 'digital' | 'physical' | 'service' | 'subscription'
          price: number
          stripe_price_id: string | null
          stripe_product_id: string | null
          image_url: string | null
          is_active: boolean
          created_at: string
        }
        Insert: {
          id?: string
          tenant_id: string
          title: string
          description?: string | null
          type: 'digital' | 'physical' | 'service' | 'subscription'
          price: number
          stripe_price_id?: string | null
          stripe_product_id?: string | null
          image_url?: string | null
          is_active?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          tenant_id?: string
          title?: string
          description?: string | null
          type?: 'digital' | 'physical' | 'service' | 'subscription'
          price?: number
          stripe_price_id?: string | null
          stripe_product_id?: string | null
          image_url?: string | null
          is_active?: boolean
          created_at?: string
        }
      }
      orders: {
        Row: {
          id: string
          tenant_id: string
          user_id: string
          stripe_payment_intent_id: string | null
          total_amount: number
          status: 'pending' | 'completed' | 'failed' | 'refunded'
          created_at: string
          paid_at: string | null
          refunded_at: string | null
        }
        Insert: {
          id?: string
          tenant_id: string
          user_id: string
          stripe_payment_intent_id?: string | null
          total_amount: number
          status?: 'pending' | 'completed' | 'failed' | 'refunded'
          created_at?: string
        }
        Update: {
          id?: string
          tenant_id?: string
          user_id?: string
          stripe_payment_intent_id?: string | null
          total_amount?: number
          status?: 'pending' | 'completed' | 'failed' | 'refunded'
          created_at?: string
          paid_at?: string | null
          refunded_at?: string | null
        }
      }
      pages: {
        Row: {
          id: string
          tenant_id: string
          slug: string
          title: string
          content: Json
          seo_title: string | null
          seo_description: string | null
          is_published: boolean
          created_at: string
        }
        Insert: {
          id?: string
          tenant_id: string
          slug: string
          title: string
          content: Json
          seo_title?: string | null
          seo_description?: string | null
          is_published?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          tenant_id?: string
          slug?: string
          title?: string
          content?: Json
          seo_title?: string | null
          seo_description?: string | null
          is_published?: boolean
          created_at?: string
        }
      }
      blog_posts: {
        Row: {
          id: string
          tenant_id: string
          author_id: string
          title: string
          slug: string
          content: string
          excerpt: string | null
          featured_image: string | null
          is_published: boolean
          published_at: string | null
          created_at: string
        }
        Insert: {
          id?: string
          tenant_id: string
          author_id: string
          title: string
          slug: string
          content: string
          excerpt?: string | null
          featured_image?: string | null
          is_published?: boolean
          published_at?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          tenant_id?: string
          author_id?: string
          title?: string
          slug?: string
          content?: string
          excerpt?: string | null
          featured_image?: string | null
          is_published?: boolean
          published_at?: string | null
          created_at?: string
        }
      }
      email_logs: {
        Row: {
          id: string
          tenant_id: string
          email_id: string
          recipient: string
          subject: string
          status: 'sent' | 'delivered' | 'delayed' | 'bounced' | 'complained'
          sent_at: string | null
          delivered_at: string | null
          bounced_at: string | null
          complained_at: string | null
          opened_at: string | null
          clicked_at: string | null
          error_message: string | null
          created_at: string
        }
        Insert: {
          id?: string
          tenant_id: string
          email_id: string
          recipient: string
          subject: string
          status?: 'sent' | 'delivered' | 'delayed' | 'bounced' | 'complained'
          sent_at?: string | null
          delivered_at?: string | null
          bounced_at?: string | null
          complained_at?: string | null
          opened_at?: string | null
          clicked_at?: string | null
          error_message?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          tenant_id?: string
          email_id?: string
          recipient?: string
          subject?: string
          status?: 'sent' | 'delivered' | 'delayed' | 'bounced' | 'complained'
          sent_at?: string | null
          delivered_at?: string | null
          bounced_at?: string | null
          complained_at?: string | null
          opened_at?: string | null
          clicked_at?: string | null
          error_message?: string | null
          created_at?: string
        }
      }
      bookings: {
        Row: {
          id: string
          tenant_id: string
          user_id: string
          service_id: string
          booking_date: string
          duration_minutes: number
          status: 'pending' | 'confirmed' | 'completed' | 'cancelled'
          stripe_payment_intent_id: string | null
          created_at: string
        }
        Insert: {
          id?: string
          tenant_id: string
          user_id: string
          service_id: string
          booking_date: string
          duration_minutes: number
          status?: 'pending' | 'confirmed' | 'completed' | 'cancelled'
          stripe_payment_intent_id?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          tenant_id?: string
          user_id?: string
          service_id?: string
          booking_date?: string
          duration_minutes?: number
          status?: 'pending' | 'confirmed' | 'completed' | 'cancelled'
          stripe_payment_intent_id?: string | null
          created_at?: string
        }
      }
      testimonials: {
        Row: {
          id: string
          tenant_id: string
          author_name: string
          author_title: string | null
          author_image: string | null
          content: string
          rating: number
          is_approved: boolean
          is_featured: boolean
          created_at: string
        }
        Insert: {
          id?: string
          tenant_id: string
          author_name: string
          author_title?: string | null
          author_image?: string | null
          content: string
          rating: number
          is_approved?: boolean
          is_featured?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          tenant_id?: string
          author_name?: string
          author_title?: string | null
          author_image?: string | null
          content?: string
          rating?: number
          is_approved?: boolean
          is_featured?: boolean
          created_at?: string
        }
      }
      email_subscribers: {
        Row: {
          id: string
          tenant_id: string
          email: string
          first_name: string | null
          status: 'active' | 'unsubscribed' | 'bounced'
          subscribed_at: string
          unsubscribed_at: string | null
          bounced_at: string | null
          unsubscribe_reason: string | null
        }
        Insert: {
          id?: string
          tenant_id: string
          email: string
          first_name?: string | null
          status?: 'active' | 'unsubscribed'
          subscribed_at?: string
        }
        Update: {
          id?: string
          tenant_id?: string
          email?: string
          first_name?: string | null
          status?: 'active' | 'unsubscribed' | 'bounced'
          subscribed_at?: string
          unsubscribed_at?: string | null
          bounced_at?: string | null
          unsubscribe_reason?: string | null
        }
      }
      order_items: {
        Row: {
          id: string
          order_id: string
          product_id: string
          quantity: number
          price: number
          created_at: string
        }
        Insert: {
          id?: string
          order_id: string
          product_id: string
          quantity?: number
          price: number
          created_at?: string
        }
        Update: {
          id?: string
          order_id?: string
          product_id?: string
          quantity?: number
          price?: number
          created_at?: string
        }
      }
      product_variants: {
        Row: {
          id: string
          product_id: string
          name: string
          sku: string | null
          price: number
          stripe_price_id: string | null
          inventory_count: number
          is_active: boolean
          created_at: string
        }
        Insert: {
          id?: string
          product_id: string
          name: string
          sku?: string | null
          price: number
          stripe_price_id?: string | null
          inventory_count?: number
          is_active?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          product_id?: string
          name?: string
          sku?: string | null
          price?: number
          stripe_price_id?: string | null
          inventory_count?: number
          is_active?: boolean
          created_at?: string
        }
      }
      subscriptions: {
        Row: {
          id: string
          tenant_id: string
          user_id: string
          product_id: string
          stripe_subscription_id: string
          stripe_customer_id: string
          stripe_price_id: string | null
          status: 'active' | 'canceled' | 'past_due' | 'unpaid' | 'trialing'
          current_period_start: string
          current_period_end: string
          cancel_at_period_end: boolean
          created_at: string
          updated_at: string
          cancelled_at: string | null
        }
        Insert: {
          id?: string
          tenant_id: string
          user_id: string
          product_id: string
          stripe_subscription_id: string
          stripe_customer_id: string
          stripe_price_id?: string | null
          status?: 'active' | 'canceled' | 'past_due' | 'unpaid' | 'trialing'
          current_period_start: string
          current_period_end: string
          cancel_at_period_end?: boolean
          created_at?: string
          updated_at?: string
          cancelled_at?: string | null
        }
        Update: {
          id?: string
          tenant_id?: string
          user_id?: string
          product_id?: string
          stripe_subscription_id?: string
          stripe_customer_id?: string
          stripe_price_id?: string | null
          status?: 'active' | 'canceled' | 'past_due' | 'unpaid' | 'trialing'
          current_period_start?: string
          current_period_end?: string
          cancel_at_period_end?: boolean
          created_at?: string
          updated_at?: string
          cancelled_at?: string | null
        }
      }
      user_favorites: {
        Row: {
          id: string
          user_id: string
          content_type: 'product' | 'blog_post' | 'page'
          content_id: string
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          content_type: 'product' | 'blog_post' | 'page'
          content_id: string
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          content_type?: 'product' | 'blog_post' | 'page'
          content_id?: string
          created_at?: string
        }
      }
      email_campaigns: {
        Row: {
          id: string
          tenant_id: string
          name: string
          subject: string
          content: string
          status: 'draft' | 'scheduled' | 'sent'
          scheduled_at: string | null
          sent_at: string | null
          created_at: string
        }
        Insert: {
          id?: string
          tenant_id: string
          name: string
          subject: string
          content: string
          status?: 'draft' | 'scheduled' | 'sent'
          scheduled_at?: string | null
          sent_at?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          tenant_id?: string
          name?: string
          subject?: string
          content?: string
          status?: 'draft' | 'scheduled' | 'sent'
          scheduled_at?: string | null
          sent_at?: string | null
          created_at?: string
        }
      }
      email_templates: {
        Row: {
          id: string
          tenant_id: string
          name: string
          subject: string
          html_content: string
          template_type: 'welcome' | 'order_confirmation' | 'booking_confirmation' | 'subscription_confirmation' | 'password_reset' | 'newsletter'
          is_active: boolean
          created_at: string
        }
        Insert: {
          id?: string
          tenant_id: string
          name: string
          subject: string
          html_content: string
          template_type: 'welcome' | 'order_confirmation' | 'booking_confirmation' | 'subscription_confirmation' | 'password_reset' | 'newsletter'
          is_active?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          tenant_id?: string
          name?: string
          subject?: string
          html_content?: string
          template_type?: 'welcome' | 'order_confirmation' | 'booking_confirmation' | 'subscription_confirmation' | 'password_reset' | 'newsletter'
          is_active?: boolean
          created_at?: string
        }
      }
      media_files: {
        Row: {
          id: string
          tenant_id: string
          file_name: string
          file_url: string
          file_type: string
          file_size: number
          uploaded_by: string | null
          created_at: string
        }
        Insert: {
          id?: string
          tenant_id: string
          file_name: string
          file_url: string
          file_type: string
          file_size: number
          uploaded_by?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          tenant_id?: string
          file_name?: string
          file_url?: string
          file_type?: string
          file_size?: number
          uploaded_by?: string | null
          created_at?: string
        }
      }
      navigation_items: {
        Row: {
          id: string
          tenant_id: string
          label: string
          url: string
          parent_id: string | null
          position: number
          is_active: boolean
          created_at: string
        }
        Insert: {
          id?: string
          tenant_id: string
          label: string
          url: string
          parent_id?: string | null
          position?: number
          is_active?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          tenant_id?: string
          label?: string
          url?: string
          parent_id?: string | null
          position?: number
          is_active?: boolean
          created_at?: string
        }
      }
      booking_availability: {
        Row: {
          id: string
          tenant_id: string
          service_id: string
          day_of_week: number
          start_time: string
          end_time: string
          is_active: boolean
          created_at: string
        }
        Insert: {
          id?: string
          tenant_id: string
          service_id: string
          day_of_week: number
          start_time: string
          end_time: string
          is_active?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          tenant_id?: string
          service_id?: string
          day_of_week?: number
          start_time?: string
          end_time?: string
          is_active?: boolean
          created_at?: string
        }
      }
      course_enrollments: {
        Row: {
          id: string
          user_id: string
          product_id: string
          enrolled_at: string
          completed_at: string | null
          progress_percentage: number
        }
        Insert: {
          id?: string
          user_id: string
          product_id: string
          enrolled_at?: string
          completed_at?: string | null
          progress_percentage?: number
        }
        Update: {
          id?: string
          user_id?: string
          product_id?: string
          enrolled_at?: string
          completed_at?: string | null
          progress_percentage?: number
        }
      }
      course_progress: {
        Row: {
          id: string
          enrollment_id: string
          module_id: string
          completed: boolean
          completed_at: string | null
          created_at: string
        }
        Insert: {
          id?: string
          enrollment_id: string
          module_id: string
          completed?: boolean
          completed_at?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          enrollment_id?: string
          module_id?: string
          completed?: boolean
          completed_at?: string | null
          created_at?: string
        }
      }
      analytics_events: {
        Row: {
          id: string
          tenant_id: string
          user_id: string | null
          event_type: string
          event_data: Json
          created_at: string
        }
        Insert: {
          id?: string
          tenant_id: string
          user_id?: string | null
          event_type: string
          event_data?: Json
          created_at?: string
        }
        Update: {
          id?: string
          tenant_id?: string
          user_id?: string | null
          event_type?: string
          event_data?: Json
          created_at?: string
        }
      }
      videos: {
        Row: {
          id: string
          tenant_id: string
          title: string
          description: string | null
          url: string
          provider: string
          is_premium: boolean
          thumbnail_url: string | null
          duration_seconds: number | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          tenant_id: string
          title: string
          description?: string | null
          url: string
          provider: string
          is_premium?: boolean
          thumbnail_url?: string | null
          duration_seconds?: number | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          tenant_id?: string
          title?: string
          description?: string | null
          url?: string
          provider?: string
          is_premium?: boolean
          thumbnail_url?: string | null
          duration_seconds?: number | null
          created_at?: string
          updated_at?: string
        }
      }
      audit_logs: {
        Row: {
          id: string
          action: string
          entity_type: string
          entity_id: string | null
          description: string | null
          ip_address: string | null
          user_agent: string | null
          metadata: Json | null
          created_at: string
        }
        Insert: {
          id?: string
          action: string
          entity_type: string
          entity_id?: string | null
          description?: string | null
          ip_address?: string | null
          user_agent?: string | null
          metadata?: Json | null
          created_at?: string
        }
        Update: {
          id?: string
          action?: string
          entity_type?: string
          entity_id?: string | null
          description?: string | null
          ip_address?: string | null
          user_agent?: string | null
          metadata?: Json | null
          created_at?: string
        }
      }
      webhook_events: {
        Row: {
          id: string
          event_id: string
          event_type: string
          provider: string
          processed_at: string
          payload: Json | null
          created_at: string
        }
        Insert: {
          id?: string
          event_id: string
          event_type: string
          provider?: string
          processed_at?: string
          payload?: Json | null
          created_at?: string
        }
        Update: {
          id?: string
          event_id?: string
          event_type?: string
          provider?: string
          processed_at?: string
          payload?: Json | null
          created_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}

// Helper types for common queries
export type Tables<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Row']
export type Inserts<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Insert']
export type Updates<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Update']

// Extended types with relations
export type OrderWithItems = Tables<'orders'> & {
  order_items?: (Tables<'order_items'> & {
    products?: Tables<'products'>
  })[]
  users?: Pick<Tables<'users'>, 'email' | 'full_name'>
}

export type BookingWithDetails = Tables<'bookings'> & {
  products?: Tables<'products'>
  users?: Pick<Tables<'users'>, 'email' | 'full_name'>
}

export type EmailSubscriber = Tables<'email_subscribers'>

export type EmailCampaignWithDetails = Tables<'email_campaigns'>

// Cart item type for checkout
export interface CartItem {
  id: string
  title: string
  price: number
  quantity: number
  image_url?: string | null
}

// Web Vitals metric type
export interface WebVitalsMetric {
  id: string
  name: string
  value: number
  rating: 'good' | 'needs-improvement' | 'poor'
  delta: number
  navigationType: string
}
