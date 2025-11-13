import {
  Html,
  Head,
  Body,
  Container,
  Text,
} from '@react-email/components'
import * as React from 'react'

interface EmailLayoutProps {
  children: React.ReactNode
  previewText?: string
}

export function EmailLayout({ children, previewText }: EmailLayoutProps) {
  return (
    <Html>
      <Head />
      {previewText && (
        <Text style={{ display: 'none', overflow: 'hidden', lineHeight: '1px', opacity: 0 }}>
          {previewText}
        </Text>
      )}
      <Body style={main}>
        <Container style={container}>
          {children}
        </Container>
      </Body>
    </Html>
  )
}

const main = {
  backgroundColor: '#f6f9fc',
  fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
}

const container = {
  backgroundColor: '#ffffff',
  margin: '0 auto',
  padding: '20px 0 48px',
  marginBottom: '64px',
}
