'use client'

import { useEffect } from 'react'
import { AlertTriangle } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log error to error reporting service
    console.error('Application error:', error)
  }, [error])

  return (
    <div className="flex min-h-[600px] flex-col items-center justify-center p-8 text-center">
      <AlertTriangle className="mb-4 h-16 w-16 text-destructive" aria-hidden="true" />
      <h1 className="mb-2 text-3xl font-bold">Something went wrong!</h1>
      <p className="mb-6 max-w-md text-muted-foreground">
        We apologize for the inconvenience. An error occurred while processing your request.
      </p>
      {error.digest && (
        <p className="mb-4 text-sm text-muted-foreground">
          Error ID: {error.digest}
        </p>
      )}
      <div className="flex gap-4">
        <Button onClick={reset}>Try again</Button>
        <Button variant="outline" onClick={() => (window.location.href = '/')}>
          Go home
        </Button>
      </div>
    </div>
  )
}
