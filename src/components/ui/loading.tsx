import { Loader2 } from 'lucide-react'

/**
 * Loading Component - Spartan Warrior Design
 * Displays loading states with gold spinner
 */

interface LoadingProps {
  size?: 'sm' | 'md' | 'lg'
  text?: string
  fullScreen?: boolean
}

export function Loading({ size = 'md', text, fullScreen = false }: LoadingProps) {
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-8 w-8',
    lg: 'h-12 w-12',
  }

  const content = (
    <div className="flex flex-col items-center justify-center gap-4">
      <Loader2 
        className={`${sizeClasses[size]} animate-spin text-[var(--gold-600)]`}
        aria-label="Loading"
      />
      {text && (
        <p className="text-sm uppercase tracking-wide text-[var(--grey-400)]">
          {text}
        </p>
      )}
    </div>
  )

  if (fullScreen) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-[var(--grey-950)]">
        {content}
      </div>
    )
  }

  return content
}

/**
 * Skeleton Loader - For content placeholders
 */
interface SkeletonProps {
  className?: string
}

export function Skeleton({ className = '' }: SkeletonProps) {
  return (
    <div 
      className={`animate-pulse rounded-sm bg-[var(--grey-800)] ${className}`}
      aria-hidden="true"
    />
  )
}

/**
 * Card Skeleton - For loading product/feature cards
 */
export function CardSkeleton() {
  return (
    <div className="rounded-sm border-2 border-[var(--grey-800)] bg-[var(--grey-900)] p-6">
      <Skeleton className="mb-4 h-16 w-16" />
      <Skeleton className="mb-3 h-8 w-3/4" />
      <Skeleton className="mb-2 h-4 w-full" />
      <Skeleton className="mb-4 h-4 w-5/6" />
      <Skeleton className="h-10 w-full" />
    </div>
  )
}

/**
 * Product Card Skeleton
 */
export function ProductCardSkeleton() {
  return (
    <div className="rounded-sm border-2 border-[var(--grey-800)] bg-[var(--grey-900)]">
      <Skeleton className="aspect-square w-full" />
      <div className="p-6">
        <Skeleton className="mb-3 h-8 w-3/4" />
        <Skeleton className="mb-2 h-4 w-full" />
        <Skeleton className="mb-4 h-4 w-5/6" />
        <Skeleton className="mb-4 h-12 w-1/2" />
        <Skeleton className="h-10 w-full" />
      </div>
    </div>
  )
}
