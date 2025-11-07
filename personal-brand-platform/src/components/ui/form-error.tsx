import * as React from "react"
import { AlertCircle } from "lucide-react"
import { cn } from "@/lib/utils"

export interface FormErrorProps extends React.HTMLAttributes<HTMLDivElement> {
  message?: string
}

const FormError = React.forwardRef<HTMLDivElement, FormErrorProps>(
  ({ className, message, ...props }, ref) => {
    if (!message) return null

    return (
      <div
        ref={ref}
        role="alert"
        aria-live="polite"
        className={cn(
          "flex items-center gap-2 text-sm font-medium text-destructive",
          className
        )}
        {...props}
      >
        <AlertCircle className="h-4 w-4" aria-hidden="true" />
        <span>{message}</span>
      </div>
    )
  }
)
FormError.displayName = "FormError"

export { FormError }
