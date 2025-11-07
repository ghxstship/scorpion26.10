// Google Analytics / Analytics utilities

// Extend Window interface for gtag
declare global {
  interface Window {
    gtag?: (
      command: string,
      targetId: string | Date,
      config?: Record<string, unknown>
    ) => void
  }
}

export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID

// https://developers.google.com/analytics/devguides/collection/gtagjs/pages
export const pageview = (url: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', GA_TRACKING_ID || '', {
      page_path: url,
    })
  }
}

// https://developers.google.com/analytics/devguides/collection/gtagjs/events
export const event = ({ action, category, label, value }: {
  action: string
  category: string
  label?: string
  value?: number
}) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    })
  }
}

// Custom events
export const trackPurchase = (orderId: string, value: number, currency: string = 'USD') => {
  event({
    action: 'purchase',
    category: 'ecommerce',
    label: orderId,
    value,
  })

  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'purchase', {
      transaction_id: orderId,
      value,
      currency,
    })
  }
}

export const trackSignup = (method: string) => {
  event({
    action: 'sign_up',
    category: 'engagement',
    label: method,
  })
}

export const trackLogin = (method: string) => {
  event({
    action: 'login',
    category: 'engagement',
    label: method,
  })
}

export const trackBooking = (serviceType: string, value: number) => {
  event({
    action: 'booking',
    category: 'conversion',
    label: serviceType,
    value,
  })
}

export const trackNewsletterSubscribe = (location: string) => {
  event({
    action: 'subscribe',
    category: 'engagement',
    label: location,
  })
}

export const trackProductView = (productId: string, productName: string) => {
  event({
    action: 'view_item',
    category: 'ecommerce',
    label: productName,
  })

  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'view_item', {
      items: [{
        item_id: productId,
        item_name: productName,
      }]
    })
  }
}

export const trackAddToCart = (productId: string, productName: string, value: number) => {
  event({
    action: 'add_to_cart',
    category: 'ecommerce',
    label: productName,
    value,
  })

  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'add_to_cart', {
      items: [{
        item_id: productId,
        item_name: productName,
        price: value,
      }]
    })
  }
}

export const trackBeginCheckout = (value: number, items: number) => {
  event({
    action: 'begin_checkout',
    category: 'ecommerce',
    value,
  })

  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'begin_checkout', {
      value,
      items,
    })
  }
}
