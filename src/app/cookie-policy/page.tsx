import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Cookie Policy - Personal Brand Platform',
  description: 'Information about how we use cookies and similar technologies.',
}

export default function CookiePolicyPage() {
  return (
    <div className="container mx-auto max-w-4xl px-4 py-12">
      <h1 className="mb-8 text-4xl font-bold">Cookie Policy</h1>
      
      <div className="prose prose-slate max-w-none dark:prose-invert">
        <p className="text-muted-foreground">
          <strong>Last Updated:</strong> November 6, 2025
        </p>

        <section className="mb-8">
          <h2 className="mb-4 text-2xl font-semibold">1. What Are Cookies</h2>
          <p>
            Cookies are small text files that are placed on your computer or mobile device when you visit a website. 
            They are widely used to make websites work more efficiently and provide information to the owners of the site.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="mb-4 text-2xl font-semibold">2. How We Use Cookies</h2>
          <p>
            Personal Brand Platform uses cookies to distinguish you from other users of our website. This helps us to 
            provide you with a good experience when you browse our website and also allows us to improve our site.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="mb-4 text-2xl font-semibold">3. Types of Cookies We Use</h2>
          
          <h3 className="mb-3 text-xl font-semibold">Necessary Cookies (Required)</h3>
          <p>
            These cookies are essential for the website to function properly. They enable basic functions like page 
            navigation and access to secure areas of the website. The website cannot function properly without these cookies.
          </p>
          <ul className="list-disc pl-6 space-y-2 mb-4">
            <li>Session management</li>
            <li>Security and authentication</li>
            <li>Load balancing</li>
          </ul>

          <h3 className="mb-3 text-xl font-semibold">Analytics Cookies (Optional)</h3>
          <p>
            These cookies help us understand how visitors interact with our website by collecting and reporting information 
            anonymously. This helps us improve our website and services.
          </p>
          <ul className="list-disc pl-6 space-y-2 mb-4">
            <li>Google Analytics</li>
            <li>Page view tracking</li>
            <li>User behavior analysis</li>
          </ul>

          <h3 className="mb-3 text-xl font-semibold">Marketing Cookies (Optional)</h3>
          <p>
            These cookies are used to track visitors across websites. The intention is to display ads that are relevant 
            and engaging for the individual user.
          </p>
          <ul className="list-disc pl-6 space-y-2 mb-4">
            <li>Advertising platforms</li>
            <li>Retargeting campaigns</li>
            <li>Conversion tracking</li>
          </ul>

          <h3 className="mb-3 text-xl font-semibold">Preferences Cookies (Optional)</h3>
          <p>
            These cookies enable the website to remember information that changes the way the website behaves or looks, 
            such as your preferred language or the region you are in.
          </p>
          <ul className="list-disc pl-6 space-y-2 mb-4">
            <li>Language preferences</li>
            <li>Theme preferences (light/dark mode)</li>
            <li>Region settings</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="mb-4 text-2xl font-semibold">4. Third-Party Cookies</h2>
          <p>
            In addition to our own cookies, we may also use various third-party cookies to report usage statistics of 
            the Service and deliver advertisements on and through the Service.
          </p>
          <p className="mt-4">Third-party services we use include:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Google Analytics:</strong> Web analytics service</li>
            <li><strong>Google Ads:</strong> Advertising platform</li>
            <li><strong>Facebook Pixel:</strong> Marketing and analytics tool</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="mb-4 text-2xl font-semibold">5. Managing Cookies</h2>
          <p>
            You can control and/or delete cookies as you wish. You can delete all cookies that are already on your 
            computer and you can set most browsers to prevent them from being placed.
          </p>
          <p className="mt-4">
            However, if you do this, you may have to manually adjust some preferences every time you visit a site and 
            some services and functionalities may not work.
          </p>
          
          <h3 className="mb-3 mt-6 text-xl font-semibold">Browser Controls</h3>
          <p>Most web browsers allow you to control cookies through their settings preferences:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Chrome:</strong> Settings → Privacy and security → Cookies and other site data</li>
            <li><strong>Firefox:</strong> Options → Privacy & Security → Cookies and Site Data</li>
            <li><strong>Safari:</strong> Preferences → Privacy → Cookies and website data</li>
            <li><strong>Edge:</strong> Settings → Privacy, search, and services → Cookies and site permissions</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="mb-4 text-2xl font-semibold">6. Cookie Consent</h2>
          <p>
            When you first visit our website, you will be presented with a cookie consent banner. You can choose to:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Accept All:</strong> Allow all cookies including analytics and marketing</li>
            <li><strong>Reject All:</strong> Only necessary cookies will be used</li>
            <li><strong>Customize:</strong> Choose which categories of cookies you want to allow</li>
          </ul>
          <p className="mt-4">
            You can change your cookie preferences at any time by clicking the cookie settings link in our footer.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="mb-4 text-2xl font-semibold">7. Cookie Retention</h2>
          <p>
            Cookies are stored for different periods depending on their purpose:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Session Cookies:</strong> Deleted when you close your browser</li>
            <li><strong>Persistent Cookies:</strong> Remain on your device for a set period (typically 30 days to 2 years)</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="mb-4 text-2xl font-semibold">8. Updates to This Policy</h2>
          <p>
            We may update our Cookie Policy from time to time. We will notify you of any changes by posting the new 
            Cookie Policy on this page and updating the &ldquo;Last Updated&rdquo; date.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="mb-4 text-2xl font-semibold">9. Contact Us</h2>
          <p>
            If you have any questions about our use of cookies, please contact us:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>By email: privacy@personalbrandplatform.com</li>
            <li>By visiting our <a href="/contact" className="text-primary hover:underline">contact page</a></li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="mb-4 text-2xl font-semibold">10. More Information</h2>
          <p>
            For more information about privacy and data protection, please see our{' '}
            <a href="/privacy-policy" className="text-primary hover:underline">Privacy Policy</a>.
          </p>
        </section>
      </div>
    </div>
  )
}
