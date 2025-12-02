import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

/**
 * Spartan Warrior Button Component
 * Bold, impactful design with red primary and gold secondary variants
 */
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap font-[family-name:var(--font-bebas)] uppercase tracking-[0.05em] font-bold transition-all duration-150 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--gold-600)] focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 min-h-[44px]",
  {
    variants: {
      variant: {
        // Primary: Deep Red - Call to Arms
        default:
          "bg-[var(--red-700)] text-[var(--grey-50)] border-2 border-[var(--red-900)] hover:bg-[var(--red-600)] active:bg-[var(--red-800)]",
        
        // Secondary: Gold - Shield
        secondary:
          "bg-[var(--grey-900)] text-[var(--gold-600)] border-2 border-[var(--gold-600)] hover:bg-[var(--gold-600)] hover:text-[var(--grey-950)] active:bg-[var(--gold-700)] active:border-[var(--gold-700)]",
        
        // Tertiary: Ghost
        tertiary:
          "bg-[var(--grey-900)] text-[var(--grey-200)] border border-[var(--grey-600)] hover:bg-[var(--grey-800)] hover:border-[var(--grey-500)] active:bg-[var(--grey-700)]",
        
        // Destructive: Error/Delete actions
        destructive:
          "bg-[var(--red-600)] text-[var(--grey-50)] border-2 border-[var(--red-700)] hover:bg-[var(--red-700)] active:bg-[var(--red-800)]",
        
        // Outline: Subtle variant
        outline:
          "border-2 border-[var(--grey-700)] bg-[var(--grey-900)] text-[var(--grey-100)] hover:bg-[var(--grey-850)] hover:border-[var(--grey-600)] active:bg-[var(--grey-800)]",
        
        // Ghost: Minimal variant
        ghost: 
          "bg-[var(--grey-900)] text-[var(--grey-300)] hover:bg-[var(--grey-800)] hover:text-[var(--grey-100)] active:bg-[var(--grey-700)]",
        
        // Link: Text-only variant
        link: 
          "text-[var(--gold-600)] underline-offset-4 hover:underline hover:text-[var(--gold-500)] normal-case tracking-normal font-[family-name:var(--font-inter)] font-medium",
      },
      size: {
        sm: "h-9 px-6 text-xs min-h-[36px]",
        default: "h-11 px-8 text-sm min-h-[44px]",
        lg: "h-13 px-12 text-base min-h-[52px]",
        icon: "h-11 w-11 min-h-[44px] min-w-[44px]",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
