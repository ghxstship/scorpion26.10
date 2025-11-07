'use client'

import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { Badge } from '@/components/ui/badge'
import { ExternalLink, CreditCard, DollarSign, TrendingUp, AlertCircle } from 'lucide-react'
import { useSearchParams } from 'next/navigation'
import { useToast } from '@/components/ui/use-toast'

interface StripeAccount {
  id: string
  email: string
  country: string
  charges_enabled: boolean
  payouts_enabled: boolean
  details_submitted: boolean
  type: string
  created: number
}

interface Balance {
  available: Array<{ amount: number; currency: string }>
  pending: Array<{ amount: number; currency: string }>
  currency: string
}

interface Payout {
  id: string
  amount: number
  currency: string
  arrival_date: number
  status: string
  created: number
  description: string | null
}

export default function PaymentsSettingsPage() {
  const [account, setAccount] = useState<StripeAccount | null>(null)
  const [balance, setBalance] = useState<Balance | null>(null)
  const [payouts, setPayouts] = useState<Payout[]>([])
  const [loading, setLoading] = useState(true)
  const [onboarding, setOnboarding] = useState(false)
  const searchParams = useSearchParams()
  const { toast } = useToast()

  useEffect(() => {
    // Check for success/refresh params
    if (searchParams.get('success') === 'true') {
      toast({
        title: 'Success',
        description: 'Stripe account connected successfully!',
      })
    }

    fetchAccountData()
  }, [searchParams])

  const fetchAccountData = async () => {
    try {
      setLoading(true)

      // Fetch account details
      const accountRes = await fetch('/api/stripe/connect/account')
      if (accountRes.ok) {
        const accountData = await accountRes.json()
        setAccount(accountData.account)

        // Fetch balance
        const balanceRes = await fetch('/api/stripe/connect/balance')
        if (balanceRes.ok) {
          const balanceData = await balanceRes.json()
          setBalance(balanceData.balance)
        }

        // Fetch payouts
        const payoutsRes = await fetch('/api/stripe/connect/payouts?limit=5')
        if (payoutsRes.ok) {
          const payoutsData = await payoutsRes.json()
          setPayouts(payoutsData.payouts)
        }
      }
    } catch (error) {
      console.error('Error fetching account data:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleConnectStripe = async () => {
    try {
      setOnboarding(true)
      const response = await fetch('/api/stripe/connect/onboard', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({}),
      })

      if (!response.ok) {
        throw new Error('Failed to create onboarding link')
      }

      const { url } = await response.json()
      window.location.href = url
    } catch (error) {
      console.error('Error connecting Stripe:', error)
      toast({
        title: 'Error',
        description: 'Failed to connect Stripe account',
        variant: 'destructive',
      })
      setOnboarding(false)
    }
  }

  const handleOpenDashboard = async () => {
    try {
      const response = await fetch('/api/stripe/connect/dashboard', {
        method: 'POST',
      })

      if (!response.ok) {
        throw new Error('Failed to create dashboard link')
      }

      const { url } = await response.json()
      window.open(url, '_blank')
    } catch (error) {
      console.error('Error opening dashboard:', error)
      toast({
        title: 'Error',
        description: 'Failed to open Stripe dashboard',
        variant: 'destructive',
      })
    }
  }

  const formatCurrency = (amount: number, currency: string) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency.toUpperCase(),
    }).format(amount / 100)
  }

  const formatDate = (timestamp: number) => {
    return new Date(timestamp * 1000).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    })
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Payment Settings</h1>
          <p className="text-muted-foreground">Manage your Stripe Connect account</p>
        </div>
        <Skeleton className="h-48 w-full" />
      </div>
    )
  }

  if (!account) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Payment Settings</h1>
          <p className="text-muted-foreground">Connect your Stripe account to accept payments</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Connect Stripe</CardTitle>
            <CardDescription>
              Connect your Stripe account to start accepting payments from your customers
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-start space-x-4 p-4 border rounded-lg bg-muted/50">
              <AlertCircle className="h-5 w-5 text-blue-500 mt-0.5" />
              <div className="space-y-1">
                <p className="text-sm font-medium">What is Stripe Connect?</p>
                <p className="text-sm text-muted-foreground">
                  Stripe Connect allows you to accept payments directly into your own Stripe account.
                  The platform will handle the payment processing while you maintain full control of your funds.
                </p>
              </div>
            </div>

            <Button
              onClick={handleConnectStripe}
              disabled={onboarding}
              size="lg"
              className="w-full sm:w-auto"
            >
              <CreditCard className="mr-2 h-4 w-4" />
              {onboarding ? 'Connecting...' : 'Connect with Stripe'}
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Payment Settings</h1>
          <p className="text-muted-foreground">Manage your Stripe Connect account</p>
        </div>
        <Button onClick={handleOpenDashboard} variant="outline">
          <ExternalLink className="mr-2 h-4 w-4" />
          Open Stripe Dashboard
        </Button>
      </div>

      {/* Account Status */}
      <Card>
        <CardHeader>
          <CardTitle>Account Status</CardTitle>
          <CardDescription>Your Stripe Connect account information</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <p className="text-sm text-muted-foreground">Account ID</p>
              <p className="font-mono text-sm">{account.id}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Email</p>
              <p className="text-sm">{account.email}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Country</p>
              <p className="text-sm">{account.country}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Account Type</p>
              <p className="text-sm capitalize">{account.type}</p>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            <Badge variant={account.charges_enabled ? 'default' : 'secondary'}>
              {account.charges_enabled ? 'Charges Enabled' : 'Charges Disabled'}
            </Badge>
            <Badge variant={account.payouts_enabled ? 'default' : 'secondary'}>
              {account.payouts_enabled ? 'Payouts Enabled' : 'Payouts Disabled'}
            </Badge>
            <Badge variant={account.details_submitted ? 'default' : 'secondary'}>
              {account.details_submitted ? 'Details Submitted' : 'Details Pending'}
            </Badge>
          </div>

          {!account.details_submitted && (
            <div className="flex items-start space-x-4 p-4 border rounded-lg bg-yellow-50 dark:bg-yellow-950">
              <AlertCircle className="h-5 w-5 text-yellow-600 dark:text-yellow-400 mt-0.5" />
              <div className="space-y-1">
                <p className="text-sm font-medium">Action Required</p>
                <p className="text-sm text-muted-foreground">
                  Complete your Stripe account setup to start accepting payments.
                </p>
                <Button onClick={handleConnectStripe} size="sm" variant="outline" className="mt-2">
                  Complete Setup
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Balance */}
      {balance && (
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Available Balance</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {balance.available[0]
                  ? formatCurrency(balance.available[0].amount, balance.available[0].currency)
                  : '$0.00'}
              </div>
              <p className="text-xs text-muted-foreground">Ready for payout</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Balance</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {balance.pending[0]
                  ? formatCurrency(balance.pending[0].amount, balance.pending[0].currency)
                  : '$0.00'}
              </div>
              <p className="text-xs text-muted-foreground">Processing</p>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Recent Payouts */}
      {payouts.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Recent Payouts</CardTitle>
            <CardDescription>Your latest payout history</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {payouts.map((payout) => (
                <div key={payout.id} className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0">
                  <div>
                    <p className="font-medium">{formatCurrency(payout.amount, payout.currency)}</p>
                    <p className="text-sm text-muted-foreground">
                      {payout.description || 'Payout'} • {formatDate(payout.created)}
                    </p>
                  </div>
                  <div className="text-right">
                    <Badge variant={payout.status === 'paid' ? 'default' : 'secondary'}>
                      {payout.status}
                    </Badge>
                    <p className="text-xs text-muted-foreground mt-1">
                      Arrives {formatDate(payout.arrival_date)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
