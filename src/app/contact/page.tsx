'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Mail, Phone, MapPin } from 'lucide-react'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    category: '',
    subject: '',
    message: '',
  })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    setSuccess(true)
    setLoading(false)
    setFormData({ name: '', email: '', category: '', subject: '', message: '' })

    setTimeout(() => setSuccess(false), 5000)
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  return (
    <div className="container py-12 md:py-20">
      <div className="mx-auto max-w-4xl text-center">
        <h1 className="mb-4 font-[family-name:var(--font-bebas)] text-6xl md:text-7xl lg:text-8xl font-black uppercase tracking-wider text-[var(--grey-100)]">
          Get in <span className="text-[var(--gold-600)]">Touch</span>
        </h1>
        <p className="mb-12 text-lg text-muted-foreground md:text-xl">
          Have questions? We&apos;d love to hear from you. Send us a message and we&apos;ll respond as soon as possible.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Send us a message</CardTitle>
              <CardDescription>
                Fill out the form below and we&apos;ll get back to you within 24 hours
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                {success && (
                  <div className="rounded-sm bg-green-50 p-4 text-sm text-green-800">
                    Thank you for your message! We&apos;ll be in touch soon.
                  </div>
                )}
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium">
                      Name
                    </label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium">
                      Email
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label htmlFor="category" className="text-sm font-medium">
                    Category
                  </label>
                  <select
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    required
                    className="flex h-10 w-full rounded-sm border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  >
                    <option value="">Select a category...</option>
                    <option value="training-programs">Training Programs</option>
                    <option value="afu">AFU University</option>
                    <option value="team456">Team456 Community</option>
                    <option value="456customs">456Customs Gear</option>
                    <option value="bookings">Bookings & Engagements</option>
                    <option value="media">Media & Press</option>
                    <option value="general">General Inquiry</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label htmlFor="subject" className="text-sm font-medium">
                    Subject
                  </label>
                  <Input
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium">
                    Message
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    rows={6}
                    value={formData.message}
                    onChange={handleChange}
                    required
                  />
                </div>
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? 'Sending...' : 'Send Message'}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardContent className="flex items-start gap-4 p-6">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-sm border-2 border-[var(--gold-600)] bg-[var(--grey-900)]">
                <Mail className="h-5 w-5 text-[var(--gold-600)]" />
              </div>
              <div>
                <h3 className="mb-1 font-semibold">Email</h3>
                <p className="text-sm text-muted-foreground">
                  contact@example.com
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="flex items-start gap-4 p-6">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-sm border-2 border-[var(--gold-600)] bg-[var(--grey-900)]">
                <Phone className="h-5 w-5 text-[var(--gold-600)]" />
              </div>
              <div>
                <h3 className="mb-1 font-semibold">Phone</h3>
                <p className="text-sm text-muted-foreground">
                  (407) 686-0934
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="flex items-start gap-4 p-6">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-sm border-2 border-[var(--gold-600)] bg-[var(--grey-900)]">
                <MapPin className="h-5 w-5 text-[var(--gold-600)]" />
              </div>
              <div>
                <h3 className="mb-1 font-semibold">Office</h3>
                <p className="text-sm text-muted-foreground">
                  860 N State Rd 434
                  <br />
                  Altamonte Springs, FL 32714
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
