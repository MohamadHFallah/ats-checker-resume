import { FC } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import {
  CheckCircle2,
  XCircle,
  AlertCircle,
  TrendingUp,
  TrendingDown,
  Lightbulb,
  Star,
  Brain,
  Award,
  ListChecks,
  Sparkles,
} from 'lucide-react';

// Type definitions based on the provided data
interface Recommendation {
  priority: 'high' | 'medium' | 'low';
  title: string;
  description: string;
}

export interface ATSJobDescriptionResult {
  matchedSkills: string[];
  missingSkills: string[];
  experienceMatch: {
    score: number;
    explanation: string;
  };
  educationMatch: {
    score: number;
    explanation: string;
  };
  keywords: {
    matched: string[];
    missing: string[];
  };
  strengths: string[];
  weaknesses: string[];
  recommendations: Recommendation[];
}

const getPriorityBadge = (priority: string) => {
  switch (priority) {
    case 'high':
      return 'destructive';
    case 'medium':
      return 'default';
    case 'low':
      return 'secondary';
    default:
      return 'outline';
  }
};

export const ATSJobDescriptionResult: FC<{ data: ATSJobDescriptionResult }> = ({ data }) => {
  const {
    matchedSkills,
    missingSkills,
    experienceMatch,
    educationMatch,
    keywords,
    strengths,
    weaknesses,
    recommendations,
  } = data;

  // Calculate overall score (average of experience and education)
  const overallScore = Math.round((experienceMatch.score + educationMatch.score) / 2);

  return (
    <div className="container mx-auto p-4 md:p-6 max-w-7xl space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
            <Brain className="h-8 w-8 text-primary" />
            ATS Resume Analyzer
          </h1>
          <p className="text-muted-foreground">Comprehensive job description match analysis</p>
        </div>
        <div className="flex items-center gap-3 bg-primary/10 px-4 py-2 rounded-full">
          <Sparkles className="h-5 w-5 text-primary" />
          <span className="font-semibold text-lg">Overall Score: {overallScore}/10</span>
        </div>
      </div>

      {/* Score Cards: Experience & Education */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-lg">
              <BriefcaseIcon className="h-5 w-5 text-blue-500" />
              Experience Match
            </CardTitle>
            <CardDescription>Based on your professional background</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between mb-2">
              <span className="text-2xl font-bold">{experienceMatch.score}/10</span>
              <Badge variant={experienceMatch.score >= 7 ? 'default' : 'destructive'}>
                {experienceMatch.score >= 7 ? 'Good' : 'Needs Improvement'}
              </Badge>
            </div>
            <Progress value={experienceMatch.score * 10} className="h-2" />
            <p className="text-sm text-muted-foreground mt-3">{experienceMatch.explanation}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Award className="h-5 w-5 text-green-500" />
              Education Match
            </CardTitle>
            <CardDescription>Based on your academic background</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between mb-2">
              <span className="text-2xl font-bold">{educationMatch.score}/10</span>
              <Badge variant={educationMatch.score >= 7 ? 'default' : 'destructive'}>
                {educationMatch.score >= 7 ? 'Strong' : 'Needs Improvement'}
              </Badge>
            </div>
            <Progress value={educationMatch.score * 10} className="h-2" />
            <p className="text-sm text-muted-foreground mt-3">{educationMatch.explanation}</p>
          </CardContent>
        </Card>
      </div>

      {/* Skills Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Matched Skills */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-lg">
              <CheckCircle2 className="h-5 w-5 text-green-500" />
              Matched Skills
              <Badge className="ml-2">{matchedSkills.length}</Badge>
            </CardTitle>
            <CardDescription>Skills found in your resume</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {matchedSkills.map((skill) => (
                <Badge
                  key={skill}
                  variant="default"
                  className="bg-green-100 text-green-800 hover:bg-green-200 border-green-200"
                >
                  {skill}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Missing Skills */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-lg">
              <XCircle className="h-5 w-5 text-red-500" />
              Missing Skills
              <Badge variant="destructive" className="ml-2">
                {missingSkills.length}
              </Badge>
            </CardTitle>
            <CardDescription>Skills not detected in your resume</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {missingSkills.map((skill) => (
                <Badge
                  key={skill}
                  variant="outline"
                  className="border-red-200 text-red-700 bg-red-50"
                >
                  {skill}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Keywords Section */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2 text-lg">
            <ListChecks className="h-5 w-5 text-purple-500" />
            Keyword Analysis
          </CardTitle>
          <CardDescription>Critical keywords from the job description</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="text-sm font-medium text-green-600 mb-2 flex items-center gap-1">
                <CheckCircle2 className="h-4 w-4" /> Matched ({keywords.matched.length})
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {keywords.matched.map((kw) => (
                  <Badge
                    key={kw}
                    variant="secondary"
                    className="bg-green-50 text-green-700 border-green-200"
                  >
                    {kw}
                  </Badge>
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-sm font-medium text-red-600 mb-2 flex items-center gap-1">
                <XCircle className="h-4 w-4" /> Missing ({keywords.missing.length})
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {keywords.missing.map((kw) => (
                  <Badge
                    key={kw}
                    variant="outline"
                    className="border-red-200 text-red-700 bg-red-50"
                  >
                    {kw}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Strengths & Weaknesses */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-lg">
              <TrendingUp className="h-5 w-5 text-emerald-500" />
              Strengths
            </CardTitle>
            <CardDescription>Your strongest qualifications</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {strengths.map((strength, idx) => (
                <li key={idx} className="flex items-start gap-2 text-sm">
                  <Star className="h-4 w-4 text-yellow-500 mt-0.5 flex-shrink-0" />
                  <span>{strength}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-lg">
              <TrendingDown className="h-5 w-5 text-rose-500" />
              Weaknesses / Gaps
            </CardTitle>
            <CardDescription>Areas that need improvement</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {weaknesses.map((weakness, idx) => (
                <li key={idx} className="flex items-start gap-2 text-sm">
                  <AlertCircle className="h-4 w-4 text-rose-500 mt-0.5 flex-shrink-0" />
                  <span>{weakness}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* Recommendations */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Lightbulb className="h-5 w-5 text-amber-500" />
            Recommendations
          </CardTitle>
          <CardDescription>Actionable steps to improve your match</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recommendations.map((rec, idx) => (
              <div key={idx} className="border-l-4 border-primary/30 pl-4 py-1">
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <Badge variant={getPriorityBadge(rec.priority) as any}>
                    {rec.priority.toUpperCase()} PRIORITY
                  </Badge>
                  <h4 className="font-semibold text-base">{rec.title}</h4>
                </div>
                <p className="text-sm text-muted-foreground">{rec.description}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Footer note */}
      <div className="text-center text-xs text-muted-foreground border-t pt-4 mt-4">
        ATS analysis based on job description and resume content. Use recommendations to tailor your
        application.
      </div>
    </div>
  );
};

// Icon component for briefcase (since lucide-react doesn't have it directly)
const BriefcaseIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
  </svg>
);

export default ATSJobDescriptionResult;
