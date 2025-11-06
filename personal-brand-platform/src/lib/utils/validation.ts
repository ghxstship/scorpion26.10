import { z } from 'zod'

// Auth schemas
export const signupSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  fullName: z.string().min(2, 'Name must be at least 2 characters'),
  tenantId: z.string().uuid().optional(),
})

export const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
})

export const resetPasswordSchema = z.object({
  email: z.string().email('Invalid email address'),
})

// Product schemas
export const createProductSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().optional(),
  type: z.enum(['digital', 'physical', 'service', 'subscription']),
  price: z.number().positive('Price must be positive'),
  imageUrl: z.string().url().optional(),
  tenantId: z.string().uuid(),
})

export const updateProductSchema = createProductSchema.partial().extend({
  id: z.string().uuid(),
})

// Order schemas
export const createOrderSchema = z.object({
  items: z.array(z.object({
    productId: z.string().uuid(),
    quantity: z.number().int().positive(),
    price: z.number().positive(),
  })),
  tenantId: z.string().uuid(),
})

// Booking schemas
export const createBookingSchema = z.object({
  serviceId: z.string().uuid(),
  bookingDate: z.string().datetime(),
  durationMinutes: z.number().int().positive(),
  tenantId: z.string().uuid(),
})

export const updateBookingSchema = z.object({
  id: z.string().uuid(),
  status: z.enum(['pending', 'confirmed', 'completed', 'cancelled']).optional(),
  bookingDate: z.string().datetime().optional(),
})

// Blog schemas
export const createBlogPostSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  slug: z.string().min(1, 'Slug is required'),
  content: z.string().min(1, 'Content is required'),
  excerpt: z.string().optional(),
  featuredImage: z.string().url().optional(),
  isPublished: z.boolean().default(false),
  tenantId: z.string().uuid(),
})

export const updateBlogPostSchema = createBlogPostSchema.partial().extend({
  id: z.string().uuid(),
})

// Page schemas
export const createPageSchema = z.object({
  slug: z.string().min(1, 'Slug is required'),
  title: z.string().min(1, 'Title is required'),
  content: z.record(z.string(), z.any()),
  seoTitle: z.string().optional(),
  seoDescription: z.string().optional(),
  isPublished: z.boolean().default(false),
  tenantId: z.string().uuid(),
})

// Email schemas
export const subscribeEmailSchema = z.object({
  email: z.string().email('Invalid email address'),
  firstName: z.string().optional(),
  tenantId: z.string().uuid(),
})

export const sendCampaignSchema = z.object({
  name: z.string().min(1, 'Campaign name is required'),
  subject: z.string().min(1, 'Subject is required'),
  content: z.string().min(1, 'Content is required'),
  tenantId: z.string().uuid(),
})

// Testimonial schemas
export const createTestimonialSchema = z.object({
  authorName: z.string().min(1, 'Author name is required'),
  authorTitle: z.string().optional(),
  authorImage: z.string().url().optional(),
  content: z.string().min(1, 'Content is required'),
  rating: z.number().int().min(1).max(5),
  tenantId: z.string().uuid(),
})

// Media schemas
export const uploadMediaSchema = z.object({
  fileName: z.string().min(1, 'File name is required'),
  fileType: z.string().min(1, 'File type is required'),
  fileSize: z.number().int().positive(),
  tenantId: z.string().uuid(),
})

// Tenant schemas
export const createTenantSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  slug: z.string().min(1, 'Slug is required').regex(/^[a-z0-9-]+$/, 'Slug must be lowercase alphanumeric with hyphens'),
  customDomain: z.string().optional(),
  logoUrl: z.string().url().optional(),
  primaryColor: z.string().regex(/^#[0-9A-F]{6}$/i, 'Invalid color format').default('#000000'),
  secondaryColor: z.string().regex(/^#[0-9A-F]{6}$/i, 'Invalid color format').default('#ffffff'),
})

export const updateTenantSchema = createTenantSchema.partial().extend({
  id: z.string().uuid(),
})
