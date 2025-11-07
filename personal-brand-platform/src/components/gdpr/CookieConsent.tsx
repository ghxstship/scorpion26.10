'use client'

/**
 * GDPR Cookie Consent Banner
 * Compliant with GDPR, CCPA, and ePrivacy regulations
 */

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { X } from 'lucide-react'

interface CookiePreferences {
  necessary: boolean
  analytics: boolean
  marketing: boolean
}

export function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false)
  const [showDetails, setShowDetails] = useState(false)
  const [preferences, setPreferences] = useState<CookiePreferences>({
    necessary: true, // Always required
    analytics: false,
    marketing: false,
  })

  const applyPreferences = (prefs: CookiePreferences) => {
    // Apply analytics cookies
    if (prefs.analytics && window.gtag) {
      window.gtag('consent', 'update', {
        analytics_storage: 'granted',
      } as Record<string, unknown>)
    }

    // Apply marketing cookies
    if (prefs.marketing && window.gtag) {
      window.gtag('consent', 'update', {
        ad_storage: 'granted',
        ad_user_data: 'granted',
        ad_personalization: 'granted',
      } as Record<string, unknown>)
    }
  }

  useEffect(() => {
    // Check if user has already made a choice
    const consent = localStorage.getItem('cookie-consent')
    if (!consent) {
      setShowBanner(true)
    } else {
      const saved = JSON.parse(consent) as CookiePreferences
      setPreferences(saved)
      applyPreferences(saved)
    }
  }, [])

  const savePreferences = (prefs: CookiePreferences) => {
    localStorage.setItem('cookie-consent', JSON.stringify(prefs))
    localStorage.setItem('cookie-consent-date', new Date().toISOString())
    applyPreferences(prefs)
    setShowBanner(false)
  }

  const acceptAll = () => {
    const allAccepted = {
      necessary: true,
      analytics: true,
      marketing: true,
    }
    setPreferences(allAccepted)
    savePreferences(allAccepted)
  }

  const acceptNecessary = () => {
    const necessaryOnly = {
      necessary: true,
      analytics: false,
      marketing: false,
    }
    setPreferences(necessaryOnly)
    savePreferences(necessaryOnly)
  }

  const saveCustom = () => {
    savePreferences(preferences)
  }

  if (!showBanner) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t shadow-lg">
      <div className="container mx-auto px-4 py-6">
        {!showDetails ? (
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex-1">
              <h3 className="font-semibold mb-2">We value your privacy</h3>
              <p className="text-sm text-gray-600">
                We use cookies to enhance your browsing experience, serve personalized content, and analyze our traffic. 
                By clicking &quot;Accept All&quot;, you consent to our use of cookies.
              </p>
            </div>
            <div className="flex gap-2 flex-shrink-0">
              <Button variant="outline" onClick={() => setShowDetails(true)}>
                Customize
              </Button>
              <Button variant="outline" onClick={acceptNecessary}>
                Necessary Only
              </Button>
              <Button onClick={acceptAll}>
                Accept All
              </Button>
            </div>
          </div>
        ) : (
          <div>
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold">Cookie Preferences</h3>
              <button
                onClick={() => setShowDetails(false)}
                className="p-1 hover:bg-gray-100 rounded"
                aria-label="Close details"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 mb-6">
              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  id="necessary"
                  checked={preferences.necessary}
                  disabled
                  className="mt-1"
                />
                <div className="flex-1">
                  <label htmlFor="necessary" className="font-medium block">
                    Necessary Cookies (Required)
                  </label>
                  <p className="text-sm text-gray-600">
                    Essential for the website to function. Cannot be disabled.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  id="analytics"
                  checked={preferences.analytics}
                  onChange={(e) =>
                    setPreferences({ ...preferences, analytics: e.target.checked })
                  }
                  className="mt-1"
                />
                <div className="flex-1">
                  <label htmlFor="analytics" className="font-medium block">
                    Analytics Cookies
                  </label>
                  <p className="text-sm text-gray-600">
                    Help us understand how visitors interact with our website.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  id="marketing"
                  checked={preferences.marketing}
                  onChange={(e) =>
                    setPreferences({ ...preferences, marketing: e.target.checked })
                  }
                  className="mt-1"
                />
                <div className="flex-1">
                  <label htmlFor="marketing" className="font-medium block">
                    Marketing Cookies
                  </label>
                  <p className="text-sm text-gray-600">
                    Used to deliver personalized advertisements relevant to you.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex gap-2 justify-end">
              <Button variant="outline" onClick={acceptNecessary}>
                Necessary Only
              </Button>
              <Button onClick={saveCustom}>
                Save Preferences
              </Button>
            </div>

            <p className="text-xs text-gray-500 mt-4">
              For more information, please read our{' '}
              <a href="/privacy" className="underline">Privacy Policy</a> and{' '}
              <a href="/cookies" className="underline">Cookie Policy</a>.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
