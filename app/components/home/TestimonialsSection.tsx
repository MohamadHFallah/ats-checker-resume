import { Card, CardContent } from '@/components/ui/card'
import { Star } from 'lucide-react'

const testimonials = [
  {
    name: 'Priya S.',
    role: 'Marketing Consultant',
    content: 'I was applying to numerous jobs without getting any feedback. Later I found ATSFriendly, which helped me to tailor my resume for job descriptions, and I started getting interviews straightaway.'
  },
  {
    name: 'Elena P.',
    role: 'Graphic Designer',
    content: 'It works very well for non-english resumes as well (Spanish). Realtime ATS analysis helped me a lot to make sure my resume is more specific. Highly recommended!'
  },
  {
    name: 'Ahmed K.',
    role: 'Data Analyst',
    content: "I've used many other similar tools, but they show tons of non-relevant words as keywords. ATSFriendly's suggestions are spot-on. Landed a new job within 2 weeks."
  },
  {
    name: 'Arsene L.',
    role: 'Software Engineer',
    content: "ATS Friendly's line by line resume analysis is the best. You can get rid of lines that takes up space on your resume, but makes no impact within seconds. Suggestions are spot on."
  }
]

export function TestimonialsSection() {
  return (
    <section className="py-16 md:py-24 bg-white dark:bg-gray-950">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            We help job seekers succeed!
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            See what our users have to say about their experience with ATSFriendly.com
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="border-gray-200 dark:border-gray-800">
              <CardContent className="p-6">
                <div className="flex gap-1 text-yellow-400 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  "{testimonial.content}"
                </p>
                <div>
                  <p className="font-semibold">{testimonial.name}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{testimonial.role}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}