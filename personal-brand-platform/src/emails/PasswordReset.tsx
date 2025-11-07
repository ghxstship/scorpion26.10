import { Section, Text, Heading } from '@react-email/components'
import * as React from 'react'
import { EmailLayout } from './components/EmailLayout'
import { EmailHeader } from './components/EmailHeader'
import { EmailFooter } from './components/EmailFooter'
import { EmailButton } from './components/EmailButton'

interface PasswordResetProps {
  userName: string
  resetUrl: string
  expiryHours?: number
  logoUrl?: string
}

export function PasswordReset({
  userName,
  resetUrl,
  expiryHours = 24,
  logoUrl,
}: PasswordResetProps) {
  return (
    <EmailLayout previewText="Reset your password">
      <EmailHeader logoUrl={logoUrl} />
      
      <Section style={content}>
        <Heading style={heading}>Reset Your Password</Heading>
        
        <Text style={paragraph}>
          Hi {userName},
        </Text>
        
        <Text style={paragraph}>
          We received a request to reset your password. Click the button below to create a new password:
        </Text>
        
        <EmailButton href={resetUrl}>
          Reset Password
        </EmailButton>
        
        <Text style={paragraph}>
          This link will expire in {expiryHours} hours for security reasons.
        </Text>
        
        <Text style={paragraph}>
          If you didn&apos;t request a password reset, you can safely ignore this email. Your password will remain unchanged.
        </Text>
        
        <Text style={smallText}>
          For security, this link can only be used once. If you need to reset your password again, please request a new link.
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

const smallText = {
  fontSize: '14px',
  lineHeight: '20px',
  margin: '16px 0',
  color: '#8898aa',
}

export default PasswordReset
