# Enterprise Audit Checklist - Part 1: Backend & Infrastructure
**Date:** 2025-11-13  
**Project:** Scorpion26.10  
**Status:** PENDING EXECUTION

---

## Phase 1: Database Layer

### Schema Files
- [ ] `/supabase/schema.sql`
  - [ ] All tables have primary keys (UUID)
  - [ ] Foreign keys with ON DELETE behaviors
  - [ ] Timestamp fields (created_at, updated_at)
  - [ ] Soft delete (deleted_at) where needed
  - [ ] Indexes on foreign keys
  - [ ] Check constraints for business rules
  - [ ] Enums properly defined

- [ ] `/supabase/migrations/001_add_soft_delete_and_audit.sql`
  - [ ] Idempotent migration
  - [ ] Rollback documented

- [ ] `/supabase/migrations/20251107_add_subdomain.sql`
  - [ ] Idempotent migration
  - [ ] Rollback documented

- [ ] `/supabase/migrations/20251107_create_videos_table.sql`
  - [ ] Idempotent migration
  - [ ] Proper relationships

- [ ] `/supabase/seed.sql`
  - [ ] Lookup tables populated
  - [ ] No production secrets

- [ ] `/src/types/database.ts`
  - [ ] All tables typed
  - [ ] No `any` types

---

## Phase 2: API Endpoints

### Authentication (9 endpoints)
- [ ] `/src/app/api/auth/login/route.ts` - Input validation, rate limiting, account lockout
- [ ] `/src/app/api/auth/signup/route.ts` - Password strength, email verification
- [ ] `/src/app/api/auth/logout/route.ts` - Session invalidation
- [ ] `/src/app/api/auth/verify-email/route.ts` - Token validation
- [ ] `/src/app/api/auth/reset-password/route.ts` - Token expiration (15-60 min)
- [ ] `/src/app/api/auth/change-password/route.ts` - Current password verification
- [ ] `/src/app/api/auth/refresh-token/route.ts` - Token rotation
- [ ] `/src/app/api/auth/session/route.ts` - Session validation

### Admin (7 endpoints)
- [ ] `/src/app/api/admin/dashboard/route.ts` - Admin role check, analytics
- [ ] `/src/app/api/admin/analytics/route.ts` - Date filtering, aggregation
- [ ] `/src/app/api/admin/customers/route.ts` - Pagination, search
- [ ] `/src/app/api/admin/settings/route.ts` - Input validation
- [ ] `/src/app/api/admin/users/route.ts` - CRUD, pagination
- [ ] `/src/app/api/admin/users/[id]/route.ts` - GET, PUT, DELETE
- [ ] `/src/app/api/admin/users/[id]/restore/route.ts` - Soft delete restoration

### Products (7 endpoints)
- [ ] `/src/app/api/products/route.ts` - List (pagination), Create (admin)
- [ ] `/src/app/api/products/create/route.ts` - Stripe sync, image upload
- [ ] `/src/app/api/products/[id]/route.ts` - GET, PUT, DELETE
- [ ] `/src/app/api/products/[id]/update/route.ts` - Stripe sync
- [ ] `/src/app/api/products/[id]/delete/route.ts` - Soft delete
- [ ] `/src/app/api/products/[id]/variants/route.ts` - Variant CRUD

### Orders (7 endpoints)
- [ ] `/src/app/api/orders/route.ts` - List, pagination, filtering
- [ ] `/src/app/api/orders/create/route.ts` - Inventory check, payment intent
- [ ] `/src/app/api/orders/[id]/route.ts` - Detail, authorization
- [ ] `/src/app/api/orders/[id]/status/route.ts` - Status update, notifications
- [ ] `/src/app/api/orders/[id]/refund/route.ts` - Stripe refund
- [ ] `/src/app/api/orders/export/route.ts` - CSV/Excel export

### Bookings (5 endpoints)
- [ ] `/src/app/api/bookings/route.ts` - List, Create
- [ ] `/src/app/api/bookings/availability/route.ts` - Timezone handling
- [ ] `/src/app/api/bookings/[id]/route.ts` - GET, PUT, DELETE
- [ ] `/src/app/api/bookings/[id]/cancel/route.ts` - Cancellation policy
- [ ] `/src/app/api/bookings/[id]/reschedule/route.ts` - Availability check

### Blog (3 endpoints)
- [ ] `/src/app/api/blog/route.ts` - List, Create, pagination
- [ ] `/src/app/api/blog/create/route.ts` - Slug validation
- [ ] `/src/app/api/blog/[slug]/route.ts` - GET, PUT, DELETE

### Pages (3 endpoints)
- [ ] `/src/app/api/pages/route.ts` - List, Create
- [ ] `/src/app/api/pages/create/route.ts` - Content validation
- [ ] `/src/app/api/pages/[slug]/route.ts` - GET, PUT, DELETE

### Media (3 endpoints)
- [ ] `/src/app/api/media/route.ts` - List, Upload
- [ ] `/src/app/api/media/upload/route.ts` - File validation, malware scan
- [ ] `/src/app/api/media/[id]/route.ts` - GET, DELETE

### Email (5 endpoints)
- [ ] `/src/app/api/email/subscribe/route.ts` - Double opt-in
- [ ] `/src/app/api/email/unsubscribe/route.ts` - Token validation
- [ ] `/src/app/api/email/subscribers/route.ts` - Admin only
- [ ] `/src/app/api/email/send-transactional/route.ts` - Template validation
- [ ] `/src/app/api/email/send-campaign/route.ts` - Bulk sending

### Stripe (4 endpoints)
- [ ] `/src/app/api/stripe/connect/account/route.ts` - Account creation
- [ ] `/src/app/api/stripe/connect/balance/route.ts` - Balance retrieval
- [ ] `/src/app/api/stripe/connect/onboard/route.ts` - Onboarding link
- [ ] `/src/app/api/webhooks/stripe/route.ts` - Signature verification, idempotency

### Checkout (1 endpoint)
- [ ] `/src/app/api/checkout/route.ts` - Cart validation, session creation

**Total API Endpoints: 50+**

---

## Phase 3: Business Logic & Services

### Authentication & Security
- [ ] `/src/lib/auth/session-manager.ts` - Session CRUD, timeout
- [ ] `/src/lib/auth/account-lockout.ts` - Failed login tracking (5-10 attempts)
- [ ] `/src/lib/auth/csrf.ts` - Token generation/validation
- [ ] `/src/lib/security/headers.ts` - CSP, HSTS, X-Frame-Options
- [ ] `/src/lib/security/rate-limit.ts` - Per IP/user limits

### Integrations
- [ ] `/src/lib/stripe.ts` - Client initialization
- [ ] `/src/lib/stripe/connect.ts` - Connect account management
- [ ] `/src/lib/supabase/client.ts` - Client-side client
- [ ] `/src/lib/supabase/server.ts` - Server-side client
- [ ] `/src/lib/supabase/middleware.ts` - Auth middleware
- [ ] `/src/lib/supabase/typed-client.ts` - Type-safe wrapper
- [ ] `/src/lib/email/send.ts` - Email service, templates

### Utilities
- [ ] `/src/lib/utils/validation.ts` - Zod schemas
- [ ] `/src/lib/utils/validation-extended.ts` - Business rules
- [ ] `/src/lib/utils/api-helpers.ts` - Response formatting
- [ ] `/src/lib/utils/file-security.ts` - File validation, magic bytes
- [ ] `/src/lib/utils/privacy.ts` - Data anonymization, GDPR
- [ ] `/src/lib/utils/analytics.ts` - Event tracking
- [ ] `/src/lib/utils/performance.ts` - Metrics collection
- [ ] `/src/lib/utils/seo.ts` - Meta tags, structured data
- [ ] `/src/lib/utils/accessibility-validator.ts` - WCAG validation

### Monitoring & Tenant
- [ ] `/src/lib/monitoring/sentry.ts` - Error tracking, performance
- [ ] `/src/lib/tenant/resolver.ts` - Subdomain/custom domain handling
- [ ] `/src/lib/video/access-control.ts` - Video permissions

### State Management
- [ ] `/src/lib/cart/store.ts` - Cart state (Zustand)
- [ ] `/src/lib/store/cart.ts` - Check for duplication

### Middleware
- [ ] `/src/middleware.ts` - Auth, tenant, security, rate limiting
- [ ] `/src/middleware/rate-limit.ts` - Rate limiting middleware
- [ ] `/src/middleware/security-headers.ts` - Security headers middleware

### Services
- [ ] `/src/services/base.service.ts` - Base service class

---

## Phase 4: Security Checklist

### Authentication Security
- [ ] Password hashing (bcrypt/argon2) - NOT MD5/SHA1
- [ ] Password requirements (length, complexity)
- [ ] Account lockout (5-10 failed attempts)
- [ ] Session timeout (idle & absolute)
- [ ] CSRF protection
- [ ] JWT secrets in environment variables
- [ ] Token expiration & refresh

### Authorization Security
- [ ] RBAC enforced server-side
- [ ] Resource-level permissions
- [ ] No privilege escalation vulnerabilities

### Data Protection
- [ ] SQL injection prevention (ORM/parameterized queries)
- [ ] XSS prevention (input sanitization)
- [ ] CORS configured (not '*' in production)
- [ ] CSP headers set
- [ ] HTTPS enforced (HSTS)
- [ ] Sensitive data encrypted at rest
- [ ] TLS 1.2+ for data in transit
- [ ] No secrets in code/repo

### API Security
- [ ] Rate limiting per IP and user
- [ ] Request size limits
- [ ] Input validation (Zod)
- [ ] No verbose errors in production

### File Upload Security
- [ ] File type whitelist (not blacklist)
- [ ] Magic byte validation
- [ ] File size limits
- [ ] Malware scanning
- [ ] Files served from separate domain/CDN

### Dependency Security
- [ ] No known vulnerabilities (npm audit)
- [ ] Dependencies up-to-date
- [ ] License compliance

---

## Execution Notes

**Priority:** P0 (Critical)
**Estimated Time:** 4-6 hours
**Dependencies:** None

**Next Steps:**
1. Execute this checklist systematically
2. Document all findings in AUDIT_FINDINGS.md
3. Create remediation tasks for gaps
4. Proceed to Part 2 (Frontend) after completion
