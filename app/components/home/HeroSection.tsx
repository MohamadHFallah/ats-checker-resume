// components/sections/HeroSection.tsx
'use client'

import { useState } from 'react'
import { Upload, FileText, Zap, Shield, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import Link from 'next/link'

export function HeroSection() {
  const [isDragging, setIsDragging] = useState(false)
  const [file, setFile] = useState<File | null>(null)

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    const droppedFile = e.dataTransfer.files[0]
    if (droppedFile && (droppedFile.type === 'application/pdf' ||
      droppedFile.type === 'application/msword' ||
      droppedFile.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document')) {
      setFile(droppedFile)
    }
  }

  return (
    <section className="pt-24 pb-12 md:pt-32 md:pb-20
     dark:from-gray-900 dark:to-gray-950">
      <div className="container">
        <div className="flex items-center">
          <div className="space-y-6 mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1 
            rounded-full bg-blue-100 text-blue-700 text-sm font-medium dark:bg-blue-900/30 dark:text-blue-300">
              <Zap className="h-4 w-4" />
              AI-Powered Resume Optimization
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
              Get Hired Faster with{' '}
              <span className="text-blue-600 dark:text-blue-400">ATS Friendly!</span>
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-lg">
              Check and compare your resume with job descriptions using our Free ATS
              Friendly Resume Checker. Enhance your chances of getting filtered through
              Applicant Tracking Systems.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link href={"/dashboard"}  >
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white">
                   Getting Started <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Button size="lg" variant="outline">
                Watch Demo
              </Button>
            </div>

            <div className="flex items-center gap-6 text-sm text-gray-500 dark:text-gray-400">
              <span className="flex items-center gap-1">
                <Shield className="h-4 w-4 text-green-500" />
                Privacy Guaranteed
              </span>
              <span>✓ 100,000+ Job Seekers Helped</span>
            </div>
          </div>

          {/* <Card className="border-2 border-dashed border-gray-300 dark:border-gray-700 bg-white/50 dark:bg-gray-900/50 backdrop-blur">
            <CardContent className="p-6">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
                      1
                    </div>
                    <span className="font-medium">Upload Resume</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-gray-400 dark:bg-gray-800">
                      2
                    </div>
                    <span className="text-gray-400">Job Description</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-gray-400 dark:bg-gray-800">
                      3
                    </div>
                    <span className="text-gray-400">Start Scan</span>
                  </div>
                </div>

                <div
                  className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                    isDragging 
                      ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' 
                      : 'border-gray-300 dark:border-gray-700'
                  }`}
                  onDragOver={(e) => { e.preventDefault(); setIsDragging(true) }}
                  onDragLeave={() => setIsDragging(false)}
                  onDrop={handleDrop}
                >
                  <input
                    type="file"
                    className="absolute inset-0 opacity-0 cursor-pointer"
                    accept=".pdf,.doc,.docx"
                    onChange={(e) => {
                      const selectedFile = e.target.files?.[0]
                      if (selectedFile) setFile(selectedFile)
                    }}
                  />
                  <Upload className="mx-auto h-12 w-12 text-blue-500 mb-3" />
                  <p className="text-sm font-medium">
                    {file ? file.name : 'Select your Resume / CV'}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    or drop a file here. (Max: 5 MB | *.pdf *.doc *.docx)
                  </p>
                  {file && (
                    <Button size="sm" className="mt-4" onClick={() => setFile(null)}>
                      Remove File
                    </Button>
                  )}
                </div>

                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                  Start Scan
                </Button>
              </div>
            </CardContent>
          </Card> */}
        </div>
      </div>
    </section>
  )
}