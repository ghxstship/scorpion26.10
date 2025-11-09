/**
 * Data Privacy Utilities
 * GDPR/CCPA compliance helpers
 */

interface CookiePreferences {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
  preferences: boolean;
}

export class PrivacyManager {
  /**
   * Check if user has consented to specific cookie category
   */
  static hasConsent(category: keyof CookiePreferences): boolean {
    const preferences = this.getPreferences();
    return preferences?.[category] ?? false;
  }
  
  /**
   * Get saved cookie preferences
   */
  static getPreferences(): CookiePreferences | null {
    if (typeof window === 'undefined') return null;
    
    const saved = localStorage.getItem('cookie-preferences');
    return saved ? JSON.parse(saved) : null;
  }
  
  /**
   * Anonymize IP address for GDPR compliance
   */
  static anonymizeIP(ip: string): string {
    const parts = ip.split('.');
    if (parts.length === 4) {
      // IPv4: Replace last octet
      return `${parts.slice(0, 3).join('.')}.0`;
    }
    // IPv6: Truncate last 80 bits
    const ipv6Parts = ip.split(':');
    return ipv6Parts.slice(0, 4).join(':') + '::';
  }
  
  /**
   * Hash PII for pseudonymization
   */
  static async hashPII(value: string): Promise<string> {
    if (typeof window === 'undefined' || !window.crypto?.subtle) {
      // Fallback for environments without crypto
      return btoa(value);
    }
    
    const encoder = new TextEncoder();
    const data = encoder.encode(value);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  }
  
  /**
   * Pseudonymize user data for analytics
   */
  static pseudonymize(data: Record<string, unknown>): Record<string, unknown> {
    const pseudo = { ...data };
    
    // Remove or hash PII
    const piiFields = ['email', 'name', 'phone', 'address', 'ssn', 'creditCard'];
    
    piiFields.forEach(field => {
      if (pseudo[field]) {
        delete pseudo[field];
      }
    });
    
    return pseudo;
  }
  
  /**
   * Check if consent is still valid (refresh every 12 months)
   */
  static isConsentValid(): boolean {
    if (typeof window === 'undefined') return false;
    
    const consentDate = localStorage.getItem('cookie-consent-date');
    if (!consentDate) return false;
    
    const date = new Date(consentDate);
    const now = new Date();
    const monthsDiff = (now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24 * 30);
    
    return monthsDiff < 12;
  }
  
  /**
   * Clear all consent data (for testing or user request)
   */
  static clearConsent(): void {
    if (typeof window === 'undefined') return;
    
    localStorage.removeItem('cookie-preferences');
    localStorage.removeItem('cookie-consent-date');
  }
}
