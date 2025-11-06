# Personal Brand Platform - Complete Setup Guide

This guide will walk you through setting up the entire platform from scratch.

## Table of Contents
1. [Prerequisites](#prerequisites)
2. [Initial Setup](#initial-setup)
3. [Supabase Configuration](#supabase-configuration)
4. [Stripe Integration](#stripe-integration)
5. [Resend Email Setup](#resend-email-setup)
6. [Environment Variables](#environment-variables)
7. [Database Setup](#database-setup)
8. [Testing the Application](#testing-the-application)
9. [Deployment](#deployment)
10. [Troubleshooting](#troubleshooting)

## Prerequisites

Before you begin, ensure you have the following:

- **Node.js 18+** installed ([Download](https://nodejs.org/))
- **npm** or **yarn** package manager
- A **Supabase** account ([Sign up](https://supabase.com))
- A **Stripe** account ([Sign up](https://stripe.com))
- A **Resend** account ([Sign up](https://resend.com))
- A **Vercel** account for deployment ([Sign up](https://vercel.com))
- Basic knowledge of React, Next.js, and TypeScript

## Initial Setup

### 1. Install Dependencies

```bash
cd personal-brand-platform
npm install
```

This will install all required dependencies including:
- Next.js 14+
- React 19
- TypeScript
- Tailwind CSS v4
- Supabase client libraries
- Stripe SDK
- Resend SDK
- UI component libraries

### 2. Verify Installation

```bash
npm run dev
```

The development server should start on `http://localhost:3000`. You'll see errors about missing environment variables - that's expected at this stage.

## Supabase Configuration

### 1. Create a Supabase Project

1. Go to [supabase.com](https://supabase.com)
2. Click "New Project"
3. Choose your organization
4. Enter project details:
   - **Name**: personal-brand-platform
   - **Database Password**: Create a strong password (save this!)
   - **Region**: Choose closest to your users
5. Click "Create new project"
6. Wait for the project to be provisioned (2-3 minutes)

### 2. Get API Credentials

1. In your Supabase project dashboard, go to **Settings** > **API**
2. Copy the following values:
   - **Project URL** (e.g., `https://xxxxx.supabase.co`)
   - **anon/public key** (starts with `eyJ...`)
   - **service_role key** (starts with `eyJ...`) - Keep this secret!

### 3. Set Up Database Schema

1. In Supabase dashboard, go to **SQL Editor**
2. Click "New Query"
3. Copy the entire contents of `supabase/schema.sql` from this project
4. Paste into the SQL editor
5. Click "Run" to execute the schema
6. Verify tables were created in **Database** > **Tables**

You should see these tables:
- tenants
- users
- products
- orders
- order_items
- pages
- blog_posts
- bookings
- testimonials
- email_subscribers

### 4. Enable Authentication Providers

1. Go to **Authentication** > **Providers**
2. Enable **Email** provider (enabled by default)
3. Enable **Google** provider:
   - Follow the setup wizard
   - Add authorized redirect URLs:
     - `http://localhost:3000/auth/callback` (development)
     - `https://yourdomain.com/auth/callback` (production)

### 5. Configure Row Level Security (RLS)

The schema already includes RLS policies. Verify they're enabled:

1. Go to **Database** > **Tables**
2. Click on each table
3. Go to **Policies** tab
4. Verify policies are present and enabled

## Stripe Integration

### 1. Create Stripe Account

1. Sign up at [stripe.com](https://stripe.com)
2. Complete business verification (can test without this)
3. Go to **Developers** > **API keys**

### 2. Get API Keys

**Test Mode** (for development):
1. Toggle to "Test mode" in the dashboard
2. Copy:
   - **Publishable key** (starts with `pk_test_...`)
   - **Secret key** (starts with `sk_test_...`)

**Live Mode** (for production):
1. Toggle to "Live mode"
2. Copy the live keys (only when ready for production)

### 3. Set Up Webhook Endpoint

1. Go to **Developers** > **Webhooks**
2. Click "Add endpoint"
3. Enter webhook URL:
   - Development: Use [Stripe CLI](https://stripe.com/docs/stripe-cli) for local testing
   - Production: `https://yourdomain.com/api/stripe/webhook`
4. Select events to listen for:
   - `checkout.session.completed`
   - `payment_intent.succeeded`
   - `payment_intent.payment_failed`
   - `customer.subscription.created`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
5. Copy the **Webhook signing secret** (starts with `whsec_...`)

### 4. Install Stripe CLI (for local development)

```bash
# macOS
brew install stripe/stripe-cli/stripe

# Windows (with Scoop)
scoop install stripe

# Or download from https://stripe.com/docs/stripe-cli
```

Login to Stripe CLI:
```bash
stripe login
```

Forward webhooks to local server:
```bash
stripe listen --forward-to localhost:3000/api/stripe/webhook
```

## Resend Email Setup

### 1. Create Resend Account

1. Sign up at [resend.com](https://resend.com)
2. Verify your email address

### 2. Add and Verify Domain

1. Go to **Domains**
2. Click "Add Domain"
3. Enter your domain (e.g., `example.com`)
4. Add the provided DNS records to your domain:
   - SPF record
   - DKIM records
   - DMARC record (optional but recommended)
5. Wait for verification (can take up to 48 hours)

**For testing**: You can use the default `onboarding@resend.dev` sender without domain verification.

### 3. Get API Key

1. Go to **API Keys**
2. Click "Create API Key"
3. Name it (e.g., "Production" or "Development")
4. Copy the API key (starts with `re_...`)
5. Store it securely - it won't be shown again!

## Environment Variables

### 1. Create Environment File

Copy the example file:
```bash
cp .env.example .env.local
```

### 2. Fill in All Variables

Edit `.env.local` with your actual credentials:

```env
# Next.js
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# Stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...

# Resend
RESEND_API_KEY=re_...
```

### 3. Verify Configuration

Restart your development server:
```bash
npm run dev
```

Check the console for any configuration errors.

## Database Setup

### 1. Create First Tenant

Run this SQL in Supabase SQL Editor:

```sql
INSERT INTO tenants (name, slug, primary_color, secondary_color)
VALUES ('Demo Brand', 'demo', '#000000', '#ffffff')
RETURNING *;
```

### 2. Create Admin User

1. Sign up through the app at `http://localhost:3000/signup`
2. Or create directly in Supabase:

```sql
-- First create auth user in Supabase Auth UI
-- Then link to users table:
INSERT INTO users (id, email, full_name, role, tenant_id)
VALUES (
  'auth-user-uuid-here',
  'admin@example.com',
  'Admin User',
  'admin',
  'tenant-uuid-from-step-1'
);
```

### 3. Seed Sample Data (Optional)

Create sample products:

```sql
INSERT INTO products (tenant_id, title, description, type, price, is_active)
VALUES 
  ('tenant-uuid', 'The Excellence Blueprint', 'A comprehensive guide to peak performance', 'digital', 4999, true),
  ('tenant-uuid', 'Elite Coaching Program', '12-week intensive coaching program', 'subscription', 29999, true),
  ('tenant-uuid', '1-on-1 Session', 'Personal coaching session', 'service', 49999, true);
```

## Testing the Application

### 1. Test Authentication

1. Go to `http://localhost:3000/login`
2. Try signing in with your admin account
3. Test Google OAuth (if configured)
4. Verify redirect to `/admin` dashboard

### 2. Test Product Pages

1. Visit `http://localhost:3000/products`
2. Verify products are displayed
3. Click on a product to view details

### 3. Test Contact Form

1. Go to `http://localhost:3000/contact`
2. Fill out and submit the form
3. Check browser console for submission

### 4. Test Stripe Integration

1. Create a test product in Stripe Dashboard
2. Add product to your database with Stripe IDs
3. Test checkout flow
4. Use Stripe test cards:
   - Success: `4242 4242 4242 4242`
   - Decline: `4000 0000 0000 0002`

### 5. Test Email Sending

Create a test email API route and send a test email:

```bash
curl -X POST http://localhost:3000/api/email/test \
  -H "Content-Type: application/json" \
  -d '{"to":"your-email@example.com"}'
```

## Deployment

### 1. Prepare for Production

1. Update environment variables for production
2. Use Stripe live keys
3. Update `NEXT_PUBLIC_SITE_URL` to your domain
4. Verify all API endpoints

### 2. Deploy to Vercel

**Option A: GitHub Integration**
1. Push code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Click "New Project"
4. Import your GitHub repository
5. Configure environment variables
6. Click "Deploy"

**Option B: Vercel CLI**
```bash
npm install -g vercel
vercel login
vercel
```

### 3. Configure Custom Domain

1. In Vercel dashboard, go to **Settings** > **Domains**
2. Add your custom domain
3. Update DNS records as instructed
4. Wait for SSL certificate provisioning

### 4. Update Webhook URLs

1. Update Stripe webhook URL to production
2. Update Supabase redirect URLs
3. Update Google OAuth redirect URLs

## Troubleshooting

### Common Issues

**1. "Cannot connect to Supabase"**
- Verify `NEXT_PUBLIC_SUPABASE_URL` is correct
- Check if anon key is valid
- Ensure RLS policies allow access

**2. "Stripe webhook signature verification failed"**
- Verify `STRIPE_WEBHOOK_SECRET` matches webhook endpoint
- For local dev, use Stripe CLI
- Check webhook endpoint URL is correct

**3. "Email not sending"**
- Verify Resend API key is valid
- Check domain verification status
- Ensure sender email is from verified domain

**4. "Authentication not working"**
- Check Supabase Auth settings
- Verify redirect URLs are configured
- Clear browser cookies and try again

**5. "Build fails on Vercel"**
- Check all environment variables are set
- Verify TypeScript has no errors: `npm run build`
- Check Vercel build logs for specific errors

### Getting Help

- **Documentation**: Check the main README.md
- **Supabase Docs**: [supabase.com/docs](https://supabase.com/docs)
- **Stripe Docs**: [stripe.com/docs](https://stripe.com/docs)
- **Next.js Docs**: [nextjs.org/docs](https://nextjs.org/docs)

## Next Steps

After successful setup:

1. ✅ Customize branding and colors
2. ✅ Add your content and products
3. ✅ Set up email templates
4. ✅ Configure analytics
5. ✅ Test all user flows
6. ✅ Launch to production!

---

**Need help?** Open an issue on GitHub or contact support.
