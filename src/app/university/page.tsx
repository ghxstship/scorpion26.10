import Link from 'next/link'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { GraduationCap, Award, Users, BookOpen, CheckCircle } from 'lucide-react'

export default function UniversityPage() {
  const certificationLevels = [
    {
      title: 'Level 1: Foundation',
      duration: '8 Weeks',
      description: 'Master the fundamentals of 456AF training methodology',
      features: [
        'Core training principles',
        'Movement mechanics',
        'Program design basics',
        'Client assessment',
      ],
    },
    {
      title: 'Level 2: Advanced',
      duration: '12 Weeks',
      description: 'Advanced programming and coaching techniques',
      features: [
        'Periodization strategies',
        'Advanced biomechanics',
        'Nutrition integration',
        'Performance optimization',
      ],
    },
    {
      title: 'Level 3: Master',
      duration: '16 Weeks',
      description: 'Elite-level coaching certification',
      features: [
        'Business development',
        'Elite athlete training',
        'Mentorship program',
        '456AF brand partnership',
      ],
    },
  ]

  return (
    <main className="min-h-screen">
      <div className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="flex justify-center mb-6">
            <GraduationCap className="h-20 w-20 text-primary" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">ProAF University</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Become a certified 456AF trainer and join the next generation of elite fitness coaches.
            Learn directly from Head Coach Matthew Alarcon and our team of experts.
          </p>
        </div>

        {/* Why Choose ProAFU */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">Why Choose ProAFU?</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardHeader>
                <Award className="h-10 w-10 text-primary mb-2" />
                <CardTitle className="text-lg">Industry-Leading</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Certification recognized across the fitness industry
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Users className="h-10 w-10 text-primary mb-2" />
                <CardTitle className="text-lg">Expert Faculty</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Learn from Matthew Alarcon and certified master trainers
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <BookOpen className="h-10 w-10 text-primary mb-2" />
                <CardTitle className="text-lg">Comprehensive</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Complete curriculum covering all 456AF methodologies
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CheckCircle className="h-10 w-10 text-primary mb-2" />
                <CardTitle className="text-lg">Career Support</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Job placement assistance and ongoing mentorship
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Certification Levels */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">Certification Levels</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {certificationLevels.map((level, index) => (
              <Card key={index} className="flex flex-col">
                <CardHeader>
                  <CardTitle className="text-2xl">{level.title}</CardTitle>
                  <CardDescription className="text-base">
                    {level.duration} • {level.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex-1">
                  <ul className="space-y-2">
                    {level.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button asChild className="w-full">
                    <Link href="/contact">Apply Now</Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>

        {/* What You'll Learn */}
        <div className="mb-16 bg-muted/50 rounded-2xl p-8 md:p-12">
          <h2 className="text-3xl font-bold mb-8 text-center">What You&apos;ll Learn</h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div>
              <h3 className="text-xl font-semibold mb-4">Technical Skills</h3>
              <ul className="space-y-2 text-foreground/80">
                <li>• 456AF training methodology</li>
                <li>• Movement assessment and correction</li>
                <li>• Program design across all three verticals</li>
                <li>• Injury prevention and rehabilitation</li>
                <li>• Performance testing and tracking</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4">Business Skills</h3>
              <ul className="space-y-2 text-foreground/80">
                <li>• Client acquisition and retention</li>
                <li>• Marketing and branding</li>
                <li>• Business operations</li>
                <li>• Online coaching platforms</li>
                <li>• 456AF brand partnership opportunities</li>
              </ul>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Your Journey?</h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join ProAFU and become part of an elite community of certified trainers
            transforming lives through fitness.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <Link href="/contact">Apply for Certification</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/about">Learn More About 456AF</Link>
            </Button>
          </div>
        </div>
      </div>
    </main>
  )
}
