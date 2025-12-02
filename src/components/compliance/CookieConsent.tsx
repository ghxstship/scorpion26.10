'use client';

/**
 * GDPR/CCPA Compliant Cookie Consent Banner
 * Implements data privacy requirements
 */

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface CookiePreferences {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
  preferences: boolean;
}

const COOKIE_CATEGORIES = {
  necessary: {
    required: true,
    description: 'Essential for the website to function. Cannot be disabled.',
  },
  analytics: {
    required: false,
    description: 'Help us understand how visitors use our website.',
  },
  marketing: {
    required: false,
    description: 'Used to deliver personalized advertisements.',
  },
  preferences: {
    required: false,
    description: 'Remember your settings and preferences.',
  },
};

export function CookieConsent() {
  // Initialize visibility based on saved preferences
  const [isVisible, setIsVisible] = useState(() => {
    if (typeof window === 'undefined') return false;
    return !localStorage.getItem('cookie-preferences');
  });
  const [showDetails, setShowDetails] = useState(false);
  const [preferences, setPreferences] = useState<CookiePreferences>({
    necessary: true,
    analytics: false,
    marketing: false,
    preferences: false,
  });
  
  const handleAcceptAll = () => {
    const allAccepted: CookiePreferences = {
      necessary: true,
      analytics: true,
      marketing: true,
      preferences: true,
    };
    savePreferences(allAccepted);
    setIsVisible(false);
  };
  
  const handleAcceptSelected = () => {
    savePreferences(preferences);
    setIsVisible(false);
  };
  
  const handleRejectAll = () => {
    const necessaryOnly: CookiePreferences = {
      necessary: true,
      analytics: false,
      marketing: false,
      preferences: false,
    };
    savePreferences(necessaryOnly);
    setIsVisible(false);
  };
  
  const savePreferences = (prefs: CookiePreferences) => {
    localStorage.setItem('cookie-preferences', JSON.stringify(prefs));
    localStorage.setItem('cookie-consent-date', new Date().toISOString());
    
    // Dispatch event for analytics initialization
    window.dispatchEvent(
      new CustomEvent('cookie-consent-updated', { detail: prefs })
    );
  };
  
  if (!isVisible) return null;
  
  return (
    <div
      className="fixed inset-x-0 bottom-0 z-[var(--z-modal)] p-4 sm:p-6"
      role="dialog"
      aria-label="Cookie consent"
      aria-describedby="cookie-description"
    >
      <Card className="mx-auto max-w-4xl border-[var(--color-border-default)] bg-[var(--color-surface-primary)] p-6 shadow-[var(--shadow-xl)]">
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-[var(--color-text-primary)]">
            Cookie Preferences
          </h2>
          
          <p
            id="cookie-description"
            className="text-sm text-[var(--color-text-secondary)]"
          >
            We use cookies to enhance your experience, analyze site traffic, and
            personalize content. You can customize your preferences below.
          </p>
          
          {showDetails && (
            <div className="space-y-3 border-t border-[var(--color-border-default)] pt-4">
              {Object.entries(COOKIE_CATEGORIES).map(([key, { required, description }]) => (
                <label
                  key={key}
                  className="flex items-start gap-3 rounded-sm border border-[var(--color-border-subtle)] p-3 hover:bg-[var(--color-surface-secondary)] transition-colors duration-[var(--duration-fast)]"
                >
                  <input
                    type="checkbox"
                    checked={preferences[key as keyof CookiePreferences]}
                    disabled={required}
                    onChange={(e) =>
                      setPreferences({
                        ...preferences,
                        [key]: e.target.checked,
                      })
                    }
                    className="mt-1 h-4 w-4 rounded border-[var(--color-border-default)] text-[var(--color-interactive-primary)] focus:ring-2 focus:ring-[var(--color-border-focus)] focus:ring-offset-2"
                    aria-label={`${key} cookies ${required ? '(required)' : ''}`}
                  />
                  <div className="flex-1">
                    <div className="font-medium text-[var(--color-text-primary)] capitalize">
                      {key} Cookies {required && '(Required)'}
                    </div>
                    <div className="text-sm text-[var(--color-text-secondary)]">
                      {description}
                    </div>
                  </div>
                </label>
              ))}
            </div>
          )}
          
          <div className="flex flex-col gap-2 sm:flex-row sm:justify-between">
            <div className="flex flex-col gap-2 sm:flex-row">
              <Button
                onClick={handleAcceptAll}
                className="bg-[var(--color-interactive-primary)] text-white hover:bg-[var(--color-interactive-primary-hover)]"
              >
                Accept All
              </Button>
              
              <Button
                onClick={handleRejectAll}
                variant="outline"
                className="border-[var(--color-border-default)] hover:bg-[var(--color-surface-secondary)]"
              >
                Reject All
              </Button>
              
              <Button
                onClick={() => setShowDetails(!showDetails)}
                variant="outline"
                className="border-[var(--color-border-default)] hover:bg-[var(--color-surface-secondary)]"
              >
                {showDetails ? 'Hide' : 'Customize'}
              </Button>
            </div>
            
            {showDetails && (
              <Button
                onClick={handleAcceptSelected}
                className="bg-[var(--color-interactive-primary)] text-white hover:bg-[var(--color-interactive-primary-hover)]"
              >
                Save Preferences
              </Button>
            )}
          </div>
          
          <p className="text-xs text-[var(--color-text-tertiary)]">
            <a
              href="/privacy-policy"
              className="underline hover:text-[var(--color-text-brand)]"
            >
              Privacy Policy
            </a>
            {' • '}
            <a
              href="/cookie-policy"
              className="underline hover:text-[var(--color-text-brand)]"
            >
              Cookie Policy
            </a>
          </p>
        </div>
      </Card>
    </div>
  );
}
