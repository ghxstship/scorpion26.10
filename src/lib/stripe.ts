import Stripe from 'stripe'

// Lazy-load Stripe to avoid build-time errors when env vars are missing
let stripeInstance: Stripe | null = null

export const stripe = new Proxy({} as Stripe, {
  get(target, prop) {
    if (!stripeInstance) {
      if (!process.env.STRIPE_SECRET_KEY) {
        throw new Error('STRIPE_SECRET_KEY is not set')
      }
      stripeInstance = new Stripe(process.env.STRIPE_SECRET_KEY, {
        apiVersion: '2025-10-29.clover' as any,
        typescript: true,
      })
    }
    return (stripeInstance as any)[prop]
  }
})
