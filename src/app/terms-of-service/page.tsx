import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Terms of Service - Personal Brand Platform',
  description: 'Terms and conditions for using our platform and services.',
}

export default function TermsOfServicePage() {
  return (
    <div className="container mx-auto max-w-4xl px-4 py-12">
      <h1 className="mb-8 text-4xl font-bold">Terms of Service</h1>
      
      <div className="prose prose-slate max-w-none dark:prose-invert">
        <p className="text-muted-foreground">
          <strong>Last Updated:</strong> November 6, 2025
        </p>

        <section className="mb-8">
          <h2 className="mb-4 text-2xl font-semibold">1. Agreement to Terms</h2>
          <p>
            By accessing or using Personal Brand Platform, you agree to be bound by these Terms of Service and all 
            applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using 
            or accessing this site.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="mb-4 text-2xl font-semibold">2. Use License</h2>
          <p>
            Permission is granted to temporarily access the materials on Personal Brand Platform for personal, 
            non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under 
            this license you may not:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Modify or copy the materials</li>
            <li>Use the materials for any commercial purpose or for any public display</li>
            <li>Attempt to decompile or reverse engineer any software contained on the website</li>
            <li>Remove any copyright or other proprietary notations from the materials</li>
            <li>Transfer the materials to another person or &ldquo;mirror&rdquo; the materials on any other server</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="mb-4 text-2xl font-semibold">3. User Accounts</h2>
          <p>
            When you create an account with us, you must provide information that is accurate, complete, and current at 
            all times. Failure to do so constitutes a breach of the Terms, which may result in immediate termination of 
            your account on our Service.
          </p>
          <p className="mt-4">
            You are responsible for safeguarding the password that you use to access the Service and for any activities 
            or actions under your password.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="mb-4 text-2xl font-semibold">4. Intellectual Property</h2>
          <p>
            The Service and its original content, features and functionality are and will remain the exclusive property 
            of Personal Brand Platform and its licensors. The Service is protected by copyright, trademark, and other 
            laws of both the United States and foreign countries.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="mb-4 text-2xl font-semibold">5. User Content</h2>
          <p>
            Our Service may allow you to post, link, store, share and otherwise make available certain information, text, 
            graphics, or other material. You are responsible for the content that you post on or through the Service, 
            including its legality, reliability, and appropriateness.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="mb-4 text-2xl font-semibold">6. Prohibited Uses</h2>
          <p>You may not use the Service:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>In any way that violates any applicable national or international law or regulation</li>
            <li>To transmit, or procure the sending of, any advertising or promotional material without our prior written consent</li>
            <li>To impersonate or attempt to impersonate the Company, a Company employee, another user, or any other person or entity</li>
            <li>To engage in any other conduct that restricts or inhibits anyone&apos;s use or enjoyment of the Service</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="mb-4 text-2xl font-semibold">7. Disclaimer</h2>
          <p>
            The materials on Personal Brand Platform are provided on an &lsquo;as is&rsquo; basis. We make no warranties, expressed 
            or implied, and hereby disclaim and negate all other warranties including, without limitation, implied 
            warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of 
            intellectual property or other violation of rights.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="mb-4 text-2xl font-semibold">8. Limitations of Liability</h2>
          <p>
            In no event shall Personal Brand Platform or its suppliers be liable for any damages (including, without 
            limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or 
            inability to use the materials on our website.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="mb-4 text-2xl font-semibold">9. Termination</h2>
          <p>
            We may terminate or suspend your account and bar access to the Service immediately, without prior notice or 
            liability, under our sole discretion, for any reason whatsoever and without limitation, including but not 
            limited to a breach of the Terms.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="mb-4 text-2xl font-semibold">10. Governing Law</h2>
          <p>
            These Terms shall be governed and construed in accordance with the laws of the United States, without regard 
            to its conflict of law provisions.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="mb-4 text-2xl font-semibold">11. Changes to Terms</h2>
          <p>
            We reserve the right, at our sole discretion, to modify or replace these Terms at any time. We will provide 
            notice of any significant changes by posting the new Terms of Service on this page and updating the &ldquo;Last 
            Updated&rdquo; date.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="mb-4 text-2xl font-semibold">12. Contact Us</h2>
          <p>
            If you have any questions about these Terms, please contact us:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>By email: legal@personalbrandplatform.com</li>
            <li>By visiting our <a href="/contact" className="text-primary hover:underline">contact page</a></li>
          </ul>
        </section>
      </div>
    </div>
  )
}
