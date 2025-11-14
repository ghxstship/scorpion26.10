import { Section, Text, Heading, Hr } from '@react-email/components'
import * as React from 'react'
import { EmailLayout } from './components/EmailLayout'
import { EmailHeader } from './components/EmailHeader'
import { EmailFooter } from './components/EmailFooter'
import { EmailButton } from './components/EmailButton'
import { emailColors, emailSpacing, emailTypography, emailBorderRadius } from './styles/emailTokens'

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
          If you have any questions about your order, please don&apos;t hesitate to contact us.
        </Text>
      </Section>
      
      <EmailFooter />
    </EmailLayout>
  )
}

// Token-based styles for email compatibility
const content = {
  padding: `${emailSpacing.lg} ${emailSpacing.xl}`,
}

const heading = {
  fontFamily: emailTypography.fontFamily.sans,
  fontSize: emailTypography.fontSize['2xl'],
  fontWeight: emailTypography.fontWeight.bold,
  margin: `0 0 ${emailSpacing.lg}`,
  color: emailColors.offWhite,
}

const subheading = {
  fontFamily: emailTypography.fontFamily.sans,
  fontSize: emailTypography.fontSize.lg,
  fontWeight: emailTypography.fontWeight.bold,
  margin: `${emailSpacing.lg} 0 ${emailSpacing.sm}`,
  color: emailColors.offWhite,
}

const paragraph = {
  fontFamily: emailTypography.fontFamily.sans,
  fontSize: emailTypography.fontSize.base,
  lineHeight: '24px',
  margin: `${emailSpacing.md} 0`,
  color: emailColors.lightGrey,
}

const orderInfo = {
  backgroundColor: emailColors.charcoal,
  padding: emailSpacing.md,
  borderRadius: emailBorderRadius.md,
  borderLeft: `4px solid ${emailColors.richGold}`,
  margin: `${emailSpacing.md} 0`,
}

const infoText = {
  fontFamily: emailTypography.fontFamily.sans,
  fontSize: emailTypography.fontSize.sm,
  margin: `${emailSpacing.xs} 0`,
  color: emailColors.lightGrey,
}

const hr = {
  borderTop: `1px solid ${emailColors.darkGrey}`,
  borderBottom: 'none',
  borderLeft: 'none',
  borderRight: 'none',
  margin: `${emailSpacing.lg} 0`,
}

const itemRow = {
  display: 'flex',
  justifyContent: 'space-between',
  margin: `${emailSpacing.sm} 0`,
}

const itemName = {
  fontFamily: emailTypography.fontFamily.sans,
  fontSize: emailTypography.fontSize.sm,
  color: emailColors.lightGrey,
  margin: 0,
}

const itemPrice = {
  fontFamily: emailTypography.fontFamily.sans,
  fontSize: emailTypography.fontSize.sm,
  color: emailColors.lightGrey,
  margin: 0,
  fontWeight: emailTypography.fontWeight.medium,
}

const totalsSection = {
  marginTop: emailSpacing.lg,
}

const totalRow = {
  display: 'flex',
  justifyContent: 'space-between',
  margin: `${emailSpacing.sm} 0`,
}

const totalLabel = {
  fontFamily: emailTypography.fontFamily.sans,
  fontSize: emailTypography.fontSize.sm,
  color: emailColors.lightGrey,
  margin: 0,
}

const totalValue = {
  fontFamily: emailTypography.fontFamily.sans,
  fontSize: emailTypography.fontSize.sm,
  color: emailColors.lightGrey,
  margin: 0,
}

const totalLabelBold = {
  fontFamily: emailTypography.fontFamily.sans,
  fontSize: emailTypography.fontSize.base,
  color: emailColors.offWhite,
  margin: 0,
  fontWeight: emailTypography.fontWeight.bold,
}

const totalValueBold = {
  fontFamily: emailTypography.fontFamily.sans,
  fontSize: emailTypography.fontSize.base,
  color: emailColors.richGold,
  margin: 0,
  fontWeight: emailTypography.fontWeight.bold,
}

export default OrderConfirmation
