import { Metadata } from 'next'

interface SEOProps {
  title: string
  description: string
  path?: string
  image?: string
  noIndex?: boolean
}

export function generateSEO({
  title,
  description,
  path = '',
  image = '/og-image.jpg',
  noIndex = false,
}: SEOProps): Metadata {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://yourdomain.com'
  const fullUrl = `${siteUrl}${path}`
  const fullImageUrl = image.startsWith('http') ? image : `${siteUrl}${image}`

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: fullUrl,
      siteName: 'Personal Brand Platform',
      images: [
        {
          url: fullImageUrl,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale: 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [fullImageUrl],
      creator: '@yourusername',
    },
    robots: noIndex
      ? {
          index: false,
          follow: false,
        }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
          },
        },
    alternates: {
      canonical: fullUrl,
    },
  }
}

export function generateBreadcrumbSchema(items: Array<{ name: string; url: string }>) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://yourdomain.com'

  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${siteUrl}${item.url}`,
    })),
  }
}

export function generateOrganizationSchema() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://yourdomain.com'

  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Personal Brand Platform',
    url: siteUrl,
    logo: `${siteUrl}/logo.png`,
    sameAs: [
      'https://facebook.com/yourpage',
      'https://twitter.com/yourhandle',
      'https://linkedin.com/company/yourcompany',
      'https://instagram.com/yourhandle',
    ],
  }
}

export function generatePersonSchema() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://yourdomain.com'

  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Your Name',
    url: siteUrl,
    image: `${siteUrl}/profile.jpg`,
    jobTitle: 'Performance Coach & Speaker',
    description: 'World-class expert in peak performance and personal development',
    sameAs: [
      'https://twitter.com/yourhandle',
      'https://linkedin.com/in/yourprofile',
    ],
  }
}

export function generateProductSchema(product: {
  name: string
  description: string
  price: number
  currency: string
  image: string
  url: string
}) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://yourdomain.com'

  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    image: product.image.startsWith('http') ? product.image : `${siteUrl}${product.image}`,
    url: `${siteUrl}${product.url}`,
    offers: {
      '@type': 'Offer',
      price: product.price,
      priceCurrency: product.currency,
      availability: 'https://schema.org/InStock',
    },
  }
}

export function generateArticleSchema(article: {
  title: string
  description: string
  author: string
  publishedDate: string
  modifiedDate?: string
  image: string
  url: string
}) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://yourdomain.com'

  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.description,
    image: article.image.startsWith('http') ? article.image : `${siteUrl}${article.image}`,
    datePublished: article.publishedDate,
    dateModified: article.modifiedDate || article.publishedDate,
    author: {
      '@type': 'Person',
      name: article.author,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Personal Brand Platform',
      logo: {
        '@type': 'ImageObject',
        url: `${siteUrl}/logo.png`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${siteUrl}${article.url}`,
    },
  }
}
