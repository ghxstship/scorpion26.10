import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy - Personal Brand Platform',
  description: 'Our commitment to protecting your privacy and personal data.',
}

export default function PrivacyPolicyPage() {
  return (
    <div className="container mx-auto max-w-4xl px-4 py-12">
      <h1 className="mb-8 text-4xl font-bold">Privacy Policy</h1>
      
      <div className="prose prose-slate max-w-none dark:prose-invert">
        <p className="text-muted-foreground">
          <strong>Last Updated:</strong> November 6, 2025
        </p>

        <section className="mb-8">
          <h2 className="mb-4 text-2xl font-semibold">1. Introduction</h2>
          <p>
            Welcome to Personal Brand Platform. We respect your privacy and are committed to protecting your personal data. 
            This privacy policy will inform you about how we look after your personal data when you visit our website and 
            tell you about your privacy rights and how the law protects you.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="mb-4 text-2xl font-semibold">2. Data We Collect</h2>
          <p>We may collect, use, store and transfer different kinds of personal data about you:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Identity Data:</strong> First name, last name, username</li>
            <li><strong>Contact Data:</strong> Email address, telephone numbers</li>
            <li><strong>Technical Data:</strong> IP address, browser type, device information</li>
            <li><strong>Usage Data:</strong> Information about how you use our website and services</li>
            <li><strong>Marketing Data:</strong> Your preferences in receiving marketing from us</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="mb-4 text-2xl font-semibold">3. How We Use Your Data</h2>
          <p>We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>To provide and maintain our service</li>
            <li>To notify you about changes to our service</li>
            <li>To provide customer support</li>
            <li>To gather analysis or valuable information to improve our service</li>
            <li>To monitor the usage of our service</li>
            <li>To detect, prevent and address technical issues</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="mb-4 text-2xl font-semibold">4. Cookies</h2>
          <p>
            We use cookies and similar tracking technologies to track activity on our service and hold certain information. 
            You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you 
            do not accept cookies, you may not be able to use some portions of our service.
          </p>
          <p className="mt-4">
            For more information about our cookie usage, please see our <a href="/cookie-policy" className="text-primary hover:underline">Cookie Policy</a>.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="mb-4 text-2xl font-semibold">5. Your Rights (GDPR/CCPA)</h2>
          <p>Under data protection laws, you have rights including:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Right to Access:</strong> Request copies of your personal data</li>
            <li><strong>Right to Rectification:</strong> Request correction of inaccurate data</li>
            <li><strong>Right to Erasure:</strong> Request deletion of your personal data</li>
            <li><strong>Right to Restrict Processing:</strong> Request restriction of processing your data</li>
            <li><strong>Right to Data Portability:</strong> Request transfer of your data</li>
            <li><strong>Right to Object:</strong> Object to processing of your personal data</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="mb-4 text-2xl font-semibold">6. Data Security</h2>
          <p>
            We have implemented appropriate security measures to prevent your personal data from being accidentally lost, 
            used or accessed in an unauthorized way, altered or disclosed. We limit access to your personal data to those 
            employees, agents, contractors and other third parties who have a business need to know.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="mb-4 text-2xl font-semibold">7. Data Retention</h2>
          <p>
            We will only retain your personal data for as long as necessary to fulfill the purposes we collected it for, 
            including for the purposes of satisfying any legal, accounting, or reporting requirements.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="mb-4 text-2xl font-semibold">8. Third-Party Links</h2>
          <p>
            Our website may include links to third-party websites, plug-ins and applications. Clicking on those links or 
            enabling those connections may allow third parties to collect or share data about you. We do not control these 
            third-party websites and are not responsible for their privacy statements.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="mb-4 text-2xl font-semibold">9. Changes to This Policy</h2>
          <p>
            We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new 
            Privacy Policy on this page and updating the &ldquo;Last Updated&rdquo; date at the top of this Privacy Policy.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="mb-4 text-2xl font-semibold">10. Contact Us</h2>
          <p>
            If you have any questions about this Privacy Policy, please contact us:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>By email: privacy@personalbrandplatform.com</li>
            <li>By visiting our <a href="/contact" className="text-primary hover:underline">contact page</a></li>
          </ul>
        </section>
      </div>
    </div>
  )
}
