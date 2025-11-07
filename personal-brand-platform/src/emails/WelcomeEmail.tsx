import { Section, Text, Heading } from '@react-email/components'
import * as React from 'react'
import { EmailLayout } from './components/EmailLayout'
import { EmailHeader } from './components/EmailHeader'
import { EmailFooter } from './components/EmailFooter'
import { EmailButton } from './components/EmailButton'

interface WelcomeEmailProps {
  userName: string
  loginUrl: string
  logoUrl?: string
}

export function WelcomeEmail({ userName, loginUrl, logoUrl }: WelcomeEmailProps) {
  return (
    <EmailLayout previewText={`Welcome to our platform, ${userName}!`}>
      <EmailHeader logoUrl={logoUrl} />
      
      <Section style={content}>
        <Heading style={heading}>Welcome, {userName}!</Heading>
        
        <Text style={paragraph}>
          Thank you for joining us. We're excited to have you on board!
        </Text>
        
        <Text style={paragraph}>
          Your account has been successfully created. You can now access all the features
          and content available on our platform.
        </Text>
        
        <EmailButton href={loginUrl}>
          Get Started
        </EmailButton>
        
        <Text style={paragraph}>
          If you have any questions or need assistance, feel free to reach out to our
          support team. We're here to help!
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

const paragraph = {
  fontSize: '16px',
  lineHeight: '24px',
  margin: '16px 0',
  color: '#525252',
}

export default WelcomeEmail
