'use client';

import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { ATSJobDescriptionResult } from './atsJob';

type AtsIssue = {
  issue: string;
  severity: 'low' | 'medium' | 'high';
  explanation: string;
};

type Experience = {
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  description: string;
  technologies: string[];
};

type Education = {
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
};

type ResumeResult = {
  name: string;
  phone: string;
  summery: string;
  skills: string[];
  projects: unknown[];
  experience: Experience[];
  education: Education[];
};

type AnalyzerResult = {
  overallScore: number;
  strengths: string[];
  weaknesses: string[];
  atsIssues: AtsIssue[];
  suggestions: {
    title: string;
    explanation: string;
  }[];
};

// const resumeResult: ResumeResult = {
//   name: "Mohamad Hassan Fallah",
//   phone: "+989118296582",

//   summery:
//     "I'm a Full Stack JavaScript Developer with 10+ years of experience building reliable applications. My skills include a wide range of technologies: Node.js, TypeScript, Nest.js, Docker, GraphQL, PostgreSQL, React.js, and more. I enjoy solving complex challenges and designing clean, maintainable architecture.",

//   skills: [
//     "Node.js",
//     "TypeScript",
//     "NestJS",
//     "REST API",
//     "GraphQL",
//     "Jest",
//     "ORM",
//     "React.js",
//     "Next.js",
//     "React-router",
//     "Storybook",
//     "Tailwind CSS",
//     "MUI",
//     "PostgreSQL",
//     "Redis",
//     "Elasticsearch",
//     "Neo4j",
//     "Git",
//     "Cursor AI",
//     "Jira",
//     "Scrum",
//     "Vercel",
//   ],

//   projects: [],

//   experience: [
//     {
//       company: "Notion Wave Inc, Tehran",
//       position: "Senior Full-Stack Developer",
//       startDate: "May 2024",
//       endDate: "Apr 2026",
//       description:
//         "Worked on Scinito – Academic Research Platform: designed and built multi-tier Plan & Quota Management system supporting Subscription, Trial, and Enterprise usage tracking; built responsive UI components using React and MUI; implemented integration testing for APIs using Jest to improve system reliability; developed Notes Service for communication researchers; shipped logs to ClickHouse for observability; implemented authentication and authorization using Keycloak.\n\nAlso worked on Mira – Smart Local Guide for Cities (AI Chat): architected end-to-end Next.js application for AI-powered city guide chatbot; integrated Google Maps services for location-based features; implemented authentication using Clerk; configured PWA with offline support; built fully responsive UI using Tailwind CSS and shadcn/ui; implemented i18n for English and Italian (multilingual).",
//       technologies: [
//         "React",
//         "MUI",
//         "Jest",
//         "ClickHouse",
//         "Keycloak",
//         "Next.js",
//         "Google Maps API",
//         "Clerk",
//         "PWA",
//         "Tailwind CSS",
//         "shadcn/ui",
//       ],
//     },
//     {
//       company: "Avid Technology Development - Tehran",
//       position: "Senior Full-Stack Developer",
//       startDate: "Mar 2019",
//       endDate: "Sep 2024",
//       description:
//         "Troweb Saas & Troweb Ecosystem: Developed GraphQL APIs using Apollo Server; built high-performance pipelines for importing large-scale data; implemented 4 frontend applications integrated with the Troweb SaaS knowledge management platform.\n\nRecommender Paper: Architected and optimized data processing pipelines for 210M academic papers stored in Elasticsearch (Microsoft Academic Graph); optimized PostgreSQL query performance and implemented Elasticsearch indexing for full-text search; used Redis caching to reduce response time; created backup and restore scripts on AWS S3.\n\nCrosslink – Graph Traversal System: Designed and implemented graph-based traversal system using Neo4j handling up to 5,000 connected nodes; implemented algorithms to find optimal paths and relationships between entities; worked with NestJS framework.",
//       technologies: [
//         "GraphQL",
//         "Apollo Server",
//         "PostgreSQL",
//         "Elasticsearch",
//         "Redis",
//         "AWS S3",
//         "Neo4j",
//         "NestJS",
//       ],
//     },
//   ],

//   education: [
//     {
//       institution: "University of Guilan",
//       degree: "Master's degree",
//       field: "Computer Software Engineering",
//       startDate: "Sep 2014",
//       endDate: "Mar 2017",
//     },
//   ],
// };

// const analyserResult: AnalyzerResult = {
//   overallScore: 8,

//   strengths: [
//     "Clear and detailed experience descriptions with specific technologies and responsibilities.",
//     "Strong skills section listing relevant technologies and tools.",
//     "Use of keywords relevant for ATS.",
//     "Good use of bullet points and clear structuring within experience entries.",
//     "Inclusion of achievements like optimizing pipelines and implementing caching strategies.",
//   ],

//   weaknesses: [
//     "Dates in the future may confuse ATS or recruiters.",
//     "Summary contains a typo: 'summery' instead of 'summary'.",
//     "No separate section for certifications or professional achievements.",
//     "No quantifiable achievements with metrics in some places.",
//     "Projects section is empty.",
//   ],

//   atsIssues: [
//     {
//       issue: "The 'summery' field is misspelled.",
//       severity: "medium",
//       explanation:
//         "Standard ATS systems expect common section names such as 'Summary'.",
//     },
//     {
//       issue: "Date ranges include future dates.",
//       severity: "low",
//       explanation:
//         "Future dates may cause confusion for recruiters or automated systems.",
//     },
//     {
//       issue: "Standard section headings are not explicitly represented.",
//       severity: "medium",
//       explanation:
//         "ATS systems generally work better with standard headings such as Summary, Experience and Education.",
//     },
//   ],

//   suggestions: [
//     {
//       title: "Correct 'summery' to 'summary'",
//       explanation:
//         "Fixing the typo ensures ATS systems can recognize the section correctly.",
//     },
//     {
//       title: "Update or clarify dates",
//       explanation:
//         "Use accurate dates to avoid confusion during resume screening.",
//     },
//     {
//       title: "Add measurable achievements",
//       explanation:
//         "Metrics make your experience more impactful and credible.",
//     },
//     {
//       title: "Add relevant projects",
//       explanation:
//         "Projects provide additional context about your technical experience.",
//     },
//     {
//       title: "Use standardized headings",
//       explanation:
//         "Standard headings improve ATS parsing accuracy.",
//     },
//   ],
// };

function SectionHeader({ title, count }: { title: string; count?: number }) {
  return (
    <div className="mb-5 flex items-center justify-between">
      <h2 className="text-base font-semibold tracking-tight text-foreground sm:text-lg">{title}</h2>

      {count !== undefined && (
        <Badge variant="secondary" className="bg-muted text-muted-foreground">
          {count}
        </Badge>
      )}
    </div>
  );
}

function ScoreCard({ score }: { score: number }) {
  const percentage = score;

  const rating =
    percentage <= 30
      ? { label: 'Needs work', color: 'text-red-600', border: 'border-red-500', dot: 'bg-red-500' }
      : percentage <= 50
        ? {
            label: 'Fair',
            color: 'text-yellow-600',
            border: 'border-yellow-500',
            dot: 'bg-yellow-500',
          }
        : percentage <= 75
          ? { label: 'Good', color: 'text-blue-600', border: 'border-blue-500', dot: 'bg-blue-500' }
          : {
              label: 'Strong',
              color: 'text-green-600',
              border: 'border-green-500',
              dot: 'bg-green-500',
            };

  return (
    <Card className="px-6 pb-2 pt-6">
      <CardContent className="flex flex-col items-center justify-center px-6 py-8">
        <div
          className={`relative flex size-36 items-center justify-center rounded-full border-10 sm:size-40 ${rating.border}`}
        >
          <div className="text-center">
            <p className="text-4xl font-bold tracking-tight text-foreground">{percentage}%</p>
            <p className="text-xs font-medium text-muted-foreground">COMPATIBILITY</p>
          </div>
        </div>

        <div className="mt-5 flex items-center gap-2">
          <span className={`size-2 rounded-full ${rating.dot}`} />

          <span className={`text-sm font-semibold ${rating.color}`}>{rating.label} resume</span>
        </div>

        <p className="mt-2 max-w-xs text-center text-sm leading-6 text-muted-foreground">
          {percentage <= 30
            ? 'Your resume may need significant improvements to better match this role.'
            : percentage <= 50
              ? 'Your resume has some relevant content, with several areas to improve.'
              : percentage <= 75
                ? 'Your resume is a reasonable match, with opportunities to strengthen it.'
                : 'Your resume appears to be a strong match for this role.'}
        </p>
      </CardContent>
    </Card>
  );
}

function OverviewCard({ analyserResult }: { analyserResult: AnalyzerResult }) {
  return (
    <Card>
      <CardHeader className="px-6 pb-2 pt-6">
        <SectionHeader title="Resume Overview" />
      </CardHeader>

      <CardContent className="grid gap-6 md:grid-cols-2">
        {/* Strengths */}
        <div>
          <div className="mb-4 flex items-center gap-3">
            <div className="flex size-9 items-center justify-center rounded-lg bg-green-50 text-green-600">
              ✓
            </div>

            <div>
              <h3 className="text-sm font-semibold">Strengths</h3>

              <p className="text-xs text-muted-foreground">What your resume does well</p>
            </div>
          </div>

          <div className="space-y-2">
            {analyserResult.strengths.map((item, index) => (
              <div
                key={index}
                className="rounded-lg border border-green-200 px-3 py-2.5 text-sm leading-5 text-muted-foreground"
              >
                {item}
              </div>
            ))}
          </div>
        </div>

        {/* Weaknesses */}
        <div>
          <div className="mb-4 flex items-center gap-3">
            <div className="flex size-9 items-center justify-center rounded-lg bg-yellow-50 text-yellow-600">
              !
            </div>

            <div>
              <h3 className="text-sm font-semibold">Weaknesses</h3>

              <p className="text-xs text-muted-foreground">Areas that need attention</p>
            </div>
          </div>

          <div className="space-y-2">
            {analyserResult.weaknesses.map((item, index) => (
              <div
                key={index}
                className="rounded-lg border border-yellow-200 px-3 py-2.5 text-sm leading-5 text-muted-foreground"
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function AtsIssues({ analyserResult }: { analyserResult: AnalyzerResult }) {
  return (
    <Card>
      <CardHeader className="px-6 pb-2 pt-6">
        <SectionHeader title="ATS Issues" count={analyserResult.atsIssues.length} />
      </CardHeader>

      <CardContent className="space-y-3">
        {analyserResult.atsIssues.map((item, index) => (
          <div
            key={index}
            className="group rounded-xl border p-4 transition-colors hover:border-muted-foreground/20 hover:bg-muted/30"
          >
            <div className="flex gap-4">
              <div className="flex size-9 shrink-0 items-center justify-center rounded-lg text-red-600">
                !
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="text-sm font-semibold text-foreground">{item.issue}</h3>

                  <Badge
                    variant={
                      item.severity === 'high'
                        ? 'destructive'
                        : item.severity === 'medium'
                          ? 'default'
                          : 'secondary'
                    }
                  >
                    {item.severity}
                  </Badge>
                </div>

                <p className="mt-1.5 text-sm leading-6 text-muted-foreground">{item.explanation}</p>
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

function Suggestions({ analyserResult }: { analyserResult: AnalyzerResult }) {
  return (
    <Card>
      <CardHeader className="px-6 pb-2 pt-6">
        <SectionHeader title="Recommended Improvements" count={analyserResult.suggestions.length} />
      </CardHeader>

      <CardContent className="grid gap-3 md:grid-cols-2">
        {analyserResult.suggestions.map((item, index) => (
          <div
            key={index}
            className="group rounded-xl border p-4 transition-all hover:-translate-y-0.5 hover:border-primary/20 hover:shadow-sm"
          >
            <div className="flex gap-3">
              <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-xs font-semibold text-primary">
                {String(index + 1).padStart(2, '0')}
              </div>

              <div>
                <h3 className="text-sm font-semibold">{item.title}</h3>

                <p className="mt-1.5 text-sm leading-6 text-muted-foreground">{item.explanation}</p>
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

function Skills({ resumeResult }: { resumeResult: ResumeResult }) {
  return (
    <div>
      <SectionHeader title="Skills" count={resumeResult.skills.length} />

      <div className="flex flex-wrap gap-2">
        {resumeResult.skills.map((skill) => (
          <Badge
            key={skill}
            variant="secondary"
            className="border bg-muted/50 text-muted-foreground"
          >
            {skill}
          </Badge>
        ))}
      </div>
    </div>
  );
}

function Experience({ resumeResult }: { resumeResult: ResumeResult }) {
  return (
    <div>
      <SectionHeader title="Experience" count={resumeResult.experience.length} />

      <div className="space-y-8">
        {resumeResult.experience.map((experience, index) => (
          <article key={index} className="relative">
            {index !== resumeResult.experience.length - 1 && (
              <div className="absolute bottom-0 left-[5px] top-10 hidden w-px bg-muted-foreground/20 md:block" />
            )}

            <div className="flex gap-4">
              <div className="relative z-10 mt-1 hidden size-3 shrink-0 rounded-full bg-primary ring-4 ring-primary/10 md:block" />

              <div className="min-w-0 flex-1">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <h3 className="text-base font-semibold text-foreground">
                      {experience.position}
                    </h3>

                    <p className="mt-1 text-sm font-medium text-primary">{experience.company}</p>
                  </div>

                  <Badge variant="secondary" className="self-start bg-muted text-muted-foreground">
                    {experience.startDate} - {experience.endDate}
                  </Badge>
                </div>

                <div className="mt-4 whitespace-pre-line text-sm leading-7 text-muted-foreground">
                  {experience.description}
                </div>

                <div className="mt-4 flex flex-wrap gap-1.5">
                  {experience.technologies.map((technology) => (
                    <Badge key={technology} variant="secondary" className="text-xs">
                      {technology}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

function Education({ resumeResult }: { resumeResult: ResumeResult }) {
  return (
    <div>
      <SectionHeader title="Education" count={resumeResult.education.length} />

      <div className="space-y-3">
        {resumeResult.education.map((education, index) => (
          <div key={index} className="rounded-xl border bg-muted/20 p-5">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <h3 className="font-semibold">{education.degree}</h3>

                <p className="mt-1 text-sm font-medium text-primary">{education.institution}</p>

                <p className="mt-1 text-sm text-muted-foreground">{education.field}</p>
              </div>

              <span className="text-xs text-muted-foreground">
                {education.startDate} - {education.endDate}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export type ATSResponse = {
  success: boolean;
  resumeResult: ResumeResult;
  analyserResult: AnalyzerResult;
  jobDescResult: ATSJobDescriptionResult;
};

export function ATSChecker({
  resumeResult,
  analyserResult,
}: Pick<ATSResponse, 'resumeResult' | 'analyserResult'>) {

  return (
    <main className="min-h-screen">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <Card className="mb-6 border shadow-sm">
          <CardContent className="flex flex-col gap-5 px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6">
            <div className="flex items-center gap-4">
              <Avatar className="size-12 shrink-0 sm:size-14">
                <AvatarFallback>{resumeResult.name.substring(0, 1)}</AvatarFallback>
              </Avatar>

              <div className="min-w-0">
                <h2 className="truncate text-lg font-bold sm:text-xl text-foreground">
                  {resumeResult.name}
                </h2>

                <p className="mt-0.5 text-sm text-muted-foreground">
                  Full Stack JavaScript Developer
                </p>

                <p className="mt-1 text-xs text-muted-foreground">{resumeResult.phone}</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs text-muted-foreground">Overall Score</span>

              <Badge variant={'outline'}>{analyserResult.overallScore} of 100</Badge>
            </div>
          </CardContent>
        </Card>
        <div className="pb-5">
          <ScoreCard score={analyserResult.overallScore} />
        </div>

        <div className="grid gap-6">
          <OverviewCard analyserResult={analyserResult} />
        </div>

        {/* Issues */}
        <div className="mt-6">
          <AtsIssues analyserResult={analyserResult} />
        </div>

        {/* Suggestions */}
        <div className="mt-6">
          <Suggestions analyserResult={analyserResult} />
        </div>

        {/* Parsed Resume */}
        <Card className="mt-6 border shadow-sm">
          <CardHeader className="px-5 pb-2 pt-6 sm:px-6">
            <div>
              <h2 className="text-lg font-semibold tracking-tight">Parsed Resume</h2>

              <p className="mt-1 text-sm text-muted-foreground">
                Resume content extracted by the analyzer
              </p>
            </div>
          </CardHeader>

          <CardContent className="space-y-8 px-5 pb-6 sm:px-6">
            {/* Summary */}
            <section>
              <SectionHeader title="Summary" />

              <p className="max-w-4xl text-sm leading-7 text-muted-foreground">
                {resumeResult.summery}
              </p>
            </section>

            <hr />

            {/* Skills */}
            <section>
              <Skills resumeResult={resumeResult} />
            </section>

            <hr />

            {/* Experience */}
            <section>
              <Experience resumeResult={resumeResult} />
            </section>

            <hr />

            {/* Education */}
            <section>
              <Education resumeResult={resumeResult} />
            </section>

            <hr />

            {/* Projects */}
            <section>
              <SectionHeader title="Projects" />

              {resumeResult.projects.length === 0 ? (
                <div className="rounded-xl border border-dashed bg-muted/20 px-6 py-10 text-center">
                  <div className="mx-auto flex size-10 items-center justify-center rounded-full bg-muted text-muted-foreground">
                    +
                  </div>

                  <h3 className="mt-3 text-sm font-semibold">No projects found</h3>

                  <p className="mx-auto mt-1 max-w-md text-sm leading-6 text-muted-foreground">
                    Adding relevant projects could improve the visibility of your technical
                    experience.
                  </p>
                </div>
              ) : null}
            </section>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
