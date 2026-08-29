import { Sparkles, FileText, PenTool, Zap, CheckCircle, Download, Users } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

const skillsData = {
  hardSkills: ['Python', 'Django', 'Flask', 'Java', 'JavaScript', 'React', 'REST APIs', 'Docker', 'Docker Compose', 'CI/CD tools', 'Automated testing', 'SDLC', 'Agile methodologies'],
  softSkills: ['Collaboration', 'Teamwork', 'Communication', 'Attention to detail', 'Problem-solving', 'Adaptability']
}

export function MagicEditorSection() {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-950">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-100 text-purple-700 text-sm font-medium dark:bg-purple-900/30 dark:text-purple-300 mb-4">
            <Sparkles className="h-4 w-4" />
            AI-Powered Resume Builder
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            ✨ Magic Resume Editor
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Powered by GPT-4.1 and optimized with 100,000+ resumes written by professional resume writers.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          <Card className="border-gray-200 dark:border-gray-800">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold">Keyword Optimization</h3>
                <span className="text-sm text-gray-500">Live Analysis</span>
              </div>
              
              <div className="space-y-6">
                <div>
                  <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Hard Skills</h4>
                  <div className="flex flex-wrap gap-2">
                    {skillsData.hardSkills.map((skill) => (
                      <span 
                        key={skill}
                        className={`px-2 py-1 text-xs rounded-full ${
                          ['Python', 'Django', 'Java', 'JavaScript', 'React', 'Docker'].includes(skill)
                            ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300'
                            : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300'
                        }`}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Soft Skills</h4>
                  <div className="flex flex-wrap gap-2">
                    {skillsData.softSkills.map((skill) => (
                      <span 
                        key={skill}
                        className={`px-2 py-1 text-xs rounded-full ${
                          ['Collaboration'].includes(skill)
                            ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300'
                            : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300'
                        }`}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg">
                  <div className="flex items-start gap-3">
                    <div className="h-8 w-8 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center dark:bg-purple-900/30 dark:text-purple-400">
                      <PenTool className="h-4 w-4" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">Collaborated with cross-functional teams to enhance platform</p>
                      <p className="text-xs text-gray-500 mt-1">✓ Positive Impact | Action words: Collaborated</p>
                      <Button variant="ghost" size="sm" className="mt-2 text-blue-600">
                        Generate phrase suggestions
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: Sparkles, label: 'Keyword Optimization' },
                { icon: PenTool, label: 'AI Suggestions' },
                { icon: FileText, label: 'Cover Letter Generator' },
                { icon: CheckCircle, label: 'Realtime ATS Validation' },
                { icon: Zap, label: 'Resume Formatting' },
                { icon: Download, label: 'Export to PDF' },
              ].map((item) => (
                <Card key={item.label} className="border-gray-200 dark:border-gray-800">
                  <CardContent className="p-4 flex items-center gap-3">
                    <item.icon className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                    <span className="text-sm font-medium">{item.label}</span>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card className="border-gray-200 dark:border-gray-800 bg-blue-50 dark:bg-blue-900/20">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-10 w-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center dark:bg-blue-900/30 dark:text-blue-400">
                    <Users className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-semibold">Used by 1,000+ job seekers daily</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Join thousands of successful users</p>
                  </div>
                </div>
                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                  Try Magic Editor Now
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}