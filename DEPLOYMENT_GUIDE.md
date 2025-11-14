# Deployment Guide

## Prerequisites

- Node.js 20+
- PostgreSQL database (Supabase account)
- Stripe account
- Email service account (Resend)
- Hosting platform account (Vercel recommended)

## Environment Variables

Create `.env.production` with:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Stripe
STRIPE_SECRET_KEY=sk_live_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...

# Email
RESEND_API_KEY=re_...

# App
NEXT_PUBLIC_APP_URL=https://your-domain.com
```

## Database Setup

### 1. Apply Migrations

Via Supabase Dashboard:
1. Go to SQL Editor
2. Run each migration file in order:
   - `supabase/schema.sql`
   - `supabase/migrations/001_add_soft_delete_and_audit.sql`
   - `supabase/migrations/20251107_add_subdomain.sql`
   - `supabase/migrations/20251107_create_videos_table.sql`
   - `supabase/migrations/20251113_add_webhook_timestamp_fields.sql`
   - `supabase/migrations/20251113_add_webhook_idempotency.sql`
   - `supabase/migrations/20251113_add_updated_at_triggers.sql`

### 2. Seed Data (Optional)

```bash
psql "postgresql://postgres:[PASSWORD]@[HOST]:[PORT]/postgres" -f supabase/seed.sql
```

## Stripe Configuration

### 1. Create Products

Create products in Stripe dashboard matching your database products.

### 2. Configure Webhooks

Add webhook endpoint: `https://your-domain.com/api/webhooks/stripe`

Select events:
- `payment_intent.succeeded`
- `payment_intent.payment_failed`
- `charge.refunded`
- `customer.subscription.created`
- `customer.subscription.updated`
- `customer.subscription.deleted`

Copy webhook secret to `STRIPE_WEBHOOK_SECRET`.

## Deploy to Vercel

### 1. Connect Repository

```bash
vercel link
```

### 2. Set Environment Variables

```bash
vercel env add NEXT_PUBLIC_SUPABASE_URL production
vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY production
# ... add all environment variables
```

Or use Vercel dashboard to add variables.

### 3. Deploy

```bash
vercel --prod
```

## Post-Deployment

### 1. Verify Deployment

```bash
curl https://your-domain.com/api/health
```

### 2. Test Critical Flows

- User registration
- Login with rate limiting
- Product purchase
- Webhook processing

### 3. Configure Monitoring

Set up Sentry:
```bash
npm install @sentry/nextjs
npx @sentry/wizard@latest -i nextjs
```

### 4. Set Up CDN

Vercel provides CDN automatically. For other platforms:
- Configure CloudFlare or similar
- Enable caching for static assets
- Set up image optimization

### 5. Configure Backups

Supabase provides automatic backups. Verify:
- Daily backups enabled
- 30-day retention
- Point-in-time recovery available

## Rollback Procedure

### Quick Rollback

```bash
vercel rollback
```

### Database Rollback

See rollback instructions in each migration file.

## Health Checks

Monitor these endpoints:
- `/api/health` - Application health
- Supabase dashboard - Database health
- Stripe dashboard - Payment processing
- Vercel dashboard - Deployment status

## Troubleshooting

### Build Fails

```bash
npm run build
# Check error output
```

### Database Connection Issues

Verify environment variables and Supabase project status.

### Webhook Failures

Check Stripe webhook logs and verify webhook secret.

### Rate Limiting Issues

For production with multiple instances, implement Redis (see F006 in audit).

## Scaling Considerations

### Current Setup (Single Instance)
- Rate limiting: In-memory (works)
- Account lockout: In-memory (works)
- Sessions: Supabase (distributed)

### Multi-Instance Setup (Required for Scale)
- Implement Redis for rate limiting
- Implement Redis for account lockout
- Configure load balancer
- Enable auto-scaling

## Security Checklist

- [ ] All environment variables set
- [ ] HTTPS enabled (automatic on Vercel)
- [ ] Webhook signatures verified
- [ ] Rate limiting active
- [ ] CORS configured
- [ ] Security headers applied
- [ ] Database RLS policies active
- [ ] Secrets not in code

## Performance Optimization

- [ ] Image optimization enabled
- [ ] Font optimization enabled
- [ ] Code splitting active
- [ ] CDN configured
- [ ] Caching headers set
- [ ] Database indexes created

## Maintenance

### Regular Tasks
- Monitor error rates (Sentry)
- Review Lighthouse scores monthly
- Update dependencies quarterly
- Review security audit quarterly
- Test backup restoration quarterly

### Emergency Contacts
- Vercel Support: support@vercel.com
- Supabase Support: support@supabase.io
- Stripe Support: support@stripe.com
