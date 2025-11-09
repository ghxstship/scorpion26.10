import { Resend } from 'resend'
import { render } from '@react-email/components'
import * as React from 'react'

// Lazy-load Resend to avoid build-time errors when env vars are missing
let resendInstance: Resend | null = null

function getResend(): Resend {
  if (!resendInstance) {
    if (!process.env.RESEND_API_KEY) {
      throw new Error('RESEND_API_KEY is not set')
    }
    resendInstance = new Resend(process.env.RESEND_API_KEY)
  }
  return resendInstance
}

interface SendEmailOptions {
  to: string | string[]
  subject: string
  template: React.ReactElement
  from?: string
  replyTo?: string
}

export async function sendEmail({
  to,
  subject,
  template,
  from = 'noreply@yourdomain.com',
  replyTo,
}: SendEmailOptions) {
  try {
    const html = await render(template)
    const resend = getResend()

    const { data, error } = await resend.emails.send({
      from,
      to: Array.isArray(to) ? to : [to],
      subject,
      html,
      replyTo,
    })

    if (error) {
      console.error('Email send error:', error)
      throw new Error(`Failed to send email: ${error.message}`)
    }

    return { success: true, data }
  } catch (error) {
    console.error('Email send error:', error)
    throw error
  }
}

// Helper functions for common email types
export async function sendWelcomeEmail(to: string, userName: string) {
  const { WelcomeEmail } = await import('@/emails/WelcomeEmail')
  
  return sendEmail({
    to,
    subject: 'Welcome to Our Platform!',
    template: React.createElement(WelcomeEmail, {
      userName,
      loginUrl: `${process.env.NEXT_PUBLIC_SITE_URL}/login`,
    }),
  })
}

export async function sendOrderConfirmation(
  to: string,
  orderData: {
    userName: string
    orderNumber: string
    orderDate: string
    items: Array<{ name: string; quantity: number; price: number }>
    subtotal: number
    tax: number
    total: number
  }
) {
  const { OrderConfirmation } = await import('@/emails/OrderConfirmation')
  
  return sendEmail({
    to,
    subject: `Order Confirmation #${orderData.orderNumber}`,
    template: React.createElement(OrderConfirmation, {
      ...orderData,
      orderUrl: `${process.env.NEXT_PUBLIC_SITE_URL}/account/orders/${orderData.orderNumber}`,
    }),
  })
}

export async function sendBookingConfirmation(
  to: string,
  bookingData: {
    userName: string
    serviceName: string
    bookingDate: string
    bookingTime: string
    duration: number
    location?: string
    meetingLink?: string
    price: number
    bookingNumber: string
  }
) {
  const { BookingConfirmation } = await import('@/emails/BookingConfirmation')
  
  return sendEmail({
    to,
    subject: `Booking Confirmed: ${bookingData.serviceName}`,
    template: React.createElement(BookingConfirmation, bookingData),
  })
}

export async function sendPasswordReset(
  to: string,
  userName: string,
  resetToken: string
) {
  const { PasswordReset } = await import('@/emails/PasswordReset')
  
  return sendEmail({
    to,
    subject: 'Reset Your Password',
    template: React.createElement(PasswordReset, {
      userName,
      resetUrl: `${process.env.NEXT_PUBLIC_SITE_URL}/reset-password?token=${resetToken}`,
    }),
  })
}

export async function sendNewsletter(
  to: string[],
  newsletterData: {
    subject: string
    previewText: string
    introText: string
    articles: Array<{
      title: string
      excerpt: string
      imageUrl?: string
      link: string
    }>
    ctaText?: string
    ctaUrl?: string
  }
) {
  const { NewsletterTemplate } = await import('@/emails/NewsletterTemplate')
  
  // Send to recipients in batches to avoid rate limits
  const batchSize = 50
  const batches = []
  
  for (let i = 0; i < to.length; i += batchSize) {
    const batch = to.slice(i, i + batchSize)
    batches.push(
      sendEmail({
        to: batch,
        subject: newsletterData.subject,
        template: React.createElement(NewsletterTemplate, newsletterData),
      })
    )
  }
  
  return Promise.all(batches)
}
