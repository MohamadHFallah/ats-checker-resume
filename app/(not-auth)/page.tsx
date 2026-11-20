import { getApiSession } from '@/lib/auth/getApiSession';
import { ResumePreview } from '../components/home/ResumePreview';
import { ArrowDown, ArrowRight } from 'lucide-react';
import { ReportPreview } from '../components/home/ReportPreview';
import { AnalyzeResumeButton } from '../components/home/AnalyzeResumeButton';
import { HowItWorksSection } from '../components/home/HowItWorksSection';
import { FeaturesSection } from '../components/home/FeaturesSection';
import { PricingSection } from '../components/home/PricingSection';
import { FaqSection } from '../components/home/FaqSection';

export default async function Home() {
  const session = await getApiSession();

  return (
    <>
      <section className="mx-auto grid min-h-[660px] max-w-6xl items-center gap-14 px-5 pb-20 pt-32 sm:px-8 md:grid-cols-[0.92fr_1.08fr] md:pb-28 md:pt-36">
        <div className="max-w-xl">
          <p className="mb-5 flex items-center gap-2 text-sm font-medium text-primary">
            <span className="size-1.5 rounded-full bg-success-500" /> A clearer read on your next
            role
          </p>
          <h1 className="max-w-lg text-5xl leading-[1.06] sm:text-6xl">
            Your resume.
            <br />
            Your next opportunity.
          </h1>
          <p className="mt-6 max-w-md text-base leading-7 text-muted-foreground">
            See how your experience meets the role—and what to make clearer before you apply.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <AnalyzeResumeButton
              signedIn={Boolean(session?.user)}
              className="inline-flex min-h-12 items-center gap-2 rounded-md bg-primary px-5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              Analyze my resume <ArrowRight size={16} />
            </AnalyzeResumeButton>
            <a
              href="#how-it-works"
              className="inline-flex min-h-12 items-center gap-2 rounded-md border border-border bg-card px-5 text-sm font-medium transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              See how it works <ArrowDown size={15} />
            </a>
          </div>
          <p className="mt-5 text-xs leading-5 text-muted-foreground">
            Your resume text is sent to an external AI provider for analysis.
          </p>
        </div>
        <ResumePreview />
      </section>

      <HowItWorksSection />

      <section className="mx-auto max-w-6xl px-5 py-20 sm:px-8 md:py-24">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-5">
          <div className="max-w-xl">
            <p className="text-sm font-medium text-primary">A report you can use</p>
            <h2 className="mt-3 text-3xl leading-tight sm:text-4xl">
              Specific feedback. No mystery score.
            </h2>
            <p className="mt-3 text-sm leading-6 text-muted-foreground">
              See what matched, what needs more evidence, and how to strengthen the story your
              resume tells.
            </p>
          </div>
          <AnalyzeResumeButton
            signedIn={Boolean(session?.user)}
            className="inline-flex min-h-11 items-center gap-2 text-sm font-medium text-primary hover:underline"
          >
            Try an analysis <ArrowRight size={15} />
          </AnalyzeResumeButton>
        </div>
        <ReportPreview />
      </section>

      <FeaturesSection />

      {/* <PricingSection signedIn={Boolean(session?.user)} /> */}

      <FaqSection />

      <section className="mx-auto max-w-6xl px-5 py-16 sm:px-8">
        <div className="flex flex-col justify-between gap-5 border-b border-border pb-12 sm:flex-row sm:items-end">
          <div>
            <p className="text-sm text-muted-foreground">
              One role at a time. A little more clarity each time.
            </p>
            <h2 className="mt-2 text-3xl sm:text-4xl">Make your next application count.</h2>
          </div>
          <AnalyzeResumeButton
            signedIn={Boolean(session?.user)}
            className="inline-flex min-h-12 w-fit items-center gap-2 rounded-md bg-primary px-5 text-sm font-medium text-primary-foreground hover:bg-primary-700"
          >
            Analyze my resume <ArrowRight size={16} />
          </AnalyzeResumeButton>
        </div>
      </section>
    </>
  );
}
