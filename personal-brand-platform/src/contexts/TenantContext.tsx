'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'
import type { Tenant } from '@/lib/tenant/resolver'

interface TenantContextType {
  tenant: Tenant | null
  isLoading: boolean
  error: Error | null
  refreshTenant: () => Promise<void>
}

const TenantContext = createContext<TenantContextType | undefined>(undefined)

export function TenantProvider({ 
  children,
  initialTenant 
}: { 
  children: React.ReactNode
  initialTenant?: Tenant | null
}) {
  const [tenant, setTenant] = useState<Tenant | null>(initialTenant || null)
  const [isLoading, setIsLoading] = useState(!initialTenant)
  const [error, setError] = useState<Error | null>(null)

  const fetchTenant = async () => {
    try {
      setIsLoading(true)
      setError(null)
      
      // Fetch tenant from API based on current hostname
      const response = await fetch('/api/tenant/current')
      
      if (!response.ok) {
        throw new Error('Failed to fetch tenant')
      }
      
      const data = await response.json()
      setTenant(data.tenant)
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Unknown error'))
      setTenant(null)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (!initialTenant) {
      fetchTenant()
    }
  }, [initialTenant])

  const refreshTenant = async () => {
    await fetchTenant()
  }

  return (
    <TenantContext.Provider value={{ tenant, isLoading, error, refreshTenant }}>
      {children}
    </TenantContext.Provider>
  )
}

export function useTenant() {
  const context = useContext(TenantContext)
  
  if (context === undefined) {
    throw new Error('useTenant must be used within a TenantProvider')
  }
  
  return context
}

/**
 * Hook to get tenant branding colors
 */
export function useTenantBranding() {
  const { tenant } = useTenant()
  
  return {
    primaryColor: tenant?.primary_color || '#000000',
    secondaryColor: tenant?.secondary_color || '#ffffff',
    logoUrl: tenant?.logo_url || null,
  }
}

/**
 * Hook to check if current user is tenant admin
 */
export function useIsTenantAdmin() {
  const { tenant } = useTenant()
  // This would need to be combined with user context
  // For now, return false as placeholder
  return false
}
