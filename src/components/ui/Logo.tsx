import { cn } from '@/lib/utils'

interface LogoProps {
  className?: string
  size?: 'sm' | 'md' | 'lg' | 'xl'
}

/**
 * 456AF Logo Component
 * Stencil-style "456" in gold/white + Graffiti-style "AF" in red
 */
export function Logo({ className, size = 'md' }: LogoProps) {
  const sizeClasses = {
    sm: 'text-2xl',
    md: 'text-3xl',
    lg: 'text-4xl',
    xl: 'text-5xl',
  }

  return (
    <span className={cn('inline-flex items-baseline', className)}>
      <span 
        className={cn(
          'font-[family-name:var(--font-black-ops)] font-black tracking-wider text-white',
          sizeClasses[size]
        )}
      >
        456
      </span>
      <span 
        className={cn(
          'font-[family-name:var(--font-permanent-marker)] text-[var(--red-600)] -ml-0.5 italic',
          size === 'sm' ? 'text-xl' : size === 'md' ? 'text-2xl' : size === 'lg' ? 'text-3xl' : 'text-4xl'
        )}
        style={{ transform: 'rotate(-5deg)' }}
      >
        AF
      </span>
    </span>
  )
}
