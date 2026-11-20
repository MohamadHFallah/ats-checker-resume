import { Check, ArrowRight } from 'lucide-react';
import { AnalyzeResumeButton } from './AnalyzeResumeButton';

type PricingSectionProps = {
  signedIn: boolean;
};

export function PricingSection({ signedIn }: PricingSectionProps) {
  return (
    <section id="plans" className="scroll-mt-24 mx-auto max-w-6xl px-5 py-20 sm:px-8 md:py-24">
      <div className="max-w-xl">
        <p className="text-sm font-medium text-primary">Plans</p>
        <h2 className="mt-3 text-3xl sm:text-4xl">Start with what you need.</h2>
        <p className="mt-3 text-sm leading-6 text-muted-foreground">
          Try a focused comparison, then choose more room to refine as you need it.
        </p>
      </div>
      <div className="mt-9 grid gap-4 md:grid-cols-2">
        <article className="border border-border bg-card p-6 sm:p-7">
          <h3 className="text-xl">Free</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            A practical first look at your resume and a role.
          </p>
          <p className="mt-6 font-heading text-4xl">Free</p>
          <ul className="mt-6 space-y-3 border-t border-border pt-5 text-sm">
            <li className="flex gap-2">
              <Check className="size-4 text-success-700" />
              Resume analysis
            </li>
            <li className="flex gap-2">
              <Check className="size-4 text-success-700" />
              Job description matching
            </li>
            <li className="flex gap-2">
              <Check className="size-4 text-success-700" />
              Usage-based AI credits
            </li>
          </ul>
          <AnalyzeResumeButton
            signedIn={signedIn}
            className="mt-7 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground hover:bg-primary-700"
          >
            Get started <ArrowRight size={15} />
          </AnalyzeResumeButton>
        </article>
        <article className="border border-border bg-card p-6 sm:p-7">
          <h3 className="text-xl">Pro</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            More room to compare, learn, and improve.
          </p>
          <p className="mt-6 font-heading text-4xl">
            Flexible
            <span className="font-sans text-sm text-muted-foreground"> · details coming soon</span>
          </p>
          <ul className="mt-6 space-y-3 border-t border-border pt-5 text-sm">
            <li className="flex gap-2">
              <Check className="size-4 text-success-700" />
              Everything in Free
            </li>
            <li className="flex gap-2">
              <Check className="size-4 text-success-700" />
              More AI credits
            </li>
            <li className="flex gap-2">
              <Check className="size-4 text-success-700" />
              Access to advanced models
            </li>
          </ul>
          <a
            href="/plans"
            className="mt-7 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-md border border-border px-4 text-sm font-medium hover:bg-muted"
          >
            Explore plans <ArrowRight size={15} />
          </a>
        </article>
      </div>
    </section>
  );
}
