import { 
  BarChart3, 
  FileSearch, 
  Sparkles, 
  UserCircle, 
  Zap, 
  Shield,
  CheckCircle,
  Clock
} from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

const features = [
  {
    icon: BarChart3,
    title: 'Comprehensive Analysis',
    description: 'Analyzes your resume against job descriptions, extracting keywords, skills, education, and experience for complete optimization.'
  },
  {
    icon: FileSearch,
    title: 'Line by Line Analysis',
    description: 'Goes through your resume line by line, providing a detailed report on alignment with job descriptions.'
  },
  {
    icon: Sparkles,
    title: 'Personalized Recommendations',
    description: 'Get AI-powered targeted suggestions to greatly enhance your resume\'s effectiveness.'
  },
  {
    icon: UserCircle,
    title: 'Powerful AI Tools',
    description: 'Magic Resume Editor acts as your personal resume writer for tailoring to every job application.'
  },
  {
    icon: Zap,
    title: 'User-Friendly Interface',
    description: 'Simple drag-and-drop interface with instant scanning for a seamless experience.'
  },
  {
    icon: Clock,
    title: 'Real-time Score',
    description: 'Get your ATS-Friendly score instantly and discover how well your resume aligns.'
  },
  {
    icon: Shield,
    title: 'Free Checker',
    description: 'Use our Free AI-powered ATS Friendly Resume checker with no hidden charges or credit card required.'
  },
  {
    icon: CheckCircle,
    title: 'Instant Results',
    description: 'Get your ATS analysis results in seconds with lightning-fast feedback.'
  }
]

export function FeaturesSection() {
  return (
    <section className="py-16 md:py-24 bg-white dark:bg-gray-950">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Why ATS Friendly Resume Checker?
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Worrying about no responses? Our Job Scanner has analyzed thousands of 
            job descriptions to identify the best keywords for your resume.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature) => (
            <Card key={feature.title} className="border-gray-200 dark:border-gray-800 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center dark:bg-blue-900/30 dark:text-blue-400">
                  <feature.icon className="h-6 w-6" />
                </div>
                <CardTitle className="text-lg mt-4">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-sm text-gray-600 dark:text-gray-400">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}