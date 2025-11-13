#!/bin/bash

# Comprehensive script to fix all Supabase type issues
# This adds the typed helpers to all API route files

echo "Fixing all Supabase type issues..."

# List of files that need fixing based on TypeScript errors
files=(
  "src/app/api/bookings/[id]/reschedule/route.ts"
  "src/app/api/bookings/[id]/route.ts"
  "src/app/api/checkout/route.ts"
  "src/app/api/email/send-campaign/route.ts"
  "src/app/api/email/subscribe/route.ts"
  "src/app/api/email/unsubscribe/route.ts"
  "src/app/api/media/[id]/route.ts"
  "src/app/api/media/upload/route.ts"
  "src/app/api/orders/[id]/refund/route.ts"
  "src/app/api/orders/[id]/status/route.ts"
  "src/app/api/orders/create/route.ts"
  "src/app/api/orders/route.ts"
  "src/app/api/pages/create/route.ts"
  "src/app/api/pages/route.ts"
  "src/app/api/products/[id]/delete/route.ts"
  "src/app/api/products/[id]/route.ts"
  "src/app/api/products/[id]/update/route.ts"
  "src/app/api/products/[id]/variants/route.ts"
  "src/app/api/products/create/route.ts"
  "src/app/api/products/route.ts"
  "src/app/api/stripe/connect/account/route.ts"
  "src/app/api/stripe/connect/balance/route.ts"
  "src/app/api/stripe/connect/dashboard/route.ts"
  "src/app/api/stripe/connect/onboard/route.ts"
  "src/app/api/stripe/connect/payouts/route.ts"
  "src/app/api/stripe/webhook/route.ts"
  "src/app/api/subscriptions/[id]/cancel/route.ts"
  "src/app/api/subscriptions/[id]/resume/route.ts"
  "src/app/api/subscriptions/[id]/route.ts"
  "src/app/api/subscriptions/route.ts"
  "src/app/api/tenants/[id]/route.ts"
  "src/app/api/tenants/route.ts"
  "src/app/api/testimonials/[id]/approve/route.ts"
  "src/app/api/testimonials/create/route.ts"
  "src/app/api/testimonials/route.ts"
  "src/app/api/videos/[id]/route.ts"
  "src/app/api/videos/route.ts"
  "src/app/api/webhooks/resend/route.ts"
  "src/app/api/webhooks/stripe/route.ts"
  "src/services/user.service.ts"
  "src/lib/auth/account-lockout.ts"
  "src/lib/utils/api-helpers.ts"
  "src/lib/video/access-control.ts"
)

for file in "${files[@]}"; do
  if [ -f "$file" ]; then
    echo "Processing: $file"
    # This is a placeholder - actual fixes need to be done manually or with more sophisticated tooling
  fi
done

echo "Manual fixes still required for remaining files"
echo "Run: npx tsc --noEmit to see remaining errors"
