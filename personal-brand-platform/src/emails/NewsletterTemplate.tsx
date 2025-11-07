import { Section, Text, Heading, Hr, Img } from '@react-email/components'
import * as React from 'react'
import { EmailLayout } from './components/EmailLayout'
import { EmailHeader } from './components/EmailHeader'
import { EmailFooter } from './components/EmailFooter'
import { EmailButton } from './components/EmailButton'

interface NewsletterArticle {
  title: string
  excerpt: string
  imageUrl?: string
  link: string
}

interface NewsletterTemplateProps {
  subject: string
  previewText: string
  greeting?: string
  introText: string
  articles: NewsletterArticle[]
  ctaText?: string
  ctaUrl?: string
  logoUrl?: string
}

export function NewsletterTemplate({
  subject,
  previewText,
  greeting = 'Hello',
  introText,
  articles,
  ctaText,
  ctaUrl,
  logoUrl,
}: NewsletterTemplateProps) {
  return (
    <EmailLayout previewText={previewText}>
      <EmailHeader logoUrl={logoUrl} title={subject} />
      
      <Section style={content}>
        <Text style={greetingText}>{greeting},</Text>
        
        <Text style={paragraph}>{introText}</Text>
        
        <Hr style={hr} />
        
        {articles.map((article, index) => (
          <Section key={index} style={articleSection}>
            {article.imageUrl && (
              <Img
                src={article.imageUrl}
                alt={article.title}
                style={articleImage}
              />
            )}
            <Heading as="h2" style={articleTitle}>
              {article.title}
            </Heading>
            <Text style={articleExcerpt}>{article.excerpt}</Text>
            <EmailButton href={article.link}>
              Read More
            </EmailButton>
            {index < articles.length - 1 && <Hr style={hr} />}
          </Section>
        ))}
        
        {ctaText && ctaUrl && (
          <>
            <Hr style={hr} />
            <Section style={ctaSection}>
              <Heading as="h3" style={ctaHeading}>
                {ctaText}
              </Heading>
              <EmailButton href={ctaUrl}>
                Learn More
              </EmailButton>
            </Section>
          </>
        )}
        
        <Hr style={hr} />
        
        <Text style={footerText}>
          Thank you for being part of our community!
        </Text>
      </Section>
      
      <EmailFooter unsubscribeUrl="#" />
    </EmailLayout>
  )
}

const content = {
  padding: '20px 30px',
}

const greetingText = {
  fontSize: '16px',
  margin: '0 0 16px',
  color: '#525252',
}

const paragraph = {
  fontSize: '16px',
  lineHeight: '24px',
  margin: '16px 0',
  color: '#525252',
}

const hr = {
  borderColor: '#e6ebf1',
  margin: '24px 0',
}

const articleSection = {
  margin: '24px 0',
}

const articleImage = {
  width: '100%',
  height: 'auto',
  borderRadius: '8px',
  marginBottom: '16px',
}

const articleTitle = {
  fontSize: '20px',
  fontWeight: 'bold',
  margin: '0 0 12px',
  color: '#000000',
}

const articleExcerpt = {
  fontSize: '16px',
  lineHeight: '24px',
  margin: '0 0 16px',
  color: '#525252',
}

const ctaSection = {
  textAlign: 'center' as const,
  padding: '24px',
  backgroundColor: '#f6f9fc',
  borderRadius: '8px',
}

const ctaHeading = {
  fontSize: '20px',
  fontWeight: 'bold',
  margin: '0 0 16px',
  color: '#000000',
}

const footerText = {
  fontSize: '14px',
  textAlign: 'center' as const,
  margin: '16px 0',
  color: '#8898aa',
}

export default NewsletterTemplate
