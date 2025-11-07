# Deployment Guide

## Prerequisites

- Node.js 20+
- PostgreSQL database (via Supabase)
- Stripe account
- Resend account
- Vercel/Netlify account (or similar)

## Environment Variables

Create a `.env.local` file with:

```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# Stripe
STRIPE_SECRET_KEY=sk_live_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...

# Resend
RESEND_API_KEY=re_...

# App
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
NODE_ENV=production
```

## Database Setup

### 1. Apply Migrations

```bash
# Link to Supabase project
npx supabase link --project-ref YOUR_PROJECT_REF

# Push migrations
npx supabase db push

# Or apply manually
psql -h YOUR_DB_HOST -U postgres -d postgres -f supabase/migrations/001_add_soft_delete_and_audit.sql
```

### 2. Run Seed Data (Optional)

```bash
psql -h YOUR_DB_HOST -U postgres -d postgres -f supabase/seed.sql
```

### 3. Generate TypeScript Types

```bash
npx supabase gen types typescript > src/types/database.ts
```

## Installation

```bash
# Install dependencies
npm install

# Install test dependencies
npm install -D vitest @vitest/coverage-v8 @vitejs/plugin-react
npm install -D @testing-library/react @testing-library/jest-dom
npm install -D @playwright/test

# Install Playwright browsers
npx playwright install
```

## Build

```bash
# Build for production
npm run build

# Test production build locally
npm start
```

## Testing

```bash
# Run all tests
npm run test:all

# Run unit tests
npm run test:unit

# Run integration tests
npm run test:integration

# Run E2E tests
npm run test:e2e

# Generate coverage report
npm run test:coverage
```

## Deployment Options

### Option 1: Vercel (Recommended)

1. Push code to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy

```bash
# Or use Vercel CLI
npm i -g vercel
vercel --prod
```

### Option 2: Netlify

1. Install Netlify CLI
```bash
npm i -g netlify-cli
```

2. Build and deploy
```bash
npm run build
netlify deploy --prod
```

### Option 3: Docker

```dockerfile
# Dockerfile
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV production
COPY --from=builder /app/next.config.mjs ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

EXPOSE 3000
CMD ["npm", "start"]
```

Build and run:
```bash
docker build -t personal-brand-platform .
docker run -p 3000:3000 --env-file .env.local personal-brand-platform
```

## Post-Deployment

### 1. Configure Stripe Webhooks

Add webhook endpoint in Stripe Dashboard:
- URL: `https://yourdomain.com/api/webhooks/stripe`
- Events: `checkout.session.completed`, `customer.subscription.updated`, `customer.subscription.deleted`

### 2. Configure DNS

Point your domain to deployment platform.

### 3. Enable SSL

Ensure HTTPS is enabled (automatic on Vercel/Netlify).

### 4. Set up Monitoring

Configure error tracking (Sentry, LogRocket, etc.):

```bash
npm install @sentry/nextjs
npx @sentry/wizard@latest -i nextjs
```

### 5. Configure Analytics

Add Google Analytics or similar:

```tsx
// src/app/layout.tsx
import Script from 'next/script'

export default function RootLayout({ children }) {
  return (
    <html>
      <head>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'GA_MEASUREMENT_ID');
          `}
        </Script>
      </head>
      <body>{children}</body>
    </html>
  )
}
```

## Monitoring & Maintenance

### Health Checks

Create a health check endpoint:

```typescript
// src/app/api/health/route.ts
export async function GET() {
  return Response.json({ status: 'ok', timestamp: new Date().toISOString() })
}
```

### Database Backups

Supabase provides automatic backups. Configure additional backups if needed.

### Log Monitoring

Monitor application logs through your hosting platform dashboard.

### Performance Monitoring

Use Vercel Analytics or similar:

```bash
npm install @vercel/analytics
```

```tsx
// src/app/layout.tsx
import { Analytics } from '@vercel/analytics/react'

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
```

## Rollback Procedure

### Vercel
```bash
vercel rollback
```

### Netlify
Use Netlify Dashboard to rollback to previous deployment.

### Docker
```bash
docker pull your-registry/personal-brand-platform:previous-tag
docker stop current-container
docker run -d --name personal-brand-platform your-registry/personal-brand-platform:previous-tag
```

## Troubleshooting

### Build Failures

1. Check environment variables are set
2. Verify Node.js version (20+)
3. Clear cache: `rm -rf .next node_modules && npm install`

### Database Connection Issues

1. Verify Supabase credentials
2. Check IP whitelist in Supabase dashboard
3. Test connection: `psql -h YOUR_DB_HOST -U postgres`

### Stripe Webhook Failures

1. Verify webhook secret matches
2. Check webhook endpoint is accessible
3. Review Stripe Dashboard webhook logs

## Security Checklist

- [ ] All environment variables set
- [ ] HTTPS enabled
- [ ] Rate limiting configured
- [ ] CORS properly configured
- [ ] Security headers enabled
- [ ] Database RLS policies active
- [ ] API authentication working
- [ ] Webhook signatures verified
- [ ] Error messages don't expose sensitive data
- [ ] Dependencies updated (npm audit)

## Performance Optimization

### Enable Caching

```typescript
// next.config.mjs
export default {
  headers: async () => [
    {
      source: '/api/:path*',
      headers: [
        { key: 'Cache-Control', value: 'public, max-age=60, s-maxage=60' }
      ]
    }
  ]
}
```

### Image Optimization

Use Next.js Image component:
```tsx
import Image from 'next/image'

<Image src="/image.jpg" alt="Description" width={800} height={600} />
```

### Database Optimization

1. Add indexes to frequently queried columns
2. Use connection pooling
3. Enable query caching where appropriate

## Support

For issues, contact:
- Technical Support: support@yourdomain.com
- Emergency: emergency@yourdomain.com
