import { z } from 'zod'

// Product Variant Schemas
export const createProductVariantSchema = z.object({
  productId: z.string().uuid(),
  name: z.string().min(1, 'Variant name is required'),
  sku: z.string().min(1, 'SKU is required'),
  price: z.number().positive('Price must be positive'),
  stripePriceId: z.string().optional(),
  inventoryCount: z.number().int().min(0).default(0),
})

export const updateProductVariantSchema = z.object({
  name: z.string().min(1).optional(),
  sku: z.string().min(1).optional(),
  price: z.number().positive().optional(),
  stripePriceId: z.string().optional(),
  inventoryCount: z.number().int().min(0).optional(),
  isActive: z.boolean().optional(),
})

// Email Campaign Schemas
export const createCampaignSchema = z.object({
  tenantId: z.string().uuid(),
  name: z.string().min(1, 'Campaign name is required'),
  subject: z.string().min(1, 'Subject is required'),
  content: z.string().min(1, 'Content is required'),
  scheduledFor: z.string().datetime().optional(),
})

export const updateCampaignSchema = z.object({
  name: z.string().min(1).optional(),
  subject: z.string().min(1).optional(),
  content: z.string().min(1).optional(),
  status: z.enum(['draft', 'scheduled', 'sent', 'failed']).optional(),
  scheduledFor: z.string().datetime().optional(),
})

export const sendCampaignSchema = z.object({
  campaignId: z.string().uuid(),
  tenantId: z.string().uuid(),
})

// Media Upload Schemas
export const uploadMediaSchema = z.object({
  tenantId: z.string().uuid(),
  file: z.instanceof(File).refine(
    (file) => file.size <= 10 * 1024 * 1024, // 10MB
    'File size must be less than 10MB'
  ).refine(
    (file) => ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'application/pdf'].includes(file.type),
    'File type must be JPEG, PNG, GIF, WebP, or PDF'
  ),
})

// Analytics Schemas
export const analyticsQuerySchema = z.object({
  tenantId: z.string().uuid(),
  startDate: z.string().datetime().optional(),
  endDate: z.string().datetime().optional(),
  metric: z.enum(['revenue', 'orders', 'users', 'bookings', 'subscribers']).optional(),
})

// Booking Schemas
export const rescheduleBookingSchema = z.object({
  newStartTime: z.string().datetime(),
  newEndTime: z.string().datetime(),
  reason: z.string().optional(),
}).refine(
  (data) => new Date(data.newEndTime) > new Date(data.newStartTime),
  'End time must be after start time'
)

export const checkAvailabilitySchema = z.object({
  tenantId: z.string().uuid(),
  serviceId: z.string().uuid().optional(),
  startDate: z.string().datetime(),
  endDate: z.string().datetime(),
})

// Order Schemas
export const refundOrderSchema = z.object({
  orderId: z.string().uuid(),
  amount: z.number().positive().optional(), // Partial refund
  reason: z.string().min(1, 'Refund reason is required'),
})

export const updateOrderStatusSchema = z.object({
  status: z.enum(['pending', 'processing', 'completed', 'cancelled', 'refunded']),
  notes: z.string().optional(),
})

// Tenant Schemas
export const createTenantSchema = z.object({
  name: z.string().min(2, 'Tenant name must be at least 2 characters'),
  slug: z.string().min(2).regex(/^[a-z0-9-]+$/, 'Slug must be lowercase alphanumeric with hyphens'),
  domain: z.string().url().optional(),
  settings: z.record(z.string(), z.unknown()).optional(),
})

export const updateTenantSchema = z.object({
  name: z.string().min(2).optional(),
  slug: z.string().min(2).regex(/^[a-z0-9-]+$/).optional(),
  domain: z.string().url().optional(),
  settings: z.record(z.string(), z.unknown()).optional(),
  isActive: z.boolean().optional(),
})

// User Profile Schemas
export const updateProfileSchema = z.object({
  fullName: z.string().min(2).optional(),
  bio: z.string().max(500).optional(),
  avatar: z.string().url().optional(),
  phone: z.string().regex(/^\+?[1-9]\d{1,14}$/).optional(), // E.164 format
  timezone: z.string().optional(),
})

// Favorites Schemas
export const addFavoriteSchema = z.object({
  productId: z.string().uuid(),
  tenantId: z.string().uuid(),
})

// Testimonial Schemas
export const updateTestimonialSchema = z.object({
  content: z.string().min(10).optional(),
  rating: z.number().int().min(1).max(5).optional(),
  isApproved: z.boolean().optional(),
  isFeatured: z.boolean().optional(),
})

// Navigation Schemas
export const createNavigationItemSchema = z.object({
  tenantId: z.string().uuid(),
  label: z.string().min(1),
  url: z.string().min(1),
  parentId: z.string().uuid().nullable().optional(),
  order: z.number().int().min(0).default(0),
  isExternal: z.boolean().default(false),
})

export const updateNavigationItemSchema = z.object({
  label: z.string().min(1).optional(),
  url: z.string().min(1).optional(),
  parentId: z.string().uuid().nullable().optional(),
  order: z.number().int().min(0).optional(),
  isExternal: z.boolean().optional(),
  isActive: z.boolean().optional(),
})

// Email Template Schemas
export const createEmailTemplateSchema = z.object({
  tenantId: z.string().uuid(),
  name: z.string().min(1),
  subject: z.string().min(1),
  htmlContent: z.string().min(1),
  textContent: z.string().optional(),
  variables: z.array(z.string()).optional(),
})

export const updateEmailTemplateSchema = z.object({
  name: z.string().min(1).optional(),
  subject: z.string().min(1).optional(),
  htmlContent: z.string().min(1).optional(),
  textContent: z.string().optional(),
  variables: z.array(z.string()).optional(),
  isActive: z.boolean().optional(),
})

// Webhook Schemas
export const stripeWebhookSchema = z.object({
  type: z.string(),
  data: z.object({
    object: z.record(z.string(), z.unknown()),
  }),
})

// Pagination Schema
export const paginationSchema = z.object({
  page: z.number().int().positive().default(1),
  limit: z.number().int().positive().max(100).default(20),
  sortBy: z.string().optional(),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
})

// Search Schema
export const searchSchema = z.object({
  query: z.string().min(1),
  type: z.enum(['products', 'blog', 'pages', 'all']).default('all'),
  tenantId: z.string().uuid(),
  limit: z.number().int().positive().max(50).default(10),
})
