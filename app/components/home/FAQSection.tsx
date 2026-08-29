'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { Card } from '@/components/ui/card'

const faqs = [
  {
    question: 'What is an ATS Friendly Resume?',
    answer: 'Employers and Hiring Managers use Applicant Tracking Systems (ATS) to filter thousands of resumes they receive for a job posting. Applicant Tracking Systems (ATS) only filter the resumes with highest keyword match, which are considered as ATS Friendly resumes. To make sure your resume gets filtered, you need to optimize it for each job vacancy you apply.'
  },
  {
    question: 'How do I know if a company uses ATS?',
    answer: 'If you are asked to apply through employer\'s job board, by uploading your resume into an online form on a website, 99% of the time, the employer is using an Applicant Tracking System (ATS). It is always better to tailor, optimize and verify your resume with our ATS Scanner before applying to such vacancy.'
  },
  {
    question: 'How does ATSFriendly.com check my resume?',
    answer: 'ATSFriendly.com ATS Checker tool can show you how well your resume matches with popular ATS software like Workable, BreezyHR, iCIMS, Recruiterbox Lever, Greenhouse, and Taleo. Our free AI Resume Checker goes through your resume using algorithms similar to the ones, that are widely used by resume screening tools and applicant tracking systems (ATS), to see what can be traced, what is missing and what can be optimized. It is then presented to you with a detailed report.'
  },
  {
    question: 'Do I need an ATS Friendly resume for every job application?',
    answer: 'Yes. Every Applicant Tracking System (ATS) comes with an ATS scanner, which essentially scans the text on your resume. Then it extracts all keywords, skills, educational qualifications, work experiences, action verbs to see how well you match with the job description. Therefore, it is essential that you have a tailored resume for each job vacancy you apply, especially for highly competitive openings.'
  },
  {
    question: 'What are the best practices for an ATS Friendly resume?',
    answer: 'Customize your resume to the specific job you are applying for. Match the keywords with the skills found in the Job Description. Use long-form and acronym versions of keywords. Do not use graphics, columns, tables, progress bars etc. They may look appealing, but ATS are not able to read those. Use standard resume section headings (Introduction, Work Experience, Skills, Education). Use a screen-friendly, traditional font. Scan your resume before applying, using an ATS Resume Checker.'
  },
  {
    question: 'How much does ATSFriendly.com cost?',
    answer: 'ATSFriendly.com enhances your chances of getting shortlisted through Applicant Tracking System (ATS) minimum by 50%, while reducing the time you spend to find keywords on the job posting to optimize your resume. The powerful AI behind ATSFriendly has already scanned thousands of job descriptions on daily basis, and fine-tuned for almost every industry. We offer a free version with basic features, and premium plans for advanced AI tools and unlimited resume checks.'
  }
]

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section className="py-16 md:py-24 bg-gray-50 dark:bg-gray-900">
      <div className="container max-w-4xl">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Find answers to common questions about ATS Friendly resumes and our platform
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <Card key={index} className="border-gray-200 dark:border-gray-800">
              <button
                className="w-full px-6 py-4 flex items-center justify-between text-left"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                <span className="font-medium">{faq.question}</span>
                <ChevronDown 
                  className={`h-5 w-5 text-gray-500 transition-transform ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                />
              </button>
              {openIndex === index && (
                <div className="px-6 pb-4 text-gray-600 dark:text-gray-400">
                  {faq.answer}
                </div>
              )}
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}