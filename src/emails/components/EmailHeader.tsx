import { Section, Img, Heading } from '@react-email/components'
import * as React from 'react'

interface EmailHeaderProps {
  logoUrl?: string
  title?: string
}

export function EmailHeader({ logoUrl, title }: EmailHeaderProps) {
  return (
    <Section style={header}>
      {logoUrl && (
        <Img
          src={logoUrl}
          width="150"
          height="50"
          alt="Logo"
          style={logo}
        />
      )}
      {title && (
        <Heading style={heading}>{title}</Heading>
      )}
    </Section>
  )
}

const header = {
  padding: '20px 30px',
  textAlign: 'center' as const,
}

const logo = {
  margin: '0 auto',
}

const heading = {
  fontSize: '28px',
  fontWeight: 'bold',
  margin: '20px 0',
  color: '#000000',
}
