# Enterprise Audit Remediation Plan
**Date:** 2025-11-13  
**Project:** Scorpion26.10  
**Status:** READY TO EXECUTE

---

## Executive Summary

**Total Issues:** 23  
**Critical (P0):** 5 - IMMEDIATE ACTION REQUIRED  
**High (P1):** 8 - This Sprint  
**Medium (P2):** 7 - This Sprint  
**Low (P3):** 3 - Backlog

**Estimated Total Effort:** 3-4 days  
**Target Completion:** Within 1 week

---

## Critical Issues (P0) - IMMEDIATE

### F001 - Missing Rate Limiting on Auth Endpoints
**Effort:** S (2 hours)  
**Files:** `/src/app/api/auth/login/route.ts`, `/src/app/api/auth/signup/route.ts`

**Tasks:**
1. Wrap login POST handler with `withRateLimit(..., 'auth')`
2. Wrap signup POST handler with `withRateLimit(..., 'auth')`
3. Test rate limiting behavior
4. Verify rate limit headers in response

**Status:** ⏳ READY TO FIX

---

### F002 - Account Lockout Not Integrated in Login
**Effort:** S (2 hours)  
**Files:** `/src/app/api/auth/login/route.ts`

**Tasks:**
1. Import `isAccountLocked`, `recordLoginAttempt`, `clearLoginAttempts`
2. Check lockout status before authentication
3. Record failed attempts on auth failure
4. Record successful attempts and clear on success
5. Return appropriate error messages with remaining time
6. Test lockout behavior

**Status:** ⏳ READY TO FIX

---

### F003 - Weak Password Requirements
**Effort:** XS (1 hour)  
**Files:** `/src/app/api/auth/signup/route.ts`, `/src/lib/utils/validation.ts`

**Tasks:**
1. Create comprehensive password validation schema
2. Update signup schema to use new validation
3. Add client-side validation feedback
4. Test password validation

**Status:** ⏳ READY TO FIX

---

### F004 - Missing Database Fields for Webhook Events
**Effort:** S (2 hours)  
**Files:** New migration file, `/supabase/schema.sql`

**Tasks:**
1. Create migration `20251113_add_webhook_timestamp_fields.sql`
2. Add `paid_at TIMESTAMPTZ` to orders table
3. Add `refunded_at TIMESTAMPTZ` to orders table
4. Add `cancelled_at TIMESTAMPTZ` to subscriptions table
5. Run migration in development
6. Update database types
7. Test webhook handler

**Status:** ⏳ READY TO FIX

---

### F005 - No Webhook Idempotency Handling
**Effort:** M (4 hours)  
**Files:** New migration, `/src/app/api/webhooks/stripe/route.ts`

**Tasks:**
1. Create `webhook_events` table with event_id, processed_at
2. Add idempotency check at start of webhook handler
3. Store event ID after successful processing
4. Add index on event_id for fast lookups
5. Test with duplicate webhook deliveries

**Status:** ⏳ READY TO FIX

---

## High Priority Issues (P1) - This Sprint

### F006 - Production Storage Warning
**Effort:** L (8 hours)  
**Files:** `/src/lib/security/rate-limit.ts`, `/src/lib/auth/account-lockout.ts`

**Tasks:**
1. Install Redis client (ioredis or @upstash/redis)
2. Create Redis adapter interface
3. Implement Redis storage for rate limiting
4. Implement Redis storage for account lockout
5. Add environment variable for Redis connection
6. Add fallback to in-memory for development
7. Test in production-like environment

**Status:** ⏳ PLANNED

---

### F007 - Missing Migration Rollback Procedures
**Effort:** M (4 hours)  
**Files:** All migration files

**Tasks:**
1. Document rollback SQL for each migration
2. Create rollback testing procedure
3. Add rollback instructions to deployment docs

**Status:** ⏳ PLANNED

---

### F008 - Missing updated_at Triggers
**Effort:** S (2 hours)  
**Files:** New migration file

**Tasks:**
1. Create migration for missing triggers
2. Add triggers for all tables with updated_at
3. Test trigger functionality
4. Verify existing data

**Status:** ⏳ PLANNED

---

## Medium Priority Issues (P2) - This Sprint

### F009 - CSRF Protection Not Applied
**Effort:** M (4 hours)  
**Files:** Middleware, API routes

**Tasks:**
1. Integrate CSRF validation in middleware
2. Add CSRF token generation endpoint
3. Update client to include CSRF tokens
4. Test CSRF protection

**Status:** ⏳ PLANNED

---

### F010 - Session Timeout Not Configured
**Effort:** S (1 hour)  
**Files:** Supabase configuration

**Tasks:**
1. Configure Supabase auth settings
2. Set idle timeout (30 min)
3. Set absolute timeout (24 hours)
4. Test session expiration

**Status:** ⏳ PLANNED

---

## Execution Order

### Phase 1: Critical Security Fixes (Day 1)
1. F003 - Password requirements (1 hour)
2. F001 - Rate limiting (2 hours)
3. F002 - Account lockout (2 hours)
4. F004 - Database fields (2 hours)
5. F005 - Webhook idempotency (4 hours)

**Total: 11 hours (1.5 days)**

### Phase 2: High Priority (Days 2-3)
1. F008 - Updated_at triggers (2 hours)
2. F010 - Session timeout (1 hour)
3. F009 - CSRF protection (4 hours)
4. F007 - Rollback procedures (4 hours)
5. F006 - Redis storage (8 hours)

**Total: 19 hours (2.5 days)**

### Phase 3: Verification & Testing (Day 4)
1. Re-run audit on fixed items
2. Integration testing
3. Security testing
4. Documentation updates

**Total: 8 hours (1 day)**

---

## Success Criteria

### Phase 1 Complete When:
- ✅ All auth endpoints have rate limiting
- ✅ Account lockout functional
- ✅ Strong password requirements enforced
- ✅ Webhook handler has all required fields
- ✅ Webhook idempotency implemented
- ✅ All P0 tests passing

### Phase 2 Complete When:
- ✅ All tables have updated_at triggers
- ✅ Session timeouts configured
- ✅ CSRF protection active
- ✅ Rollback procedures documented
- ✅ Redis storage implemented (or plan for production)
- ✅ All P1 tests passing

### Phase 3 Complete When:
- ✅ All fixes verified
- ✅ No new issues introduced
- ✅ Documentation updated
- ✅ Ready for Part 2 audit

---

## Risk Mitigation

### High Risk Items:
1. **Webhook changes** - Could affect payment processing
   - Mitigation: Test thoroughly in staging with test webhooks
   
2. **Database migrations** - Could cause downtime
   - Mitigation: Test migrations in development first, plan maintenance window
   
3. **Rate limiting** - Could block legitimate users
   - Mitigation: Monitor rate limit hits, adjust limits if needed

### Rollback Plan:
- Database migrations: Use documented rollback procedures
- Code changes: Git revert to previous commit
- Configuration changes: Restore previous Supabase settings

---

## Next Steps

1. ✅ Audit complete (Part 1)
2. ✅ Findings documented
3. ✅ Remediation plan created
4. ⏳ **BEGIN EXECUTION** - Start with F003 (easiest win)
5. ⏳ Execute Phase 1 (Critical fixes)
6. ⏳ Execute Phase 2 (High priority)
7. ⏳ Execute Phase 3 (Verification)
8. ⏳ Proceed to Part 2 audit

---

**Ready to begin remediation. Starting with critical security fixes.**
