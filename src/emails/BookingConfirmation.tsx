import { Section, Text, Heading, Hr } from '@react-email/components'
import * as React from 'react'
import { EmailLayout } from './components/EmailLayout'
import { EmailHeader } from './components/EmailHeader'
import { EmailFooter } from './components/EmailFooter'
import { EmailButton } from './components/EmailButton'

interface BookingConfirmationProps {
  userName: string
  serviceName: string
  bookingDate: string
  bookingTime: string
  duration: number
  location?: string
  meetingLink?: string
  price: number
  bookingNumber: string
  logoUrl?: string
}

export function BookingConfirmation({
  userName,
  serviceName,
  bookingDate,
  bookingTime,
  duration,
  location,
  meetingLink,
  price,
  bookingNumber,
  logoUrl,
}: BookingConfirmationProps) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price)
  }

  return (
    <EmailLayout previewText={`Booking Confirmed: ${serviceName}`}>
      <EmailHeader logoUrl={logoUrl} />
      
      <Section style={content}>
        <Heading style={heading}>Your booking is confirmed!</Heading>
        
        <Text style={paragraph}>
          Hi {userName},
        </Text>
        
        <Text style={paragraph}>
          Your booking has been confirmed. We look forward to meeting with you!
        </Text>
        
        <Section style={bookingInfo}>
          <Text style={infoTitle}>Booking Details</Text>
          <Hr style={hr} />
          
          <Text style={infoText}>
            <strong>Service:</strong> {serviceName}
          </Text>
          <Text style={infoText}>
            <strong>Date:</strong> {bookingDate}
          </Text>
          <Text style={infoText}>
            <strong>Time:</strong> {bookingTime}
          </Text>
          <Text style={infoText}>
            <strong>Duration:</strong> {duration} minutes
          </Text>
          {location && (
            <Text style={infoText}>
              <strong>Location:</strong> {location}
            </Text>
          )}
          {meetingLink && (
            <Text style={infoText}>
              <strong>Meeting Link:</strong> {meetingLink}
            </Text>
          )}
          <Text style={infoText}>
            <strong>Price:</strong> {formatPrice(price)}
          </Text>
          <Text style={infoText}>
            <strong>Booking #:</strong> {bookingNumber}
          </Text>
        </Section>
        
        {meetingLink && (
          <EmailButton href={meetingLink}>
            Join Meeting
          </EmailButton>
        )}
        
        <Hr style={hr} />
        
        <Heading as="h2" style={subheading}>What to Prepare</Heading>
        
        <Text style={paragraph}>
          To make the most of your session, please:
        </Text>
        
        <ul style={list}>
          <li style={listItem}>Be ready 5 minutes before the scheduled time</li>
          <li style={listItem}>Have any questions or materials prepared</li>
          <li style={listItem}>Ensure a quiet environment for the call</li>
        </ul>
        
        <Hr style={hr} />
        
        <Text style={paragraph}>
          Need to reschedule or cancel? Please contact us at least 24 hours in advance.
        </Text>
        
        <Text style={paragraph}>
          If you have any questions, feel free to reply to this email.
        </Text>
      </Section>
      
      <EmailFooter />
    </EmailLayout>
  )
}

const content = {
  padding: '20px 30px',
}

const heading = {
  fontSize: '24px',
  fontWeight: 'bold',
  margin: '0 0 20px',
  color: '#000000',
}

const subheading = {
  fontSize: '18px',
  fontWeight: 'bold',
  margin: '20px 0 10px',
  color: '#000000',
}

const paragraph = {
  fontSize: '16px',
  lineHeight: '24px',
  margin: '16px 0',
  color: '#525252',
}

const bookingInfo = {
  backgroundColor: '#f6f9fc',
  padding: '20px',
  borderRadius: '8px',
  margin: '20px 0',
}

const infoTitle = {
  fontSize: '18px',
  fontWeight: 'bold',
  margin: '0 0 10px',
  color: '#000000',
}

const infoText = {
  fontSize: '14px',
  margin: '8px 0',
  color: '#525252',
}

const hr = {
  borderColor: '#e6ebf1',
  margin: '16px 0',
}

const list = {
  paddingLeft: '20px',
  margin: '16px 0',
}

const listItem = {
  fontSize: '16px',
  lineHeight: '24px',
  margin: '8px 0',
  color: '#525252',
}

export default BookingConfirmation
