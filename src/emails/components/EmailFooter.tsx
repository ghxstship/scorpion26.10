import { Section, Text, Link, Hr } from '@react-email/components'
import * as React from 'react'

interface EmailFooterProps {
  unsubscribeUrl?: string
  companyName?: string
  companyAddress?: string
}

export function EmailFooter({ unsubscribeUrl, companyName, companyAddress }: EmailFooterProps) {
  return (
    <>
      <Hr style={hr} />
      <Section style={footer}>
        <Text style={footerText}>
          © {new Date().getFullYear()} {companyName || 'Your Company'}. All rights reserved.
        </Text>
        {companyAddress && (
          <Text style={footerText}>{companyAddress}</Text>
        )}
        {unsubscribeUrl && (
          <Text style={footerText}>
            <Link href={unsubscribeUrl} style={link}>
              Unsubscribe
            </Link>
            {' | '}
            <Link href="#" style={link}>
              Manage Preferences
            </Link>
          </Text>
        )}
      </Section>
    </>
  )
}

const hr = {
  borderColor: '#e6ebf1',
  margin: '20px 0',
}

const footer = {
  padding: '20px 30px',
  textAlign: 'center' as const,
}

const footerText = {
  color: '#8898aa',
  fontSize: '12px',
  lineHeight: '16px',
  margin: '4px 0',
}

const link = {
  color: '#556cd6',
  textDecoration: 'underline',
}
