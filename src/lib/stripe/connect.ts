import Stripe from 'stripe'
import { stripe } from '@/lib/stripe'

/**
 * Create Stripe Connect account link for onboarding
 */
export async function createConnectAccountLink(
  accountId: string,
  refreshUrl: string,
  returnUrl: string
): Promise<string> {
  const accountLink = await stripe.accountLinks.create({
    account: accountId,
    refresh_url: refreshUrl,
    return_url: returnUrl,
    type: 'account_onboarding',
  })

  return accountLink.url
}

/**
 * Create a new Stripe Connect account
 */
export async function createConnectAccount(
  email: string,
  country: string = 'US'
): Promise<Stripe.Account> {
  const account = await stripe.accounts.create({
    type: 'standard',
    email,
    country,
    capabilities: {
      card_payments: { requested: true },
      transfers: { requested: true },
    },
  })

  return account
}

/**
 * Get Stripe Connect account details
 */
export async function getConnectAccount(
  accountId: string
): Promise<Stripe.Account> {
  return await stripe.accounts.retrieve(accountId)
}

/**
 * Get Stripe Connect account balance
 */
export async function getConnectAccountBalance(
  accountId: string
): Promise<Stripe.Balance> {
  return await stripe.balance.retrieve({
    stripeAccount: accountId,
  })
}

/**
 * List payouts for a Connect account
 */
export async function listConnectPayouts(
  accountId: string,
  limit: number = 10
): Promise<Stripe.ApiList<Stripe.Payout>> {
  return await stripe.payouts.list(
    { limit },
    { stripeAccount: accountId }
  )
}

/**
 * Create payment intent with Connect account
 */
export async function createConnectPaymentIntent(
  amount: number,
  currency: string,
  connectedAccountId: string,
  applicationFeeAmount: number,
  metadata?: Record<string, string>
): Promise<Stripe.PaymentIntent> {
  return await stripe.paymentIntents.create({
    amount,
    currency,
    application_fee_amount: applicationFeeAmount,
    transfer_data: {
      destination: connectedAccountId,
    },
    metadata,
  })
}

/**
 * Create checkout session with Connect account
 */
export async function createConnectCheckoutSession(
  priceId: string,
  connectedAccountId: string,
  applicationFeePercent: number,
  successUrl: string,
  cancelUrl: string,
  metadata?: Record<string, string>
): Promise<Stripe.Checkout.Session> {
  // First, get the price to calculate application fee
  const price = await stripe.prices.retrieve(priceId)
  const amount = typeof price.unit_amount === 'number' ? price.unit_amount : 0
  const applicationFeeAmount = Math.round(amount * (applicationFeePercent / 100))

  return await stripe.checkout.sessions.create({
    mode: 'payment',
    line_items: [
      {
        price: priceId,
        quantity: 1,
      },
    ],
    payment_intent_data: {
      application_fee_amount: applicationFeeAmount,
      transfer_data: {
        destination: connectedAccountId,
      },
    },
    success_url: successUrl,
    cancel_url: cancelUrl,
    metadata,
  })
}

/**
 * Create subscription checkout with Connect account
 */
export async function createConnectSubscriptionCheckout(
  priceId: string,
  connectedAccountId: string,
  applicationFeePercent: number,
  successUrl: string,
  cancelUrl: string,
  metadata?: Record<string, string>
): Promise<Stripe.Checkout.Session> {
  return await stripe.checkout.sessions.create({
    mode: 'subscription',
    line_items: [
      {
        price: priceId,
        quantity: 1,
      },
    ],
    subscription_data: {
      application_fee_percent: applicationFeePercent,
      transfer_data: {
        destination: connectedAccountId,
      },
    },
    success_url: successUrl,
    cancel_url: cancelUrl,
    metadata,
  })
}

/**
 * Delete/deauthorize a Connect account
 */
export async function deleteConnectAccount(
  accountId: string
): Promise<Stripe.Account> {
  return await stripe.accounts.del(accountId) as unknown as Stripe.Account
}

/**
 * Create login link for Connect Express dashboard
 */
export async function createConnectLoginLink(
  accountId: string
): Promise<string> {
  const loginLink = await stripe.accounts.createLoginLink(accountId)
  return loginLink.url
}
