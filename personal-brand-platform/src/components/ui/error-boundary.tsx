'use client'

import * as React from 'react'
import { AlertTriangle } from 'lucide-react'
import { Button } from './button'

interface ErrorBoundaryProps {
  children: React.ReactNode
  fallback?: React.ReactNode
}

interface ErrorBoundaryState {
  hasError: boolean
  error?: Error
}

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo)
    // Log to error tracking service (Sentry, etc.)
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback
      }

      return (
        <div 
          className="flex min-h-[400px] flex-col items-center justify-center bg-[var(--grey-950)] p-8 text-center"
          role="alert"
          aria-live="assertive"
        >
          <AlertTriangle className="mb-6 h-16 w-16 text-[var(--red-700)]" aria-hidden="true" />
          <h2 className="mb-4 font-[family-name:var(--font-bebas)] text-4xl font-black uppercase tracking-wider text-[var(--grey-100)] md:text-5xl">
            Something Went <span className="text-[var(--gold-600)]">Wrong</span>
          </h2>
          <p className="mb-8 text-lg text-[var(--grey-300)]">
            We apologize for the inconvenience. Please try refreshing the page.
          </p>
          <Button onClick={() => window.location.reload()} size="lg">
            Refresh Page
          </Button>
        </div>
      )
    }

    return this.props.children
  }
}
