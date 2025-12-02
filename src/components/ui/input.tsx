import * as React from "react"
import { cn } from "@/lib/utils"

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>

/**
 * Spartan Warrior Input Component
 * Dark background with gold focus state
 */
const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-11 w-full rounded-sm border border-[var(--grey-600)] bg-[var(--grey-800)] px-4 py-3 text-base text-[var(--grey-100)] shadow-sm transition-all duration-200 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-[var(--grey-100)] placeholder:text-[var(--grey-500)] placeholder:uppercase placeholder:text-xs placeholder:tracking-wide focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--gold-600)] focus-visible:ring-offset-0 focus-visible:border-[var(--gold-600)]  disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-[var(--grey-900)] min-h-[44px]",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }
