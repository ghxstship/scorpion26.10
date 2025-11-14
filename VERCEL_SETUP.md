# Vercel Deployment Setup Guide

## Quick Start

The application is now **resilient** and will deploy successfully even without full configuration. However, to enable all features, you need to set environment variables in Vercel.

## Required Environment Variables

### 1. Supabase Configuration (Required for auth, database, storage)

```bash
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here
```

**How to get these:**
1. Go to your Supabase project dashboard
2. Navigate to Settings → API
3. Copy the values:
   - Project URL → `NEXT_PUBLIC_SUPABASE_URL`
   - anon/public key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - service_role key → `SUPABASE_SERVICE_ROLE_KEY`

### 2. Stripe Configuration (Required for payments)

```bash
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
STRIPE_CONNECT_CLIENT_ID=ca_...
```

**How to get these:**
1. Go to Stripe Dashboard → Developers → API keys
2. Copy publishable and secret keys
3. For webhook secret: Create a webhook endpoint in Stripe pointing to `https://your-domain.vercel.app/api/webhooks/stripe`
4. For Connect: Go to Connect → Settings

### 3. Resend Configuration (Required for emails)

```bash
RESEND_API_KEY=re_...
```

**How to get this:**
1. Go to Resend dashboard
2. Navigate to API Keys
3. Create a new API key

### 4. Site Configuration

```bash
NEXT_PUBLIC_SITE_URL=https://your-domain.vercel.app
NEXT_PUBLIC_ROOT_DOMAIN=your-domain.vercel.app
```

## Setting Environment Variables in Vercel

### Via Vercel Dashboard:

1. Go to your project in Vercel
2. Click **Settings** → **Environment Variables**
3. Add each variable:
   - **Key**: Variable name (e.g., `NEXT_PUBLIC_SUPABASE_URL`)
   - **Value**: The actual value
   - **Environment**: Select all (Production, Preview, Development)
4. Click **Save**

### Via Vercel CLI:

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Set environment variables
vercel env add NEXT_PUBLIC_SUPABASE_URL production
vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY production
# ... repeat for all variables
```

## Deployment Verification

### 1. Check Health Endpoint

After deployment, verify the app is running:

```bash
curl https://your-domain.vercel.app/api/health
```

Expected response:
```json
{
  "status": "healthy",
  "timestamp": "2025-11-13T...",
  "environment": "production",
  "supabaseConfigured": true
}
```

If `supabaseConfigured` is `false`, you need to set the Supabase environment variables.

### 2. Check Logs

In Vercel dashboard:
1. Go to **Deployments**
2. Click on your latest deployment
3. Click **View Function Logs**
4. Look for any warnings about missing configuration

## Troubleshooting

### Issue: "Supabase not configured" warnings in logs

**Solution:** Set `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` in Vercel environment variables.

### Issue: Authentication not working

**Solution:** 
1. Verify Supabase environment variables are set correctly
2. Check that your Supabase project allows the Vercel domain in "Site URL" settings
3. Add Vercel domain to Supabase "Redirect URLs"

### Issue: Payments not working

**Solution:**
1. Verify all Stripe environment variables are set
2. Ensure webhook endpoint is configured in Stripe dashboard
3. Test webhook with Stripe CLI: `stripe listen --forward-to https://your-domain.vercel.app/api/webhooks/stripe`

### Issue: Emails not sending

**Solution:**
1. Verify `RESEND_API_KEY` is set
2. Check that your domain is verified in Resend
3. Review Resend dashboard for delivery logs

## Database Migrations

After setting up Supabase, run migrations:

```bash
# Install Supabase CLI
npm install -g supabase

# Link to your project
supabase link --project-ref your-project-ref

# Push migrations
supabase db push
```

## Post-Deployment Checklist

- [ ] All environment variables set in Vercel
- [ ] Health check endpoint returns `supabaseConfigured: true`
- [ ] Database migrations applied
- [ ] Stripe webhook configured and tested
- [ ] Email sending tested
- [ ] Custom domain configured (if applicable)
- [ ] SSL certificate active
- [ ] Admin access verified

## Support

If you encounter issues:
1. Check Vercel deployment logs
2. Check browser console for errors
3. Verify all environment variables are set correctly
4. Test the `/api/health` endpoint
5. Review this guide for missing steps
