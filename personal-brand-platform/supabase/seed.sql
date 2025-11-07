-- Seed Data for Personal Brand Platform
-- Date: 2025-11-06
-- Description: Initial data for development and testing

-- ============================================================================
-- PART 1: Create demo tenant
-- ============================================================================

INSERT INTO tenants (id, name, slug, logo_url, primary_color, secondary_color, created_at, updated_at)
VALUES (
  '00000000-0000-0000-0000-000000000001',
  'Demo Brand',
  'demo-brand',
  '/images/logo.png',
  '#2563eb',
  '#f3f4f6',
  NOW(),
  NOW()
) ON CONFLICT (id) DO NOTHING;

-- ============================================================================
-- PART 2: Email templates for transactional emails
-- ============================================================================

INSERT INTO email_templates (tenant_id, name, subject, html_content, template_type, is_active)
VALUES
  -- Welcome email
  (
    '00000000-0000-0000-0000-000000000001',
    'Welcome Email',
    'Welcome to {{tenant_name}}!',
    '<html><body><h1>Welcome {{user_name}}!</h1><p>Thank you for joining {{tenant_name}}. We''re excited to have you on board.</p><p>Get started by exploring our products and services.</p></body></html>',
    'welcome',
    true
  ),
  -- Order confirmation
  (
    '00000000-0000-0000-0000-000000000001',
    'Order Confirmation',
    'Order Confirmation #{{order_id}}',
    '<html><body><h1>Thank you for your order!</h1><p>Order ID: {{order_id}}</p><p>Total: ${{total_amount}}</p><p>We''ll send you another email when your order ships.</p></body></html>',
    'order_confirmation',
    true
  ),
  -- Booking confirmation
  (
    '00000000-0000-0000-0000-000000000001',
    'Booking Confirmation',
    'Your booking is confirmed',
    '<html><body><h1>Booking Confirmed</h1><p>Date: {{booking_date}}</p><p>Duration: {{duration}} minutes</p><p>We look forward to seeing you!</p></body></html>',
    'booking_confirmation',
    true
  ),
  -- Subscription confirmation
  (
    '00000000-0000-0000-0000-000000000001',
    'Subscription Confirmation',
    'Your subscription is active',
    '<html><body><h1>Subscription Active</h1><p>Thank you for subscribing to {{product_name}}!</p><p>Your subscription will renew on {{renewal_date}}.</p></body></html>',
    'subscription_confirmation',
    true
  ),
  -- Password reset
  (
    '00000000-0000-0000-0000-000000000001',
    'Password Reset',
    'Reset your password',
    '<html><body><h1>Password Reset Request</h1><p>Click the link below to reset your password:</p><p><a href="{{reset_link}}">Reset Password</a></p><p>This link expires in 1 hour.</p><p>If you didn''t request this, please ignore this email.</p></body></html>',
    'password_reset',
    true
  ),
  -- Newsletter
  (
    '00000000-0000-0000-0000-000000000001',
    'Newsletter Template',
    '{{subject}}',
    '<html><body><div style="max-width: 600px; margin: 0 auto;">{{content}}</div></body></html>',
    'newsletter',
    true
  )
ON CONFLICT (tenant_id, template_type) DO NOTHING;

-- ============================================================================
-- PART 3: Demo products
-- ============================================================================

INSERT INTO products (id, tenant_id, title, description, type, price, image_url, is_active, created_at)
VALUES
  (
    '10000000-0000-0000-0000-000000000001',
    '00000000-0000-0000-0000-000000000001',
    'Digital Course: Web Development Fundamentals',
    'Learn the basics of web development with HTML, CSS, and JavaScript. Perfect for beginners.',
    'digital',
    99.00,
    '/images/products/web-dev-course.jpg',
    true,
    NOW()
  ),
  (
    '10000000-0000-0000-0000-000000000002',
    '00000000-0000-0000-0000-000000000001',
    'E-book: The Complete Guide to Personal Branding',
    'A comprehensive guide to building and growing your personal brand online.',
    'digital',
    29.99,
    '/images/products/branding-ebook.jpg',
    true,
    NOW()
  ),
  (
    '10000000-0000-0000-0000-000000000003',
    '00000000-0000-0000-0000-000000000001',
    'One-on-One Coaching Session',
    '60-minute personalized coaching session to help you achieve your goals.',
    'service',
    150.00,
    '/images/products/coaching.jpg',
    true,
    NOW()
  ),
  (
    '10000000-0000-0000-0000-000000000004',
    '00000000-0000-0000-0000-000000000001',
    'Premium Membership',
    'Get access to all courses, exclusive content, and monthly group coaching calls.',
    'subscription',
    49.00,
    '/images/products/membership.jpg',
    true,
    NOW()
  ),
  (
    '10000000-0000-0000-0000-000000000005',
    '00000000-0000-0000-0000-000000000001',
    'Branded Merchandise - T-Shirt',
    'High-quality cotton t-shirt with your favorite brand logo.',
    'physical',
    25.00,
    '/images/products/tshirt.jpg',
    true,
    NOW()
  )
ON CONFLICT (id) DO NOTHING;

-- ============================================================================
-- PART 4: Product variants for physical products
-- ============================================================================

INSERT INTO product_variants (product_id, name, sku, price, inventory_count, is_active)
VALUES
  -- T-shirt sizes
  ('10000000-0000-0000-0000-000000000005', 'Small', 'TSHIRT-S', 25.00, 50, true),
  ('10000000-0000-0000-0000-000000000005', 'Medium', 'TSHIRT-M', 25.00, 100, true),
  ('10000000-0000-0000-0000-000000000005', 'Large', 'TSHIRT-L', 25.00, 75, true),
  ('10000000-0000-0000-0000-000000000005', 'X-Large', 'TSHIRT-XL', 27.00, 50, true)
ON CONFLICT DO NOTHING;

-- ============================================================================
-- PART 5: Demo blog posts
-- ============================================================================

-- Note: This requires a user to exist first. In production, this would be created after user signup.
-- For now, we'll create placeholder blog posts that can be associated with users later.

-- ============================================================================
-- PART 6: Demo pages
-- ============================================================================

INSERT INTO pages (tenant_id, slug, title, content, seo_title, seo_description, is_published, created_at)
VALUES
  (
    '00000000-0000-0000-0000-000000000001',
    'about',
    'About Us',
    '{"blocks": [{"type": "heading", "data": {"text": "About Us", "level": 1}}, {"type": "paragraph", "data": {"text": "Welcome to our platform. We help creators build and monetize their personal brands."}}]}',
    'About Us - Learn More About Our Mission',
    'Discover our story, mission, and the team behind the platform.',
    true,
    NOW()
  ),
  (
    '00000000-0000-0000-0000-000000000001',
    'contact',
    'Contact Us',
    '{"blocks": [{"type": "heading", "data": {"text": "Get in Touch", "level": 1}}, {"type": "paragraph", "data": {"text": "Have questions? We''d love to hear from you."}}]}',
    'Contact Us - Get in Touch',
    'Contact our team for support, partnerships, or general inquiries.',
    true,
    NOW()
  ),
  (
    '00000000-0000-0000-0000-000000000001',
    'faq',
    'Frequently Asked Questions',
    '{"blocks": [{"type": "heading", "data": {"text": "FAQ", "level": 1}}, {"type": "paragraph", "data": {"text": "Find answers to commonly asked questions."}}]}',
    'FAQ - Frequently Asked Questions',
    'Get answers to the most common questions about our platform and services.',
    true,
    NOW()
  )
ON CONFLICT (tenant_id, slug) DO NOTHING;

-- ============================================================================
-- PART 7: Booking availability (for coaching services)
-- ============================================================================

INSERT INTO booking_availability (tenant_id, service_id, day_of_week, start_time, end_time, is_active)
VALUES
  -- Monday
  ('00000000-0000-0000-0000-000000000001', '10000000-0000-0000-0000-000000000003', 1, '09:00', '12:00', true),
  ('00000000-0000-0000-0000-000000000001', '10000000-0000-0000-0000-000000000003', 1, '14:00', '17:00', true),
  -- Tuesday
  ('00000000-0000-0000-0000-000000000001', '10000000-0000-0000-0000-000000000003', 2, '09:00', '12:00', true),
  ('00000000-0000-0000-0000-000000000001', '10000000-0000-0000-0000-000000000003', 2, '14:00', '17:00', true),
  -- Wednesday
  ('00000000-0000-0000-0000-000000000001', '10000000-0000-0000-0000-000000000003', 3, '09:00', '12:00', true),
  ('00000000-0000-0000-0000-000000000001', '10000000-0000-0000-0000-000000000003', 3, '14:00', '17:00', true),
  -- Thursday
  ('00000000-0000-0000-0000-000000000001', '10000000-0000-0000-0000-000000000003', 4, '09:00', '12:00', true),
  ('00000000-0000-0000-0000-000000000001', '10000000-0000-0000-0000-000000000003', 4, '14:00', '17:00', true),
  -- Friday
  ('00000000-0000-0000-0000-000000000001', '10000000-0000-0000-0000-000000000003', 5, '09:00', '12:00', true)
ON CONFLICT DO NOTHING;

-- ============================================================================
-- PART 8: Demo testimonials
-- ============================================================================

INSERT INTO testimonials (tenant_id, author_name, author_title, author_image, content, rating, is_approved, is_featured)
VALUES
  (
    '00000000-0000-0000-0000-000000000001',
    'Sarah Johnson',
    'Marketing Director',
    '/images/testimonials/sarah.jpg',
    'This platform has completely transformed how I manage my personal brand. The tools are intuitive and powerful!',
    5,
    true,
    true
  ),
  (
    '00000000-0000-0000-0000-000000000001',
    'Michael Chen',
    'Entrepreneur',
    '/images/testimonials/michael.jpg',
    'The coaching sessions were invaluable. I learned strategies that immediately improved my online presence.',
    5,
    true,
    true
  ),
  (
    '00000000-0000-0000-0000-000000000001',
    'Emily Rodriguez',
    'Content Creator',
    '/images/testimonials/emily.jpg',
    'Best investment I''ve made in my business. The courses are comprehensive and easy to follow.',
    5,
    true,
    false
  ),
  (
    '00000000-0000-0000-0000-000000000001',
    'David Park',
    'Freelance Designer',
    '/images/testimonials/david.jpg',
    'The membership gives me access to everything I need to grow my brand. Highly recommended!',
    5,
    true,
    false
  )
ON CONFLICT DO NOTHING;

-- ============================================================================
-- PART 9: Navigation items
-- ============================================================================

INSERT INTO navigation_items (tenant_id, label, url, parent_id, position, is_active)
VALUES
  ('00000000-0000-0000-0000-000000000001', 'Home', '/', NULL, 1, true),
  ('00000000-0000-0000-0000-000000000001', 'Products', '/products', NULL, 2, true),
  ('00000000-0000-0000-0000-000000000001', 'Blog', '/blog', NULL, 3, true),
  ('00000000-0000-0000-0000-000000000001', 'About', '/about', NULL, 4, true),
  ('00000000-0000-0000-0000-000000000001', 'Contact', '/contact', NULL, 5, true)
ON CONFLICT DO NOTHING;

-- ============================================================================
-- PART 10: Analytics event types (for reference)
-- ============================================================================

-- Common event types that will be tracked:
-- - page_view
-- - product_view
-- - add_to_cart
-- - checkout_started
-- - purchase_completed
-- - blog_post_view
-- - video_watched
-- - course_started
-- - course_completed
-- - booking_created
-- - subscription_started
-- - subscription_canceled

-- ============================================================================
-- Seed Data Complete
-- ============================================================================

-- Verify seed data
DO $$
DECLARE
  tenant_count INTEGER;
  product_count INTEGER;
  template_count INTEGER;
  page_count INTEGER;
BEGIN
  SELECT COUNT(*) INTO tenant_count FROM tenants;
  SELECT COUNT(*) INTO product_count FROM products;
  SELECT COUNT(*) INTO template_count FROM email_templates;
  SELECT COUNT(*) INTO page_count FROM pages;
  
  RAISE NOTICE 'Seed data loaded successfully:';
  RAISE NOTICE '  Tenants: %', tenant_count;
  RAISE NOTICE '  Products: %', product_count;
  RAISE NOTICE '  Email Templates: %', template_count;
  RAISE NOTICE '  Pages: %', page_count;
END $$;
