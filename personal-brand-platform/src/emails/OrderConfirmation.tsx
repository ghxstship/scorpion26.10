import { Section, Text, Heading, Hr } from '@react-email/components'
import * as React from 'react'
import { EmailLayout } from './components/EmailLayout'
import { EmailHeader } from './components/EmailHeader'
import { EmailFooter } from './components/EmailFooter'
import { EmailButton } from './components/EmailButton'

interface OrderItem {
  name: string
  quantity: number
  price: number
}

interface OrderConfirmationProps {
  userName: string
  orderNumber: string
  orderDate: string
  items: OrderItem[]
  subtotal: number
  tax: number
  total: number
  orderUrl: string
  logoUrl?: string
}

export function OrderConfirmation({
  userName,
  orderNumber,
  orderDate,
  items,
  subtotal,
  tax,
  total,
  orderUrl,
  logoUrl,
}: OrderConfirmationProps) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price)
  }

  return (
    <EmailLayout previewText={`Order Confirmation #${orderNumber}`}>
      <EmailHeader logoUrl={logoUrl} />
      
      <Section style={content}>
        <Heading style={heading}>Thank you for your order!</Heading>
        
        <Text style={paragraph}>
          Hi {userName},
        </Text>
        
        <Text style={paragraph}>
          Your order has been confirmed and will be processed shortly.
        </Text>
        
        <Section style={orderInfo}>
          <Text style={infoText}>
            <strong>Order Number:</strong> #{orderNumber}
          </Text>
          <Text style={infoText}>
            <strong>Order Date:</strong> {orderDate}
          </Text>
        </Section>
        
        <Hr style={hr} />
        
        <Heading as="h2" style={subheading}>Order Details</Heading>
        
        {items.map((item, index) => (
          <Section key={index} style={itemRow}>
            <Text style={itemName}>
              {item.name} × {item.quantity}
            </Text>
            <Text style={itemPrice}>
              {formatPrice(item.price * item.quantity)}
            </Text>
          </Section>
        ))}
        
        <Hr style={hr} />
        
        <Section style={totalsSection}>
          <Section style={totalRow}>
            <Text style={totalLabel}>Subtotal:</Text>
            <Text style={totalValue}>{formatPrice(subtotal)}</Text>
          </Section>
          <Section style={totalRow}>
            <Text style={totalLabel}>Tax:</Text>
            <Text style={totalValue}>{formatPrice(tax)}</Text>
          </Section>
          <Section style={totalRow}>
            <Text style={totalLabelBold}>Total:</Text>
            <Text style={totalValueBold}>{formatPrice(total)}</Text>
          </Section>
        </Section>
        
        <EmailButton href={orderUrl}>
          View Order Details
        </EmailButton>
        
        <Text style={paragraph}>
          If you have any questions about your order, please don't hesitate to contact us.
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

const orderInfo = {
  backgroundColor: '#f6f9fc',
  padding: '16px',
  borderRadius: '4px',
  margin: '16px 0',
}

const infoText = {
  fontSize: '14px',
  margin: '4px 0',
  color: '#525252',
}

const hr = {
  borderColor: '#e6ebf1',
  margin: '20px 0',
}

const itemRow = {
  display: 'flex',
  justifyContent: 'space-between',
  margin: '8px 0',
}

const itemName = {
  fontSize: '14px',
  color: '#525252',
  margin: 0,
}

const itemPrice = {
  fontSize: '14px',
  color: '#525252',
  margin: 0,
  fontWeight: '500',
}

const totalsSection = {
  marginTop: '20px',
}

const totalRow = {
  display: 'flex',
  justifyContent: 'space-between',
  margin: '8px 0',
}

const totalLabel = {
  fontSize: '14px',
  color: '#525252',
  margin: 0,
}

const totalValue = {
  fontSize: '14px',
  color: '#525252',
  margin: 0,
}

const totalLabelBold = {
  fontSize: '16px',
  color: '#000000',
  margin: 0,
  fontWeight: 'bold',
}

const totalValueBold = {
  fontSize: '16px',
  color: '#000000',
  margin: 0,
  fontWeight: 'bold',
}

export default OrderConfirmation
